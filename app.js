require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/index');
const limiter = require('./middlewares/rate-limit');
const handleError = require('./middlewares/handleError');
const { allowCORS } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { dataBaseURL } = require('./utils/env-config');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(dataBaseURL, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(allowCORS);
app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {});
