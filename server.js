var express       = require('express');
var bodyParser    = require('body-parser');
var app           = express();
var PORT          = process.env.PORT || 3000;
var todos = [];
var todoNextId  =   1;

app.use(bodyParser.json());

app.get('/', function(req,res){
    res.send('Todo API Root');
});

// Get /todos
app.get('/todos',function(req,res){
    res.json(todos);
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

// Post /todos
app.post('/todos',function(req,res){
    let body = req.body;
    body.id =   todoNextId++;    
    todos.push(body);
    res.json(body);
});

app.listen(PORT, function(){
    console.log('Express listening on : '+PORT);
});