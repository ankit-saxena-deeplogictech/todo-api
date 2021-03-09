const express       = require('express');
const bodyParser    = require('body-parser');
const app           = express();
const PORT          = process.env.PORT || 3000;
let todos = [];
let todoNextId  =   1;

app.use(bodyParser.json());

// Get /todos
app.get('/todos',function(req,res){
    res.json(todos);
});

// Post /todos
app.post('/todos',function(req,res){
    let body = req.body;
    body.id =   todoNextId++;    
    res.json(body);
});

// Get /todos/:id
app.get('/todos/:id',function(req,res){

    let matchedTodo;
    todos.forEach(todo => {
        if(todo.id===parseInt(req.params.id)){
            matchedTodo=todo;
        }
    });
    if(matchedTodo) {
        res.json(matchedTodo);
    }else {
        res.status(404).send();
    }
});

app.get('/', function(req,res){
    res.send('Todo API Root');
});

app.listen(PORT, function(){
    console.log('Express listening on : '+PORT);
});