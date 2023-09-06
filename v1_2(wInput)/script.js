// [1] The count variable is a workaround for showing
// "a check button" for a new task and need to be changed
// in the next version.

// [2] Also there are a lot of repeated code that
// need to be extracted into separate functions
// in the next version as well.

let count = 0;
var tasks = [
  {
    name: 'Task 1',
    description: 'Wash the dishes in the sink',
    done: false,
  },
  {
    name: 'Task 2',
    description: 'Spend 20 minutes reading a book',
    done: true,
  },
  {
    name: 'Task 3',
    description: 'Go for a 10-minute walk outside',
    done: false,
  },
];

function findContainer() {
  const contanerElem = document.querySelector('.container');

  return contanerElem;
}

function createTaskButton() {
  const checkElem = document.createElement('button');
  checkElem.addEventListener('click', checkTask);

  return checkElem;
}

function createTaskNameInput() {
  const inputElem = document.createElement('input');
  inputElem.classList.add('inputTaskName', 'name');
  inputElem.setAttribute('type', 'text');
  inputElem.setAttribute('placeholder', `Add a task's name here`);
  inputElem.addEventListener('blur', applyNameValue);

  return inputElem;
}

function createDescriptionInput() {
  const inputElem = document.createElement('input');
  inputElem.classList.add('description');
  inputElem.setAttribute('type', 'text');
  inputElem.setAttribute('placeholder', 'Add a description here');
  inputElem.addEventListener('blur', applyDescriptionValue);

  return inputElem;
}

function createTask(name, description, done) {
  const newTask = document.createElement('div');
  newTask.classList.add('task');

  if (name) {
    const h5Elem = document.createElement('h5');
    newTask.appendChild(h5Elem);
    h5Elem.innerText = name;
  } else {
    const inputTaskName = createTaskNameInput();
    newTask.appendChild(inputTaskName);
  }

  if (description) {
    const pElem = document.createElement('p');
    pElem.classList.add('description');
    newTask.appendChild(pElem);
    pElem.innerText = description;
  } else {
    const inputElem = createDescriptionInput();
    newTask.appendChild(inputElem);
  }

  if (name && description) {
    const checkElem = createTaskButton();
    newTask.appendChild(checkElem);
  }

  done && markAsDone(newTask);

  return newTask;
}

function renderTasks() {
  const containerElem = findContainer();
  for (let i = 0; i < tasks.length; i++) {
    const taskElem = createTask(
      tasks[i].name,
      tasks[i].description,
      tasks[i].done
    );
    containerElem.appendChild(taskElem);
  }
}

function applyNameValue(event) {
  const inputValue = event.currentTarget.value;
  if (inputValue) {
    event.target.classList.add('disabled');
    const h5Elem = document.createElement('h5');
    const pElem = event.target.parentElement.querySelector('.description');
    event.target.parentElement.insertBefore(h5Elem, pElem);
    h5Elem.innerText = inputValue;
    count++;
  }
  if (count == 2) {
    const checkElem = createTaskButton();
    event.target.parentElement.appendChild(checkElem);
  }
}

function applyDescriptionValue(event) {
  // console.log(event.currentTarget.value);
  // console.log(event.target);
  // console.log(event.target.parentElement);

  const inputValue = event.currentTarget.value;
  if (inputValue) {
    event.target.classList.add('disabled');
    const pElem = document.createElement('p');
    pElem.classList.add('description');
    const buttonElem = event.target.parentElement.querySelector('button');
    event.target.parentElement.insertBefore(pElem, buttonElem);
    pElem.innerText = inputValue;
    count++;
  }
  if (count == 2) {
    const checkElem = createTaskButton();
    event.target.parentElement.appendChild(checkElem);
  }
}

function addTask() {
  const containerElem = findContainer();
  //const taskNumber = document.querySelectorAll('.task').length + 1;
  //`Task ${taskNumber}`
  const newTask = createTask('', '', false);
  containerElem.appendChild(newTask);
}

function removeLast() {
  const lastTask = document.querySelector('.task:last-child');
  lastTask && lastTask.remove();
}

function checkTask(event) {
  //console.log(event.currentTarget.parentElement);
  //console.log(event.currentTarget.closest('.task'));
  markAsDone(event.currentTarget.parentElement);
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