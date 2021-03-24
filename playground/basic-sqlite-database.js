var Sequelize = require('sequelize');
const Op = Sequelize.Op;
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

sequelize.sync({
    force:true
}).then(function(){
    console.log('Everything is synced !!');

    Todo.create({
        description : "Bake the cake"
    }).then(function(todo){
        return Todo.create({
            description : "Eat the Cake"
        })
    }).then(function(){
        // return Todo.findByPk(3);
    }).then(function(todo){
        return Todo.findAll({
            where : {
                description : {
                    [Op.like] : '%at%'
                }
            }
        })
    }).then(function(todos){
        if(todos) {
            todos.forEach(todo => {
                console.log(todo.toJSON());                
            });
        } else {
            console.log('No TODO found !!');
        }
    }).then(function(todo){
        console.log('Finished');

    }).catch(function(e){
      console.log(e);  
    }) 
});