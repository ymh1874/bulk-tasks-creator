# bulk-tasks-creator
Automatically create multiple tasks in Google Tasks from a list. Ideal for students adding course assignments with due dates.
 methods: Direct code edit, CSV file, or CLI tool
- Automatically set due dates and point values
- Create dozens of tasks in seconds
- Easy to customize for any course
- Utility functions to manage tasks

## Quick Start

### Method 1: Direct Code Edit (Simplest)

1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Copy Code.gs from this repo
4. Enable Google Tasks API (Services > Add > Google Tasks API)
5. Edit the ASSIGNMENTS array with your data
6. Run createCourseTasks()

### Method 2: CSV Import (Best for Large Lists)

1. Create or download assignments.csv with your data
2. Upload CSV to Google Drive
3. In Apps Script, run createTasksFromCSV()

CSV Format:
```
name,points,dueMonth,dueDay
Assignment 1,100,1,15
Quiz 1,50,1,22
Midterm Exam,200,2,20
```

### Method 3: CLI Tool (Terminal)

1. Download import.sh from this repo
2. Run in terminal:
```bash
chmod +x import.sh
./import.sh
```
3. Follow prompts to enter assignments
4. Upload generated CSV to Drive
5. Use Method 2 to import

## Setup Instructions

### Step 1: Create Apps Script Project

1. Visit [script.google.com](https://script.google.com)
2. Click "New Project"
3. Name it (e.g., "Course Tasks Importer")

### Step 2: Add Code

1. Delete existing code in editor
2. Copy entire Code.gs from this repo
3. Paste into editor

### Step 3: Enable Google Tasks API

1. Click Services (plus icon in left sidebar)
2. Find "Google Tasks API"
3. Click "Add"

### Step 4: Configure

Edit the CONFIG section in Code.gs:

```javascript
var CONFIG = {
  listName: "CS 101: Programming",  // Your course name
  year: 2026,                        // Current year
  timeZone: "Asia/Qatar",           // Qatar/Doha timezone
  csvFileName: "assignments.csv"    // CSV filename (if using CSV)
};
```

### Step 5: Add Your Data

**Option A: Edit code directly**

Edit the ASSIGNMENTS array:
```javascript
var ASSIGNMENTS = [
  {name: "Assignment 1", points: 100, dueMonth: 1, dueDay: 15},
  {name: "Quiz 1", points: 50, dueMonth: 1, dueDay: 22},
  {name: "Midterm Exam", points: 200, dueMonth: 2, dueDay: 20}
];
```

**Option B: Use CSV file**

1. Create assignments.csv in same Drive folder
2. Format: name,points,dueMonth,dueDay
3. Run createTasksFromCSV() instead

### Step 6: Run

1. Select function from dropdown:
   - createCourseTasks() for direct code method
   - createTasksFromCSV() for CSV method
2. Click Run button
3. Authorize when prompted:
   - Click "Review Permissions"
   - Choose your account
   - Click "Advanced" then "Go to [Project] (unsafe)"
   - Click "Allow"
4. Check logs for confirmation
5. Visit [tasks.google.com](https://tasks.google.com)

## Examples

### Example 1: Programming Course

```javascript
var CONFIG = {
  listName: "CS 101: Introduction to Programming",
  year: 2026,
  timeZone: "Asia/Qatar"
};

var ASSIGNMENTS = [
  {name: "Lab 1: Variables", points: 20, dueMonth: 1, dueDay: 15},
  {name: "Lab 2: Loops", points: 20, dueMonth: 1, dueDay: 22},
  {name: "Project 1", points: 100, dueMonth: 2, dueDay: 5},
  {name: "Midterm", points: 150, dueMonth: 2, dueDay: 20}
];
```

### Example 2: Using CSV

Create assignments.csv:
```
name,points,dueMonth,dueDay
Reading Assignment 1,10,1,12
Essay 1,50,1,20
Reading Assignment 2,10,1,26
Essay 2,50,2,10
Research Paper,100,3,15
Final Presentation,75,4,20
```

### Example 3: CLI Tool

```bash
$ ./import.sh

Course name: MATH 201
Year: 2026
CSV filename: math201.csv

Enter assignments (type DONE when finished):
Problem Set 1, 25, 1, 18
Quiz 1, 15, 1, 25
Problem Set 2, 25, 2, 1
Midterm, 100, 2, 15
DONE

CSV file created: math201.csv
Total assignments: 4
```

## Utility Functions

### Delete All Tasks

To clear all tasks in your configured list:
```javascript
deleteAllTasksInList()
```

### List All Task Lists

To see all your task lists:
```javascript
listAllTaskLists()
```

## File Structure

```
google-tasks-bulk-importer/
├── Code.gs              # Main Apps Script code
├── assignments.csv      # Example CSV template
├── import.sh            # CLI helper script
├── README.md            # Documentation
└── LICENSE              # MIT License
```

## Important Notes

### Month Numbers
- 1 = January
- 2 = February
- 3 = March
- 4 = April
- 5 = May
- 6 = June
- 7 = July
- 8 = August
- 9 = September
- 10 = October
- 11 = November
- 12 = December

### Time Zones
Common time zones:
- Asia/Qatar (Doha)
- America/New_York (US Eastern)
- America/Chicago (US Central)
- America/Denver (US Mountain)
- America/Los_Angeles (US Pacific)
- Europe/London (UK)
- Asia/Dubai (UAE)

### Tips
- Test with 2-3 assignments first before bulk import
- Multiple courses: Run multiple times with different configs
- Check execution logs for detailed output
- CSV must be in same Drive folder or specify full path

## Common Issues

### "Tasks is not defined"
Solution: Enable Google Tasks API in Services

### "CSV file not found"
Solution: Upload CSV to Google Drive, ensure filename matches CONFIG.csvFileName

### Tasks not appearing
Solution: 
- Check tasks.google.com
- Look for your list name in left sidebar
- Check execution logs for errors

### "Authorization required"
Solution: Click "Review Permissions" and allow access to Google Tasks

### Wrong dates
Solution: Verify year in CONFIG and month numbers (1-12)

## Contributing

Contributions welcome! Feel free to submit bug reports, feature requests, or pull requests.

## License

MIT License - Free to use and modify

## Support

- Star this repo if you find it helpful
- Report issues on GitHub
- Suggest features via Issues

---

C
