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

function createTask(name, description, done) {
  const newTask = document.createElement('div');
  newTask.classList.add('task');
  const h5Elem = document.createElement('h5');
  newTask.appendChild(h5Elem);
  h5Elem.innerHTML = name;
  const pElem = document.createElement('p');
  newTask.appendChild(pElem);
  pElem.innerHTML = description;

  const checkElem = createTaskButton();
  newTask.appendChild(checkElem);

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

function addTask() {
  const containerElem = findContainer();
  const taskNumber = document.querySelectorAll('.task').length + 1;
  const newTask = createTask(
    `Task ${taskNumber}`,
    'The description is empty',
    false
  );
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
