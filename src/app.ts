import 'reflect-metadata';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import loginRouter from './resources/login/login.router';
import {
  clientErrorHandler,
  errorHandler,
  unhandledErrorHandler,
  logger,
  auth,
} from './middleware';

const app = express();
app.use(logger);
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);
app.use(auth);
// app.use('/boards/:boardId/tasks', taskRouter);

app.use(clientErrorHandler);
app.use(errorHandler);

process.on('uncaughtException', unhandledErrorHandler);
process.on('unhandledRejection', unhandledErrorHandler);

export default app;
