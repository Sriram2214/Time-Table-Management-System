// College Timetable Management System - Absence & Substitution Engine

const AbsenceManager = {
    // Mark a staff member as absent and trigger substitutions
    markAbsent(staffId) {
        const staff = DataStore.getStaff();
        const schedule = DataStore.getSchedule();
        const subjects = DataStore.getSubjects();
        const logs = DataStore.getSubLogs();

        const absentTeacher = staff.find(s => s.id === staffId);
        if (!absentTeacher) return { success: false, message: "Staff member not found." };
        if (absentTeacher.isAbsent) return { success: false, message: "Staff member is already marked absent." };

        // Mark absent
        absentTeacher.isAbsent = true;
        DataStore.saveStaff(staff);

        // Find all classes taught by this teacher
        const classesToSubstitute = schedule.filter(slot => slot.currentTeacherId === staffId);
        
        const currentLogs = [];
        let substitutedCount = 0;
        let failedCount = 0;

        classesToSubstitute.forEach(slot => {
            const sub = subjects.find(s => s.code === slot.subjectCode);
            const slotKey = `${slot.day}-${slot.period}`;
            
            // Check primary backup
            let chosenBackupId = null;
            let substitutionReason = "";

            if (slot.backupTeacherId) {
                const primaryBackup = staff.find(s => s.id === slot.backupTeacherId);
                // Check if primary backup is available: not absent, and not teaching in this slot
                const isBackupFree = !primaryBackup.isAbsent && !schedule.some(s => s.currentTeacherId === primaryBackup.id && s.day === slot.day && s.period === slot.period);
                
                if (isBackupFree) {
                    chosenBackupId = primaryBackup.id;
                    substitutionReason = `Assigned backup staff ${primaryBackup.name} was available and assigned.`;
                } else {
                    substitutionReason = `Assigned backup staff ${primaryBackup.name} was double-booked or absent.`;
                }
            } else {
                substitutionReason = "No primary backup was pre-assigned to this class.";
            }

            // If primary backup is not available, look for an alternative qualified teacher who is free
            if (!chosenBackupId) {
                const candidates = staff.filter(t => 
                    t.id !== staffId &&
                    t.subjects.includes(slot.subjectCode) &&
                    !t.isAbsent &&
                    !schedule.some(s => s.currentTeacherId === t.id && s.day === slot.day && s.period === slot.period)
                );

                if (candidates.length > 0) {
                    chosenBackupId = candidates[0].id;
                    substitutionReason += ` Dynamic search found alternative qualified staff ${candidates[0].name}.`;
                } else {
                    // Secondary candidate search: any teacher in the same department who is free
                    const deptCandidates = staff.filter(t =>
                        t.id !== staffId &&
                        t.dept === sub.dept &&
                        !t.isAbsent &&
                        !schedule.some(s => s.currentTeacherId === t.id && s.day === slot.day && s.period === slot.period)
                    );

                    if (deptCandidates.length > 0) {
                        chosenBackupId = deptCandidates[0].id;
                        substitutionReason += ` Dynamic search found department staff ${deptCandidates[0].name} (unlisted expertise).`;
                    }
                }
            }

            // Execute substitution or flag conflict
            const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            if (chosenBackupId) {
                const backupTeacher = staff.find(s => s.id === chosenBackupId);
                
                // Update schedule slot
                slot.currentTeacherId = chosenBackupId;
                slot.isSubstituted = true;
                substitutedCount++;

                // Log the success
                const successLog = {
                    id: `${slot.id}-sub-${Date.now()}`,
                    timestamp: timestamp,
                    day: slot.day,
                    period: slot.period,
                    sectionId: slot.sectionId,
                    subjectCode: slot.subjectCode,
                    absentTeacherName: absentTeacher.name,
                    replacementTeacherName: backupTeacher.name,
                    status: "Success",
                    roomName: slot.roomName,
                    details: substitutionReason,
                    notifications: [
                        `SMS to Prof. ${backupTeacher.name}: "Substitute duty assigned for ${slot.subjectCode} in ${slot.roomName} at ${slot.day} Period ${slot.period + 1}."`,
                        `Alert to Section ${slot.sectionId}: "Your class for ${slot.subjectCode} is rescheduled with Prof. ${backupTeacher.name} in ${slot.roomName}."`,
                        `Dashboard notice to Admin: "Auto-substituted ${absentTeacher.name} with ${backupTeacher.name}."`
                    ]
                };
                currentLogs.push(successLog);
            } else {
                failedCount++;
                // Log the failure
                const failureLog = {
                    id: `${slot.id}-fail-${Date.now()}`,
                    timestamp: timestamp,
                    day: slot.day,
                    period: slot.period,
                    sectionId: slot.sectionId,
                    subjectCode: slot.subjectCode,
                    absentTeacherName: absentTeacher.name,
                    replacementTeacherName: "NONE",
                    status: "Critical Alert",
                    roomName: slot.roomName,
                    details: `${substitutionReason} No alternative free staff found in department.`,
                    notifications: [
                        `ALERT to Admin: "CRITICAL: No replacement found for Prof. ${absentTeacher.name} teaching ${slot.subjectCode} to ${slot.sectionId} in ${slot.roomName}!"`
                    ]
                };
                currentLogs.push(failureLog);
            }
        });

        // Save logs and updated schedule
        const updatedLogs = [...currentLogs, ...logs];
        DataStore.saveSubLogs(updatedLogs);
        DataStore.saveSchedule(schedule);

        return {
            success: true,
            substitutedCount,
            failedCount,
            logs: currentLogs
        };
    },

    // Mark a staff member as present again, restoring their original assignments
    markPresent(staffId) {
        const staff = DataStore.getStaff();
        const schedule = DataStore.getSchedule();
        const logs = DataStore.getSubLogs();

        const presentTeacher = staff.find(s => s.id === staffId);
        if (!presentTeacher) return { success: false, message: "Staff member not found." };
        if (!presentTeacher.isAbsent) return { success: false, message: "Staff member is already marked active." };

        // Mark active
        presentTeacher.isAbsent = false;
        DataStore.saveStaff(staff);

        // Find slots where this teacher was original but was substituted
        let restoredCount = 0;
        schedule.forEach(slot => {
            if (slot.originalTeacherId === staffId && slot.isSubstituted) {
                slot.currentTeacherId = staffId;
                slot.isSubstituted = false;
                restoredCount++;
            }
        });

        // Log the return
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const restoreLog = {
            id: `restore-${staffId}-${Date.now()}`,
            timestamp: timestamp,
            day: "Today",
            period: -1,
            sectionId: "N/A",
            subjectCode: "N/A",
            absentTeacherName: presentTeacher.name,
            replacementTeacherName: "Self",
            status: "Restored",
            roomName: "N/A",
            details: `Prof. ${presentTeacher.name} marked present. Restored ${restoredCount} original teaching slots.`,
            notifications: [
                `Dashboard notice: "Prof. ${presentTeacher.name} returned. Substitutions cancelled."`
            ]
        };

        DataStore.saveSubLogs([restoreLog, ...logs]);
        DataStore.saveSchedule(schedule);

        return {
            success: true,
            restoredCount
        };
    }
};
