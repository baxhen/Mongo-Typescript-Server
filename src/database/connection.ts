import { MongoClient, Db, MongoCallback, MongoError } from 'mongodb';

const url = 'mongodb://localhost:27017';
let db: Db;
const dbName = 'Ambev';

export const initDb = (callback: MongoCallback<MongoClient>) => {
  if (db) {
    console.log('Database is already initialized');
    return callback;
  }

  MongoClient.connect(url).then((client: MongoClient) => {
    db = client.db(dbName);
    callback(new MongoError('ok'), client);
  });
};

export const getDb = () => {
  if (!db) {
    throw Error('Database not initialized');
  }
  return db;
};
