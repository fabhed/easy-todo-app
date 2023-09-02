const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

todoForm.addEventListener('submit', addTodo);

fetchTodos();

function fetchTodos() {
  fetch('http://localhost:8080/todos')
    .then(response => response.json())
    .then(todos => {
      todoList.innerHTML = '';
      todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        li.classList.add('bg-gray-700', 'p-2', 'rounded');
        li.addEventListener('click', () => deleteTodo(todo.id));
        todoList.appendChild(li);
      });
    });
}

function addTodo(event) {
  event.preventDefault();
  const text = todoInput.value;
  const todo = { id: Date.now().toString(), text };
  fetch('http://localhost:8080/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
    .then(response => response.json())
    .then(todo => {
      todoInput.value = '';
      fetchTodos();
    });
}

function deleteTodo(id) {
  fetch(`http://localhost:8080/todos/${id}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(() => fetchTodos());
}
