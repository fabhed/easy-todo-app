const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

let todos = [];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const todo = req.body;
  todos.push(todo);
  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  todos = todos.filter(todo => todo.id !== id);
  res.json({ id });
});

app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const updatedTodo = req.body;
  todos = todos.map(todo => todo.id === id ? updatedTodo : todo);
  res.json(updatedTodo);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
