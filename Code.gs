/**
 * Google Tasks Bulk Creator
 * 
 * THREE WAYS TO USE:
 * 1. Edit ASSIGNMENTS array directly in this file
 * 2. Upload CSV file to same folder as this script
 * 3. Use the CLI script to generate CSV from terminal
 */

// ============== CONFIGURATION ==============
// Change these values for your course
var CONFIG = {
  listName: "CS 101: Programming",  // Name of your task list
  year: 2026,                        // Year for all assignments
  timeZone: "Asia/Qatar",           // Qatar/Doha timezone
  csvFileName: "assignments.csv"    // CSV file name (for Method 2)
};

// ============== ASSIGNMENTS (METHOD 1) ==============
// Edit this array with your assignments
// Format: {name: "Assignment Name", points: 50, dueMonth: 1, dueDay: 15}
// Months: 1=January, 2=February, 3=March, etc.
var ASSIGNMENTS = [
  {name: "Assignment 1", points: 100, dueMonth: 1, dueDay: 15},
  {name: "Quiz 1", points: 50, dueMonth: 1, dueDay: 22},
  {name: "Assignment 2", points: 100, dueMonth: 2, dueDay: 5},
  {name: "Midterm Exam", points: 200, dueMonth: 2, dueDay: 20},
  {name: "Assignment 3", points: 100, dueMonth: 3, dueDay: 5},
  {name: "Final Project", points: 300, dueMonth: 4, dueDay: 15}
];

// ============== MAIN FUNCTION ==============
// Run this to create tasks from ASSIGNMENTS array above
function createCourseTasks() {
  try {
    Logger.log("Starting task creation...");
    
    // Get or create the task list
    var listId = getOrCreateTaskList(CONFIG.listName);
    Logger.log("Using task list: " + CONFIG.listName);
    
    // Create each task
    var successCount = 0;
    for (var i = 0; i < ASSIGNMENTS.length; i++) {
      var assignment = ASSIGNMENTS[i];
      var dueDate = formatDate(CONFIG.year, assignment.dueMonth, assignment.dueDay);
      
      // Create task object
      var task = {
        title: assignment.name + " (" + assignment.points + " pts)",
        notes: "Due: " + dueDate + "\nPoints: " + assignment.points,
        due: dueDate + "T23:59:00.000Z"
      };
      
      // Insert task
      Tasks.Tasks.insert(task, listId);
      successCount++;
      Logger.log("Created: " + assignment.name + " - Due: " + dueDate);
    }
    
    // Show success message
    Logger.log("\n========================================");
    Logger.log("SUCCESS! Created " + successCount + " tasks");
    Logger.log("Check: https://tasks.google.com");
    Logger.log("========================================");
    
  } catch (error) {
    Logger.log("ERROR: " + error.toString());
    Logger.log("Make sure Google Tasks API is enabled in Services!");
  }
}

// ============== METHOD 2: CSV IMPORT ==============
// Run this to create tasks from CSV file
function createTasksFromCSV() {
  try {
    Logger.log("Looking for CSV file: " + CONFIG.csvFileName);
    
    // Find CSV file in Drive
    var files = DriveApp.getFilesByName(CONFIG.csvFileName);
    
    if (!files.hasNext()) {
      Logger.log("ERROR: CSV file not found!");
      Logger.log("Upload '" + CONFIG.csvFileName + "' to Google Drive");
      Logger.log("\nCSV Format:");
      Logger.log("name,points,dueMonth,dueDay");
      Logger.log("Assignment 1,100,1,15");
      Logger.log("Quiz 1,50,1,22");
      return;
    }
    
    // Read and parse CSV
    var file = files.next();
    var csvContent = file.getBlob().getDataAsString();
    var assignments = parseCSV(csvContent);
    
    Logger.log("Found " + assignments.length + " assignments in CSV");
    
    // Get or create task list
    var listId = getOrCreateTaskList(CONFIG.listName);
    var successCount = 0;
    
    // Create each task
    for (var i = 0; i < assignments.length; i++) {
      var assignment = assignments[i];
      var dueDate = formatDate(CONFIG.year, assignment.dueMonth, assignment.dueDay);
      
      var task = {
        title: assignment.name + " (" + assignment.points + " pts)",
        notes: "Due: " + dueDate + "\nPoints: " + assignment.points,
        due: dueDate + "T23:59:00.000Z"
      };
      
      Tasks.Tasks.insert(task, listId);
      successCount++;
      Logger.log("Created: " + assignment.name);
    }
    
    Logger.log("\n========================================");
    Logger.log("SUCCESS! Created " + successCount + " tasks from CSV");
    Logger.log("========================================");
    
  } catch (error) {
    Logger.log("ERROR: " + error.toString());
  }
}

// ============== HELPER FUNCTIONS ==============

// Parse CSV content into assignments array
function parseCSV(csvContent) {
  var lines = csvContent.split("\n");
  var assignments = [];
  
  // Skip header line, process data lines
  for (var i = 1; i < lines.length; i++) {
    var line = lines[i].trim();
    if (line.length === 0) continue;
    
    var parts = line.split(",");
    if (parts.length >= 4) {
      assignments.push({
        name: parts[0].trim(),
        points: parseInt(parts[1].trim()),
        dueMonth: parseInt(parts[2].trim()),
        dueDay: parseInt(parts[3].trim())
      });
    }
  }
  
  return assignments;
}

// Get existing task list or create new one
function getOrCreateTaskList(listName) {
  var taskLists = Tasks.Tasklists.list();
  
  // Check if list already exists
  if (taskLists.items) {
    for (var i = 0; i < taskLists.items.length; i++) {
      if (taskLists.items[i].title === listName) {
        return taskLists.items[i].id;
      }
    }
  }
  
  // Create new list if not found
  var newList = Tasks.Tasklists.insert({title: listName});
  return newList.id;
}

// Format date as YYYY-MM-DD
function formatDate(year, month, day) {
  var monthStr = month < 10 ? "0" + month : month.toString();
  var dayStr = day < 10 ? "0" + day : day.toString();
  return year + "-" + monthStr + "-" + dayStr;
}

// ============== UTILITY FUNCTIONS ==============

// Delete all tasks in configured list
// Run this to start over or fix mistakes
function deleteAllTasksInList() {
  var listName = CONFIG.listName;
  var taskLists = Tasks.Tasklists.list();
  
  if (taskLists.items) {
    for (var i = 0; i < taskLists.items.length; i++) {
      if (taskLists.items[i].title === listName) {
        var listId = taskLists.items[i].id;
        var tasks = Tasks.Tasks.list(listId);
        
        if (tasks.items) {
          for (var j = 0; j < tasks.items.length; j++) {
            Tasks.Tasks.remove(listId, tasks.items[j].id);
          }
          Logger.log("Deleted " + tasks.items.length + " tasks from " + listName);
        }
        return;
      }
    }
  }
  Logger.log("List not found: " + listName);
}

// List all your task lists
// Run this to see what lists you have
function listAllTaskLists() {
  var lists = Tasks.Tasklists.list();
  Logger.log("Your task lists:");
  if (lists.items) {
    for (var i = 0; i < lists.items.length; i++) {
      Logger.log("- " + lists.items[i].title);
    }
  }
}
