const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/todolistNEW');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


const todoSchema = {
    todo : String
};

const Todo = new mongoose.model('Todo',todoSchema);

const todo1 = new Todo({
    todo : "Belajar React Js"
});

const todo2 = new Todo({
    todo : "Belajar Vue Js"
});

const todo3 = new Todo({
    todo : "Belajar Angular Js"
});

const defaultTodo = [todo1,todo2,todo3];



app.get('/',function(req,res){

    Todo.find({},function(err, ItemsTodo){
        if(ItemsTodo.length === 0){
            Todo.insertMany(defaultTodo,function(err){
                if(err){
                    console.log(err)
                }else {
                    console.log('successfully add todo !');

                    res.redirect('/')
                }
            })
        }else{
            res.render('list', {title : "Today", todos : ItemsTodo});
        }
    });
    
});


app.post('/addTodo',function(req,res){

    const todo = req.body.todo;

    const newTodo = new Todo({
        todo: todo
    });

    newTodo.save();
    
    res.redirect('/')
})


app.post('/deleteTodo',function(req,res){
    
    const idTodo = req.body.todoId;

    Todo.deleteOne({_id : idTodo}, function(err){
        res.redirect('/');
    })
})

app.listen(3000,function(){
    console.log('Server running on port 3000');
});