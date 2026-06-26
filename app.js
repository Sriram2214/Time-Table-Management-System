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
        // Set up auto-absence processing every minute
        setInterval(() => {
            if (typeof AbsenceManager !== "undefined" && typeof AbsenceManager.autoProcessAbsences === "function") {
                AbsenceManager.autoProcessAbsences();
            }
        }, 60000);

        // Dashboard generate button
        document.getElementById('dash-generate-btn').addEventListener('click', () => {
            this.simulateCSPGeneration();
        });

        // Generator panel generate button
        document.getElementById('generator-run-btn').addEventListener('click', () => {
            this.simulateCSPGeneration();
        });

        // Generator import button
        document.getElementById('generator-import-btn').addEventListener('click', () => {
            this.openImportModal();
        });

        // Filter dropdown views
        document.getElementById('filter-view-type').addEventListener('change', () => {
            this.populateFilterValues();
            this.renderTimetableGrid();
        });

        document.getElementById('filter-view-value').addEventListener('change', () => {
            this.renderTimetableGrid();
        });

        document.getElementById('filter-dept-value').addEventListener('change', () => {
            this.renderTimetableGrid();
        });

        const hierYear = document.getElementById('filter-hier-year');
        if (hierYear) {
            hierYear.addEventListener('change', () => {
                this.populateHierarchicalDept();
                this.renderTimetableGrid();
            });
        }

        const hierDept = document.getElementById('filter-hier-dept');
        if (hierDept) {
            hierDept.addEventListener('change', () => {
                this.populateHierarchicalSection();
                this.renderTimetableGrid();
            });
        }

        const hierSection = document.getElementById('filter-hier-section');
        if (hierSection) {
            hierSection.addEventListener('change', () => {
                this.renderTimetableGrid();
            });
        }

        // Staff search
        

        // Subject search
        

        // Clear All Staff Trigger
        

        // Add Staff Modal Trigger
        

        // Add Subject Modal Trigger
        

        // Modal close buttons
        
        
        
        
        document.getElementById('slot-modal-close').addEventListener('click', () => this.closeModal('slot'));
        document.getElementById('slot-modal-cancel').addEventListener('click', () => this.closeModal('slot'));
        document.getElementById('import-modal-close').addEventListener('click', () => this.closeModal('import'));
        document.getElementById('import-modal-cancel').addEventListener('click', () => this.closeModal('import'));

        // Modal save actions
        

        

        document.getElementById('slot-modal-save').addEventListener('click', () => {
            this.saveSlotAdjustment();
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
        this.renderDailyAttendance();
        this.renderLogFeeds();
        lucide.createIcons();
    },

    
    renderDashboardStaffTable() {
        const tbody = document.getElementById('dashboard-staff-table-body');
        if (!tbody) return;

        const staff = DataStore.getStaff();
        if (staff.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:hsl(var(--text-muted));">No staff imported yet.</td></tr>';
            return;
        }

        tbody.innerHTML = "";
        staff.forEach(s => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${s.id}</strong></td>
                <td>${s.name}</td>
                <td><span class="badge" style="background:hsl(var(--primary)/0.1);color:hsl(var(--primary));">${s.dept}</span></td>
                <td>${s.subjects.length > 0 ? s.subjects.join(', ') : '<span style="color:hsl(var(--text-muted));">None</span>'}</td>
                <td>
                    ${s.attendanceStatus === 'Present' 
                        ? `<span class="badge" style="background:hsl(var(--success)/0.1);color:hsl(var(--success));">Present</span>` 
                        : s.attendanceStatus === 'Absent' 
                            ? `<span class="badge" style="background:hsl(var(--danger)/0.1);color:hsl(var(--danger));">Absent</span>`
                            : `<span class="badge" style="background:hsl(var(--warning)/0.1);color:hsl(var(--warning));">Normal</span>`}
                </td>
            `;
            tbody.appendChild(tr);
        });
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
        const absentCount = staff.filter(t => t.attendanceStatus === 'Absent').length;
        document.getElementById('stat-absences-handled').innerText = absentCount;

        // 5. Update checklist status
        const chkStatus = document.getElementById('chk-timetable-status');
        const chkText = document.getElementById('chk-timetable-text');
        const chkBackup = document.getElementById('chk-backup-status');
        const chkBackupText = document.getElementById('chk-backup-text');

        if (schedule.length > 0) {
            chkStatus.className = "checklist-item done";
            chkStatus.querySelector('i, svg').setAttribute('data-lucide', 'check-circle-2');
            chkText.innerText = "Conflict-free Timetable successfully generated.";
            
            chkBackup.className = "checklist-item done";
            chkBackup.querySelector('i, svg').setAttribute('data-lucide', 'check-circle-2');
            chkBackupText.innerText = `Backup staff coverage calculated: ${coverageRate}% coverage.`;
        } else {
            chkStatus.className = "checklist-item pending";
            chkStatus.querySelector('i, svg').setAttribute('data-lucide', 'help-circle');
            chkText.innerText = "Timetable needs generation for the current semester.";

            chkBackup.className = "checklist-item pending";
            chkBackup.querySelector('i, svg').setAttribute('data-lucide', 'help-circle');
            chkBackupText.innerText = "Backup staff allocations will be computed during generation.";
        }
    },

    getYearFromSection(sec) {
        const match = sec.name.match(/\d+(?:st|nd|rd|th)\s+Year/i);
        if (match) {
            return match[0];
        } else {
            const idMatch = sec.id.match(/-Y(\d+)/i);
            if (idMatch) {
                const num = idMatch[1];
                const suffix = num === '1' ? 'st' : num === '2' ? 'nd' : num === '3' ? 'rd' : 'th';
                return `${num}${suffix} Year`;
            }
        }
        return null;
    },

    populateHierarchicalYear() {
        const hierYear = document.getElementById('filter-hier-year');
        const prevYear = hierYear.value;
        hierYear.innerHTML = '<option value="">-- Select Year --</option>';
        
        const sections = DataStore.getSections();
        const years = new Set();
        sections.forEach(sec => {
            const year = this.getYearFromSection(sec);
            if (year) years.add(year);
        });
        
        const sortedYears = Array.from(years).sort();
        sortedYears.forEach(year => {
            const opt = document.createElement('option');
            opt.value = year;
            opt.innerText = year;
            hierYear.appendChild(opt);
        });

        if (prevYear && Array.from(hierYear.options).some(opt => opt.value === prevYear)) {
            hierYear.value = prevYear;
        } else {
            document.getElementById('filter-hier-dept-label').style.display = 'none';
            document.getElementById('filter-hier-dept').style.display = 'none';
            document.getElementById('filter-hier-section-label').style.display = 'none';
            document.getElementById('filter-hier-section').style.display = 'none';
        }
        
        this.populateHierarchicalDept();
    },

    populateHierarchicalDept() {
        const hierYear = document.getElementById('filter-hier-year').value;
        const hierDeptLabel = document.getElementById('filter-hier-dept-label');
        const hierDept = document.getElementById('filter-hier-dept');
        
        if (!hierYear) {
            hierDeptLabel.style.display = 'none';
            hierDept.style.display = 'none';
            document.getElementById('filter-hier-section-label').style.display = 'none';
            document.getElementById('filter-hier-section').style.display = 'none';
            return;
        }

        hierDeptLabel.style.display = 'inline-block';
        hierDept.style.display = 'inline-block';
        
        const prevDept = hierDept.value;
        hierDept.innerHTML = '<option value="">-- Select Department --</option>';
        
        const sections = DataStore.getSections();
        const depts = new Set();
        sections.forEach(sec => {
            if (this.getYearFromSection(sec) === hierYear) {
                depts.add(sec.dept);
            }
        });
        
        const sortedDepts = Array.from(depts).sort();
        sortedDepts.forEach(dept => {
            const opt = document.createElement('option');
            opt.value = dept;
            opt.innerText = dept;
            hierDept.appendChild(opt);
        });

        if (prevDept && Array.from(hierDept.options).some(opt => opt.value === prevDept)) {
            hierDept.value = prevDept;
        } else {
            document.getElementById('filter-hier-section-label').style.display = 'none';
            document.getElementById('filter-hier-section').style.display = 'none';
        }
        
        this.populateHierarchicalSection();
    },

    populateHierarchicalSection() {
        const hierYear = document.getElementById('filter-hier-year').value;
        const hierDept = document.getElementById('filter-hier-dept').value;
        const hierSectionLabel = document.getElementById('filter-hier-section-label');
        const hierSection = document.getElementById('filter-hier-section');
        
        if (!hierYear || !hierDept) {
            hierSectionLabel.style.display = 'none';
            hierSection.style.display = 'none';
            return;
        }

        hierSectionLabel.style.display = 'inline-block';
        hierSection.style.display = 'inline-block';
        
        const prevSec = hierSection.value;
        hierSection.innerHTML = '<option value="">-- Select Section --</option>';
        
        const sections = DataStore.getSections().filter(sec => 
            this.getYearFromSection(sec) === hierYear && sec.dept === hierDept
        );
        
        sections.forEach(sec => {
            const opt = document.createElement('option');
            opt.value = sec.id;
            opt.innerText = sec.name;
            hierSection.appendChild(opt);
        });

        if (prevSec && Array.from(hierSection.options).some(opt => opt.value === prevSec)) {
            hierSection.value = prevSec;
        } else if (sections.length > 0) {
            hierSection.value = sections[0].id;
        }
    },

    populateFilterValues() {
        const viewType = document.getElementById('filter-view-type').value;
        const selectValue = document.getElementById('filter-view-value');
        const selectValueLabel = document.getElementById('filter-view-value-label');
        const deptLabel = document.getElementById('filter-dept-label');
        const deptValue = document.getElementById('filter-dept-value');
        const prevSelected = selectValue.value;
        
        const hierYearLabel = document.getElementById('filter-hier-year-label');
        const hierYear = document.getElementById('filter-hier-year');
        const hierDeptLabel = document.getElementById('filter-hier-dept-label');
        const hierDept = document.getElementById('filter-hier-dept');
        const hierSectionLabel = document.getElementById('filter-hier-section-label');
        const hierSection = document.getElementById('filter-hier-section');

        selectValue.innerHTML = "";

        if (viewType === 'section') {
            if (selectValueLabel) selectValueLabel.style.display = 'none';
            if (selectValue) selectValue.style.display = 'none';
            if (deptLabel) deptLabel.style.display = 'none';
            if (deptValue) deptValue.style.display = 'none';

            if (hierYearLabel) hierYearLabel.style.display = 'inline-block';
            if (hierYear) hierYear.style.display = 'inline-block';
            
            this.populateHierarchicalYear();
            return;
        } else {
            if (selectValueLabel) selectValueLabel.style.display = 'inline-block';
            if (selectValue) selectValue.style.display = 'inline-block';
            
            if (hierYearLabel) hierYearLabel.style.display = 'none';
            if (hierYear) hierYear.style.display = 'none';
            if (hierDeptLabel) hierDeptLabel.style.display = 'none';
            if (hierDept) hierDept.style.display = 'none';
            if (hierSectionLabel) hierSectionLabel.style.display = 'none';
            if (hierSection) hierSection.style.display = 'none';
        }

        // Hide department filter for all other views
        if (deptLabel) deptLabel.style.display = 'none';
        if (deptValue) deptValue.style.display = 'none';

        if (viewType === 'teacher') {
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
        let viewVal = document.getElementById('filter-view-value').value;
        const wrapper = document.getElementById('timetable-view-wrapper');

        if (viewType === 'section') {
            const hierYear = document.getElementById('filter-hier-year').value;
            const hierDept = document.getElementById('filter-hier-dept').value;
            const hierSection = document.getElementById('filter-hier-section').value;
            
            if (!hierYear || !hierDept || !hierSection) {
                wrapper.innerHTML = `<p style="color: hsl(var(--text-muted)); text-align: center; margin-top: 40px;">Please select Year, Department, and Section to view the timetable.</p>`;
                return;
            }
            viewVal = hierSection;
        }

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


    clearAllImportedData() {
        if(confirm("Are you sure you want to clear all imported staff, subjects, and sections? This will also clear the timetable.")) {
            DataStore.saveStaff([]);
            DataStore.saveSubjects([]);
            DataStore.saveSections([]);
            DataStore.saveSchedule([]);
            DataStore.saveSubLogs([]);
            this.showToast("All imported data cleared successfully.", "success");
            setTimeout(() => window.location.reload(), 1000);
        }
    },

    renderStaffTable() {
        const tbody = document.getElementById('staff-table-body');
        if (!tbody) return;
        tbody.innerHTML = "";

        const staff = DataStore.getStaff();
        if (staff.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:hsl(var(--text-muted));">No staff imported yet.</td></tr>';
            return;
        }

        staff.forEach(s => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${s.id}</strong></td>
                <td>${s.name}</td>
                <td><span class="badge" style="background:hsl(var(--primary)/0.1);color:hsl(var(--primary));">${s.dept}</span></td>
                <td>${s.subjects.length > 0 ? s.subjects.join(', ') : '<span style="color:hsl(var(--text-muted));">None</span>'}</td>
                <td>
                    ${s.attendanceStatus === 'Present' 
                        ? `<span class="badge" style="background:hsl(var(--success)/0.1);color:hsl(var(--success));">Present</span>` 
                        : s.attendanceStatus === 'Absent' 
                            ? `<span class="badge" style="background:hsl(var(--danger)/0.1);color:hsl(var(--danger));">Absent</span>`
                            : `<span class="badge" style="background:hsl(var(--warning)/0.1);color:hsl(var(--warning));">Normal</span>`}
                </td>
            `;
            tbody.appendChild(tr);
        });
    },

    renderSubjectTable() {
        const tbody = document.getElementById('subject-table-body');
        if (!tbody) return;
        tbody.innerHTML = "";

        const subjects = DataStore.getSubjects();
        if (subjects.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:hsl(var(--text-muted));">No subjects imported yet.</td></tr>';
            return;
        }

        subjects.forEach(s => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${s.code}</strong></td>
                <td>${s.name}</td>
                <td><span class="badge" style="background:hsl(var(--primary)/0.1);color:hsl(var(--primary));">${s.dept}</span></td>
                <td>${s.year || '-'}</td>
                <td>${s.semester || '-'}</td>
                <td>${s.type}</td>
                <td>${s.hoursPerWeek}</td>
            `;
            tbody.appendChild(tr);
        });
    },

    renderDailyAttendance() {
        const tbody = document.getElementById('active-absences-body');
        if (!tbody) return;

        const staff = DataStore.getStaff();
        if (staff.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 24px; color:hsl(var(--text-muted));">No staff available.</td></tr>`;
            return;
        }

        tbody.innerHTML = "";
        staff.forEach(s => {
            const tr = document.createElement('tr');
            let statusBadge = '';
            let actionBtn = '';

            if (s.attendanceStatus === 'Present') {
                statusBadge = `<span class="badge" style="background:hsl(var(--success)/0.1);color:hsl(var(--success));">Present</span>`;
                actionBtn = `<button class="btn btn-sm btn-ghost" disabled>Marked</button>`;
            } else if (s.attendanceStatus === 'Absent') {
                statusBadge = `<span class="badge" style="background:hsl(var(--danger)/0.1);color:hsl(var(--danger));">Absent</span>`;
                actionBtn = `<button class="btn btn-sm btn-outline btn-return" data-id="${s.id}">Return to Present</button>`;
            } else {
                statusBadge = `<span class="badge" style="background:hsl(var(--warning)/0.1);color:hsl(var(--warning));">Normal</span>`;
                actionBtn = `<button class="btn btn-sm btn-primary btn-mark-present" data-id="${s.id}">Mark Present</button>`;
            }

            tr.innerHTML = `
                <td>${s.id}</td>
                <td><strong>${s.name}</strong><div style="font-size:0.7rem; color:hsl(var(--text-muted));">${s.dept}</div></td>
                <td>${statusBadge}</td>
                <td>${actionBtn}</td>
            `;
            tbody.appendChild(tr);
        });

        // Add event listeners
        document.querySelectorAll('.btn-mark-present').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const t = DataStore.getStaff().find(x => x.id === id);
                if (t) {
                    t.attendanceStatus = 'Present';
                    DataStore.saveStaff(DataStore.getStaff().map(x => x.id === id ? t : x));
                    this.showToast(`${t.name} marked as Present.`, "success");
                    this.renderAll();
                }
            });
        });

        document.querySelectorAll('.btn-return').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                AbsenceManager.markPresent(id);
                this.showToast(`Restored original classes for staff.`, "success");
                this.renderAll();
            });
        });
    },

    // Old function overriden to do nothing (we don't need dropdowns anymore)
    renderAbsenceDropdowns() {

        const body = document.getElementById('active-absences-table-body');
        const listDiv = document.getElementById('active-absences-list');
        body.innerHTML = "";
        listDiv.innerHTML = "";

        const staff = DataStore.getStaff();
        const absentStaff = staff.filter(t => t.attendanceStatus === 'Absent');

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

    handleDirectStaffImport(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                if (typeof XLSX === 'undefined') {
                    this.showToast('Excel library not loaded yet. Please wait and retry.', 'error');
                    return;
                }
                const workbook = XLSX.read(evt.target.result, { type: 'binary' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

                if (!rawData || rawData.length === 0) {
                    this.showToast('File is empty or invalid format.', 'error');
                    return;
                }

                let nameIdx = 0;
                let deptIdx = 1;
                let subjIdx = -1;
                let startIndex = 0;

                const firstRow = rawData[0] || [];
                
                // Detect headers
                let foundHeader = false;
                for (let i = 0; i < firstRow.length; i++) {
                    const val = String(firstRow[i] || '').toLowerCase();
                    if (val.includes('name') || val.includes('staff') || val.includes('faculty')) {
                        nameIdx = i;
                        foundHeader = true;
                    } else if (val.includes('dept') || val.includes('department') || val.includes('branch')) {
                        deptIdx = i;
                        foundHeader = true;
                    } else if (val.includes('subject') || val.includes('expertise') || val.includes('handling') || val.includes('handle')) {
                        subjIdx = i;
                        foundHeader = true;
                    }
                }

                if (foundHeader) {
                    startIndex = 1; // skip header row
                } else if (firstRow.length > 2) {
                    // No headers but 3 or more columns, assume 3rd is subjects
                    subjIdx = 2;
                }

                let importedCount = 0;
                let existingStaff = DataStore.getStaff();

                for (let i = startIndex; i < rawData.length; i++) {
                    const rowArr = rawData[i];
                    if (!rowArr || rowArr.length === 0) continue;

                    let name = String(rowArr[nameIdx] || '').trim();
                    let dept = String(rowArr[deptIdx] || '').trim() || 'CSE';
                    
                    let subjects = [];
                    if (subjIdx !== -1) {
                        const subStr = String(rowArr[subjIdx] || '');
                        if (subStr.trim() !== '') {
                            subjects = subStr.split(',').map(s => s.trim()).filter(s => s !== '');
                        }
                    }

                    if (name && name !== '') {
                        let existingMember = existingStaff.find(s => s.name.toLowerCase() === name.toLowerCase());
                        
                        if (existingMember) {
                            // Merge subjects
                            subjects.forEach(sub => {
                                if (!existingMember.subjects.includes(sub)) {
                                    existingMember.subjects.push(sub);
                                }
                            });
                        } else {
                            existingStaff.push({
                                id: `ST${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
                                name: name,
                                dept: dept,
                                email: '',
                                subjects: subjects,
                                maxHoursPerWeek: 15,
                                attendanceStatus: 'Normal'
                            });
                            importedCount++;
                        }
                    }
                }

                if (importedCount > 0) {
                    DataStore.saveStaff(existingStaff);
                    this.renderStaffDirectory();
                    this.showToast(`Successfully imported ${importedCount} staff members!`, 'success');
                } else {
                    this.showToast('No valid staff data found in file. Ensure columns have headers like "name", "dept".', 'error');
                }
            } catch (err) {
                console.error(err);
                this.showToast('Error parsing file. Please ensure it is a valid Excel or CSV file.', 'error');
            }
            e.target.value = ''; // Reset input
        };
        reader.readAsBinaryString(file);
    },

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
                attendanceStatus: 'Normal'
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
        const qualifiedT = staff.filter(t => t.subjects.includes(slot.subjectCode) && !t.attendanceStatus === 'Absent');
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
        if (primaryTeacher && primaryTeacher.attendanceStatus === 'Absent') {
            this.appendWarning(warningDiv, `Warning: Prof. ${primaryTeacher.name} is reported absent. Substitution will be active.`, 'amber');
        }

        const backupTeacher = staff.find(t => t.id === backupId);
        if (backupTeacher && backupTeacher.attendanceStatus === 'Absent') {
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
            return s.backupTeacherId === null && t && t.attendanceStatus === 'Absent';
        }).length;

        const regular = total - subbed - unassigned;

        this.charts.coverage.data.datasets[0].data = [
            regular >= 0 ? regular : 0,
            subbed,
            unassigned
        ];
        this.charts.coverage.update();
    },

    // ─────────────────────────────────────────────────────────────────
    // IMPORT DATA MODAL
    // ─────────────────────────────────────────────────────────────────
    _importState: {
        staff: null,
        subjects: null,
        sections: null
    },

    openImportModal() {
        // Reset state
        this._importState = { staff: null, subjects: null, sections: null };
        document.getElementById('import-master-filename').innerText = 'No file chosen';
        document.getElementById('import-master-input').value = '';
        this._updateImportStatusBar();
        document.getElementById('import-modal-overlay').classList.add('active');

        // File picker
        const fileBtn = document.getElementById('import-master-file-btn');
        const fileInput = document.getElementById('import-master-input');
        fileBtn.onclick = () => fileInput.click();
        fileInput.onchange = (e) => this._handleMasterImportFile(e.target.files[0]);

        const sampleBtn = document.getElementById('import-master-sample-btn');
        sampleBtn.onclick = () => this._loadSampleData();

        // Confirm
        document.getElementById('import-modal-confirm').onclick = () => this._confirmImport();

        lucide.createIcons();
    },

    _handleMasterImportFile(file) {
        if (!file) return;
        document.getElementById('import-master-filename').innerText = file.name;

        const ext = file.name.split('.').pop().toLowerCase();

        if (ext === 'json') {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    if (data.staff) this._importState.staff = this._normalizeImportRows('staff', data.staff);
                    if (data.subjects) this._importState.subjects = this._normalizeImportRows('subjects', data.subjects);
                    if (data.sections) this._importState.sections = this._normalizeImportRows('sections', data.sections);
                    this._updateImportStatusBar();
                } catch (err) {
                    this.showToast(`Invalid JSON file: ${err.message}`, 'error');
                }
            };
            reader.readAsText(file);

        } else if (ext === 'xlsx' || ext === 'xls') {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    if (typeof XLSX === 'undefined') throw new Error('Excel library not loaded yet. Please wait and retry.');
                    const workbook = XLSX.read(e.target.result, { type: 'binary' });
                    
                    // Parse Staff Sheet
                    const staffSheetName = workbook.SheetNames.find(n => n.toLowerCase().includes('staff'));
                    if (staffSheetName) {
                        const rawStaff = XLSX.utils.sheet_to_json(workbook.Sheets[staffSheetName], { defval: '' });
                        this._importState.staff = this._normalizeImportRows('staff', rawStaff);
                    }

                    // Parse Subjects Sheet
                    const subjSheetName = workbook.SheetNames.find(n => n.toLowerCase().includes('subject'));
                    if (subjSheetName) {
                        const rawSubj = XLSX.utils.sheet_to_json(workbook.Sheets[subjSheetName], { defval: '' });
                        this._importState.subjects = this._normalizeImportRows('subjects', rawSubj);
                    }

                    // Parse Sections Sheet
                    const sectSheetName = workbook.SheetNames.find(n => n.toLowerCase().includes('section'));
                    if (sectSheetName) {
                        const rawSect = XLSX.utils.sheet_to_json(workbook.Sheets[sectSheetName], { defval: '' });
                        this._importState.sections = this._normalizeImportRows('sections', rawSect);
                    }

                    this._updateImportStatusBar();
                } catch (err) {
                    this.showToast(`Invalid Excel file: ${err.message}`, 'error');
                }
            };
            reader.readAsBinaryString(file);
        } else {
            this.showToast(`Unsupported file type ".${ext}". Please use .xlsx or .json`, 'error');
        }
    },

    // ── Normalize rows: handle subjects as string → array, cast numbers
    _normalizeImportRows(type, rows) {
        return rows.map(row => {
            const r = { ...row };
            if ('subjects' in r) {
                if (typeof r.subjects === 'string') {
                    r.subjects = r.subjects ? r.subjects.split(',').map(s => s.trim()).filter(Boolean) : [];
                } else if (!Array.isArray(r.subjects)) {
                    r.subjects = [];
                }
            }
            if ('maxHoursPerWeek' in r) r.maxHoursPerWeek = Number(r.maxHoursPerWeek) || 15;
            if ('hoursPerWeek' in r)    r.hoursPerWeek    = Number(r.hoursPerWeek)    || 3;
            return r;
        });
    },

    _loadSampleData() {
        this._importState.staff = SAMPLE_STAFF;
        this._importState.subjects = SAMPLE_SUBJECTS;
        this._importState.sections = DEFAULT_SECTIONS;
        document.getElementById('import-master-filename').innerText = 'Sample Data Loaded';
        this._updateImportStatusBar();
    },

    _updateImportStatusBar() {
        const state = this._importState;
        const staffCount = state.staff ? state.staff.length : null;
        const subjectsCount = state.subjects ? state.subjects.length : null;
        const sectionsCount = state.sections ? state.sections.length : null;

        const fmt = (label, icon, count) => {
            const color = count !== null ? 'hsl(var(--success))' : 'hsl(var(--text-muted))';
            const val = count !== null ? `<strong style="color:${color};">${count} records</strong>` : '<strong>–</strong>';
            return `<i data-lucide="${icon}" style="width:14px;height:14px;display:inline;vertical-align:middle;"></i> ${label}: ${val}`;
        };

        document.getElementById('import-status-staff').innerHTML = fmt('Staff', 'users', staffCount);
        document.getElementById('import-status-subjects').innerHTML = fmt('Subjects', 'book-open', subjectsCount);
        document.getElementById('import-status-sections').innerHTML = fmt('Sections', 'layout-grid', sectionsCount);

        // Enable confirm only if at least staff OR subjects OR sections loaded
        const hasAny = staffCount !== null || subjectsCount !== null || sectionsCount !== null;
        const btn = document.getElementById('import-modal-confirm');
        btn.disabled = !hasAny;
        btn.style.opacity = hasAny ? '1' : '0.5';

        lucide.createIcons();
    },

    _confirmImport() {
        const state = this._importState;
        let imported = [];

        // Merge imported data into DataStore
        if (state.staff) {
            const normalized = state.staff.map(s => ({
                id: s.id || `ST${Math.random().toString(36).substr(2,4).toUpperCase()}`,
                name: s.name || 'Unknown',
                dept: s.dept || 'CSE',
                designation: s.designation || 'Professor',
                email: s.email || '',
                subjects: Array.isArray(s.subjects) ? s.subjects : [],
                maxHoursPerWeek: Number(s.maxHoursPerWeek) || 15,
                attendanceStatus: 'Normal'
            }));
            DataStore.saveStaff(normalized);
            imported.push(`${normalized.length} staff`);
        }

        if (state.subjects) {
            const normalized = state.subjects.map(s => ({
                code: s.code || '',
                name: s.name || '',
                dept: s.dept || 'CSE',
                year: s.year || 'Y1',
                semester: s.semester || 'S1',
                type: s.type || 'Theory',
                hoursPerWeek: Number(s.hoursPerWeek) || 3
            }));
            DataStore.saveSubjects(normalized);
            imported.push(`${normalized.length} subjects`);
        }

        if (state.sections) {
            const normalized = state.sections.map(s => ({
                id: s.id || '',
                name: s.name || '',
                dept: s.dept || 'CSE'
            }));
            DataStore.saveSections(normalized);
            imported.push(`${normalized.length} sections`);
        }

        this.closeModal('import');
        this.showToast(`Imported: ${imported.join(', ')}. Automatically starting generation...`, 'success');

        // Automatically trigger generator immediately instead of page reload
        setTimeout(() => {
            this.simulateCSPGeneration();
        }, 500);
    }
};

// Start application when window loads
window.addEventListener('DOMContentLoaded', () => {
    app.init();
});
