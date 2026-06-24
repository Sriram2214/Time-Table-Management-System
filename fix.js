const fs = require('fs');
let data = fs.readFileSync('data.js', 'utf8');

// Update DEFAULT_DEPARTMENTS array
data = data.replace(
  /const DEFAULT_DEPARTMENTS = \[.*\];/,
  'const DEFAULT_DEPARTMENTS = ["CSE", "IT", "AIDS", "AIML", "Cyber Security", "IoT", "ECE", "EEE", "Mechanical", "Civil"];'
);

// Replace dept values
data = data.replace(/dept: "CYS"/g, 'dept: "Cyber Security"');
data = data.replace(/dept: "IOT"/g, 'dept: "IoT"');
data = data.replace(/dept: "ME"/g, 'dept: "Mechanical"');
data = data.replace(/dept: "CE"/g, 'dept: "Civil"');

// Replace class section names
data = data.replace(/"CYS (\d[a-z]{2} Year)"/g, '"Cyber Security $1"');
data = data.replace(/"IoT (\d[a-z]{2} Year)"/g, '"IoT $1"');
data = data.replace(/"ME (\d[a-z]{2} Year)"/g, '"Mechanical $1"');
data = data.replace(/"CE (\d[a-z]{2} Year)"/g, '"Civil $1"');

fs.writeFileSync('data.js', data);
console.log("data.js updated");
