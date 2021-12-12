const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const app = express();
require('dotenv').config();
const { login } = require('./controllers/login');
const { createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const allowedOrigins = require('./middlewares/cors');

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(allowedOrigins);
app.use(express.urlencoded({
  extended: true,
}));
app.use(cookieParser());
app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(errorLogger);

app.use(errors());

app.get('*', (_req, _res, next) => {
  const err = new Error('Запрашиваемый ресурс не найден');
  err.statusCode = 404;

  next(err);
});

app.use(errorHandler);

app.listen(PORT);
