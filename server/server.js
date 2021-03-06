const {ObjectID} = require('mongodb');

var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc)=>{
    res.send(doc);
  },(err)=>{
    res.status(400).send(err);
  });
  console.log(req.body);
});

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },(err)=>{
    res.status(400).send(err);
  })
});

app.get('/todos/:id',(req,res)=>{
  var id = req.params.id
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findById({
    _id: id
  }).then((todos)=>{
    if(!todos){
      return res.status(404).send();
    }
    res.send({todos});
  },(err)=>{
    res.status(400).send();
  });
});

app.delete('/todos/:id',(req,res)=>{
  var id = req.params.id
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findByIdAndDelete({
    _id: id
  }).then((todos)=>{
    if(!todos){
      return res.status(404).send();
    }
    res.send({todos});
  },(err)=>{
    res.status(400).send();
  })
});

app.listen(3000,()=>{
  console.log('Started on port 3000');
});

module.exports = {app};
