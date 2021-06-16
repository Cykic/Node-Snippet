const express = require('express');
const router = require('./routes/userRoutes');
const MongoDB = require('./mongoDB');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;
MongoDB.startListening(app, port);

// MIDDLEWARE
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Welcome to API');
});

//ROUTES
app.use(router);

// 404
app.use((_, res) => {
  res.status(404).json({
    messge: 'Page not found',
  });
});
