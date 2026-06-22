// College Timetable Management System - CSP Timetable Generator

const Curriculum = {
    "CSE-Y1": [
        { code: "CS101", hours: 3 },
        { code: "CS101L", hours: 4 },
        { code: "EC101", hours: 3 },
        { code: "EE101", hours: 3 },
        { code: "ME101", hours: 3 }
    ],
    "CSE-Y2": [
        { code: "CS201", hours: 3 },
        { code: "CS201L", hours: 4 },
        { code: "CS202", hours: 3 },
        { code: "CS203", hours: 3 },
        { code: "CS203L", hours: 2 }
    ],
    "ECE-Y1": [
        { code: "EC101", hours: 3 },
        { code: "EC101L", hours: 4 },
        { code: "CS101", hours: 3 },
        { code: "EE101", hours: 3 },
        { code: "ME101", hours: 3 }
    ],
    "ME-Y1": [
        { code: "ME101", hours: 3 },
        { code: "CS101", hours: 3 },
        { code: "EE101", hours: 3 },
        { code: "ME201", hours: 3 },
        { code: "ME201L", hours: 4 }
    ],
    "CE-Y1": [
        { code: "CE101", hours: 3 },
        { code: "CS101", hours: 3 },
        { code: "ME101", hours: 3 },
        { code: "CE201", hours: 3 },
        { code: "CE201L", hours: 4 }
    ],
    "EEE-Y1": [
        { code: "EE101", hours: 3 },
        { code: "EE101L", hours: 4 },
        { code: "CS101", hours: 3 },
        { code: "EC101", hours: 3 },
        { code: "EE201", hours: 3 }
    ]
};

const TimetableGenerator = {
    // Generate full timetable
    generate() {
        const staff = DataStore.getStaff();
        const subjects = DataStore.getSubjects();
        const rooms = DataStore.getRooms();
        const sections = DataStore.getSections();

        // 1. Prepare lists of sessions to schedule
        // A session represents a class unit: either a 1-hour theory slot or a 2-hour consecutive lab slot.
        let sessionsToSchedule = [];
        
        sections.forEach(section => {
            const reqs = Curriculum[section.id] || [];
            reqs.forEach(req => {
                const sub = subjects.find(s => s.code === req.code);
                if (!sub) return;

                if (sub.type === "Practical/Lab") {
                    // Split lab hours into 2-hour consecutive sessions
                    const numSessions = Math.floor(req.hours / 2);
                    for (let i = 0; i < numSessions; i++) {
                        sessionsToSchedule.push({
                            sectionId: section.id,
                            subjectCode: sub.code,
                            duration: 2,
                            dept: sub.dept,
                            type: sub.type
                        });
                    }
                } else {
                    // Theory hours are 1-hour slots
                    for (let i = 0; i < req.hours; i++) {
                        sessionsToSchedule.push({
                            sectionId: section.id,
                            subjectCode: sub.code,
                            duration: 1,
                            dept: sub.dept,
                            type: sub.type
                        });
                    }
                }
            });
        });

        // Sort: 2-hour sessions first (harder to place), then by section id
        sessionsToSchedule.sort((a, b) => b.duration - a.duration);

        // 2. Initialize tracking structures for CSP
        const teacherSchedule = {}; // teacherId -> Set of "day-period"
        const roomSchedule = {};    // roomName -> Set of "day-period"
        const sectionSchedule = {}; // sectionId -> Set of "day-period"
        const sectionDailySubjects = {}; // sectionId -> day -> Set of subjectCode (avoid duplicate theory in a day)
        const teacherWeeklyHours = {}; // teacherId -> count of assigned hours

        staff.forEach(s => {
            teacherSchedule[s.id] = new Set();
            teacherWeeklyHours[s.id] = 0;
        });
        rooms.forEach(r => {
            roomSchedule[r.name] = new Set();
        });
        sections.forEach(sec => {
            sectionSchedule[sec.id] = new Set();
            sectionDailySubjects[sec.id] = {};
            WORKING_DAYS.forEach(day => {
                sectionDailySubjects[sec.id][day] = new Set();
            });
        });

        const scheduledSlots = [];

        // Backtracking / Greedy solver function
        function solve(index) {
            if (index >= sessionsToSchedule.length) {
                return true; // All scheduled successfully!
            }

            const session = sessionsToSchedule[index];
            const subCode = session.subjectCode;
            const sub = subjects.find(s => s.code === subCode);

            // Find all qualified teachers (not absent)
            const qualifiedTeachers = staff.filter(t => t.subjects.includes(subCode) && !t.isAbsent);
            // Sort teachers by current workload (ascending) to balance load
            qualifiedTeachers.sort((a, b) => (teacherWeeklyHours[a.id] || 0) - (teacherWeeklyHours[b.id] || 0));

            // Find rooms based on subject type
            const matchingRooms = rooms.filter(r => {
                if (session.type === "Practical/Lab") {
                    return r.type === "Lab" && (r.dept === "All" || r.dept === session.dept);
                } else {
                    return r.type === "Classroom";
                }
            });

            // Try scheduling this session
            for (let tIndex = 0; tIndex < qualifiedTeachers.length; tIndex++) {
                const teacher = qualifiedTeachers[tIndex];

                // Check workload limit
                if (teacherWeeklyHours[teacher.id] + session.duration > teacher.maxHoursPerWeek) {
                    continue; // Skip if it exceeds their workload limit
                }

                for (let rIndex = 0; rIndex < matchingRooms.length; rIndex++) {
                    const room = matchingRooms[rIndex];

                    // Loop through days and periods to find availability
                    for (let dIndex = 0; dIndex < WORKING_DAYS.length; dIndex++) {
                        const day = WORKING_DAYS[dIndex];

                        // For labs (2 hours consecutive): choices vary by Year (to prevent crossing breaks/lunch breaks)
                        let periodChoices = [];
                        if (session.duration === 2) {
                            const isFirstYear = session.sectionId.endsWith("-Y1") || session.sectionId.includes("Y1");
                            if (isFirstYear) {
                                // First Year: Lunch is after Period 5 (index 4). Exclude crossing index 4 and 5.
                                periodChoices = [[0, 1], [1, 2], [2, 3], [3, 4], [5, 6], [6, 7]];
                            } else {
                                // Other Years: Lunch is after Period 4 (index 3). Exclude crossing index 3 and 4.
                                periodChoices = [[0, 1], [2, 3], [4, 5], [5, 6], [6, 7]];
                            }
                        } else {
                            periodChoices = [[0], [1], [2], [3], [4], [5], [6], [7]];
                        }

                        for (let pIndex = 0; pIndex < periodChoices.length; pIndex++) {
                            const periods = periodChoices[pIndex];
                            
                            // Check if teacher, room, and section are free for all periods in this choice
                            let fits = true;
                            
                            // For theory, check if the section already has this subject today (to spread out theory classes)
                            if (session.duration === 1 && sectionDailySubjects[session.sectionId][day].has(subCode)) {
                                fits = false;
                            }

                            for (let p of periods) {
                                const slotKey = `${day}-${p}`;
                                if (
                                    teacherSchedule[teacher.id].has(slotKey) ||
                                    roomSchedule[room.name].has(slotKey) ||
                                    sectionSchedule[session.sectionId].has(slotKey)
                                ) {
                                    fits = false;
                                    break;
                                }
                            }

                            if (fits) {
                                // 1. Apply assignments
                                periods.forEach(p => {
                                    const slotKey = `${day}-${p}`;
                                    teacherSchedule[teacher.id].add(slotKey);
                                    roomSchedule[room.name].add(slotKey);
                                    sectionSchedule[session.sectionId].add(slotKey);
                                    if (session.duration === 1) {
                                        sectionDailySubjects[session.sectionId][day].add(subCode);
                                    }
                                });
                                teacherWeeklyHours[teacher.id] += session.duration;

                                // Create scheduled slots
                                const sessionSlots = periods.map(p => ({
                                    id: `${session.sectionId}-${day}-${p}`,
                                    day: day,
                                    period: p,
                                    sectionId: session.sectionId,
                                    subjectCode: subCode,
                                    teacherId: teacher.id,
                                    backupTeacherId: null, // assigned later
                                    roomName: room.name,
                                    isSubstituted: false,
                                    originalTeacherId: teacher.id,
                                    currentTeacherId: teacher.id
                                }));

                                scheduledSlots.push(...sessionSlots);

                                // 2. Recurse to next session
                                if (solve(index + 1)) {
                                    return true;
                                }

                                // 3. Backtrack if failed downstream
                                periods.forEach(p => {
                                    const slotKey = `${day}-${p}`;
                                    teacherSchedule[teacher.id].delete(slotKey);
                                    roomSchedule[room.name].delete(slotKey);
                                    sectionSchedule[session.sectionId].delete(slotKey);
                                    if (session.duration === 1) {
                                        sectionDailySubjects[session.sectionId][day].delete(subCode);
                                    }
                                });
                                teacherWeeklyHours[teacher.id] -= session.duration;
                                // remove matching entries
                                for (let i = 0; i < session.duration; i++) {
                                    scheduledSlots.pop();
                                }
                            }
                        }
                    }
                }
            }

            return false; // Backtrack
        }

        // Run CSP Solver
        const success = solve(0);

        if (!success) {
            console.warn("CSP Solver was unable to satisfy all constraints perfectly!");
            return { success: false, schedule: [] };
        }

        // 3. BACKUP STAFF ASSIGNMENT PHASE
        // For each scheduled slot, find a backup teacher who is:
        // - Qualified for the subject (has it in subjects list)
        // - Is NOT the primary teacher
        // - Is NOT absent
        // - Is FREE during this specific slot
        scheduledSlots.forEach(slot => {
            const slotKey = `${slot.day}-${slot.period}`;
            
            // Candidate backups
            const backups = staff.filter(t => 
                t.id !== slot.teacherId &&
                t.subjects.includes(slot.subjectCode) &&
                !t.isAbsent &&
                !teacherSchedule[t.id].has(slotKey)
            );

            if (backups.length > 0) {
                // Pick candidate with lowest weekly workload to balance load
                backups.sort((a, b) => (teacherWeeklyHours[a.id] || 0) - (teacherWeeklyHours[b.id] || 0));
                slot.backupTeacherId = backups[0].id;
            } else {
                // Secondary backup: any teacher from same department who is free during this slot
                const sub = subjects.find(s => s.code === slot.subjectCode);
                const deptBackups = staff.filter(t =>
                    t.id !== slot.teacherId &&
                    t.dept === sub.dept &&
                    !t.isAbsent &&
                    !teacherSchedule[t.id].has(slotKey)
                );
                if (deptBackups.length > 0) {
                    deptBackups.sort((a, b) => (teacherWeeklyHours[a.id] || 0) - (teacherWeeklyHours[b.id] || 0));
                    slot.backupTeacherId = deptBackups[0].id;
                } else {
                    slot.backupTeacherId = null; // No backup available!
                }
            }
        });

        // Save generated schedule to store
        DataStore.saveSchedule(scheduledSlots);

        return { success: true, schedule: scheduledSlots };
    },

    // Validate manual adjustments for conflicts
    // Returns { hasConflict: boolean, errors: string[] }
    validateSchedule(schedule) {
        const errors = [];
        const teacherSlots = {}; // teacher -> set of day-period
        const roomSlots = {};    // room -> set of day-period
        const sectionSlots = {}; // section -> set of day-period

        schedule.forEach(slot => {
            const slotKey = `${slot.day}-${slot.period}`;
            
            // Check Teacher Conflict
            if (slot.currentTeacherId) {
                if (!teacherSlots[slot.currentTeacherId]) teacherSlots[slot.currentTeacherId] = [];
                if (teacherSlots[slot.currentTeacherId].includes(slotKey)) {
                    const t = DataStore.getStaff().find(s => s.id === slot.currentTeacherId);
                    errors.push(`Staff Conflict: ${t ? t.name : slot.currentTeacherId} is double-booked on ${slot.day} Period ${slot.period + 1}.`);
                }
                teacherSlots[slot.currentTeacherId].push(slotKey);
            }

            // Check Room Conflict
            if (slot.roomName) {
                if (!roomSlots[slot.roomName]) roomSlots[slot.roomName] = [];
                if (roomSlots[slot.roomName].includes(slotKey)) {
                    errors.push(`Room Conflict: ${slot.roomName} is double-booked on ${slot.day} Period ${slot.period + 1}.`);
                }
                roomSlots[slot.roomName].push(slotKey);
            }

            // Check Section Conflict
            if (slot.sectionId) {
                if (!sectionSlots[slot.sectionId]) sectionSlots[slot.sectionId] = [];
                if (sectionSlots[slot.sectionId].includes(slotKey)) {
                    errors.push(`Section Conflict: Section ${slot.sectionId} has multiple classes scheduled on ${slot.day} Period ${slot.period + 1}.`);
                }
                sectionSlots[slot.sectionId].push(slotKey);
            }
        });

        return {
            hasConflict: errors.length > 0,
            errors: errors
        };
    }
};
