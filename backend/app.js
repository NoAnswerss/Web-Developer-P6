const express = require('express');
const { default: mongoose } = require('mongoose');

const app = express();

mongoose.connect("mongodb+srv://vlad:vladvladvlad@cluster0.k06bdwd.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
  console.log("connected to mongodb atlas")
})
.catch((error) => {
  console.log("nable to connect to mongodb atlas");
  console.error(error);
})
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const userRouter = require('./routes/user')
app.use('/api/auth',userRouter)

// Create User model

// Create User Route

// Create User Controller

app.post('/api/sauce', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Saved successfully'
  })
})

app.use('api/sauce', (req, res, next) => {
  const sauce = [
    {
      _id: 'name',
      title: 'titly',
      description: 'asdas',
      price: 5,
    }
  ];
});

module.exports = app;