// College Timetable Management System - Core Data & Storage
const DEFAULT_DEPARTMENTS = ["CSE", "ECE", "ME", "CE", "EEE"];

const DEFAULT_ROOMS = [
    { name: "Room 101", type: "Classroom", capacity: 60, dept: "All" },
    { name: "Room 102", type: "Classroom", capacity: 60, dept: "All" },
    { name: "Room 103", type: "Classroom", capacity: 60, dept: "All" },
    { name: "Room 201", type: "Classroom", capacity: 60, dept: "All" },
    { name: "Room 202", type: "Classroom", capacity: 60, dept: "All" },
    { name: "CS Lab Alpha", type: "Lab", capacity: 40, dept: "CSE" },
    { name: "CS Lab Beta", type: "Lab", capacity: 40, dept: "CSE" },
    { name: "Electronics Circuits Lab", type: "Lab", capacity: 30, dept: "ECE" },
    { name: "Digital Signal Processing Lab", type: "Lab", capacity: 30, dept: "ECE" },
    { name: "Thermal Engineering Lab", type: "Lab", capacity: 30, dept: "ME" },
    { name: "Fluid Mechanics Lab", type: "Lab", capacity: 30, dept: "ME" },
    { name: "Concrete Technology Lab", type: "Lab", capacity: 30, dept: "CE" },
    { name: "Electrical Machines Lab", type: "Lab", capacity: 35, dept: "EEE" }
];

const DEFAULT_SECTIONS = [
    // CSE - All 4 Years
    { id: "CSE-Y1", name: "CSE 1st Year", dept: "CSE" },
    { id: "CSE-Y2", name: "CSE 2nd Year", dept: "CSE" },
    { id: "CSE-Y3", name: "CSE 3rd Year", dept: "CSE" },
    { id: "CSE-Y4", name: "CSE 4th Year", dept: "CSE" },
    // ECE - All 4 Years
    { id: "ECE-Y1", name: "ECE 1st Year", dept: "ECE" },
    { id: "ECE-Y2", name: "ECE 2nd Year", dept: "ECE" },
    { id: "ECE-Y3", name: "ECE 3rd Year", dept: "ECE" },
    { id: "ECE-Y4", name: "ECE 4th Year", dept: "ECE" },
    // ME - All 4 Years
    { id: "ME-Y1", name: "ME 1st Year", dept: "ME" },
    { id: "ME-Y2", name: "ME 2nd Year", dept: "ME" },
    { id: "ME-Y3", name: "ME 3rd Year", dept: "ME" },
    { id: "ME-Y4", name: "ME 4th Year", dept: "ME" },
    // CE - All 4 Years
    { id: "CE-Y1", name: "CE 1st Year", dept: "CE" },
    { id: "CE-Y2", name: "CE 2nd Year", dept: "CE" },
    { id: "CE-Y3", name: "CE 3rd Year", dept: "CE" },
    { id: "CE-Y4", name: "CE 4th Year", dept: "CE" },
    // EEE - All 4 Years
    { id: "EEE-Y1", name: "EEE 1st Year", dept: "EEE" },
    { id: "EEE-Y2", name: "EEE 2nd Year", dept: "EEE" },
    { id: "EEE-Y3", name: "EEE 3rd Year", dept: "EEE" },
    { id: "EEE-Y4", name: "EEE 4th Year", dept: "EEE" }
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
    { code: "EE404",  name: "Renewable Energy Systems",          dept: "EEE", type: "Theory",       hoursPerWeek: 3 }
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
    { id: "ST041", name: "Dr. K. Srinivasan", dept: "EEE", email: "k.srinivasan@college.edu", subjects: ["EE101", "EE201", "EE202"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST042", name: "Prof. Laxmi Prasad", dept: "EEE", email: "laxmi.prasad@college.edu", subjects: ["EE101L", "EE202", "EE101"], maxHoursPerWeek: 16, isAbsent: false },
    { id: "ST043", name: "Mr. Dennis Mathew", dept: "EEE", email: "dennis.mathew@college.edu", subjects: ["EE101", "EE201", "EE101L"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST044", name: "Dr. Archana Sen", dept: "EEE", email: "archana.sen@college.edu", subjects: ["EE201", "EE202", "EE101"], maxHoursPerWeek: 15, isAbsent: false },
    { id: "ST045", name: "Mrs. Preeti Vyas", dept: "EEE", email: "preeti.vyas@college.edu", subjects: ["EE101L", "EE201", "EE202"], maxHoursPerWeek: 14, isAbsent: false },
    { id: "ST046", name: "Mr. Jose Kurian", dept: "EEE", email: "jose.kurian@college.edu", subjects: ["EE101", "EE101L", "EE202"], maxHoursPerWeek: 12, isAbsent: false }
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
        // Force reset if sections are outdated (old data had only 6, new has 20)
        const existingSections = JSON.parse(localStorage.getItem(STORAGE_KEYS.SECTIONS));
        if (!existingSections || existingSections.length < 20) {
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
