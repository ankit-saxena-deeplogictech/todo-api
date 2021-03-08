const express   = require('express');
const app       = express();
const PORT      = process.env.PORT || 3000;

let todos = [{
    id:1,
    description:'Breakfast with Modi',
    completed:false
},{
    id:2,
    description:'Go to the Market in Evening',
    completed:false
},{
    id:3,
    description:'Prepare the cake',
    completed:true
}];

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
        res.send(matchedTodo);
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