const inputtdl = document.querySelector('.textarea');
const buttontdl = document.querySelector('.buttoninput');
const listtdl = document.querySelector('.todolist');

document.addEventListener('DOMContentLoaded', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text));
});

function clickButton(e) {
    e.preventDefault();
    addTodo();
}

function addTodo() {
    const taskText = inputtdl.value.trim();
    if (taskText === '') return;

    addTask(taskText);
    saveTask(taskText);

    inputtdl.value = '';
}

function addTask(taskText) {
    const itemall = document.createElement('div');
    itemall.classList.add('itemall');

    const item = document.createElement('p');
    item.classList.add('item');
    item.innerText = taskText;
    itemall.appendChild(item);

    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
    editButton.classList.add("edit-button");
    itemall.appendChild(editButton);

    const checkbutton = document.createElement("button");
    checkbutton.innerHTML = '<i class="fa-solid fa-check"></i>';
    checkbutton.classList.add("check-button");
    itemall.appendChild(checkbutton);

    const trashbutton = document.createElement("button");
    trashbutton.innerHTML = '<i id="delete-btn" class="fa-solid fa-trash"></i>';
    trashbutton.classList.add("trash-button");
    itemall.appendChild(trashbutton);

    listtdl.appendChild(itemall);

    editButton.addEventListener('click', editTodo);
    checkbutton.addEventListener('click', toggleCheck);
    trashbutton.addEventListener('click', deleteTask);
}

function editTodo(e) {
    const editButton = e.target;
    const item = editButton.parentElement.querySelector('.item');
    const newText = prompt("Enter new text:", item.innerText.trim());

    if (newText !== null && newText.trim() !== '') {
        item.innerText = newText.trim();
        updateTaskInLocalStorage(item.innerText);
    }
}

function toggleCheck(e) {
    const checkbutton = e.target;
    const todolist = checkbutton.parentElement;
    todolist.classList.toggle('checklist');
}

function deleteTask(e) {
    const trashbutton = e.target;
    const todolist = trashbutton.parentElement;
    const taskText = todolist.querySelector('.item').innerText.trim();
    todolist.remove();
    deleteTaskFromLocalStorage(taskText);
}

function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(newText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = tasks.findIndex(task => task.text === newText);
    if (index !== -1) {
        tasks[index].text = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function deleteTaskFromLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

buttontdl.addEventListener('click', clickButton);
