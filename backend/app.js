const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/stuff', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "Saved successfully"
  })
});

app.get('/api/stuff', (req, res, next) => {
  const stuff = [
    {
        _id: 'string',
        name: 'string',
        manufacturer: 'string',
        description: 'string',
        heat: 5,
        likes: 5,
        dislikes: 5,
        imageUrl: 'string',
        mainPepper: 'string',
        usersLiked: 'string[]',
        usersDisliked: 'string[]',
        userId: 'string',
    },
  ];
  res.status(200).json(stuff);
});

// Create User model

// Create User Route

// Create User Controller


module.exports = app;