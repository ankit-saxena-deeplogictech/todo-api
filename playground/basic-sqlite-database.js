var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined,undefined,undefined,{
    'dialect' : 'sqlite',
    'storage' : 'basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo',{
    description : {
        type : Sequelize.STRING,
        allowNull:false
    },
    completed : {
        type : Sequelize.BOOLEAN,
        defaultValue : false
    }
})

sequelize.sync().then(function(){
    console.log('Everything is synced !!');

    Todo.create({
        description : "Bake the cake"
    }).then(function(todo){
        console.log('Finished');
        console.log(todo);
    }).catch(function(e){
      console.log(e);  
    }) 
});