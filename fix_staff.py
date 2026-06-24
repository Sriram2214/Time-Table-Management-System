import re

with open('data.js', 'r', encoding='utf-8') as f:
    data = f.read()

# Replace DEFAULT_STAFF array with empty array
data = re.sub(r'const DEFAULT_STAFF = \[[\s\S]*?\];', 'const DEFAULT_STAFF = [];', data)

init_block = '''    initialize() {
        if (!localStorage.getItem("tt_staff_cleared_v1")) {
            this.saveStaff([]);
            localStorage.setItem("tt_staff_cleared_v1", "true");
        }'''

data = data.replace('    initialize() {', init_block)

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(data)
