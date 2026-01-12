#!/bin/bash

# Google Tasks Bulk Import CLI Tool
# Creates CSV file from terminal input

echo "=========================================="
echo "Google Tasks Bulk Import - CLI Tool"
echo "=========================================="
echo ""

# Get course information
read -p "Course name (e.g., CS 101): " course_name
read -p "Year (e.g., 2026): " year
read -p "CSV filename [assignments.csv]: " csv_file
csv_file=${csv_file:-assignments.csv}

echo ""
echo "Enter assignments in this format:"
echo "  Name, Points, Month, Day"
echo ""
echo "Example:"
echo "  Assignment 1, 100, 1, 15"
echo "  Quiz 1, 50, 1, 22"
echo ""
echo "Type DONE when finished"
echo "----------------------------"

# Create CSV with header
echo "name,points,dueMonth,dueDay" > "$csv_file"

# Read assignments from user input
while IFS= read -r line; do
    # Stop if user types DONE
    if [ "$line" = "DONE" ] || [ "$line" = "done" ]; then
        break
    fi
    
    # Skip empty lines
    if [ -z "$line" ]; then
        continue
    fi
    
    # Clean up spaces and append to CSV
    echo "$line" | sed 's/ *, */,/g' >> "$csv_file"
done

echo ""
echo "=========================================="
echo "CSV file created: $csv_file"
echo "=========================================="
echo ""

# Count assignments
assignment_count=$(($(wc -l < "$csv_file") - 1))
echo "Total assignments: $assignment_count"
echo ""

# Show preview
echo "Preview:"
echo "----------------------------"
head -n 6 "$csv_file"
if [ $assignment_count -gt 5 ]; then
    echo "..."
fi
echo ""

# Show config to copy
echo "=========================================="
echo "Configuration for Code.gs:"
echo "=========================================="
echo ""
echo "var CONFIG = {"
echo "  listName: \"$course_name\","
echo "  year: $year,"
echo "  timeZone: \"Asia/Qatar\","
echo "  csvFileName: \"$csv_file\""
echo "};"
echo ""

# Show next steps
echo "=========================================="
echo "NEXT STEPS:"
echo "=========================================="
echo "1. Upload $csv_file to Google Drive"
echo "2. Go to script.google.com"
echo "3. Copy Code.gs from repository"
echo "4. Update CONFIG with values above"
echo "5. Run createTasksFromCSV()"
echo ""
