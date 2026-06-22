// College Timetable Management System - Application Controller

const app = {
    currentPanel: 'dashboard',
    charts: {},

    init() {
        // Initialize Lucide Icons
        lucide.createIcons();

        // Attach Nav events
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const panel = item.getAttribute('data-panel');
                this.switchView(panel);
            });
        });

        // Setup Event Listeners
        this.setupEventListeners();

        // Load data in directories
        this.renderAll();

        // Auto run generator if schedule is empty so dashboard works on first load
        const schedule = DataStore.getSchedule();
        if (schedule.length === 0) {
            TimetableGenerator.generate();
            this.renderAll();
        }

        // Draw initial charts
        this.initCharts();
    },

    switchView(panelId) {
        // Update menu active state
        document.querySelectorAll('.nav-item').forEach(item => {
            if (item.getAttribute('data-panel') === panelId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update panel display
        document.querySelectorAll('.panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById(`${panelId}-panel`).classList.add('active');

        // Set title
        const titles = {
            dashboard: "Dashboard Overview",
            generator: "Timetable Constraint Engine",
            staff: "Staff Directory",
            subjects: "Subjects & Practical Labs",
            absence: "Absence Control & Replacement System",
            reports: "Workload Reports & Analytics"
        };
        document.getElementById('current-panel-title').innerText = titles[panelId] || "College Timetable";

        this.currentPanel = panelId;

        // If switching to reports, update charts
        if (panelId === 'reports') {
            this.updateCharts();
        }

        // Re-render view to ensure clean state
        this.renderAll();
    },

    setupEventListeners() {
        // Dashboard generate button
        document.getElementById('dash-generate-btn').addEventListener('click', () => {
            this.simulateCSPGeneration();
        });

        // Generator panel generate button
        document.getElementById('generator-run-btn').addEventListener('click', () => {
            this.simulateCSPGeneration();
        });

        // Generator reset button
        document.getElementById('generator-reset-btn').addEventListener('click', () => {
            if (confirm("Are you sure you want to reset all staff, subjects, schedules, and logs to the original default seed data? This will clear any manual edits.")) {
                DataStore.resetAll();
                this.showToast("System reset to initial seeds.", "success");
                this.renderAll();
                this.updateCharts();
            }
        });

        // Filter dropdown views
        document.getElementById('filter-view-type').addEventListener('change', () => {
            this.populateFilterValues();
            this.renderTimetableGrid();
        });

        document.getElementById('filter-view-value').addEventListener('change', () => {
            this.renderTimetableGrid();
        });

        // Staff search
        document.getElementById('staff-search').addEventListener('input', (e) => {
            this.renderStaffTable(e.target.value);
        });

        // Subject search
        document.getElementById('subject-search').addEventListener('input', (e) => {
            this.renderSubjectTable(e.target.value);
        });

        // Add Staff Modal Trigger
        document.getElementById('add-staff-btn').addEventListener('click', () => {
            this.openStaffModal();
        });

        // Add Subject Modal Trigger
        document.getElementById('add-subject-btn').addEventListener('click', () => {
            this.openSubjectModal();
        });

        // Modal close buttons
        document.getElementById('staff-modal-close').addEventListener('click', () => this.closeModal('staff'));
        document.getElementById('staff-modal-cancel').addEventListener('click', () => this.closeModal('staff'));
        document.getElementById('subject-modal-close').addEventListener('click', () => this.closeModal('subject'));
        document.getElementById('subject-modal-cancel').addEventListener('click', () => this.closeModal('subject'));
        document.getElementById('slot-modal-close').addEventListener('click', () => this.closeModal('slot'));
        document.getElementById('slot-modal-cancel').addEventListener('click', () => this.closeModal('slot'));

        // Modal save actions
        document.getElementById('staff-modal-save').addEventListener('click', (e) => {
            e.preventDefault();
            this.saveStaffMember();
        });

        document.getElementById('subject-modal-save').addEventListener('click', (e) => {
            e.preventDefault();
            this.saveSubject();
        });

        document.getElementById('slot-modal-save').addEventListener('click', () => {
            this.saveSlotAdjustment();
        });

        // Trigger Absence action
        document.getElementById('trigger-absence-btn').addEventListener('click', () => {
            const select = document.getElementById('absent-staff-select');
            const teacherId = select.value;
            if (!teacherId) return;

            const res = AbsenceManager.markAbsent(teacherId);
            if (res.success) {
                const absentTeacherName = DataStore.getStaff().find(t => t.id === teacherId).name;
                this.showToast(`Reported Prof. ${absentTeacherName} absent. ${res.substitutedCount} classes subbed.`, "warning");
                this.renderAll();
                this.updateCharts();
            } else {
                this.showToast(res.message, "error");
            }
        });

        // Modal adjustment conflict listener
        document.getElementById('slot-form-teacher').addEventListener('change', () => this.validateModalSlot());
        document.getElementById('slot-form-backup').addEventListener('change', () => this.validateModalSlot());
        document.getElementById('slot-form-room').addEventListener('change', () => this.validateModalSlot());
    },

    renderAll() {
        this.renderStats();
        this.populateFilterValues();
        this.renderTimetableGrid();
        this.renderStaffTable();
        this.renderSubjectTable();
        this.renderAbsenceDropdowns();
        this.renderActiveAbsences();
        this.renderLogFeeds();
        lucide.createIcons();
    },

    renderStats() {
        const staff = DataStore.getStaff();
        const schedule = DataStore.getSchedule();
        const logs = DataStore.getSubLogs();

        // 1. Total Staff count
        document.getElementById('stat-total-staff').innerText = staff.length;

        // 2. Active class sessions scheduled
        document.getElementById('stat-active-classes').innerText = schedule.length;

        // 3. Backup Coverage Rate
        // Coverage is % of slots that have a backup teacher assigned
        const slotsWithBackup = schedule.filter(s => s.backupTeacherId !== null).length;
        const coverageRate = schedule.length > 0 ? Math.round((slotsWithBackup / schedule.length) * 100) : 0;
        document.getElementById('stat-backup-coverage').innerText = `${coverageRate}%`;

        // 4. Absences Handled
        // Count number of active absent teachers
        const absentCount = staff.filter(t => t.isAbsent).length;
        document.getElementById('stat-absences-handled').innerText = absentCount;

        // 5. Update checklist status
        const chkStatus = document.getElementById('chk-timetable-status');
        const chkText = document.getElementById('chk-timetable-text');
        const chkBackup = document.getElementById('chk-backup-status');
        const chkBackupText = document.getElementById('chk-backup-text');

        if (schedule.length > 0) {
            chkStatus.className = "checklist-item done";
            chkStatus.querySelector('i').setAttribute('data-lucide', 'check-circle-2');
            chkText.innerText = "Conflict-free Timetable successfully generated.";
            
            chkBackup.className = "checklist-item done";
            chkBackup.querySelector('i').setAttribute('data-lucide', 'check-circle-2');
            chkBackupText.innerText = `Backup staff coverage calculated: ${coverageRate}% coverage.`;
        } else {
            chkStatus.className = "checklist-item pending";
            chkStatus.querySelector('i').setAttribute('data-lucide', 'help-circle');
            chkText.innerText = "Timetable needs generation for the current semester.";

            chkBackup.className = "checklist-item pending";
            chkBackup.querySelector('i').setAttribute('data-lucide', 'help-circle');
            chkBackupText.innerText = "Backup staff allocations will be computed during generation.";
        }
    },

    populateFilterValues() {
        const viewType = document.getElementById('filter-view-type').value;
        const selectValue = document.getElementById('filter-view-value');
        const prevSelected = selectValue.value;
        
        selectValue.innerHTML = "";

        if (viewType === 'section') {
            const sections = DataStore.getSections();
            sections.forEach(sec => {
                const opt = document.createElement('option');
                opt.value = sec.id;
                opt.innerText = sec.name;
                selectValue.appendChild(opt);
            });
        } else if (viewType === 'teacher') {
            const staff = DataStore.getStaff();
            staff.forEach(s => {
                const opt = document.createElement('option');
                opt.value = s.id;
                opt.innerText = `${s.name} (${s.dept})`;
                selectValue.appendChild(opt);
            });
        } else if (viewType === 'room') {
            const rooms = DataStore.getRooms();
            rooms.forEach(r => {
                const opt = document.createElement('option');
                opt.value = r.name;
                opt.innerText = `${r.name} (${r.type})`;
                selectValue.appendChild(opt);
            });
        }

        // Restore selection if possible, otherwise default to first
        if (prevSelected && Array.from(selectValue.options).some(opt => opt.value === prevSelected)) {
            selectValue.value = prevSelected;
        }
    },

    renderTimetableGrid() {
        const viewType = document.getElementById('filter-view-type').value;
        const viewVal = document.getElementById('filter-view-value').value;
        const wrapper = document.getElementById('timetable-view-wrapper');

        if (!viewVal) {
            wrapper.innerHTML = `<p style="color: hsl(var(--text-muted)); text-align: center; margin-top: 40px;">No schedule generated. Click "Run CSP Generator" above.</p>`;
            return;
        }

        const schedule = DataStore.getSchedule();
        const staff = DataStore.getStaff();
        const subjects = DataStore.getSubjects();

        // Determine which set of slots to use for rendering
        const slotsToUse = (viewType === 'section') ? getSlotsForSection(viewVal) : OTHER_YEAR_SLOTS;

        // Setup wrapper layout
        wrapper.innerHTML = `
            <div class="timetable-container">
                <div class="timetable-grid">
                    <div class="grid-header">Slots</div>
                    ${WORKING_DAYS.map(day => `<div class="grid-header day-header">${day}</div>`).join('')}
                    
                    ${slotsToUse.map(slot => {
                        let timeText = slot.time;
                        if (viewType !== 'section') {
                            if (slot.period === 2) {
                                timeText = "10:20 - 11:10 (Y1)<br>10:35 - 11:25 (Y2+)";
                            } else if (slot.period === 4) {
                                timeText = "12:15 - 01:05 (Y1)<br>12:50 - 01:40 (Y2+)";
                            }
                        }
                        
                        let html = `<div class="time-col"><span>${slot.label}</span><span style="font-size:0.7rem; line-height:1.2; text-align:center; margin-top:4px;">${timeText}</span></div>`;
                        
                        WORKING_DAYS.forEach(day => {
                            // Find scheduled class for this slot
                            let match = null;

                            if (viewType === 'section') {
                                match = schedule.find(s => s.sectionId === viewVal && s.day === day && s.period === slot.period);
                            } else if (viewType === 'teacher') {
                                match = schedule.find(s => s.currentTeacherId === viewVal && s.day === day && s.period === slot.period);
                            } else if (viewType === 'room') {
                                match = schedule.find(s => s.roomName === viewVal && s.day === day && s.period === slot.period);
                            }

                            if (match) {
                                const sub = subjects.find(s => s.code === match.subjectCode);
                                const teacher = staff.find(t => t.id === match.teacherId);
                                const backup = staff.find(t => t.id === match.backupTeacherId);
                                const currentT = staff.find(t => t.id === match.currentTeacherId);

                                const isSubbed = match.isSubstituted;
                                const subClass = isSubbed ? 'substituted' : '';
                                
                                const backupText = backup ? `Backup: ${backup.name}` : 'Backup: None';
                                const teacherName = teacher ? teacher.name : match.teacherId;
                                const currentTeacherName = currentT ? currentT.name : match.currentTeacherId;

                                const indicatorColor = match.backupTeacherId ? 'green' : 'red';
                                const badgeTooltip = match.backupTeacherId ? 'Backup pre-allocated' : 'No free backup available!';
                                
                                // Fetch exact time range for this specific section's class
                                const exactTime = getSlotsForSection(match.sectionId)[match.period].time;

                                html += `
                                    <div class="schedule-cell ${subClass}" onclick="app.openSlotModal('${match.id}')">
                                        <div class="cell-subject">
                                            <span>${match.subjectCode}</span>
                                            <span class="cell-status-badge ${indicatorColor}" title="${badgeTooltip}"></span>
                                        </div>
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
                                            <span class="cell-room">${match.roomName}</span>
                                            <span style="font-size: 0.7rem; font-weight: 600; color: hsl(var(--text-muted));">${exactTime.split(' - ')[0]}</span>
                                            ${viewType !== 'section' ? `<span style="font-size: 0.7rem; font-weight: 700; color: hsl(var(--primary));">${match.sectionId}</span>` : ''}
                                        </div>
                                        <div class="cell-teachers">
                                            ${isSubbed 
                                                ? `<span class="cell-teacher">${teacherName}</span>
                                                   <span class="cell-substitute-name"><i data-lucide="refresh-cw" style="width: 10px; height: 10px; display: inline; vertical-align: middle;"></i> ${currentTeacherName}</span>`
                                                : `<span class="cell-teacher">${currentTeacherName}</span>`
                                            }
                                            <span class="cell-backup">${backupText}</span>
                                        </div>
                                    </div>
                                `;
                            } else {
                                html += `<div class="schedule-cell empty"></div>`;
                            }
                        });

                        return html;
                    }).join('')}
                </div>
            </div>
        `;
        lucide.createIcons();
    },

    renderStaffTable(query = "") {
        const tbody = document.getElementById('staff-table-body');
        tbody.innerHTML = "";

        const staff = DataStore.getStaff();
        const schedule = DataStore.getSchedule();

        const filteredStaff = staff.filter(s => {
            const nameMatch = s.name.toLowerCase().includes(query.toLowerCase());
            const deptMatch = s.dept.toLowerCase().includes(query.toLowerCase());
            return nameMatch || deptMatch;
        });

        filteredStaff.forEach(s => {
            // Calculate current weekly workload from schedule
            const assignedHours = schedule.filter(slot => slot.currentTeacherId === s.id).length;
            const percentageLoad = Math.min(Math.round((assignedHours / s.maxHoursPerWeek) * 100), 100);
            
            // Set progress bar colors
            let progressClass = 'tag-emerald';
            if (percentageLoad > 85) progressClass = 'tag-danger';
            else if (percentageLoad > 60) progressClass = 'tag-amber';

            const activeText = s.isAbsent ? "Absent" : "Active";
            const activeClass = s.isAbsent ? "tag-danger" : "tag-emerald";

            const statusText = s.isAbsent ? "Absent" : "Present";
            const statusClass = s.isAbsent ? "tag-danger" : "tag-emerald";

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${s.id}</strong></td>
                <td>${s.name}</td>
                <td><span class="tag tag-indigo">${s.dept}</span></td>
                <td>${s.email}</td>
                <td>${s.subjects.map(sub => `<code style="background-color: hsl(var(--bg-surface-elevated)); padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; margin-right: 4px;">${sub}</code>`).join('')}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span class="tag ${progressClass}">${assignedHours} / ${s.maxHoursPerWeek} hrs</span>
                    </div>
                </td>
                <td><span class="tag ${statusClass}">${statusText}</span></td>
                <td>
                    <button class="btn btn-secondary ${s.isAbsent ? 'btn-danger' : ''}" style="padding: 4px 10px; font-size: 0.75rem;" onclick="app.toggleStaffAttendance('${s.id}')">
                        ${s.isAbsent ? 'Mark Present' : 'Simulate Absence'}
                    </button>
                </td>
                <td>
                    <div style="display: flex; gap: 8px;">
                        <button class="btn btn-secondary" style="padding: 4px 8px;" onclick="app.openStaffModal('${s.id}')"><i data-lucide="edit" style="width: 14px; height: 14px;"></i></button>
                        <button class="btn btn-danger" style="padding: 4px 8px; background-color: hsl(var(--danger) / 0.1);" onclick="app.deleteStaff('${s.id}')"><i data-lucide="trash-2" style="width: 14px; height: 14px;"></i></button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
        lucide.createIcons();
    },

    renderSubjectTable(query = "") {
        const tbody = document.getElementById('subject-table-body');
        tbody.innerHTML = "";

        const subjects = DataStore.getSubjects();

        const filteredSubjects = subjects.filter(s => {
            return s.code.toLowerCase().includes(query.toLowerCase()) || s.name.toLowerCase().includes(query.toLowerCase());
        });

        filteredSubjects.forEach(s => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${s.code}</strong></td>
                <td>${s.name}</td>
                <td><span class="tag tag-indigo">${s.dept}</span></td>
                <td><span class="tag ${s.type === 'Theory' ? 'tag-emerald' : 'tag-amber'}">${s.type}</span></td>
                <td>${s.hoursPerWeek} hours</td>
                <td>
                    <button class="btn btn-danger" style="padding: 4px 8px; background-color: hsl(var(--danger) / 0.1);" onclick="app.deleteSubject('${s.code}')"><i data-lucide="trash-2" style="width: 14px; height: 14px;"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        lucide.createIcons();
    },

    renderAbsenceDropdowns() {
        const select = document.getElementById('absent-staff-select');
        select.innerHTML = `<option value="">-- Choose Staff Member --</option>`;

        const staff = DataStore.getStaff();
        // filter out already absent
        const activeStaff = staff.filter(t => !t.isAbsent);

        activeStaff.sort((a,b) => a.name.localeCompare(b.name));

        activeStaff.forEach(t => {
            const opt = document.createElement('option');
            opt.value = t.id;
            opt.innerText = `${t.name} (${t.dept})`;
            select.appendChild(opt);
        });
    },

    renderActiveAbsences() {
        const body = document.getElementById('active-absences-table-body');
        const listDiv = document.getElementById('active-absences-list');
        body.innerHTML = "";
        listDiv.innerHTML = "";

        const staff = DataStore.getStaff();
        const absentStaff = staff.filter(t => t.isAbsent);

        if (absentStaff.length === 0) {
            body.innerHTML = `<tr><td colspan="5" style="text-align: center; color: hsl(var(--text-muted)); font-style: italic;">No active absences reported today.</td></tr>`;
            listDiv.innerHTML = `<p style="color: hsl(var(--text-muted)); font-style: italic; font-size: 0.85rem;">No active absences reported today.</p>`;
            return;
        }

        absentStaff.forEach(t => {
            // Render directory table row
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${t.id}</strong></td>
                <td>${t.name}</td>
                <td><span class="tag tag-indigo">${t.dept}</span></td>
                <td>${t.email}</td>
                <td>
                    <button class="btn btn-primary" style="padding: 4px 10px; font-size: 0.75rem; background: hsl(var(--success));" onclick="app.toggleStaffAttendance('${t.id}')">
                        Mark Present
                    </button>
                </td>
            `;
            body.appendChild(tr);

            // Render Dashboard card line
            const cardItem = document.createElement('div');
            cardItem.style.cssText = "display: flex; justify-content: space-between; align-items: center; background-color: hsl(var(--danger) / 0.05); padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid hsl(var(--danger) / 0.15);";
            cardItem.innerHTML = `
                <div>
                    <span style="font-weight:600; font-size:0.85rem;">${t.name}</span>
                    <span class="tag tag-danger" style="margin-left: 8px; font-size: 0.65rem; padding: 2px 6px;">ABSENT</span>
                </div>
                <button class="btn btn-secondary" style="padding: 2px 6px; font-size: 0.7rem;" onclick="app.toggleStaffAttendance('${t.id}')">Mark Present</button>
            `;
            listDiv.appendChild(cardItem);
        });
    },

    renderLogFeeds() {
        const dashFeed = document.getElementById('dash-log-feed');
        const absFeed = document.getElementById('absence-log-feed');

        const logs = DataStore.getSubLogs();

        if (logs.length === 0) {
            const emptyText = `<p style="color: hsl(var(--text-muted)); font-style: italic; font-size: 0.85rem; text-align: center; margin-top: 40px;">No substitution activities registered.</p>`;
            dashFeed.innerHTML = emptyText;
            absFeed.innerHTML = emptyText;
            return;
        }

        const buildLogsHtml = (logsList) => {
            return logsList.map(log => {
                const isCrit = log.status === 'Critical Alert';
                const isRestore = log.status === 'Restored';
                const critClass = isCrit ? 'critical' : (isRestore ? 'restored' : '');
                const badgeClass = isCrit ? 'critical' : (isRestore ? 'restored' : 'success');

                let title = "";
                let desc = "";

                if (isRestore) {
                    title = `Prof. ${log.absentTeacherName} Returned`;
                    desc = log.details;
                } else if (isCrit) {
                    title = `CRITICAL ASSIGNMENT FAILURE`;
                    desc = `No backup staff could be assigned for ${log.absentTeacherName} teaching <strong>${log.subjectCode}</strong> to Section ${log.sectionId} in ${log.roomName} (${log.day} Period ${log.period+1}).`;
                } else {
                    title = `Substitution: CS Section ${log.sectionId}`;
                    desc = `Prof. <strong>${log.replacementTeacherName}</strong> teaching ${log.subjectCode} in ${log.roomName} (substituted for ${log.absentTeacherName}).`;
                }

                return `
                    <div class="log-item ${critClass}">
                        <div class="log-meta">
                            <span>${log.day !== "N/A" ? `${log.day} Period ${log.period+1}` : "System Event"}</span>
                            <span>${log.timestamp}</span>
                        </div>
                        <div class="log-title">${title}</div>
                        <div class="log-desc">${desc}</div>
                        ${!isRestore ? `
                            <div class="notification-sim">
                                <h4>Triggered Communication</h4>
                                ${log.notifications.map(n => `<p><i data-lucide="send" style="width:10px; height:10px; display:inline;"></i> ${n}</p>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                `;
            }).join('');
        };

        const html = buildLogsHtml(logs);
        dashFeed.innerHTML = html;
        absFeed.innerHTML = html;
        lucide.createIcons();
    },

    toggleStaffAttendance(staffId) {
        const staff = DataStore.getStaff();
        const teacher = staff.find(t => t.id === staffId);
        if (!teacher) return;

        if (teacher.isAbsent) {
            // Mark active
            const res = AbsenceManager.markPresent(staffId);
            if (res.success) {
                this.showToast(`Prof. ${teacher.name} is back. Restored ${res.restoredCount} slots.`, "success");
            }
        } else {
            // Mark absent
            const res = AbsenceManager.markAbsent(staffId);
            if (res.success) {
                this.showToast(`Reported Prof. ${teacher.name} absent. substituted ${res.substitutedCount} classes.`, "warning");
            }
        }
        this.renderAll();
        this.updateCharts();
    },

    deleteStaff(staffId) {
        if (confirm("Are you sure you want to remove this staff member? This will clear them from timetables and preferences.")) {
            let staff = DataStore.getStaff();
            staff = staff.filter(s => s.id !== staffId);
            DataStore.saveStaff(staff);

            // Re-run scheduler to clear conflicts
            TimetableGenerator.generate();
            this.showToast("Staff deleted and timetables updated.", "success");
            this.renderAll();
            this.updateCharts();
        }
    },

    deleteSubject(code) {
        if (confirm("Are you sure you want to delete this subject?")) {
            let subjects = DataStore.getSubjects();
            subjects = subjects.filter(s => s.code !== code);
            DataStore.saveSubjects(subjects);
            
            // Re-run scheduler
            TimetableGenerator.generate();
            this.showToast("Subject deleted. Timetable regenerated.", "success");
            this.renderAll();
            this.updateCharts();
        }
    },

    // STAFF MODAL OPERATIONS
    openStaffModal(staffId = null) {
        const overlay = document.getElementById('staff-modal-overlay');
        const form = document.getElementById('staff-form');
        const idField = document.getElementById('staff-form-id');
        const hiddenIdField = document.getElementById('staff-form-id-field');
        const nameField = document.getElementById('staff-form-name');
        const deptField = document.getElementById('staff-form-dept');
        const hoursField = document.getElementById('staff-form-hours');
        const emailField = document.getElementById('staff-form-email');
        const subjectsContainer = document.getElementById('staff-form-subjects-container');

        form.reset();

        // Load subjects checklist
        const subjects = DataStore.getSubjects();
        subjectsContainer.innerHTML = subjects.map(sub => `
            <label class="checkbox-label">
                <input type="checkbox" name="expertise" value="${sub.code}">
                <span>${sub.code} - ${sub.name}</span>
            </label>
        `).join('');

        if (staffId) {
            // Edit Mode
            document.getElementById('staff-modal-title').innerText = "Edit Staff Member";
            idField.disabled = true;

            const staff = DataStore.getStaff();
            const member = staff.find(s => s.id === staffId);
            
            if (member) {
                hiddenIdField.value = member.id;
                idField.value = member.id;
                nameField.value = member.name;
                deptField.value = member.dept;
                hoursField.value = member.maxHoursPerWeek;
                emailField.value = member.email;

                // Check their expertise checkboxes
                document.querySelectorAll('input[name="expertise"]').forEach(cb => {
                    if (member.subjects.includes(cb.value)) {
                        cb.checked = true;
                    }
                });
            }
        } else {
            // Create Mode
            document.getElementById('staff-modal-title').innerText = "Add New Staff Member";
            idField.disabled = false;
            hiddenIdField.value = "";
            
            // Auto generate staff ID
            const staff = DataStore.getStaff();
            const maxNum = staff.reduce((max, s) => {
                const num = parseInt(s.id.replace('ST', ''));
                return num > max ? num : max;
            }, 0);
            idField.value = `ST${String(maxNum + 1).padStart(3, '0')}`;
        }

        overlay.classList.add('active');
    },

    saveStaffMember() {
        const idField = document.getElementById('staff-form-id');
        const hiddenId = document.getElementById('staff-form-id-field').value;
        const name = document.getElementById('staff-form-name').value;
        const dept = document.getElementById('staff-form-dept').value;
        const hours = parseInt(document.getElementById('staff-form-hours').value);
        const email = document.getElementById('staff-form-email').value;

        const expertise = Array.from(document.querySelectorAll('input[name="expertise"]:checked')).map(cb => cb.value);

        if (!name || !email) {
            this.showToast("Please fill in all required fields.", "error");
            return;
        }

        let staff = DataStore.getStaff();

        if (hiddenId) {
            // Update
            const idx = staff.findIndex(s => s.id === hiddenId);
            if (idx !== -1) {
                staff[idx].name = name;
                staff[idx].dept = dept;
                staff[idx].maxHoursPerWeek = hours;
                staff[idx].email = email;
                staff[idx].subjects = expertise;
            }
        } else {
            // Create
            if (staff.some(s => s.id === idField.value)) {
                this.showToast("Staff ID already exists.", "error");
                return;
            }
            staff.push({
                id: idField.value,
                name: name,
                dept: dept,
                email: email,
                subjects: expertise,
                maxHoursPerWeek: hours,
                isAbsent: false
            });
        }

        DataStore.saveStaff(staff);
        this.closeModal('staff');
        this.showToast("Staff record updated successfully.", "success");
        
        // Re-run scheduler to incorporate changes
        TimetableGenerator.generate();
        this.renderAll();
        this.updateCharts();
    },

    // SUBJECT MODAL OPERATIONS
    openSubjectModal() {
        const overlay = document.getElementById('subject-modal-overlay');
        const form = document.getElementById('subject-form');
        form.reset();
        overlay.classList.add('active');
    },

    saveSubject() {
        const code = document.getElementById('subject-form-code').value;
        const name = document.getElementById('subject-form-name').value;
        const dept = document.getElementById('subject-form-dept').value;
        const type = document.getElementById('subject-form-type').value;
        const hours = parseInt(document.getElementById('subject-form-hours').value);

        if (!code || !name) {
            this.showToast("Please fill in all required fields.", "error");
            return;
        }

        const subjects = DataStore.getSubjects();
        if (subjects.some(s => s.code === code)) {
            this.showToast("Subject code already exists.", "error");
            return;
        }

        subjects.push({
            code: code,
            name: name,
            dept: dept,
            type: type,
            hoursPerWeek: hours
        });

        DataStore.saveSubjects(subjects);
        this.closeModal('subject');
        this.showToast("Subject added. Timetables updated.", "success");

        // Re-run scheduler
        TimetableGenerator.generate();
        this.renderAll();
        this.updateCharts();
    },

    // SLOT MANUAL EDITOR MODAL
    openSlotModal(slotId) {
        const schedule = DataStore.getSchedule();
        const slot = schedule.find(s => s.id === slotId);
        if (!slot) return;

        const overlay = document.getElementById('slot-modal-overlay');
        document.getElementById('slot-form-id').value = slotId;

        // Display description
        const sub = DataStore.getSubjects().find(s => s.code === slot.subjectCode);
        document.getElementById('slot-info-summary').innerHTML = `${slot.sectionId} - ${slot.subjectCode} (${sub ? sub.name : ''})<br>${slot.day} - Period ${slot.period + 1}`;

        // Populate dropdowns
        const staff = DataStore.getStaff();
        const rooms = DataStore.getRooms();

        const tSelect = document.getElementById('slot-form-teacher');
        const bSelect = document.getElementById('slot-form-backup');
        const rSelect = document.getElementById('slot-form-room');

        tSelect.innerHTML = "";
        bSelect.innerHTML = `<option value="">-- No Backup Assigned --</option>`;
        rSelect.innerHTML = "";

        // Fill primary teacher: filter by those qualified for this subject
        const qualifiedT = staff.filter(t => t.subjects.includes(slot.subjectCode) && !t.isAbsent);
        qualifiedT.forEach(t => {
            const opt = document.createElement('option');
            opt.value = t.id;
            opt.innerText = `${t.name} (${t.dept})`;
            tSelect.appendChild(opt);
        });
        tSelect.value = slot.currentTeacherId;

        // Fill backup teacher: all qualified teachers (including absent ones, though we flag conflicts)
        const qualifiedB = staff.filter(t => t.subjects.includes(slot.subjectCode));
        qualifiedB.forEach(t => {
            if (t.id !== tSelect.value) {
                const opt = document.createElement('option');
                opt.value = t.id;
                opt.innerText = `${t.name} (${t.dept})`;
                bSelect.appendChild(opt);
            }
        });
        bSelect.value = slot.backupTeacherId || "";

        // Fill rooms: filter by type match (classroom vs lab)
        const matchedRooms = rooms.filter(r => {
            if (sub && sub.type === "Practical/Lab") {
                return r.type === "Lab";
            }
            return r.type === "Classroom";
        });
        matchedRooms.forEach(r => {
            const opt = document.createElement('option');
            opt.value = r.name;
            opt.innerText = r.name;
            rSelect.appendChild(opt);
        });
        rSelect.value = slot.roomName;

        overlay.classList.add('active');
        this.validateModalSlot(); // Run conflict checking inside modal
    },

    validateModalSlot() {
        const slotId = document.getElementById('slot-form-id').value;
        const teacherId = document.getElementById('slot-form-teacher').value;
        const backupId = document.getElementById('slot-form-backup').value;
        const roomName = document.getElementById('slot-form-room').value;

        const schedule = JSON.parse(JSON.stringify(DataStore.getSchedule()));
        const slot = schedule.find(s => s.id === slotId);
        if (!slot) return;

        // Apply temporary modifications for testing
        slot.currentTeacherId = teacherId;
        slot.backupTeacherId = backupId || null;
        slot.roomName = roomName;

        const warningDiv = document.getElementById('modal-conflict-warnings');
        warningDiv.innerHTML = "";

        const staff = DataStore.getStaff();
        
        // Check if teacher is absent
        const primaryTeacher = staff.find(t => t.id === teacherId);
        if (primaryTeacher && primaryTeacher.isAbsent) {
            this.appendWarning(warningDiv, `Warning: Prof. ${primaryTeacher.name} is reported absent. Substitution will be active.`, 'amber');
        }

        const backupTeacher = staff.find(t => t.id === backupId);
        if (backupTeacher && backupTeacher.isAbsent) {
            this.appendWarning(warningDiv, `Warning: Backup Prof. ${backupTeacher.name} is reported absent!`, 'danger');
        }

        // Run full collision matrix validator
        const check = TimetableGenerator.validateSchedule(schedule);

        if (check.hasConflict) {
            check.errors.forEach(err => {
                this.appendWarning(warningDiv, err, 'danger');
            });
        } else {
            this.appendWarning(warningDiv, "All clear! No schedule double-bookings detected.", 'emerald');
        }
    },

    appendWarning(container, msg, severity) {
        const item = document.createElement('div');
        let style = "";
        let icon = "check-circle-2";

        if (severity === 'danger') {
            style = "color: hsl(var(--danger)); background-color: hsl(var(--danger) / 0.08); border-left: 3px solid hsl(var(--danger));";
            icon = "alert-octagon";
        } else if (severity === 'amber') {
            style = "color: hsl(var(--warning)); background-color: hsl(var(--warning) / 0.08); border-left: 3px solid hsl(var(--warning));";
            icon = "alert-triangle";
        } else {
            style = "color: hsl(var(--success)); background-color: hsl(var(--success) / 0.08); border-left: 3px solid hsl(var(--success));";
            icon = "check-circle-2";
        }

        item.style.cssText = `padding: 6px 12px; border-radius: 4px; font-size: 0.8rem; display: flex; align-items: center; gap: 8px; ${style}`;
        item.innerHTML = `<i data-lucide="${icon}" style="width: 14px; height: 14px; flex-shrink:0;"></i> <span>${msg}</span>`;
        container.appendChild(item);
        lucide.createIcons();
    },

    saveSlotAdjustment() {
        const slotId = document.getElementById('slot-form-id').value;
        const teacherId = document.getElementById('slot-form-teacher').value;
        const backupId = document.getElementById('slot-form-backup').value;
        const roomName = document.getElementById('slot-form-room').value;

        const schedule = DataStore.getSchedule();
        const slot = schedule.find(s => s.id === slotId);
        if (!slot) return;

        // Apply changes
        slot.currentTeacherId = teacherId;
        slot.originalTeacherId = teacherId; // Reset substitution baseline
        slot.backupTeacherId = backupId || null;
        slot.roomName = roomName;
        slot.isSubstituted = false;

        DataStore.saveSchedule(schedule);
        this.closeModal('slot');
        this.showToast("Timetable slot adjustment saved.", "success");
        this.renderAll();
        this.updateCharts();
    },

    closeModal(type) {
        const overlay = document.getElementById(`${type}-modal-overlay`);
        overlay.classList.remove('active');
    },

    simulateCSPGeneration() {
        // Create full screen glassmorphic loading overlay
        const loadingOverlay = document.createElement('div');
        loadingOverlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background-color: rgba(6, 9, 15, 0.9); backdrop-filter: blur(15px);
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            z-index: 9999; color: white; transition: opacity 0.5s ease;
        `;

        loadingOverlay.innerHTML = `
            <div style="text-align: center; max-width: 400px; padding: 40px; border-radius: var(--radius-lg); background-color: hsl(var(--bg-surface)); border: 1px solid hsl(var(--border-color)); box-shadow: 0 20px 50px rgba(0,0,0,0.6);">
                <div class="brand-icon" style="margin: 0 auto 24px; animation: spin 2s linear infinite;">
                    <i data-lucide="loader" style="width:28px; height:28px;"></i>
                </div>
                <h3 style="font-family: var(--font-heading); font-size: 1.25rem; margin-bottom: 12px;">Constraint Satisfaction Engine</h3>
                <div style="background-color: hsl(var(--bg-base)); border: 1px solid hsl(var(--border-color)); border-radius: 20px; overflow: hidden; height: 8px; width: 100%; margin-bottom: 16px;">
                    <div id="csp-progress-bar" style="height:100%; width: 0%; background: linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary))); transition: width 0.1s linear;"></div>
                </div>
                <p id="csp-status-text" style="font-size: 0.8rem; color: hsl(var(--text-muted)); min-height: 24px;">Initializing solver state...</p>
            </div>
        `;
        document.body.appendChild(loadingOverlay);
        lucide.createIcons();

        const statusSteps = [
            { text: "Loading staff expertise matrices...", progress: 15 },
            { text: "Checking room capability constraints...", progress: 30 },
            { text: "Resolving class section double-booking vectors...", progress: 50 },
            { text: "Assigning qualified primary teachers...", progress: 70 },
            { text: "Calculating backup staff assignments...", progress: 85 },
            { text: "Verifying global schedules...", progress: 95 },
            { text: "Timetable generated! Writing to database...", progress: 100 }
        ];

        let currentStep = 0;
        const progressEl = document.getElementById('csp-progress-bar');
        const textEl = document.getElementById('csp-status-text');

        const interval = setInterval(() => {
            if (currentStep < statusSteps.length) {
                const step = statusSteps[currentStep];
                progressEl.style.width = `${step.progress}%`;
                textEl.innerText = step.text;
                currentStep++;
            } else {
                clearInterval(interval);
                
                // Run CSP algorithm
                const res = TimetableGenerator.generate();
                
                setTimeout(() => {
                    // Remove loader
                    loadingOverlay.style.opacity = 0;
                    setTimeout(() => {
                        loadingOverlay.remove();
                        if (res.success) {
                            app.showToast("100% Conflict-free Timetable Generated in 1.4s!", "success");
                            app.renderAll();
                            app.updateCharts();
                        } else {
                            app.showToast("Error generating timetable. Constraint conflict found.", "error");
                        }
                    }, 500);
                }, 300);
            }
        }, 250);
    },

    // TOAST NOTIFICATIONS
    showToast(message, type = "info") {
        const container = document.getElementById('toast-container');
        
        const toast = document.createElement('div');
        toast.className = `alert-banner ${type}`;
        
        let icon = "info";
        if (type === "success") icon = "check-circle";
        else if (type === "error" || type === "warning") icon = "alert-triangle";

        toast.innerHTML = `
            <i data-lucide="${icon}" style="width: 18px; height: 18px;"></i>
            <span style="font-size: 0.85rem; font-weight: 500;">${message}</span>
        `;
        
        container.appendChild(toast);
        lucide.createIcons();

        setTimeout(() => {
            toast.style.opacity = 0;
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 4000);
    },

    // CHARTS & REPORTS
    initCharts() {
        const workloadCtx = document.getElementById('workloadChart').getContext('2d');
        const coverageCtx = document.getElementById('coverageChart').getContext('2d');

        // Styles for charts matching dark theme HSL colors
        Chart.defaults.color = 'rgba(248, 250, 252, 0.6)'; // text-secondary
        Chart.defaults.font.family = 'Inter';

        this.charts.workload = new Chart(workloadCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Assigned Hours',
                        data: [],
                        backgroundColor: 'rgba(99, 102, 241, 0.75)', // indigo
                        borderColor: 'rgb(99, 102, 241)',
                        borderWidth: 1,
                        borderRadius: 4
                    },
                    {
                        label: 'Max Load Limit',
                        data: [],
                        backgroundColor: 'rgba(168, 85, 247, 0.2)', // violet
                        borderColor: 'rgb(168, 85, 247)',
                        borderWidth: 1,
                        borderRadius: 4,
                        borderDash: [4, 4]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: { color: 'rgba(51, 65, 85, 0.2)' }
                    },
                    y: {
                        grid: { color: 'rgba(51, 65, 85, 0.2)' },
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: { display: true, position: 'top' }
                }
            }
        });

        this.charts.coverage = new Chart(coverageCtx, {
            type: 'doughnut',
            data: {
                labels: ['Regular Handover', 'Substituted Classes', 'Unassigned (Alerts)'],
                datasets: [{
                    data: [0, 0, 0],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.8)', // emerald
                        'rgba(245, 158, 11, 0.8)', // amber
                        'rgba(239, 68, 68, 0.8)'   // red
                    ],
                    borderWidth: 1,
                    borderColor: 'rgb(15, 23, 42)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, position: 'right' }
                }
            }
        });

        this.updateCharts();
    },

    updateCharts() {
        if (!this.charts.workload || !this.charts.coverage) return;

        const staff = DataStore.getStaff();
        const schedule = DataStore.getSchedule();

        // 1. Update Workload Chart
        // Sort staff by workload percentage to show a clean ranking
        const staffHours = staff.map(s => {
            const assigned = schedule.filter(slot => slot.currentTeacherId === s.id).length;
            return {
                name: s.name.replace(/Dr\.|Prof\.|Mr\.|Mrs\./g, '').trim(),
                assigned: assigned,
                max: s.maxHoursPerWeek
            };
        });

        staffHours.sort((a,b) => b.assigned - a.assigned);

        // Slice top 12 to make chart legible
        const chartStaff = staffHours.slice(0, 12);

        this.charts.workload.data.labels = chartStaff.map(s => s.name);
        this.charts.workload.data.datasets[0].data = chartStaff.map(s => s.assigned);
        this.charts.workload.data.datasets[1].data = chartStaff.map(s => s.max);
        this.charts.workload.update();

        // 2. Update Coverage Chart
        const total = schedule.length;
        const subbed = schedule.filter(s => s.isSubstituted).length;
        // Count unassigned backups (meaning backup is null AND teacher is absent)
        const unassigned = schedule.filter(s => {
            const t = staff.find(t => t.id === s.currentTeacherId);
            return s.backupTeacherId === null && t && t.isAbsent;
        }).length;

        const regular = total - subbed - unassigned;

        this.charts.coverage.data.datasets[0].data = [
            regular >= 0 ? regular : 0,
            subbed,
            unassigned
        ];
        this.charts.coverage.update();
    }
};

// Start application when window loads
window.addEventListener('DOMContentLoaded', () => {
    app.init();
});
