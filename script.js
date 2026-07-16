
const todoList = document.getElementById('todo-list');
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');

todoForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const text = todoInput.value;

  await fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: text })
  });

  todoInput.value = '';
  fetchTodos();
});

async function toggleTodo(id) {
  await fetch(`http://localhost:3000/todos/${id}`, {
    method: 'PUT'
  });
  fetchTodos();
}


async function deleteTodo(id) {
  await fetch(`http://localhost:3000/todos/${id}`, {
    method: 'DELETE'
  });
  fetchTodos();
}
function renderTodos(todos) {
todoList.innerHTML = '';

  if (todos.length === 0) {
    const emptyMessage = document.createElement('li');
    emptyMessage.textContent = 'No todos yet — add one above!';
    emptyMessage.classList.add('empty-state');
    todoList.appendChild(emptyMessage);
    return;
  }


  todos.forEach(todo => {
    const li = document.createElement('li');
        const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    const span = document.createElement('span');
    span.textContent = todo.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    if (todo.completed) {
      li.classList.add('completed');
    }
    todoList.appendChild(li);
  });
}


async function fetchTodos() {

  
    const response = await fetch('http://localhost:3000/todos');
    const data = await response.json();
    renderTodos(data);
}

fetchTodos();