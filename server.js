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


app.get('/todos',function(req,res){
    res.json(todos);
});


app.get('/', function(req,res){
    res.send('Todo API Root');
});

app.listen(PORT, function(){
    console.log('Express listening on : '+PORT);
});