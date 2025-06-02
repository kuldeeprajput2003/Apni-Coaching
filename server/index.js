const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000;
const url = process.env.DB_URL;

const DBConnection = require('./db_connection');
DBConnection(url);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


// Importing routes
const userRouter = require('./routes/user_route');
app.use('/user', userRouter);

app.listen(port, () => {
  console.log('Server started');
});