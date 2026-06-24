import re

with open('data.js', 'r', encoding='utf-8') as f:
    data = f.read()

# Update DEFAULT_DEPARTMENTS array
data = re.sub(
    r'const DEFAULT_DEPARTMENTS = \[.*\];',
    'const DEFAULT_DEPARTMENTS = ["CSE", "IT", "AIDS", "AIML", "Cyber Security", "IoT", "ECE", "EEE", "Mechanical", "Civil"];',
    data
)

# Replace dept values
data = data.replace('dept: "CYS"', 'dept: "Cyber Security"')
data = data.replace('dept: "IOT"', 'dept: "IoT"')
data = data.replace('dept: "ME"', 'dept: "Mechanical"')
data = data.replace('dept: "CE"', 'dept: "Civil"')

# Replace class section names
data = re.sub(r'"CYS (\d[a-z]{2} Year)"', r'"Cyber Security \1"', data)
data = re.sub(r'"IOT (\d[a-z]{2} Year)"', r'"IoT \1"', data)
data = re.sub(r'"ME (\d[a-z]{2} Year)"', r'"Mechanical \1"', data)
data = re.sub(r'"CE (\d[a-z]{2} Year)"', r'"Civil \1"', data)

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(data)

print("data.js updated")
