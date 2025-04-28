


function createTaskElement(taskText) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';

    const textarea = document.createElement('textarea');
    textarea.className = 'form-control task-textarea mb-3';
    textarea.value = taskText;

    const button = document.createElement('button');
    button.className = 'btn btn-primary w-100';
    button.textContent = 'Delete';

    button.addEventListener('click', () => {
        taskDiv.remove();
        saveTasksToLocalStorage();
    });

    taskDiv.appendChild(textarea);
    taskDiv.appendChild(button);

    return taskDiv;
}

function saveTasksToLocalStorage() {
    const taskTextareas = document.querySelectorAll('#tasks .task textarea');
    const tasks = Array.from(taskTextareas).map(t => t.value.trim());
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



function loadTasksFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));

    const tasksContainer = document.getElementById('tasks');

    if (savedTasks && savedTasks.length > 0) {
        // Limpa apenas se há algo no localStorage
        tasksContainer.innerHTML = '';

        // Cria as tarefas baseadas no que foi salvo
        savedTasks.forEach(text => {
            const task = createTaskElement(text);
            tasksContainer.appendChild(task);
        });
    } else {
        // Se não houver nada salvo, pega as tarefas fixas do HTML
        // e salva no localStorage
        const fixedTasks = document.querySelectorAll('#tasks .task textarea');
        const taskArray = Array.from(fixedTasks).map(t => t.value.trim());

        localStorage.setItem('tasks', JSON.stringify(taskArray));
    }
}


function addTask() {
    const taskInput = document.querySelector('#taskForm textarea');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const task = createTaskElement(taskText);
        document.getElementById('tasks').appendChild(task);
        taskInput.value = '';
        saveTasksToLocalStorage();
    } else {
        alert('Por favor, digite uma tarefa.');
    }
}

function init() {
    loadTasksFromLocalStorage();

    const addButton = document.querySelector('#taskForm button');
    addButton.addEventListener('click', addTask);
}

window.onload = init;

