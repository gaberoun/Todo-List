const url = 'https://test-api-eybb.onrender.com/api/todos';

// Render elements
const displayTask = (todoTask, owner, status, id) => {
  const newTask = document.createElement('div');
  newTask.classList = 'task';
  newTask.id = id;

  const todo = document.createElement('p');
  todo.innerHTML = todoTask;
  todo.classList = 'todo';

  const todoOwner = document.createElement('p');
  todoOwner.innerHTML = owner;
  todoOwner.classList = 'owner';

  const todoStatus = document.createElement('span');
  todoStatus.innerHTML = status === 'done' ? 'Done' : "Not Done";
  todoStatus.classList = status;
  todoStatus.classList.add('status');

  const deleteOption = document.createElement('button');
  deleteOption.classList = 'delete';
  // Delete event onclick
  deleteOption.addEventListener('click', (e) => {
    deleteTask(e.target.parentNode.id);
  });

  newTask.appendChild(todo);
  newTask.appendChild(todoOwner);
  newTask.appendChild(todoStatus);
  newTask.appendChild(deleteOption);
  document.getElementById('container').appendChild(newTask);
}

// GET function
const listTask = async () => {
  try {
    const response = await fetch(url, {
      method: 'GET'
    });
    const data = await response.json();
    
    data.forEach((obj) => {
      const task = obj.task;
      const owner = obj.posted_by;
      const status = obj.completed === true ? 'done' : 'not-done';
      const id = obj._id;
      displayTask(task, owner, status, id);
    });
    console.log('Fetched list');

  } catch (error) {
    console.log('GET Error');
  }
}

// POST function
const addTask = async (data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const obj = await response.json();
    const task = obj.task;
    const owner = obj.posted_by;
    const status = obj.completed === true ? 'done' : 'not-done';
    const id = obj._id;

    displayTask(task, owner, status, id);
    console.log('Added :>> ', obj);

  } catch (error) {
    console.log('POST Error');
  }
}

// DELETE function
const deleteTask = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    });

    const deletedTask = document.getElementById(id);
    deletedTask.remove();
    console.log('Deleted :>> ', await response.json());

  } catch (error) {
    console.log('DELETE Error');
  }
}

// Ask for new data
document.getElementById('add').addEventListener('click', () => {
  const form = document.getElementById('form-container');
  if (form.style.display == 'none') {
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
  }
});

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const selectedValue = document.querySelector(   
    'input[name="status-input"]:checked');
  const dataInput = {
    task: document.getElementById('task-input').value,
    completed: selectedValue.value,
    posted_by: document.getElementById('owner-input').value
  };
  addTask(dataInput);

  e.target.reset();
  document.getElementById('form-container').style.display = 'none';
});

// Display list on load
listTask();