import { MongoClient } from 'mongodb';
import { MyCallback } from '../utils';

const url = 'mongodb://localhost:27017';
let db: MongoClient;

export const initDb = (callback: MyCallback<MongoClient>) => {
  if (db) {
    callback(Error('Database is already initialized'), db);
  }

  MongoClient.connect(url).then((client: MongoClient) => {
    db = client;
    callback(null, db);
  });
};

export const getDb = () => {
  if (!db) {
    throw Error('Database not initialized');
  }
  return db;
};
