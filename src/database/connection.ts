import { MongoClient, Db, MongoCallback, MongoError } from 'mongodb';

const url = 'mongodb://localhost:27017';
let db: MongoClient;

export const initDb = (callback: MongoCallback<MongoClient>) => {
  if (db) {
    console.log('Database is already initialized');
    return callback;
  }

  MongoClient.connect(url).then((client: MongoClient) => {
    db = client;
    callback(new MongoError('ok'), db);
  });
};

export const getDb = () => {
  if (!db) {
    throw Error('Database not initialized');
  }
  return db;
};
