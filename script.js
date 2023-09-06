const storage = window.localStorage;
let taskList = [];

function findContainer() {
  return document.querySelector('.container');
}

function createCheckButton() {
  const checkElem = document.createElement('button');
  checkElem.addEventListener('click', checkTask);

  return checkElem;
}

function createInput(className, placeholder, listenerFunc) {
  const inputElem = document.createElement('input');
  inputElem.classList.add(className);
  inputElem.setAttribute('type', 'text');
  inputElem.setAttribute('placeholder', placeholder);
  inputElem.addEventListener('blur', listenerFunc);

  return inputElem;
}

function createTaskNameInput() {
  return createInput('name', 'Add a task name here', applyNameValue);
}

function createDescriptionInput() {
  return createInput(
    'description',
    'Add a description here',
    applyDescriptionValue
  );
}

function createTask(task, dataIndex) {
  const newTaskElem = document.createElement('div');
  newTaskElem.classList.add('task');
  newTaskElem.setAttribute('data-index', dataIndex);

  if (task.name) {
    const h5Elem = document.createElement('h5');
    h5Elem.innerText = task.name;
    newTaskElem.appendChild(h5Elem);
  } else {
    const inputTaskName = createTaskNameInput();
    newTaskElem.appendChild(inputTaskName);
  }

  if (task.description) {
    const pElem = document.createElement('p');
    pElem.classList.add('description');
    pElem.innerText = task.description;
    newTaskElem.appendChild(pElem);
  } else {
    const inputElem = createDescriptionInput();
    newTaskElem.appendChild(inputElem);
  }

  if (isTaskValid(task)) {
    const checkElem = createCheckButton();
    newTaskElem.appendChild(checkElem);
  }
  task.done && markAsDone(newTaskElem);

  return newTaskElem;
}

function isTaskValid({ name, description }) {
  return name && description;
}

function renderTasks() {
  if (storage.getItem('taskList')) {
    taskList = JSON.parse(storage.getItem('taskList'));
  }
  const containerElem = findContainer();
  if (taskList.length > 0) {
    for (let i = 0; i < taskList.length; i++) {
      const taskElem = createTask(taskList[i], i);
      containerElem.appendChild(taskElem);
    }
  }
}

function updateStorage() {
  const filteredTaskList = taskList.filter(
    (task) => task.name && task.description
  );
  storage.setItem('taskList', JSON.stringify(filteredTaskList));
}

function applyNameValue(event) {
  const inputValue = event.currentTarget.value;
  const dataIndex =
    event.currentTarget.parentElement.getAttribute('data-index');
  if (inputValue) {
    event.target.classList.add('disabled');
    const h5Elem = document.createElement('h5');
    const pElem = event.target.parentElement.querySelector('.description');
    event.target.parentElement.insertBefore(h5Elem, pElem);
    h5Elem.innerText = inputValue;
    taskList[dataIndex].name = inputValue;
  }
  if (isTaskValid(taskList[dataIndex])) {
    const checkElem = createCheckButton();
    event.target.parentElement.appendChild(checkElem);
    updateStorage();
  }
}

function applyDescriptionValue(event) {
  const inputValue = event.currentTarget.value;
  const dataIndex =
    event.currentTarget.parentElement.getAttribute('data-index');
  if (inputValue) {
    event.target.classList.add('disabled');
    const pElem = document.createElement('p');
    pElem.classList.add('description');
    const buttonElem = event.target.parentElement.querySelector('button');
    event.target.parentElement.insertBefore(pElem, buttonElem);
    pElem.innerText = inputValue;

    taskList[dataIndex].description = inputValue;
  }
  if (isTaskValid(taskList[dataIndex])) {
    const checkElem = createCheckButton();
    event.target.parentElement.appendChild(checkElem);
    updateStorage();
  }
}

function addTask() {
  const dataIndex = taskList.length;
  const newTaskData = {
    name: '',
    description: '',
    done: false,
  };
  const newTask = createTask(newTaskData, dataIndex);
  taskList.push(newTaskData);
  findContainer().appendChild(newTask);
}

function removeLast() {
  const lastTask = document.querySelector('.task:last-child');
  lastTask && lastTask.remove();
  taskList.pop();
  updateStorage();
}

function checkTask(event) {
  markAsDone(event.currentTarget.parentElement);

  const dataIndex =
    event.currentTarget.parentElement.getAttribute('data-index');
  taskList[dataIndex].done = true;
  updateStorage();
}

function markAsDone(taskElem) {
  taskElem.classList.add('checkedTask');
  taskElem.querySelector('button').classList.add('disabled');
}

const addTaskButton = document.getElementById('addTask');
addTaskButton.addEventListener('click', addTask);

const addRemoveLastButton = document.getElementById('removeLast');
addRemoveLastButton.addEventListener('click', removeLast);

renderTasks();