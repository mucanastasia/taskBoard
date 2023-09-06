function addTask() {
  console.log('addTask');
  //find an element where to insert
  const contanerElem = document.querySelector('.container');
  //console.log(contanerElem);
  //create an element
  const newTask = document.createElement('div');
  //add class to the element
  newTask.classList.add('task');
  //add content into the element
  const h5Elem = document.createElement('h5');
  const taskNumber = document.querySelectorAll('.task').length + 1;
  h5Elem.innerHTML = `Task ${taskNumber}`;
  newTask.appendChild(h5Elem);
  //insret the element
  contanerElem.appendChild(newTask);
}

function removeLast() {
  console.log('removeLast');
  //find the last element that should to be removed
  const lastTask = document.querySelector('.task:last-child');
  //delete the element
  lastTask && lastTask.remove();


  // Danya showed me this
  //lastTask?.remove();

  //[1]
  //const taskList = document.querySelectorAll('.task');
  //const i = taskList.length - 1;
  // if (taskList.length > 0) {
  //   taskList[i].remove();
  // }
}

const addTaskElem = document.getElementById('addTask');
addTaskElem.addEventListener('click', addTask);

const addRemoveLastElem = document.getElementById('removeLast');
addRemoveLastElem.addEventListener('click', removeLast);
