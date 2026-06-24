// College Timetable Management System - Core Data & Storage
const DEFAULT_DEPARTMENTS = ["CSE", "IT", "AIDS", "AIML", "Cyber Security", "IoT", "ECE", "EEE", "Mechanical", "Civil"];


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
    { name: "Thermal Engineering Lab",    type: "Lab", capacity: 30, dept: "Mechanical" },
    { name: "Fluid Mechanics Lab",        type: "Lab", capacity: 30, dept: "Mechanical" },
    { name: "Concrete Technology Lab",    type: "Lab", capacity: 30, dept: "Civil" },
    { name: "Electrical Machines Lab",    type: "Lab", capacity: 35, dept: "EEE" },
    // Labs - New 8 depts
    { name: "IT Lab Alpha",               type: "Lab", capacity: 40, dept: "IT"   },
    { name: "IT Lab Beta",                type: "Lab", capacity: 40, dept: "IT"   },
    { name: "AI & Data Science Lab",      type: "Lab", capacity: 40, dept: "AIDS" },
    { name: "Deep Learning Lab",          type: "Lab", capacity: 40, dept: "AIDS" },
    { name: "AIML Research Lab",          type: "Lab", capacity: 40, dept: "AIML" },
    { name: "GenAI & LLM Lab",            type: "Lab", capacity: 40, dept: "AIML" },
    { name: "Cyber Security Lab",         type: "Lab", capacity: 40, dept: "Cyber Security"  },
    { name: "Digital Forensics Lab",      type: "Lab", capacity: 40, dept: "Cyber Security"  },
    { name: "IoT Development Lab",        type: "Lab", capacity: 40, dept: "IoT"  },
    { name: "Smart Systems Lab",          type: "Lab", capacity: 40, dept: "IoT"  }
];


const DEFAULT_SECTIONS = [
    // CSE
    { id: "CSE-Y1", name: "CSE 1st Year", dept: "CSE" }, { id: "CSE-Y2", name: "CSE 2nd Year", dept: "CSE" },
    { id: "CSE-Y3", name: "CSE 3rd Year", dept: "CSE" }, { id: "CSE-Y4", name: "CSE 4th Year", dept: "CSE" },
    // ECE
    { id: "ECE-Y1", name: "ECE 1st Year", dept: "ECE" }, { id: "ECE-Y2", name: "ECE 2nd Year", dept: "ECE" },
    { id: "ECE-Y3", name: "ECE 3rd Year", dept: "ECE" }, { id: "ECE-Y4", name: "ECE 4th Year", dept: "ECE" },
    // ME
    { id: "ME-Y1",  name: "Mechanical 1st Year",  dept: "Mechanical"  }, { id: "ME-Y2",  name: "Mechanical 2nd Year",  dept: "Mechanical"  },
    { id: "ME-Y3",  name: "Mechanical 3rd Year",  dept: "Mechanical"  }, { id: "ME-Y4",  name: "Mechanical 4th Year",  dept: "Mechanical"  },
    // CE
    { id: "CE-Y1",  name: "Civil 1st Year",  dept: "Civil"  }, { id: "CE-Y2",  name: "Civil 2nd Year",  dept: "Civil"  },
    { id: "CE-Y3",  name: "Civil 3rd Year",  dept: "Civil"  }, { id: "CE-Y4",  name: "Civil 4th Year",  dept: "Civil"  },
    // EEE
    { id: "EEE-Y1", name: "EEE 1st Year", dept: "EEE" }, { id: "EEE-Y2", name: "EEE 2nd Year", dept: "EEE" },
    { id: "EEE-Y3", name: "EEE 3rd Year", dept: "EEE" }, { id: "EEE-Y4", name: "EEE 4th Year", dept: "EEE" },
    // IT
    { id: "IT-Y1",  name: "IT 1st Year",  dept: "IT"  }, { id: "IT-Y2",  name: "IT 2nd Year",  dept: "IT"  },
    { id: "IT-Y3",  name: "IT 3rd Year",  dept: "IT"  }, { id: "IT-Y4",  name: "IT 4th Year",  dept: "IT"  },
    // AIDS
    { id: "AIDS-Y1", name: "AIDS 1st Year", dept: "AIDS" }, { id: "AIDS-Y2", name: "AIDS 2nd Year", dept: "AIDS" },
    { id: "AIDS-Y3", name: "AIDS 3rd Year", dept: "AIDS" }, { id: "AIDS-Y4", name: "AIDS 4th Year", dept: "AIDS" },
    // AIML
    { id: "AIML-Y1", name: "AIML 1st Year", dept: "AIML" }, { id: "AIML-Y2", name: "AIML 2nd Year", dept: "AIML" },
    { id: "AIML-Y3", name: "AIML 3rd Year", dept: "AIML" }, { id: "AIML-Y4", name: "AIML 4th Year", dept: "AIML" },
    // CYS
    { id: "CYS-Y1",  name: "Cyber Security 1st Year",  dept: "Cyber Security"  }, { id: "CYS-Y2",  name: "Cyber Security 2nd Year",  dept: "Cyber Security"  },
    { id: "CYS-Y3",  name: "Cyber Security 3rd Year",  dept: "Cyber Security"  }, { id: "CYS-Y4",  name: "Cyber Security 4th Year",  dept: "Cyber Security"  },
    // IOT
    { id: "IOT-Y1",  name: "IoT 1st Year",  dept: "IoT"  }, { id: "IOT-Y2",  name: "IoT 2nd Year",  dept: "IoT"  },
    { id: "IOT-Y3",  name: "IoT 3rd Year",  dept: "IoT"  }, { id: "IOT-Y4",  name: "IoT 4th Year",  dept: "IoT"  }
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
    { code: "ME101",  name: "Engineering Mechanics",             dept: "Mechanical",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME102",  name: "Engineering Drawing",               dept: "Mechanical",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME102L", name: "Engineering Drawing Lab",           dept: "Mechanical",  type: "Practical/Lab", hoursPerWeek: 2 },
    // ── ME Year 2 ──
    { code: "ME201",  name: "Thermodynamics",                    dept: "Mechanical",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME201L", name: "Thermal Engineering Lab",           dept: "Mechanical",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "ME202",  name: "Fluid Mechanics",                   dept: "Mechanical",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME202L", name: "Fluid Machinery Lab",               dept: "Mechanical",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "ME203",  name: "Strength of Materials",             dept: "Mechanical",  type: "Theory",       hoursPerWeek: 3 },
    // ── ME Year 3 ──
    { code: "ME301",  name: "Manufacturing Technology",          dept: "Mechanical",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME301L", name: "Manufacturing Lab",                 dept: "Mechanical",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "ME302",  name: "Heat Transfer",                     dept: "Mechanical",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME303",  name: "Machine Design",                    dept: "Mechanical",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME304",  name: "Theory of Machines",                dept: "Mechanical",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME304L", name: "Dynamics Lab",                      dept: "Mechanical",  type: "Practical/Lab", hoursPerWeek: 2 },
    // ── ME Year 4 ──
    { code: "ME401",  name: "Robotics & Automation",             dept: "Mechanical",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME401L", name: "Robotics Lab",                      dept: "Mechanical",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "ME402",  name: "Industrial Engineering",            dept: "Mechanical",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME403",  name: "Finite Element Analysis",           dept: "Mechanical",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME404",  name: "CAD/CAM",                           dept: "Mechanical",  type: "Theory",       hoursPerWeek: 3 },
    { code: "ME404L", name: "CAD/CAM Lab",                       dept: "Mechanical",  type: "Practical/Lab", hoursPerWeek: 2 },

    // ── CE Year 1 ──
    { code: "CE101",  name: "Introduction to Civil Engineering", dept: "Civil",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CE102",  name: "Engineering Drawing",               dept: "Civil",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CE102L", name: "Surveying Field Lab",               dept: "Civil",  type: "Practical/Lab", hoursPerWeek: 2 },
    // ── CE Year 2 ──
    { code: "CE201",  name: "Strength of Materials",             dept: "Civil",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CE201L", name: "Material Testing Lab",              dept: "Civil",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "CE202",  name: "Surveying",                         dept: "Civil",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CE203",  name: "Fluid Mechanics for Civil",         dept: "Civil",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CE203L", name: "Hydraulics Lab",                    dept: "Civil",  type: "Practical/Lab", hoursPerWeek: 2 },
    // ── CE Year 3 ──
    { code: "CE301",  name: "Structural Analysis",               dept: "Civil",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CE301L", name: "Structural Lab",                    dept: "Civil",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "CE302",  name: "Geotechnical Engineering",          dept: "Civil",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CE302L", name: "Soil Mechanics Lab",                dept: "Civil",  type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "CE303",  name: "Transportation Engineering",        dept: "Civil",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CE304",  name: "Concrete Technology",               dept: "Civil",  type: "Theory",       hoursPerWeek: 3 },
    // ── CE Year 4 ──
    { code: "CE401",  name: "Environmental Engineering",         dept: "Civil",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CE401L", name: "Environmental Lab",                 dept: "Civil",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "CE402",  name: "Construction Management",           dept: "Civil",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CE403",  name: "Design of Steel Structures",        dept: "Civil",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CE404",  name: "Remote Sensing & GIS",              dept: "Civil",  type: "Theory",       hoursPerWeek: 3 },

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

    // ── AIML Year 1 ──
    { code: "AM101",  name: "Foundations of Artificial Intelligence", dept: "AIML", type: "Theory",       hoursPerWeek: 3 },
    { code: "AM101L", name: "AI Programming Lab",                     dept: "AIML", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "AM102",  name: "Calculus & Linear Algebra",              dept: "AIML", type: "Theory",       hoursPerWeek: 3 },
    { code: "AM103",  name: "Introduction to Machine Learning",       dept: "AIML", type: "Theory",       hoursPerWeek: 3 },
    // ── AIML Year 2 ──
    { code: "AM201",  name: "Machine Learning Algorithms",            dept: "AIML", type: "Theory",       hoursPerWeek: 3 },
    { code: "AM201L", name: "ML Lab",                                 dept: "AIML", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "AM202",  name: "Neural Networks",                        dept: "AIML", type: "Theory",       hoursPerWeek: 3 },
    { code: "AM202L", name: "Neural Networks Lab",                    dept: "AIML", type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "AM203",  name: "Data Mining & Warehousing",              dept: "AIML", type: "Theory",       hoursPerWeek: 3 },
    // ── AIML Year 3 ──
    { code: "AM301",  name: "Deep Learning",                          dept: "AIML", type: "Theory",       hoursPerWeek: 3 },
    { code: "AM301L", name: "Deep Learning Lab",                      dept: "AIML", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "AM302",  name: "Computer Vision",                        dept: "AIML", type: "Theory",       hoursPerWeek: 3 },
    { code: "AM302L", name: "Computer Vision Lab",                    dept: "AIML", type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "AM303",  name: "Natural Language Processing",            dept: "AIML", type: "Theory",       hoursPerWeek: 3 },
    // ── AIML Year 4 ──
    { code: "AM401",  name: "Generative AI & Large Language Models",  dept: "AIML", type: "Theory",       hoursPerWeek: 3 },
    { code: "AM401L", name: "GenAI Lab",                              dept: "AIML", type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "AM402",  name: "Reinforcement Learning",                 dept: "AIML", type: "Theory",       hoursPerWeek: 3 },
    { code: "AM402L", name: "RL Lab",                                 dept: "AIML", type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "AM403",  name: "AI Ethics & Governance",                 dept: "AIML", type: "Theory",       hoursPerWeek: 3 },
    { code: "AM404",  name: "AI Capstone Project",                    dept: "AIML", type: "Theory",       hoursPerWeek: 3 },

    // ── CYS Year 1 ──
    { code: "CY101",  name: "Fundamentals of Cybersecurity",          dept: "Cyber Security",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CY101L", name: "Security Lab I",                         dept: "Cyber Security",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "CY102",  name: "Computer Networks Basics",               dept: "Cyber Security",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CY103",  name: "Programming for Security",               dept: "Cyber Security",  type: "Theory",       hoursPerWeek: 3 },
    // ── CYS Year 2 ──
    { code: "CY201",  name: "Network Security",                       dept: "Cyber Security",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CY201L", name: "Network Security Lab",                   dept: "Cyber Security",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "CY202",  name: "Cryptography & Information Security",    dept: "Cyber Security",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CY202L", name: "Cryptography Lab",                       dept: "Cyber Security",  type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "CY203",  name: "Operating Systems Security",             dept: "Cyber Security",  type: "Theory",       hoursPerWeek: 3 },
    // ── CYS Year 3 ──
    { code: "CY301",  name: "Ethical Hacking & Penetration Testing",  dept: "Cyber Security",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CY301L", name: "Ethical Hacking Lab",                    dept: "Cyber Security",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "CY302",  name: "Digital Forensics",                      dept: "Cyber Security",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CY302L", name: "Digital Forensics Lab",                  dept: "Cyber Security",  type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "CY303",  name: "Web Application Security",               dept: "Cyber Security",  type: "Theory",       hoursPerWeek: 3 },
    // ── CYS Year 4 ──
    { code: "CY401",  name: "Malware Analysis & Reverse Engineering", dept: "Cyber Security",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CY401L", name: "Malware Analysis Lab",                   dept: "Cyber Security",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "CY402",  name: "Cloud Security",                         dept: "Cyber Security",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CY402L", name: "Cloud Security Lab",                     dept: "Cyber Security",  type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "CY403",  name: "Incident Response & Threat Intelligence",dept: "Cyber Security",  type: "Theory",       hoursPerWeek: 3 },
    { code: "CY404",  name: "Security Operations & SOC Management",   dept: "Cyber Security",  type: "Theory",       hoursPerWeek: 3 },

    // ── IOT Year 1 ──
    { code: "IO101",  name: "Introduction to Internet of Things",     dept: "IoT",  type: "Theory",       hoursPerWeek: 3 },
    { code: "IO101L", name: "IoT Lab I",                              dept: "IoT",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "IO102",  name: "Electronics for IoT",                    dept: "IoT",  type: "Theory",       hoursPerWeek: 3 },
    { code: "IO103",  name: "Programming for IoT (Python/C)",         dept: "IoT",  type: "Theory",       hoursPerWeek: 3 },
    // ── IOT Year 2 ──
    { code: "IO201",  name: "Embedded Systems & Microcontrollers",    dept: "IoT",  type: "Theory",       hoursPerWeek: 3 },
    { code: "IO201L", name: "Embedded Systems Lab",                   dept: "IoT",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "IO202",  name: "Sensors, Actuators & Interfacing",       dept: "IoT",  type: "Theory",       hoursPerWeek: 3 },
    { code: "IO202L", name: "Sensors Lab",                            dept: "IoT",  type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "IO203",  name: "Wireless Communication Protocols",       dept: "IoT",  type: "Theory",       hoursPerWeek: 3 },
    // ── IOT Year 3 ──
    { code: "IO301",  name: "IoT Architecture & System Design",       dept: "IoT",  type: "Theory",       hoursPerWeek: 3 },
    { code: "IO301L", name: "IoT Design Lab",                         dept: "IoT",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "IO302",  name: "Edge Computing & Fog Computing",         dept: "IoT",  type: "Theory",       hoursPerWeek: 3 },
    { code: "IO302L", name: "Edge Computing Lab",                     dept: "IoT",  type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "IO303",  name: "IoT Security & Privacy",                 dept: "IoT",  type: "Theory",       hoursPerWeek: 3 },
    // ── IOT Year 4 ──
    { code: "IO401",  name: "Industrial IoT & Industry 4.0",          dept: "IoT",  type: "Theory",       hoursPerWeek: 3 },
    { code: "IO401L", name: "Industrial IoT Lab",                     dept: "IoT",  type: "Practical/Lab", hoursPerWeek: 4 },
    { code: "IO402",  name: "Smart Systems & Automation",             dept: "IoT",  type: "Theory",       hoursPerWeek: 3 },
    { code: "IO402L", name: "Automation Lab",                         dept: "IoT",  type: "Practical/Lab", hoursPerWeek: 2 },
    { code: "IO403",  name: "Cloud IoT Platforms & Analytics",        dept: "IoT",  type: "Theory",       hoursPerWeek: 3 },
    { code: "IO404",  name: "IoT Capstone Project",                   dept: "IoT",  type: "Theory",       hoursPerWeek: 3 }
];

const DEFAULT_STAFF = [];


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
        if (!localStorage.getItem("tt_staff_cleared_v2")) {
            this.saveStaff([]);
            localStorage.setItem("tt_staff_cleared_v2", "true");
        }
        // Force reset if sections are outdated (old data had only 20, new has 40)
        const existingSections = JSON.parse(localStorage.getItem(STORAGE_KEYS.SECTIONS));
        if (!existingSections || existingSections.length < 40) {
            this.resetAll();
            return;
        }
        // Force reset if old department names are found
        if (existingSections.some(s => ["ME", "CE", "CYS", "IOT"].includes(s.dept))) {
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
