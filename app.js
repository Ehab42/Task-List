/* Defint UI variables */
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

/* Function to load all Event Listeners */
// loadEventListeners();

// function loadEventListeners() {

// DOM Load Event
document.addEventListener('DOMContentLoaded', getStoredTasks);

// Add task event
form.addEventListener('submit', addTask);

// Remove Task Event
taskList.addEventListener('click', removeTask);

// Clear Tasks Event
clearBtn.addEventListener('click', clearTasks);

// Filter through tasks
filter.addEventListener('keyup', filterTasks);


// }

/* Add task function */
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add Task');
    } else {
        // Create li element for the task
        const li = document.createElement('li');
        li.className = 'collection-item';
        // Create Text Node and append to the li
        li.appendChild(document.createTextNode(taskInput.value));
        // Create new link element
        const link = document.createElement('a');
        // Add Class to the links
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to the li
        li.appendChild(link);

        // Append the li to the ul
        taskList.appendChild(li);

        // Store it in Local Storage
        storeTaskInLocalStorage(taskInput.value);

        // Clear the input
        taskInput.value = '';
    }



    e.preventDefault();
}

/* Remove task function */
function removeTask(e) {
    if (e.target.classList.contains('fa')) {
        if (confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();


            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }

    e.preventDefault();
}

/* Clear tasks function */
function clearTasks(e) {
    // taskList.innerHTML = ''; // One way to do it

    // Faster Way
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    localStorage.clear('taskLists');
}

/* Filter tasks function: Understand More */
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        // console.log(item);
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none ';
        }
    });


    e.preventDefault();
}

/* Store Task in local Storage function */
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('taskList') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('taskList'));
    }



    tasks.push(task);
    localStorage.setItem('taskList', JSON.stringify(tasks));
}

/* DOMContentLoaded event function: This function get the tasks from local storage on page load, and store it in the ul */
function getStoredTasks(e) {
    if (localStorage.getItem('taskList') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('taskList'));
    }

    tasks.forEach(function (task) {
        // Create li element for the task
        const li = document.createElement('li');
        li.className = 'collection-item';
        // Create Text Node and append to the li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add Class to the links
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to the li
        li.appendChild(link);

        // Append the li to the ul
        taskList.appendChild(li);
    });
}

/* Function to remove a task from LS */
function removeTaskFromLocalStorage(tsk) {
    let tasks;
    if (localStorage.getItem('taskList') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('taskList'));
    }

    tasks.forEach(function (task, index) {
        if (tsk.textContent === task) {
            tasks.splice(task, 1);
        }
    });

    localStorage.setItem('taskList', JSON.stringify(tasks));
}
