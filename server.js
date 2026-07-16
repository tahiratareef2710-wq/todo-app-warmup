
const express = require("express");
const app = express();
const PORT= 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json()); //connect to frontend
// let because we may re assign the data later on
let todos= [
    { id :1, text: "Learn Express" , completed:false},
    { id :2, text: "Build a to do app" , completed:true}
];
// fake database

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const text = req.body.text; // read the text field from the request body
    if (!text || text.trim() === "") { // if no text then reject
        return res.status(400).json({ error: "Text is required" });
    }

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }
    else {
        todo.completed = !todo.completed; // toggle the completed status
        res.json(todo);
    }
});

app.delete ('/todos/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Todo not found" });
    }
    todos.splice(index, 1); // remove the todo from the array
    res.status(204).send(); // send no content status

})
app.listen(PORT,()=>
{
    console.log(`Server is running on http://localhost:${PORT}`);
});// turn the server on 