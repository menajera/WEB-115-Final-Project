let myDiv = document.getElementById("task-manager");

class Task {
    /*  id = 0;
    name = "";
    priority = "";
    isImportant = true;
    isCompleted = false;
    date = "";         */
    constructor(id, name, priority, isImportant, isCompleted) {
        this.id = id;
        this.name = name;
        this.priority = priority;
        this.isImportant = isImportant;
        this.isCompleted = isCompleted;
        this.date = new Date().toLocaleDateString(); // Set the creation date
    }
}

// Array of tasks objects
let taskList = [];

// Add a new task to array
function addNewTask() {
    let taskId = taskList.length ? taskList[taskList.length - 1].id + 1 : 1; //add task id number
    let taskName = document.getElementById("inputTask").value;
    let taskPriority = document.getElementById("prioritySelect").value;
    let taskIsImportant = document.getElementById("importantCheckbox").checked;
    let taskIsCompleted = false;
    let newTask = new Task(taskId, taskName, taskPriority, taskIsImportant, taskIsCompleted);

    taskList.push(newTask); 

    updateTaskList();// Update task list to reflect new task   
}

// Update the task list, display list in div, add delete & complete checkbox to each task
function updateTaskList() {
    let taskItemsList = document.getElementById("taskList");

    // Clear the task list before updating
    taskItemsList.innerHTML = "";

    taskList.forEach(function(task) {
        // Create list item for each task
        let taskListItem = document.createElement("li");
        // Create a classList to put spaces in CSS
        taskListItem.classList.add("task-item");
        // Escape sequence pg. 51
        taskListItem.textContent = `${task.name} Priority: ${task.priority} ${task.date}`;

        // Check if the task is important, highlight in red if so
        if (task.isImportant) {
            taskListItem.style.backgroundColor = "red";
        }

        taskItemsList.appendChild(taskListItem);

        // Add checkbox and delete button to each task for user manipulation
        addCompleteCheckBox(taskListItem, task);
        addDeleteButton(taskListItem, task);
    });
}
//  Create Completecheckbox & listen if checked to strikthrough task
function addCompleteCheckBox(taskListItem, task) {
    const completeCheckBox = document.createElement("input");
    const completeLabel = document.createTextNode("Complete");

    completeCheckBox.type = "checkbox";
    completeCheckBox.checked = task.isCompleted;

    taskListItem.appendChild(completeCheckBox);
    // Label the checkbox Complete
    taskListItem.appendChild(completeLabel);
    

    // Check isCompleted false checkbox & listen for complete to toggle
    completeCheckBox.addEventListener("change", function() {
        task.isCompleted = completeCheckBox.checked;
        if (completeCheckBox.checked) {
            taskListItem.style.textDecoration = "line-through"; // Toggle strikthrough if checked
            completeLabel.textContent = "Undo";
            updateTaskList();
            fullTaskListLog(); // log in console
        } else {
            taskListItem.style.textDecoration = "none"; // Toggle back to no strike if unchecked
            completeLabel.textContent = "Complete";
            updateTaskList();
            fullTaskListLog(); // log in console
        }
    });
}

// Create delete button, listen for it to be clicked
function addDeleteButton(taskListItem, task) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.id = "delete-button";

    taskListItem.appendChild(deleteButton);

    deleteButton.addEventListener("click", function() {
        deleteTask(task.name);
        // Update task list and console log after delete
        updateTaskList();
        fullTaskListLog(); // log in console
    });
}

// Delete from div, Array, and console
function deleteTask(taskName) {
    taskList = taskList.filter(function(task) {
        return task.name !== taskName;
    });

    
}


// Submit form & validate that input field is not empty
document.getElementById("myForm").addEventListener("submit", function(event) {
event.preventDefault();
let inputField = document.getElementById("inputTask");
let importantCheckBox = document.getElementById("importantCheckbox");
// Alert if task input is empty
if (inputField.value === '') {
    alert("You must enter a task description or name!");
  } else {
    addNewTask();
    updateTaskList();
    inputField.value = ""; // Reset input field to blank
    importantCheckBox.checked = false; // Reset checkbox to false so it's unchecked
  }
  fullTaskListLog(); // // Log in console
});    

// Log in console using JSON.stringify
function fullTaskListLog() {
    // Syntax JSON.stringify(value, replacer, space)
   console.log(JSON.stringify(taskList, null, "\t"));
}