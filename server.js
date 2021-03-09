const express       = require('express');
const bodyParser    = require('body-parser');
const _ = require('underscore');
const app           = express();
const PORT          = process.env.PORT || 3000;
let todos = [];
let todoNextId  =   1;

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

    // let matchedTodo;
    // todos.forEach(todo => {
    //     if(todo.id===parseInt(req.params.id)){
    //         matchedTodo=todo;
    //     }
    // });
    let matchedTodo = _.findWhere(todos,{id:parseInt(req.params.id)})

    if(matchedTodo) {
        res.json(matchedTodo);
    }else {
        res.status(404).send();
    }
});

// Post /todos
app.post('/todos',function(req,res){

    let body = _.pick(req.body,'description','completed');

    if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length===0 ) {
        return res.status(400).send();
    }

    body.id             =   todoNextId++;
    body.description    =   body.description.trim();    
    todos.push(body);
    res.json(body);
});

// DELETE /todos/:id
app.delete('/todos/:id',function(req,res){
    const todoId = parseInt(req.params.id);
    let matchedTodo = _.findWhere(todos,{id:todoId})
    if(!matchedTodo){
        res.status(404).json({"error":"No todo found with id : "+todoId});
    } else {
        todos   =   _.without(todos,matchedTodo);
        res.json(matchedTodo);
    }

});

// PUT /todos/:id
app.put('/todos/:id',function(req,res){

    const todoId = parseInt(req.params.id);
    let matchedTodo = _.findWhere(todos,{id:todoId});
    let body = _.pick(req.body,'description','completed');
    let validAttributes = {};

    if(!matchedTodo){
        res.status(404).json({"error":"No todo found with id : "+todoId});
    }

    if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
        validAttributes.completed = body.completed;
    } else if(body.hasOwnProperty('completed')) {
        return res.status(400).send();
    } 
    
    if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length>0 ) {
        validAttributes.description = body.description;
    } else if(body.hasOwnProperty('description')) {
        return res.status(400).send();
    }
    
    matchedTodo =   _.extend(matchedTodo,validAttributes);
    res.json(matchedTodo);

});

app.listen(PORT, function(){
    console.log('Express listening on : '+PORT);
});