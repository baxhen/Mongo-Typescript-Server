import express from 'express';
import routes from './routes';
import parser from 'body-parser';
import cors from 'cors';
import { initDb } from './database/connection';
import { MongoError, MongoClient } from 'mongodb';

const app = express();

app.use(cors());
app.use(parser.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

initDb((error: MongoError, result: MongoClient) => {
  if (error.message !== 'ok') {
    console.log(error);
  } else {
    app.listen(3333);
  }
});
