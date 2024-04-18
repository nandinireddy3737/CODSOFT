document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // Load tasks from local storage when the page is loaded
    loadTasks();

    // Event listener for adding a new task
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    // Function to add a new task
    function addTask(taskText) {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(taskItem);
        saveTasksToLocalStorage();
        addTaskEventListeners(taskItem);
    }

    // Function to add event listeners to edit and delete buttons for each task
    function addTaskEventListeners(taskItem) {
        const editButton = taskItem.querySelector('.edit-btn');
        const deleteButton = taskItem.querySelector('.delete-btn');

        editButton.addEventListener('click', function() {
            const newText = prompt('Edit task:', taskItem.querySelector('.task-text').textContent);
            if (newText !== null && newText.trim() !== '') {
                taskItem.querySelector('.task-text').textContent = newText;
                saveTasksToLocalStorage();
            }
        });

        deleteButton.addEventListener('click', function() {
            taskItem.remove();
            saveTasksToLocalStorage();
        });
    }

    // Function to load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(function(taskText) {
                addTask(taskText);
            });
        }
    }

    // Function to save tasks to local storage
    function saveTasksToLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('.task-text').forEach(function(taskText) {
            tasks.push(taskText.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
