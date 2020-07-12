import express from 'express';
import routes from './routes';
import parser from 'body-parser';
import cors from 'cors';
import { initDb } from './database/connection';
import { MongoError } from 'mongodb';

const app = express();

app.use(cors());
app.use(parser.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

initDb((error: Error | null) => {
  if (error) {
    console.log(error);
  } else {
    app.listen(3333);
  }
});
