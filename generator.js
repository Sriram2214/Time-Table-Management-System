// ── Legacy fallback Curriculum — all 4 years × 5 departments (20 sections) ──
const LEGACY_CURRICULUM = {
    // ── CSE ──────────────────────────────────────────────────────────────────
    "CSE-Y1": [
        { code: "CS101",  hours: 3 }, { code: "CS101L", hours: 4 },
        { code: "CS102",  hours: 3 }, { code: "CS103",  hours: 3 }, { code: "CS103L", hours: 2 }
    ],
    "CSE-Y2": [
        { code: "CS201",  hours: 3 }, { code: "CS201L", hours: 4 },
        { code: "CS202",  hours: 3 }, { code: "CS203",  hours: 3 }, { code: "CS203L", hours: 2 },
        { code: "CS204",  hours: 3 }
    ],
    "CSE-Y3": [
        { code: "CS301",  hours: 3 }, { code: "CS301L", hours: 4 },
        { code: "CS302",  hours: 3 }, { code: "CS302L", hours: 2 },
        { code: "CS303",  hours: 3 }, { code: "CS304",  hours: 3 }
    ],
    "CSE-Y4": [
        { code: "CS401",  hours: 3 }, { code: "CS401L", hours: 4 },
        { code: "CS402",  hours: 3 }, { code: "CS403",  hours: 3 },
        { code: "CS404",  hours: 3 }, { code: "CS404L", hours: 2 }
    ],
    // ── ECE ──────────────────────────────────────────────────────────────────
    "ECE-Y1": [
        { code: "EC101",  hours: 3 }, { code: "EC101L", hours: 4 },
        { code: "EC102",  hours: 3 }, { code: "EC103",  hours: 3 }
    ],
    "ECE-Y2": [
        { code: "EC201",  hours: 3 }, { code: "EC201L", hours: 4 },
        { code: "EC202",  hours: 3 }, { code: "EC203",  hours: 3 }, { code: "EC203L", hours: 2 }
    ],
    "ECE-Y3": [
        { code: "EC301",  hours: 3 }, { code: "EC301L", hours: 4 },
        { code: "EC302",  hours: 3 }, { code: "EC302L", hours: 2 },
        { code: "EC303",  hours: 3 }, { code: "EC304",  hours: 3 }
    ],
    "ECE-Y4": [
        { code: "EC401",  hours: 3 }, { code: "EC401L", hours: 4 },
        { code: "EC402",  hours: 3 }, { code: "EC403",  hours: 3 }, { code: "EC404",  hours: 3 }
    ],
    // ── ME ───────────────────────────────────────────────────────────────────
    "ME-Y1": [
        { code: "ME101",  hours: 3 }, { code: "ME102",  hours: 3 }, { code: "ME102L", hours: 2 }
    ],
    "ME-Y2": [
        { code: "ME201",  hours: 3 }, { code: "ME201L", hours: 4 },
        { code: "ME202",  hours: 3 }, { code: "ME202L", hours: 4 }, { code: "ME203",  hours: 3 }
    ],
    "ME-Y3": [
        { code: "ME301",  hours: 3 }, { code: "ME301L", hours: 4 },
        { code: "ME302",  hours: 3 }, { code: "ME303",  hours: 3 },
        { code: "ME304",  hours: 3 }, { code: "ME304L", hours: 2 }
    ],
    "ME-Y4": [
        { code: "ME401",  hours: 3 }, { code: "ME401L", hours: 4 },
        { code: "ME402",  hours: 3 }, { code: "ME403",  hours: 3 },
        { code: "ME404",  hours: 3 }, { code: "ME404L", hours: 2 }
    ],
    // ── CE ───────────────────────────────────────────────────────────────────
    "CE-Y1": [
        { code: "CE101",  hours: 3 }, { code: "CE102",  hours: 3 }, { code: "CE102L", hours: 2 }
    ],
    "CE-Y2": [
        { code: "CE201",  hours: 3 }, { code: "CE201L", hours: 4 },
        { code: "CE202",  hours: 3 }, { code: "CE203",  hours: 3 }, { code: "CE203L", hours: 2 }
    ],
    "CE-Y3": [
        { code: "CE301",  hours: 3 }, { code: "CE301L", hours: 4 },
        { code: "CE302",  hours: 3 }, { code: "CE302L", hours: 2 },
        { code: "CE303",  hours: 3 }, { code: "CE304",  hours: 3 }
    ],
    "CE-Y4": [
        { code: "CE401",  hours: 3 }, { code: "CE401L", hours: 4 },
        { code: "CE402",  hours: 3 }, { code: "CE403",  hours: 3 }, { code: "CE404",  hours: 3 }
    ],
    // ── EEE ──────────────────────────────────────────────────────────────────
    "EEE-Y1": [
        { code: "EE101",  hours: 3 }, { code: "EE101L", hours: 4 }, { code: "EE102",  hours: 3 }
    ],
    "EEE-Y2": [
        { code: "EE201",  hours: 3 }, { code: "EE202",  hours: 3 },
        { code: "EE202L", hours: 4 }, { code: "EE203",  hours: 3 }
    ],
    "EEE-Y3": [
        { code: "EE301",  hours: 3 }, { code: "EE301L", hours: 4 },
        { code: "EE302",  hours: 3 }, { code: "EE302L", hours: 2 },
        { code: "EE303",  hours: 3 }, { code: "EE304",  hours: 3 }
    ],
    "EEE-Y4": [
        { code: "EE401",  hours: 3 }, { code: "EE401L", hours: 4 },
        { code: "EE402",  hours: 3 }, { code: "EE402L", hours: 2 },
        { code: "EE403",  hours: 3 }, { code: "EE404",  hours: 3 }
    ]
};


const TimetableGenerator = {

    // ── AI Curriculum Builder ─────────────────────────────────────────────────
    // Builds a curriculum map dynamically from imported subjects & sections.
    // Logic:
    //   1. For each section, find subjects belonging to that section's department.
    //   2. Also include a few common/shared subjects from other depts (like CS101 for all depts).
    //   3. Cap at ~5-6 subjects per section so the timetable stays schedulable.
    buildDynamicCurriculum(sections, subjects) {
        const curriculum = {};

        sections.forEach(section => {
            // Subjects that belong to this section's department
            const deptSubjects = subjects.filter(s => s.dept === section.dept);

            // Also include up to 2 theory subjects from other departments (common courses)
            const commonSubjects = subjects.filter(s =>
                s.dept !== section.dept && s.type === 'Theory'
            ).slice(0, 2);

            // Combine: dept subjects first, then common ones; de-duplicate by code
            const combined = [...deptSubjects, ...commonSubjects];
            const seen = new Set();
            const unique = combined.filter(s => {
                if (seen.has(s.code)) return false;
                seen.add(s.code);
                return true;
            });

            // Limit: max 6 subjects per section to stay within a 5-day × 8-period grid
            // Priority: Practical/Lab sessions first (harder to schedule), then Theory
            const labs = unique.filter(s => s.type === 'Practical/Lab').slice(0, 2);
            const theory = unique.filter(s => s.type === 'Theory').slice(0, 4);
            const chosen = [...labs, ...theory];

            curriculum[section.id] = chosen.map(s => ({
                code: s.code,
                hours: s.hoursPerWeek || (s.type === 'Practical/Lab' ? 4 : 3)
            }));
        });

        return curriculum;
    },

    // ── Get Curriculum: dynamic if custom data, legacy if default sections ────
    getCurriculum(sections, subjects) {
        const legacyIds = new Set(Object.keys(LEGACY_CURRICULUM));
        const allLegacy = sections.every(s => legacyIds.has(s.id));

        if (allLegacy) {
            // Use the proven legacy curriculum for default data
            return LEGACY_CURRICULUM;
        }

        // Build dynamic curriculum from uploaded data
        return this.buildDynamicCurriculum(sections, subjects);
    },

    // ── Main Generate Function ────────────────────────────────────────────────
    generate() {
        const staff    = DataStore.getStaff();
        const subjects = DataStore.getSubjects();
        const rooms    = DataStore.getRooms();
        const sections = DataStore.getSections();

        // Auto-create rooms if none exist for custom data
        const effectiveRooms = this._ensureRoomsExist(rooms, sections, subjects);

        // Get curriculum (dynamic or legacy)
        const curriculum = this.getCurriculum(sections, subjects);

        // 1. Build sessions list from curriculum
        let sessionsToSchedule = [];

        sections.forEach(section => {
            const reqs = curriculum[section.id] || [];
            reqs.forEach(req => {
                const sub = subjects.find(s => s.code === req.code);
                if (!sub) return;

                if (sub.type === "Practical/Lab") {
                    const numSessions = Math.max(1, Math.floor(req.hours / 2));
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

        // Sort: 2-hour lab sessions first (hardest to place)
        sessionsToSchedule.sort((a, b) => b.duration - a.duration);

        // 2. Initialize tracking structures
        const teacherSchedule     = {};
        const roomSchedule        = {};
        const sectionSchedule     = {};
        const sectionDailySubjects = {};
        const teacherWeeklyHours  = {};

        staff.forEach(s => {
            teacherSchedule[s.id]    = new Set();
            teacherWeeklyHours[s.id] = 0;
        });
        effectiveRooms.forEach(r => { roomSchedule[r.name] = new Set(); });
        sections.forEach(sec => {
            sectionSchedule[sec.id]      = new Set();
            sectionDailySubjects[sec.id] = {};
            WORKING_DAYS.forEach(day => {
                sectionDailySubjects[sec.id][day] = new Set();
            });
        });

        const scheduledSlots = [];

        // 3. Greedy + Backtracking CSP Solver
        function solve(index) {
            if (index >= sessionsToSchedule.length) return true;

            const session = sessionsToSchedule[index];
            const subCode = session.subjectCode;
            const sub     = subjects.find(s => s.code === subCode);

            // Find qualified teachers — support imported data where subjects may be empty arrays
            let qualifiedTeachers = staff.filter(t =>
                !t.isAbsent &&
                (t.subjects.includes(subCode) ||
                 t.dept === session.dept ||  // dept match fallback
                 t.subjects.length === 0)    // teacher with no restrictions = can teach any
            );

            // Sort by current workload ascending (load balancing)
            qualifiedTeachers.sort((a, b) =>
                (teacherWeeklyHours[a.id] || 0) - (teacherWeeklyHours[b.id] || 0)
            );

            // Find matching rooms
            const matchingRooms = effectiveRooms.filter(r => {
                if (session.type === "Practical/Lab") {
                    return r.type === "Lab" && (r.dept === "All" || r.dept === session.dept);
                }
                return r.type === "Classroom";
            });

            // Fallback: if no labs found for this dept, use any lab
            const finalRooms = matchingRooms.length > 0
                ? matchingRooms
                : effectiveRooms.filter(r => session.type === "Practical/Lab" ? r.type === "Lab" : r.type === "Classroom");

            for (let tIndex = 0; tIndex < qualifiedTeachers.length; tIndex++) {
                const teacher = qualifiedTeachers[tIndex];

                if ((teacherWeeklyHours[teacher.id] || 0) + session.duration > teacher.maxHoursPerWeek) {
                    continue;
                }

                for (let rIndex = 0; rIndex < finalRooms.length; rIndex++) {
                    const room = finalRooms[rIndex];

                    for (let dIndex = 0; dIndex < WORKING_DAYS.length; dIndex++) {
                        const day = WORKING_DAYS[dIndex];

                        let periodChoices = [];
                        if (session.duration === 2) {
                            const isFirstYear = session.sectionId.endsWith("-Y1") ||
                                session.sectionId.toLowerCase().includes("y1") ||
                                session.sectionId.includes("1st");
                            periodChoices = isFirstYear
                                ? [[0,1],[1,2],[2,3],[3,4],[5,6],[6,7]]
                                : [[0,1],[2,3],[4,5],[5,6],[6,7]];
                        } else {
                            periodChoices = [[0],[1],[2],[3],[4],[5],[6],[7]];
                        }

                        for (let pIndex = 0; pIndex < periodChoices.length; pIndex++) {
                            const periods = periodChoices[pIndex];

                            let fits = true;

                            // Avoid same theory subject twice in a day for same section
                            if (session.duration === 1 &&
                                sectionDailySubjects[session.sectionId][day].has(subCode)) {
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
                                // Apply assignment
                                periods.forEach(p => {
                                    const slotKey = `${day}-${p}`;
                                    teacherSchedule[teacher.id].add(slotKey);
                                    roomSchedule[room.name].add(slotKey);
                                    sectionSchedule[session.sectionId].add(slotKey);
                                    if (session.duration === 1) {
                                        sectionDailySubjects[session.sectionId][day].add(subCode);
                                    }
                                });
                                teacherWeeklyHours[teacher.id] = (teacherWeeklyHours[teacher.id] || 0) + session.duration;

                                const sessionSlots = periods.map(p => ({
                                    id: `${session.sectionId}-${day}-${p}`,
                                    day,
                                    period: p,
                                    sectionId: session.sectionId,
                                    subjectCode: subCode,
                                    teacherId: teacher.id,
                                    backupTeacherId: null,
                                    roomName: room.name,
                                    isSubstituted: false,
                                    originalTeacherId: teacher.id,
                                    currentTeacherId: teacher.id
                                }));
                                scheduledSlots.push(...sessionSlots);

                                if (solve(index + 1)) return true;

                                // Backtrack
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
                                for (let i = 0; i < session.duration; i++) scheduledSlots.pop();
                            }
                        }
                    }
                }
            }
            return false;
        }

        const success = solve(0);

        if (!success) {
            console.warn("CSP Solver: unable to satisfy all constraints — attempting greedy fallback...");
            // Greedy fallback: schedule as many sessions as possible without backtracking
            this._greedyFallback(sessionsToSchedule, staff, effectiveRooms, sections, subjects,
                teacherSchedule, roomSchedule, sectionSchedule, sectionDailySubjects, teacherWeeklyHours, scheduledSlots);
        }

        // 4. Assign backup teachers
        scheduledSlots.forEach(slot => {
            const slotKey = `${slot.day}-${slot.period}`;

            let backups = staff.filter(t =>
                t.id !== slot.teacherId &&
                !t.isAbsent &&
                !teacherSchedule[t.id].has(slotKey) &&
                (t.subjects.includes(slot.subjectCode) || t.dept === slot.sectionId.split('-')[0])
            );

            if (!backups.length) {
                // Fallback: any free teacher from same dept
                const deptCode = slot.sectionId.split('-')[0];
                backups = staff.filter(t =>
                    t.id !== slot.teacherId &&
                    !t.isAbsent &&
                    !teacherSchedule[t.id].has(slotKey) &&
                    t.dept === deptCode
                );
            }

            if (backups.length > 0) {
                backups.sort((a, b) => (teacherWeeklyHours[a.id] || 0) - (teacherWeeklyHours[b.id] || 0));
                slot.backupTeacherId = backups[0].id;
            } else {
                slot.backupTeacherId = null;
            }
        });

        DataStore.saveSchedule(scheduledSlots);
        return { success: scheduledSlots.length > 0, schedule: scheduledSlots };
    },

    // ── Greedy Fallback: schedule as many as possible without full backtracking ─
    _greedyFallback(sessions, staff, rooms, sections, subjects,
        teacherSchedule, roomSchedule, sectionSchedule, sectionDailySubjects, teacherWeeklyHours, scheduledSlots) {

        sessions.forEach(session => {
            const subCode = session.subjectCode;
            let qualifiedTeachers = staff.filter(t =>
                !t.isAbsent &&
                (t.subjects.includes(subCode) || t.dept === session.dept || t.subjects.length === 0)
            ).sort((a, b) => (teacherWeeklyHours[a.id] || 0) - (teacherWeeklyHours[b.id] || 0));

            let labRooms = rooms.filter(r => session.type === "Practical/Lab" ? r.type === "Lab" : r.type === "Classroom");
            if (!labRooms.length) labRooms = rooms;

            let placed = false;
            for (const teacher of qualifiedTeachers) {
                if (placed) break;
                if ((teacherWeeklyHours[teacher.id] || 0) + session.duration > teacher.maxHoursPerWeek) continue;
                for (const room of labRooms) {
                    if (placed) break;
                    for (const day of WORKING_DAYS) {
                        if (placed) break;
                        const periodChoices = session.duration === 2 ? [[0,1],[2,3],[5,6]] : [[0],[1],[2],[3],[4],[5],[6],[7]];
                        for (const periods of periodChoices) {
                            let fits = true;
                            if (session.duration === 1 && sectionDailySubjects[session.sectionId][day].has(subCode)) fits = false;
                            for (const p of periods) {
                                const k = `${day}-${p}`;
                                if (teacherSchedule[teacher.id].has(k) || roomSchedule[room.name].has(k) || sectionSchedule[session.sectionId].has(k)) {
                                    fits = false; break;
                                }
                            }
                            if (fits) {
                                periods.forEach(p => {
                                    const k = `${day}-${p}`;
                                    teacherSchedule[teacher.id].add(k);
                                    roomSchedule[room.name].add(k);
                                    sectionSchedule[session.sectionId].add(k);
                                    if (session.duration === 1) sectionDailySubjects[session.sectionId][day].add(subCode);
                                });
                                teacherWeeklyHours[teacher.id] = (teacherWeeklyHours[teacher.id] || 0) + session.duration;
                                periods.forEach(p => scheduledSlots.push({
                                    id: `${session.sectionId}-${day}-${p}`,
                                    day, period: p,
                                    sectionId: session.sectionId,
                                    subjectCode: subCode,
                                    teacherId: teacher.id,
                                    backupTeacherId: null,
                                    roomName: room.name,
                                    isSubstituted: false,
                                    originalTeacherId: teacher.id,
                                    currentTeacherId: teacher.id
                                }));
                                placed = true; break;
                            }
                        }
                    }
                }
            }
        });
    },

    // ── Auto-create rooms if uploaded data has none ───────────────────────────
    _ensureRoomsExist(rooms, sections, subjects) {
        if (rooms && rooms.length > 0) return rooms;

        // Generate a basic set of classrooms and labs from section departments
        const depts = [...new Set(sections.map(s => s.dept))];
        const autoRooms = [];
        let roomNum = 101;

        // Classrooms (shared)
        for (let i = 0; i < Math.max(3, sections.length); i++) {
            autoRooms.push({ name: `Room ${roomNum++}`, type: 'Classroom', capacity: 60, dept: 'All' });
        }

        // One lab per department that has Practical/Lab subjects
        depts.forEach(dept => {
            const hasLab = subjects.some(s => s.dept === dept && s.type === 'Practical/Lab');
            if (hasLab) {
                autoRooms.push({ name: `${dept} Lab`, type: 'Lab', capacity: 40, dept });
            }
        });

        DataStore.saveRooms(autoRooms);
        return autoRooms;
    },

    // ── Validate manual slot adjustments ─────────────────────────────────────
    validateSchedule(schedule) {
        const errors = [];
        const teacherSlots = {};
        const roomSlots    = {};
        const sectionSlots = {};

        schedule.forEach(slot => {
            const slotKey = `${slot.day}-${slot.period}`;

            if (slot.currentTeacherId) {
                if (!teacherSlots[slot.currentTeacherId]) teacherSlots[slot.currentTeacherId] = [];
                if (teacherSlots[slot.currentTeacherId].includes(slotKey)) {
                    const t = DataStore.getStaff().find(s => s.id === slot.currentTeacherId);
                    errors.push(`Staff Conflict: ${t ? t.name : slot.currentTeacherId} is double-booked on ${slot.day} Period ${slot.period + 1}.`);
                }
                teacherSlots[slot.currentTeacherId].push(slotKey);
            }

            if (slot.roomName) {
                if (!roomSlots[slot.roomName]) roomSlots[slot.roomName] = [];
                if (roomSlots[slot.roomName].includes(slotKey)) {
                    errors.push(`Room Conflict: ${slot.roomName} is double-booked on ${slot.day} Period ${slot.period + 1}.`);
                }
                roomSlots[slot.roomName].push(slotKey);
            }

            if (slot.sectionId) {
                if (!sectionSlots[slot.sectionId]) sectionSlots[slot.sectionId] = [];
                if (sectionSlots[slot.sectionId].includes(slotKey)) {
                    errors.push(`Section Conflict: Section ${slot.sectionId} has multiple classes on ${slot.day} Period ${slot.period + 1}.`);
                }
                sectionSlots[slot.sectionId].push(slotKey);
            }
        });

        return { hasConflict: errors.length > 0, errors };
    }
        return {
            hasConflict: errors.length > 0,
            errors: errors
        };
    }
};
