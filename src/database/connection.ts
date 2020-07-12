import { MongoClient, MongoCallback, MongoError } from 'mongodb';

const url = 'mongodb://localhost:27017';
let db: MongoClient;

export const initDb = (callback: MongoCallback<MongoClient>): void => {
  if (db) {
    return callback(new MongoError('Database is already initialized'), db);
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
