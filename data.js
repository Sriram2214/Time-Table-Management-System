// College Timetable Management System - Core Data & Storage
const DEFAULT_DEPARTMENTS = ["CSE", "ECE", "ME", "CE", "EEE", "IT", "AIDS", "CHEM", "BME", "AERO"];


const DEFAULT_ROOMS = [
    { name: "Room 101", type: "Classroom", capacity: 60, dept: "All" },
    { name: "Room 102", type: "Classroom", capacity: 60, dept: "All" },
    { name: "Room 103", type: "Classroom", capacity: 60, dept: "All" },
    { name: "Room 201", type: "Classroom", capacity: 60, dept: "All" },
    { name: "Room 202", type: "Classroom", capacity: 60, dept: "All" },
    { name: "Room 203", type: "Classroom", capacity: 60, dept: "All" },
    { name: "Room 301", type: "Classroom", capacity: 60, dept: "All" },
    { name: "Room 302", type: "Classroom", capacity: 60, dept: "All" },
    // Labs - Original 5 depts
    { name: "CS Lab Alpha",               type: "Lab", capacity: 40, dept: "CSE" },
    { name: "CS Lab Beta",                type: "Lab", capacity: 40, dept: "CSE" },
    { name: "Electronics Circuits Lab",   type: "Lab", capacity: 30, dept: "ECE" },
    { name: "Digital Signal Processing Lab", type: "Lab", capacity: 30, dept: "ECE" },
    { name: "Thermal Engineering Lab",    type: "Lab", capacity: 30, dept: "ME" },
    { name: "Fluid Mechanics Lab",        type: "Lab", capacity: 30, dept: "ME" },
    { name: "Concrete Technology Lab",    type: "Lab", capacity: 30, dept: "CE" },
    { name: "Electrical Machines Lab",    type: "Lab", capacity: 35, dept: "EEE" },
    // Labs - New 5 depts
    { name: "IT Lab Alpha",               type: "Lab", capacity: 40, dept: "IT"   },
    { name: "IT Lab Beta",                type: "Lab", capacity: 40, dept: "IT"   },
    { name: "AI & Data Science Lab",      type: "Lab", capacity: 40, dept: "AIDS" },
    { name: "Deep Learning Lab",          type: "Lab", capacity: 40, dept: "AIDS" },
    { name: "Chemical Process Lab",       type: "Lab", capacity: 30, dept: "CHEM" },
    { name: "Reaction Engineering Lab",   type: "Lab", capacity: 30, dept: "CHEM" },
    { name: "Biomedical Instrumentation Lab", type: "Lab", capacity: 30, dept: "BME" },
    { name: "Biomechanics Lab",           type: "Lab", capacity: 30, dept: "BME" },
    { name: "Aerodynamics Lab",           type: "Lab", capacity: 30, dept: "AERO" },
    { name: "Propulsion Lab",             type: "Lab", capacity: 30, dept: "AERO" }
];


const DEFAULT_SECTIONS = [
    // CSE
    { id: "CSE-Y1", name: "CSE 1st Year", dept: "CSE" }, { id: "CSE-Y2", name: "CSE 2nd Year", dept: "CSE" },
    { id: "CSE-Y3", name: "CSE 3rd Year", dept: "CSE" }, { id: "CSE-Y4", name: "CSE 4th Year", dept: "CSE" },
    // ECE
    { id: "ECE-Y1", name: "ECE 1st Year", dept: "ECE" }, { id: "ECE-Y2", name: "ECE 2nd Year", dept: "ECE" },
    { id: "ECE-Y3", name: "ECE 3rd Year", dept: "ECE" }, { id: "ECE-Y4", name: "ECE 4th Year", dept: "ECE" },
    // ME
    { id: "ME-Y1",  name: "ME 1st Year",  dept: "ME"  }, { id: "ME-Y2",  name: "ME 2nd Year",  dept: "ME"  },
    { id: "ME-Y3",  name: "ME 3rd Year",  dept: "ME"  }, { id: "ME-Y4",  name: "ME 4th Year",  dept: "ME"  },
    // CE
    { id: "CE-Y1",  name: "CE 1st Year",  dept: "CE"  }, { id: "CE-Y2",  name: "CE 2nd Year",  dept: "CE"  },
    { id: "CE-Y3",  name: "CE 3rd Year",  dept: "CE"  }, { id: "CE-Y4",  name: "CE 4th Year",  dept: "CE"  },
    // EEE
    { id: "EEE-Y1", name: "EEE 1st Year", dept: "EEE" }, { id: "EEE-Y2", name: "EEE 2nd Year", dept: "EEE" },
    { id: "EEE-Y3", name: "EEE 3rd Year", dept: "EEE" }, { id: "EEE-Y4", name: "EEE 4th Year", dept: "EEE" },
    // IT
    { id: "IT-Y1",  name: "IT 1st Year",  dept: "IT"  }, { id: "IT-Y2",  name: "IT 2nd Year",  dept: "IT"  },
    { id: "IT-Y3",  name: "IT 3rd Year",  dept: "IT"  }, { id: "IT-Y4",  name: "IT 4th Year",  dept: "IT"  },
    // AIDS
    { id: "AIDS-Y1", name: "AIDS 1st Year", dept: "AIDS" }, { id: "AIDS-Y2", name: "AIDS 2nd Year", dept: "AIDS" },
    { id: "AIDS-Y3", name: "AIDS 3rd Year", dept: "AIDS" }, { id: "AIDS-Y4", name: "AIDS 4th Year", dept: "AIDS" },
    // CHEM
    { id: "CHEM-Y1", name: "CHEM 1st Year", dept: "CHEM" }, { id: "CHEM-Y2", name: "CHEM 2nd Year", dept: "CHEM" },
    { id: "CHEM-Y3", name: "CHEM 3rd Year", dept: "CHEM" }, { id: "CHEM-Y4", name: "CHEM 4th Year", dept: "CHEM" },
    // BME
    { id: "BME-Y1",  name: "BME 1st Year",  dept: "BME"  }, { id: "BME-Y2",  name: "BME 2nd Year",  dept: "BME"  },
    { id: "BME-Y3",  name: "BME 3rd Year",  dept: "BME"  }, { id: "BME-Y4",  name: "BME 4th Year",  dept: "BME"  },
    // AERO
    { id: "AERO-Y1", name: "AERO 1st Year", dept: "AERO" }, { id: "AERO-Y2", name: "AERO 2nd Year", dept: "AERO" },
    { id: "AERO-Y3", name: "AERO 3rd Year", dept: "AERO" }, { id: "AERO-Y4", name: "AERO 4th Year", dept: "AERO" }
];


const DEFAULT_SUBJECTS = [
    // ── CSE Year 1 ──
    { code: "CS101",  name: "Introduction to Programming",      dept: "CSE", type: "Theory",       hoursPerWeek: 3 },
    { code: "CS101L", name: "Programming Lab (Python)",          dept: "CSE", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "CS102",  name: "Engineering Mathematics I",         dept: "CSE", type: "Theory",       hoursPerWeek: 3 },
    { code: "CS103",  name: "Digital Logic Design",              dept: "CSE", type: "Theory",       hoursPerWeek: 3 },
    { code: "CS103L", name: "Digital Logic Lab",                 dept: "CSE", type: "Practical/Lab", hoursPerWeek: 2 },
    // ── CSE Year 2 ──
    { code: "CS201",  name: "Data Structures & Algorithms",      dept: "CSE", type: "Theory",       hoursPerWeek: 3 },
    { code: "CS201L", name: "Data Structures Lab",               dept: "CSE", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "CS202",  name: "Operating Systems",                 dept: "CSE", type: "Theory",       hoursPerWeek: 3 },
    { code: "CS203",  name: "Database Management Systems",       dept: "CSE", type: "Theory",       hoursPerWeek: 3 },
    { code: "CS203L", name: "DBMS Lab",                          dept: "CSE", type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "CS204",  name: "Computer Organization & Architecture", dept: "CSE", type: "Theory",    hoursPerWeek: 3 },
    // ── CSE Year 3 ──
    { code: "CS301",  name: "Computer Networks",                 dept: "CSE", type: "Theory",       hoursPerWeek: 3 },
    { code: "CS301L", name: "Networking Lab",                    dept: "CSE", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "CS302",  name: "Software Engineering",              dept: "CSE", type: "Theory",       hoursPerWeek: 3 },
    { code: "CS302L", name: "Software Engineering Lab",          dept: "CSE", type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "CS303",  name: "Theory of Computation",             dept: "CSE", type: "Theory",       hoursPerWeek: 3 },
    { code: "CS304",  name: "Compiler Design",                   dept: "CSE", type: "Theory",       hoursPerWeek: 3 },
    // ── CSE Year 4 ──
    { code: "CS401",  name: "Machine Learning",                  dept: "CSE", type: "Theory",       hoursPerWeek: 3 },
    { code: "CS401L", name: "Machine Learning Lab",              dept: "CSE", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "CS402",  name: "Distributed Systems",               dept: "CSE", type: "Theory",       hoursPerWeek: 3 },
    { code: "CS403",  name: "Information Security & Cryptography", dept: "CSE", type: "Theory",     hoursPerWeek: 3 },
    { code: "CS404",  name: "Cloud Computing",                   dept: "CSE", type: "Theory",       hoursPerWeek: 3 },
    { code: "CS404L", name: "Cloud & DevOps Lab",                dept: "CSE", type: "Practical/Lab", hoursPerWeek: 2 },

    // ── ECE Year 1 ──
    { code: "EC101",  name: "Basic Electronics",                 dept: "ECE", type: "Theory",       hoursPerWeek: 3 },
    { code: "EC101L", name: "Electronics Devices Lab",           dept: "ECE", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "EC102",  name: "Engineering Physics",               dept: "ECE", type: "Theory",       hoursPerWeek: 3 },
    { code: "EC103",  name: "Circuit Theory",                    dept: "ECE", type: "Theory",       hoursPerWeek: 3 },
    // ── ECE Year 2 ──
    { code: "EC201",  name: "Digital Electronics",               dept: "ECE", type: "Theory",       hoursPerWeek: 3 },
    { code: "EC201L", name: "Digital Logic Design Lab",          dept: "ECE", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "EC202",  name: "Signals and Systems",               dept: "ECE", type: "Theory",       hoursPerWeek: 3 },
    { code: "EC203",  name: "Microprocessors & Microcontrollers", dept: "ECE", type: "Theory",      hoursPerWeek: 3 },
    { code: "EC203L", name: "Microprocessor Lab",                dept: "ECE", type: "Practical/Lab", hoursPerWeek: 2 },
    // ── ECE Year 3 ──
    { code: "EC301",  name: "VLSI Design",                       dept: "ECE", type: "Theory",       hoursPerWeek: 3 },
    { code: "EC301L", name: "VLSI Design Lab",                   dept: "ECE", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "EC302",  name: "Embedded Systems",                  dept: "ECE", type: "Theory",       hoursPerWeek: 3 },
    { code: "EC302L", name: "Embedded Systems Lab",              dept: "ECE", type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "EC303",  name: "Communication Systems",             dept: "ECE", type: "Theory",       hoursPerWeek: 3 },
    { code: "EC304",  name: "Digital Signal Processing",         dept: "ECE", type: "Theory",       hoursPerWeek: 3 },
    // ── ECE Year 4 ──
    { code: "EC401",  name: "Wireless Communication",            dept: "ECE", type: "Theory",       hoursPerWeek: 3 },
    { code: "EC401L", name: "DSP Lab",                           dept: "ECE", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "EC402",  name: "Digital Image Processing",          dept: "ECE", type: "Theory",       hoursPerWeek: 3 },
    { code: "EC403",  name: "Antenna & Wave Propagation",        dept: "ECE", type: "Theory",       hoursPerWeek: 3 },
    { code: "EC404",  name: "IoT & Sensor Networks",             dept: "ECE", type: "Theory",       hoursPerWeek: 3 },

    // ── ME Year 1 ──
    { code: "ME101",  name: "Engineering Mechanics",             dept: "ME",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME102",  name: "Engineering Drawing",               dept: "ME",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME102L", name: "Engineering Drawing Lab",           dept: "ME",  type: "Practical/Lab", hoursPerWeek: 2 },
    // ── ME Year 2 ──
    { code: "ME201",  name: "Thermodynamics",                    dept: "ME",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME201L", name: "Thermal Engineering Lab",           dept: "ME",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "ME202",  name: "Fluid Mechanics",                   dept: "ME",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME202L", name: "Fluid Machinery Lab",               dept: "ME",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "ME203",  name: "Strength of Materials",             dept: "ME",  type: "Theory",       hoursPerWeek: 3 },
    // ── ME Year 3 ──
    { code: "ME301",  name: "Manufacturing Technology",          dept: "ME",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME301L", name: "Manufacturing Lab",                 dept: "ME",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "ME302",  name: "Heat Transfer",                     dept: "ME",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME303",  name: "Machine Design",                    dept: "ME",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME304",  name: "Theory of Machines",                dept: "ME",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME304L", name: "Dynamics Lab",                      dept: "ME",  type: "Practical/Lab", hoursPerWeek: 2 },
    // ── ME Year 4 ──
    { code: "ME401",  name: "Robotics & Automation",             dept: "ME",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME401L", name: "Robotics Lab",                      dept: "ME",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "ME402",  name: "Industrial Engineering",            dept: "ME",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME403",  name: "Finite Element Analysis",           dept: "ME",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME404",  name: "CAD/CAM",                           dept: "ME",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME404L", name: "CAD/CAM Lab",                       dept: "ME",  type: "Practical/Lab", hoursPerWeek: 2 },

    // ── CE Year 1 ──
    { code: "CE101",  name: "Introduction to Civil Engineering", dept: "CE",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CE102",  name: "Engineering Drawing",               dept: "CE",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CE102L", name: "Surveying Field Lab",               dept: "CE",  type: "Practical/Lab", hoursPerWeek: 2 },
    // ── CE Year 2 ──
    { code: "CE201",  name: "Strength of Materials",             dept: "CE",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CE201L", name: "Material Testing Lab",              dept: "CE",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "CE202",  name: "Surveying",                         dept: "CE",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CE203",  name: "Fluid Mechanics for Civil",         dept: "CE",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CE203L", name: "Hydraulics Lab",                    dept: "CE",  type: "Practical/Lab", hoursPerWeek: 2 },
    // ── CE Year 3 ──
    { code: "CE301",  name: "Structural Analysis",               dept: "CE",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CE301L", name: "Structural Lab",                    dept: "CE",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "CE302",  name: "Geotechnical Engineering",          dept: "CE",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CE302L", name: "Soil Mechanics Lab",                dept: "CE",  type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "CE303",  name: "Transportation Engineering",        dept: "CE",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CE304",  name: "Concrete Technology",               dept: "CE",  type: "Theory",       hoursPerWeek: 3 },
    // ── CE Year 4 ──
    { code: "CE401",  name: "Environmental Engineering",         dept: "CE",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CE401L", name: "Environmental Lab",                 dept: "CE",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "CE402",  name: "Construction Management",           dept: "CE",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CE403",  name: "Design of Steel Structures",        dept: "CE",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CE404",  name: "Remote Sensing & GIS",              dept: "CE",  type: "Theory",       hoursPerWeek: 3 },

    // ── EEE Year 1 ──
    { code: "EE101",  name: "Basic Electrical Engineering",      dept: "EEE", type: "Theory",       hoursPerWeek: 3 },
    { code: "EE101L", name: "Electrical Engineering Lab",        dept: "EEE", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "EE102",  name: "Engineering Mathematics",           dept: "EEE", type: "Theory",       hoursPerWeek: 3 },
    // ── EEE Year 2 ──
    { code: "EE201",  name: "Network Analysis & Synthesis",      dept: "EEE", type: "Theory",       hoursPerWeek: 3 },
    { code: "EE202",  name: "Electrical Machines",               dept: "EEE", type: "Theory",       hoursPerWeek: 3 },
    { code: "EE202L", name: "Electrical Machines Lab",           dept: "EEE", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "EE203",  name: "Electromagnetic Theory",            dept: "EEE", type: "Theory",       hoursPerWeek: 3 },
    // ── EEE Year 3 ──
    { code: "EE301",  name: "Power Systems",                     dept: "EEE", type: "Theory",       hoursPerWeek: 3 },
    { code: "EE301L", name: "Power Systems Lab",                 dept: "EEE", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "EE302",  name: "Control Systems",                   dept: "EEE", type: "Theory",       hoursPerWeek: 3 },
    { code: "EE302L", name: "Control Systems Lab",               dept: "EEE", type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "EE303",  name: "Power Electronics",                 dept: "EEE", type: "Theory",       hoursPerWeek: 3 },
    { code: "EE304",  name: "Microcontrollers & PLCs",           dept: "EEE", type: "Theory",       hoursPerWeek: 3 },
    // ── EEE Year 4 ──
    { code: "EE401",  name: "High Voltage Engineering",          dept: "EEE", type: "Theory",       hoursPerWeek: 3 },
    { code: "EE401L", name: "High Voltage Lab",                  dept: "EEE", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "EE402",  name: "Electric Drives",                   dept: "EEE", type: "Theory",       hoursPerWeek: 3 },
    { code: "EE402L", name: "Electric Drives Lab",               dept: "EEE", type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "EE403",  name: "Smart Grid Technology",             dept: "EEE", type: "Theory",       hoursPerWeek: 3 },
    { code: "EE404",  name: "Renewable Energy Systems",          dept: "EEE", type: "Theory",       hoursPerWeek: 3 },

    // ── IT Year 1 ──
    { code: "IT101",  name: "Problem Solving & Programming",     dept: "IT",   type: "Theory",       hoursPerWeek: 3 },
    { code: "IT101L", name: "Programming Lab",                   dept: "IT",   type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "IT102",  name: "Mathematics for Computing",         dept: "IT",   type: "Theory",       hoursPerWeek: 3 },
    { code: "IT103",  name: "Digital Fundamentals",              dept: "IT",   type: "Theory",       hoursPerWeek: 3 },
    // ── IT Year 2 ──
    { code: "IT201",  name: "Data Structures",                   dept: "IT",   type: "Theory",       hoursPerWeek: 3 },
    { code: "IT201L", name: "Data Structures Lab",               dept: "IT",   type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "IT202",  name: "Object Oriented Programming",       dept: "IT",   type: "Theory",       hoursPerWeek: 3 },
    { code: "IT202L", name: "OOP Lab",                           dept: "IT",   type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "IT203",  name: "Web Technologies",                  dept: "IT",   type: "Theory",       hoursPerWeek: 3 },
    // ── IT Year 3 ──
    { code: "IT301",  name: "Computer Networks",                 dept: "IT",   type: "Theory",       hoursPerWeek: 3 },
    { code: "IT301L", name: "Networking Lab",                    dept: "IT",   type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "IT302",  name: "Database Systems",                  dept: "IT",   type: "Theory",       hoursPerWeek: 3 },
    { code: "IT302L", name: "Database Lab",                      dept: "IT",   type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "IT303",  name: "Software Engineering",              dept: "IT",   type: "Theory",       hoursPerWeek: 3 },
    // ── IT Year 4 ──
    { code: "IT401",  name: "Cloud Computing",                   dept: "IT",   type: "Theory",       hoursPerWeek: 3 },
    { code: "IT401L", name: "Cloud Lab",                         dept: "IT",   type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "IT402",  name: "Cyber Security",                    dept: "IT",   type: "Theory",       hoursPerWeek: 3 },
    { code: "IT402L", name: "Security Lab",                      dept: "IT",   type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "IT403",  name: "Mobile Application Development",    dept: "IT",   type: "Theory",       hoursPerWeek: 3 },
    { code: "IT404",  name: "DevOps & Agile",                    dept: "IT",   type: "Theory",       hoursPerWeek: 3 },

    // ── AIDS Year 1 ──
    { code: "AD101",  name: "Introduction to AI & Data Science", dept: "AIDS", type: "Theory",       hoursPerWeek: 3 },
    { code: "AD101L", name: "Python for AI Lab",                 dept: "AIDS", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "AD102",  name: "Statistics & Probability",          dept: "AIDS", type: "Theory",       hoursPerWeek: 3 },
    { code: "AD103",  name: "Linear Algebra for ML",             dept: "AIDS", type: "Theory",       hoursPerWeek: 3 },
    // ── AIDS Year 2 ──
    { code: "AD201",  name: "Machine Learning",                  dept: "AIDS", type: "Theory",       hoursPerWeek: 3 },
    { code: "AD201L", name: "ML Lab",                            dept: "AIDS", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "AD202",  name: "Data Structures & Algorithms",      dept: "AIDS", type: "Theory",       hoursPerWeek: 3 },
    { code: "AD202L", name: "DSA Lab",                           dept: "AIDS", type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "AD203",  name: "Database Management",               dept: "AIDS", type: "Theory",       hoursPerWeek: 3 },
    // ── AIDS Year 3 ──
    { code: "AD301",  name: "Deep Learning",                     dept: "AIDS", type: "Theory",       hoursPerWeek: 3 },
    { code: "AD301L", name: "Deep Learning Lab",                 dept: "AIDS", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "AD302",  name: "Big Data Analytics",                dept: "AIDS", type: "Theory",       hoursPerWeek: 3 },
    { code: "AD302L", name: "Big Data Lab",                      dept: "AIDS", type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "AD303",  name: "Natural Language Processing",       dept: "AIDS", type: "Theory",       hoursPerWeek: 3 },
    // ── AIDS Year 4 ──
    { code: "AD401",  name: "Computer Vision",                   dept: "AIDS", type: "Theory",       hoursPerWeek: 3 },
    { code: "AD401L", name: "Computer Vision Lab",               dept: "AIDS", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "AD402",  name: "Reinforcement Learning",            dept: "AIDS", type: "Theory",       hoursPerWeek: 3 },
    { code: "AD402L", name: "RL Lab",                            dept: "AIDS", type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "AD403",  name: "AI Ethics & Governance",            dept: "AIDS", type: "Theory",       hoursPerWeek: 3 },
    { code: "AD404",  name: "Data Science Capstone",             dept: "AIDS", type: "Theory",       hoursPerWeek: 3 },

    // ── CHEM Year 1 ──
    { code: "CH101",  name: "Engineering Chemistry",             dept: "CHEM", type: "Theory",       hoursPerWeek: 3 },
    { code: "CH101L", name: "Chemistry Lab",                     dept: "CHEM", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "CH102",  name: "Mathematics for Chemical Engg",     dept: "CHEM", type: "Theory",       hoursPerWeek: 3 },
    { code: "CH103",  name: "Introduction to Chemical Processes",dept: "CHEM", type: "Theory",       hoursPerWeek: 3 },
    // ── CHEM Year 2 ──
    { code: "CH201",  name: "Chemical Reaction Engineering",     dept: "CHEM", type: "Theory",       hoursPerWeek: 3 },
    { code: "CH201L", name: "Reaction Engineering Lab",          dept: "CHEM", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "CH202",  name: "Fluid Mechanics for ChE",           dept: "CHEM", type: "Theory",       hoursPerWeek: 3 },
    { code: "CH202L", name: "Fluid Lab",                         dept: "CHEM", type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "CH203",  name: "Thermodynamics for ChE",            dept: "CHEM", type: "Theory",       hoursPerWeek: 3 },
    // ── CHEM Year 3 ──
    { code: "CH301",  name: "Mass Transfer Operations",          dept: "CHEM", type: "Theory",       hoursPerWeek: 3 },
    { code: "CH301L", name: "Mass Transfer Lab",                 dept: "CHEM", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "CH302",  name: "Heat Transfer",                     dept: "CHEM", type: "Theory",       hoursPerWeek: 3 },
    { code: "CH302L", name: "Heat Transfer Lab",                 dept: "CHEM", type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "CH303",  name: "Process Dynamics & Control",        dept: "CHEM", type: "Theory",       hoursPerWeek: 3 },
    // ── CHEM Year 4 ──
    { code: "CH401",  name: "Chemical Plant Design",             dept: "CHEM", type: "Theory",       hoursPerWeek: 3 },
    { code: "CH401L", name: "Plant Design Lab",                  dept: "CHEM", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "CH402",  name: "Polymer Technology",                dept: "CHEM", type: "Theory",       hoursPerWeek: 3 },
    { code: "CH403",  name: "Petrochemical Engineering",         dept: "CHEM", type: "Theory",       hoursPerWeek: 3 },
    { code: "CH404",  name: "Environmental Chemical Engineering",dept: "CHEM", type: "Theory",       hoursPerWeek: 3 },

    // ── BME Year 1 ──
    { code: "BM101",  name: "Introduction to Biomedical Engg",  dept: "BME",  type: "Theory",       hoursPerWeek: 3 },
    { code: "BM101L", name: "Biomedical Lab I",                  dept: "BME",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "BM102",  name: "Anatomy & Physiology",              dept: "BME",  type: "Theory",       hoursPerWeek: 3 },
    { code: "BM103",  name: "Bio-signals & Systems",             dept: "BME",  type: "Theory",       hoursPerWeek: 3 },
    // ── BME Year 2 ──
    { code: "BM201",  name: "Medical Instrumentation",           dept: "BME",  type: "Theory",       hoursPerWeek: 3 },
    { code: "BM201L", name: "Instrumentation Lab",               dept: "BME",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "BM202",  name: "Biomaterials",                      dept: "BME",  type: "Theory",       hoursPerWeek: 3 },
    { code: "BM202L", name: "Biomaterials Lab",                  dept: "BME",  type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "BM203",  name: "Biomedical Signal Processing",      dept: "BME",  type: "Theory",       hoursPerWeek: 3 },
    // ── BME Year 3 ──
    { code: "BM301",  name: "Medical Imaging Systems",           dept: "BME",  type: "Theory",       hoursPerWeek: 3 },
    { code: "BM301L", name: "Imaging Lab",                       dept: "BME",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "BM302",  name: "Rehabilitation Engineering",        dept: "BME",  type: "Theory",       hoursPerWeek: 3 },
    { code: "BM302L", name: "Rehabilitation Lab",                dept: "BME",  type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "BM303",  name: "Clinical Engineering",              dept: "BME",  type: "Theory",       hoursPerWeek: 3 },
    // ── BME Year 4 ──
    { code: "BM401",  name: "Artificial Organs & Prosthetics",   dept: "BME",  type: "Theory",       hoursPerWeek: 3 },
    { code: "BM401L", name: "Prosthetics Lab",                   dept: "BME",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "BM402",  name: "Telemedicine & eHealth",            dept: "BME",  type: "Theory",       hoursPerWeek: 3 },
    { code: "BM403",  name: "Biomedical Ethics & Regulations",   dept: "BME",  type: "Theory",       hoursPerWeek: 3 },
    { code: "BM404",  name: "Research Methodology in BME",       dept: "BME",  type: "Theory",       hoursPerWeek: 3 },

    // ── AERO Year 1 ──
    { code: "AE101",  name: "Introduction to Aerospace Engg",   dept: "AERO", type: "Theory",       hoursPerWeek: 3 },
    { code: "AE101L", name: "Aerospace Lab I",                   dept: "AERO", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "AE102",  name: "Engineering Mechanics for AERO",    dept: "AERO", type: "Theory",       hoursPerWeek: 3 },
    { code: "AE103",  name: "Fluid Mechanics for AERO",          dept: "AERO", type: "Theory",       hoursPerWeek: 3 },
    // ── AERO Year 2 ──
    { code: "AE201",  name: "Aerodynamics I",                    dept: "AERO", type: "Theory",       hoursPerWeek: 3 },
    { code: "AE201L", name: "Aerodynamics Lab",                  dept: "AERO", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "AE202",  name: "Aircraft Structures",               dept: "AERO", type: "Theory",       hoursPerWeek: 3 },
    { code: "AE202L", name: "Structures Lab",                    dept: "AERO", type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "AE203",  name: "Thermodynamics for AERO",           dept: "AERO", type: "Theory",       hoursPerWeek: 3 },
    // ── AERO Year 3 ──
    { code: "AE301",  name: "Propulsion Systems",                dept: "AERO", type: "Theory",       hoursPerWeek: 3 },
    { code: "AE301L", name: "Propulsion Lab",                    dept: "AERO", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "AE302",  name: "Aerodynamics II",                   dept: "AERO", type: "Theory",       hoursPerWeek: 3 },
    { code: "AE302L", name: "Wind Tunnel Lab",                   dept: "AERO", type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "AE303",  name: "Flight Mechanics",                  dept: "AERO", type: "Theory",       hoursPerWeek: 3 },
    // ── AERO Year 4 ──
    { code: "AE401",  name: "Aircraft Design",                   dept: "AERO", type: "Theory",       hoursPerWeek: 3 },
    { code: "AE401L", name: "Design Lab",                        dept: "AERO", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "AE402",  name: "Avionics",                          dept: "AERO", type: "Theory",       hoursPerWeek: 3 },
    { code: "AE403",  name: "Spacecraft Technology",             dept: "AERO", type: "Theory",       hoursPerWeek: 3 },
    { code: "AE404",  name: "UAV & Drone Systems",               dept: "AERO", type: "Theory",       hoursPerWeek: 3 }
];

const DEFAULT_STAFF = [
    // CSE Staff (7)
    { id: "ST001", name: "Dr. Rajesh Kumar", dept: "CSE", email: "rajesh.kumar@college.edu", subjects: ["CS101", "CS201", "CS202"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST002", name: "Prof. Anjali Sharma", dept: "CSE", email: "anjali.sharma@college.edu", subjects: ["CS101L", "CS201L", "CS203L"], maxHoursPerWeek: 18, isAbsent: false },
    { id: "ST003", name: "Dr. Vikram Singh", dept: "CSE", email: "vikram.singh@college.edu", subjects: ["CS201", "CS203", "CS101"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST004", name: "Mrs. Priya Patel", dept: "CSE", email: "priya.patel@college.edu", subjects: ["CS101", "CS101L", "CS203"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST005", name: "Mr. Amit Verma", dept: "CSE", email: "amit.verma@college.edu", subjects: ["CS202", "CS201L", "CS203L"], maxHoursPerWeek: 16, isAbsent: false },
    { id: "ST006", name: "Dr. Neha Gupta", dept: "CSE", email: "neha.gupta@college.edu", subjects: ["CS203", "CS201", "CS202"], maxHoursPerWeek: 12, isAbsent: false },
    { id: "ST007", name: "Mr. Sandeep Reddy", dept: "CSE", email: "sandeep.reddy@college.edu", subjects: ["CS101L", "CS201L", "CS101"], maxHoursPerWeek: 15, isAbsent: false },

    // ECE Staff (6)
    { id: "ST011", name: "Dr. Sanjay Deshmukh", dept: "ECE", email: "sanjay.deshmukh@college.edu", subjects: ["EC101", "EC201", "EC202"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST012", name: "Prof. Meera Sen", dept: "ECE", email: "meera.sen@college.edu", subjects: ["EC101L", "EC201L", "EC203"], maxHoursPerWeek: 16, isAbsent: false },
    { id: "ST013", name: "Mr. Gaurav Joshi", dept: "ECE", email: "gaurav.joshi@college.edu", subjects: ["EC101", "EC201L", "EC203"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST014", name: "Dr. Swati Mishra", dept: "ECE", email: "swati.mishra@college.edu", subjects: ["EC202", "EC203", "EC101"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST015", name: "Mrs. Kavitha Nair", dept: "ECE", email: "kavitha.nair@college.edu", subjects: ["EC101L", "EC201", "EC201L"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST016", name: "Mr. Rahul Roy", dept: "ECE", email: "rahul.roy@college.edu", subjects: ["EC101", "EC101L", "EC202"], maxHoursPerWeek: 12, isAbsent: false },

    // ME Staff (6)
    { id: "ST021", name: "Dr. Anil Mehta", dept: "ME", email: "anil.mehta@college.edu", subjects: ["ME101", "ME201", "ME202"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST022", name: "Prof. Harish Rao", dept: "ME", email: "harish.rao@college.edu", subjects: ["ME201L", "ME202L", "ME101"], maxHoursPerWeek: 18, isAbsent: false },
    { id: "ST023", name: "Mr. Manoj Saxena", dept: "ME", email: "manoj.saxena@college.edu", subjects: ["ME101", "ME202", "ME202L"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST024", name: "Dr. Ritu Choudhary", dept: "ME", email: "ritu.choudhary@college.edu", subjects: ["ME201", "ME201L", "ME202"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST025", name: "Mr. Nitin Pandey", dept: "ME", email: "nitin.pandey@college.edu", subjects: ["ME201L", "ME202L", "ME202"], maxHoursPerWeek: 16, isAbsent: false },
    { id: "ST026", name: "Mrs. Shalini Singh", dept: "ME", email: "shalini.singh@college.edu", subjects: ["ME101", "ME201", "ME201L"], maxHoursPerWeek: 12, isAbsent: false },

    // CE Staff (6)
    { id: "ST031", name: "Dr. Vinod Prasad", dept: "CE", email: "vinod.prasad@college.edu", subjects: ["CE101", "CE201", "CE202"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST032", name: "Prof. Sunita Iyer", dept: "CE", email: "sunita.iyer@college.edu", subjects: ["CE201L", "CE202", "CE101"], maxHoursPerWeek: 16, isAbsent: false },
    { id: "ST033", name: "Mr. Vivek Dubey", dept: "CE", email: "vivek.dubey@college.edu", subjects: ["CE101", "CE201L", "CE201"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST034", name: "Dr. Pooja Hegde", dept: "CE", email: "pooja.hegde@college.edu", subjects: ["CE201", "CE202", "CE201L"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST035", name: "Mrs. Deepa Pillai", dept: "CE", email: "deepa.pillai@college.edu", subjects: ["CE101", "CE201L", "CE202"], maxHoursPerWeek: 14, isAbsent: false },
    { id: "ST036", name: "Mr. Arun Bose", dept: "CE", email: "arun.bose@college.edu", subjects: ["CE201", "CE202", "CE101"], maxHoursPerWeek: 12, isAbsent: false },

    // EEE Staff (6)
    { id: "ST041", name: "Dr. K. Srinivasan",  dept: "EEE", email: "k.srinivasan@college.edu",  subjects: ["EE101","EE201","EE202","EE301","EE302"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST042", name: "Prof. Laxmi Prasad", dept: "EEE", email: "laxmi.prasad@college.edu",  subjects: ["EE101L","EE202","EE202L","EE301L","EE401L"], maxHoursPerWeek: 16, isAbsent: false },
    { id: "ST043", name: "Mr. Dennis Mathew",  dept: "EEE", email: "dennis.mathew@college.edu", subjects: ["EE101","EE201","EE101L","EE303","EE304"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST044", name: "Dr. Archana Sen",    dept: "EEE", email: "archana.sen@college.edu",   subjects: ["EE201","EE202","EE203","EE302","EE401"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST045", name: "Mrs. Preeti Vyas",   dept: "EEE", email: "preeti.vyas@college.edu",   subjects: ["EE101L","EE202L","EE302L","EE402","EE402L"], maxHoursPerWeek: 14, isAbsent: false },
    { id: "ST046", name: "Mr. Jose Kurian",    dept: "EEE", email: "jose.kurian@college.edu",   subjects: ["EE101","EE101L","EE303","EE403","EE404"], maxHoursPerWeek: 12, isAbsent: false },

    // IT Staff (6)
    { id: "ST051", name: "Dr. Karthik Rajan",     dept: "IT", email: "karthik.rajan@college.edu",    subjects: ["IT101","IT201","IT301","IT401"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST052", name: "Prof. Divya Mohan",     dept: "IT", email: "divya.mohan@college.edu",     subjects: ["IT101L","IT201L","IT301L","IT401L"], maxHoursPerWeek: 16, isAbsent: false },
    { id: "ST053", name: "Mr. Suresh Babu",       dept: "IT", email: "suresh.babu@college.edu",     subjects: ["IT102","IT202","IT302","IT402"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST054", name: "Dr. Meena Krishnan",    dept: "IT", email: "meena.krishnan@college.edu",  subjects: ["IT103","IT203","IT303","IT403"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST055", name: "Mrs. Anitha Selvam",    dept: "IT", email: "anitha.selvam@college.edu",   subjects: ["IT101","IT201","IT302L","IT404"], maxHoursPerWeek: 14, isAbsent: false },
    { id: "ST056", name: "Mr. Praveen Kumar",     dept: "IT", email: "praveen.kumar@college.edu",   subjects: ["IT101L","IT202L","IT301","IT402L"], maxHoursPerWeek: 12, isAbsent: false },

    // AIDS Staff (6)
    { id: "ST061", name: "Dr. Prabhakaran S.",    dept: "AIDS", email: "prabhakaran@college.edu",  subjects: ["AD101","AD201","AD301","AD401"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST062", name: "Prof. Kavya Nair",      dept: "AIDS", email: "kavya.nair@college.edu",   subjects: ["AD101L","AD201L","AD301L","AD401L"], maxHoursPerWeek: 16, isAbsent: false },
    { id: "ST063", name: "Mr. Rajan Pillai",      dept: "AIDS", email: "rajan.pillai@college.edu", subjects: ["AD102","AD202","AD302","AD402"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST064", name: "Dr. Sneha Varghese",    dept: "AIDS", email: "sneha.varghese@college.edu", subjects: ["AD103","AD203","AD303","AD403"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST065", name: "Mrs. Lakshmi Devi",     dept: "AIDS", email: "lakshmi.devi@college.edu", subjects: ["AD101","AD202L","AD302L","AD404"], maxHoursPerWeek: 14, isAbsent: false },
    { id: "ST066", name: "Mr. Ajith Menon",       dept: "AIDS", email: "ajith.menon@college.edu",  subjects: ["AD101L","AD201","AD301","AD402L"], maxHoursPerWeek: 12, isAbsent: false },

    // CHEM Staff (5)
    { id: "ST071", name: "Dr. Ramesh Iyer",       dept: "CHEM", email: "ramesh.iyer@college.edu",   subjects: ["CH101","CH201","CH301","CH401"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST072", name: "Prof. Saranya Raj",     dept: "CHEM", email: "saranya.raj@college.edu",   subjects: ["CH101L","CH201L","CH301L","CH401L"], maxHoursPerWeek: 16, isAbsent: false },
    { id: "ST073", name: "Mr. Dinesh Varma",      dept: "CHEM", email: "dinesh.varma@college.edu",  subjects: ["CH102","CH202","CH302","CH402"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST074", name: "Dr. Usha Krishnan",     dept: "CHEM", email: "usha.krishnan@college.edu", subjects: ["CH103","CH203","CH303","CH403"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST075", name: "Mrs. Geetha Narayanan", dept: "CHEM", email: "geetha.n@college.edu",      subjects: ["CH101","CH202L","CH302L","CH404"], maxHoursPerWeek: 14, isAbsent: false },

    // BME Staff (5)
    { id: "ST081", name: "Dr. Vasanth Kumar",     dept: "BME", email: "vasanth.kumar@college.edu",  subjects: ["BM101","BM201","BM301","BM401"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST082", name: "Prof. Nithya Srinivas", dept: "BME", email: "nithya.srinivas@college.edu", subjects: ["BM101L","BM201L","BM301L","BM401L"], maxHoursPerWeek: 16, isAbsent: false },
    { id: "ST083", name: "Mr. Venkatesh Raj",     dept: "BME", email: "venkatesh.raj@college.edu",  subjects: ["BM102","BM202","BM302","BM402"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST084", name: "Dr. Sujatha Balaji",    dept: "BME", email: "sujatha.balaji@college.edu", subjects: ["BM103","BM203","BM303","BM403"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST085", name: "Mrs. Rekha Chandran",   dept: "BME", email: "rekha.chandran@college.edu", subjects: ["BM101","BM202L","BM302L","BM404"], maxHoursPerWeek: 14, isAbsent: false },

    // AERO Staff (5)
    { id: "ST091", name: "Dr. Arjun Nair",        dept: "AERO", email: "arjun.nair@college.edu",    subjects: ["AE101","AE201","AE301","AE401"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST092", name: "Prof. Sindhu Mohan",    dept: "AERO", email: "sindhu.mohan@college.edu",  subjects: ["AE101L","AE201L","AE301L","AE401L"], maxHoursPerWeek: 16, isAbsent: false },
    { id: "ST093", name: "Mr. Balaji Raman",      dept: "AERO", email: "balaji.raman@college.edu",  subjects: ["AE102","AE202","AE302","AE402"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST094", name: "Dr. Prema Suresh",      dept: "AERO", email: "prema.suresh@college.edu",  subjects: ["AE103","AE203","AE303","AE403"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST095", name: "Mrs. Hema Prakash",     dept: "AERO", email: "hema.prakash@college.edu",  subjects: ["AE101","AE202L","AE302L","AE404"], maxHoursPerWeek: 14, isAbsent: false }
];


const WORKING_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const FIRST_YEAR_SLOTS = [
    { period: 0, label: "Period 1", time: "08:40 AM - 09:30 AM" },
    { period: 1, label: "Period 2", time: "09:30 AM - 10:20 AM" },
    { period: 2, label: "Period 3", time: "10:20 AM - 11:10 AM" },
    { period: 3, label: "Period 4", time: "11:25 AM - 12:15 PM" },
    { period: 4, label: "Period 5", time: "12:15 PM - 01:05 PM" },
    { period: 5, label: "Period 6", time: "01:40 PM - 02:30 PM" },
    { period: 6, label: "Period 7", time: "02:30 PM - 03:20 PM" },
    { period: 7, label: "Period 8", time: "03:40 PM - 04:25 PM" }
];

const OTHER_YEAR_SLOTS = [
    { period: 0, label: "Period 1", time: "08:40 AM - 09:30 AM" },
    { period: 1, label: "Period 2", time: "09:30 AM - 10:20 AM" },
    { period: 2, label: "Period 3", time: "10:35 AM - 11:25 AM" },
    { period: 3, label: "Period 4", time: "11:25 AM - 12:15 PM" },
    { period: 4, label: "Period 5", time: "12:50 PM - 01:40 PM" },
    { period: 5, label: "Period 6", time: "01:40 PM - 02:30 PM" },
    { period: 6, label: "Period 7", time: "02:30 PM - 03:20 PM" },
    { period: 7, label: "Period 8", time: "03:40 PM - 04:25 PM" }
];

const getSlotsForSection = (sectionId) => {
    const isFirstYear = sectionId && (sectionId.endsWith("-Y1") || sectionId.includes("Y1") || sectionId.includes("1st"));
    return isFirstYear ? FIRST_YEAR_SLOTS : OTHER_YEAR_SLOTS;
};

// Fallback for single definition
const TIME_SLOTS = OTHER_YEAR_SLOTS;

// Seed state schema inside localStorage
const STORAGE_KEYS = {
    STAFF: "tt_staff",
    SUBJECTS: "tt_subjects",
    ROOMS: "tt_rooms",
    SECTIONS: "tt_sections",
    SCHEDULE: "tt_schedule",
    SUB_LOGS: "tt_substitution_logs"
};

const DataStore = {
    getStaff() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.STAFF)) || DEFAULT_STAFF;
    },
    saveStaff(staff) {
        localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(staff));
    },
    getSubjects() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECTS)) || DEFAULT_SUBJECTS;
    },
    saveSubjects(subjects) {
        localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
    },
    getRooms() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.ROOMS)) || DEFAULT_ROOMS;
    },
    saveRooms(rooms) {
        localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
    },
    getSections() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.SECTIONS)) || DEFAULT_SECTIONS;
    },
    saveSections(sections) {
        localStorage.setItem(STORAGE_KEYS.SECTIONS, JSON.stringify(sections));
    },
    getSchedule() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.SCHEDULE)) || [];
    },
    saveSchedule(schedule) {
        localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(schedule));
    },
    getSubLogs() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.SUB_LOGS)) || [];
    },
    saveSubLogs(logs) {
        localStorage.setItem(STORAGE_KEYS.SUB_LOGS, JSON.stringify(logs));
    },
    clearSchedule() {
        localStorage.removeItem(STORAGE_KEYS.SCHEDULE);
    },
    initialize() {
        // Force reset if sections are outdated (old data had only 20, new has 40)
        const existingSections = JSON.parse(localStorage.getItem(STORAGE_KEYS.SECTIONS));
        if (!existingSections || existingSections.length < 40) {
            this.resetAll();
            return;
        }
        if (!localStorage.getItem(STORAGE_KEYS.STAFF))    this.saveStaff(DEFAULT_STAFF);
        if (!localStorage.getItem(STORAGE_KEYS.SUBJECTS)) this.saveSubjects(DEFAULT_SUBJECTS);
        if (!localStorage.getItem(STORAGE_KEYS.ROOMS))    this.saveRooms(DEFAULT_ROOMS);
        if (!localStorage.getItem(STORAGE_KEYS.SUB_LOGS)) this.saveSubLogs([]);
    },
    resetAll() {
        localStorage.setItem(STORAGE_KEYS.STAFF,    JSON.stringify(DEFAULT_STAFF));
        localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(DEFAULT_SUBJECTS));
        localStorage.setItem(STORAGE_KEYS.ROOMS,    JSON.stringify(DEFAULT_ROOMS));
        localStorage.setItem(STORAGE_KEYS.SECTIONS, JSON.stringify(DEFAULT_SECTIONS));
        localStorage.removeItem(STORAGE_KEYS.SCHEDULE);
        localStorage.setItem(STORAGE_KEYS.SUB_LOGS, JSON.stringify([]));
    }
};

// Auto initialize store
DataStore.initialize();
