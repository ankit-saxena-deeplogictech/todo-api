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
}];


app.get('/todos',function(){
    res.json(todos);
});


app.get('/', function(req,res){
    res.send('Todo API Root');
});

app.listen(PORT, function(){
    console.log('Express listening on : '+PORT);
});