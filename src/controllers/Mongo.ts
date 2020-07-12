import { Request, Response } from 'express';
import { InsertOneWriteOpResult, ObjectId, UpdateWriteOpResult } from 'mongodb';
import { getDb } from '../database/connection';
const dbName = 'Ambev';
export class Mongo {
  static insertOne = (
    insertObject: object,
    res: Response,
    collection: string
  ) => {
    getDb()
      .db(dbName)
      .collection(collection)
      .insertOne(insertObject)
      .then((response: InsertOneWriteOpResult<{ _id: ObjectId }>) => {
        res.send(response.ops);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  static fetchOne = (req: Request, res: Response, collection: string) => {
    const _id = new ObjectId(req.params.id);
    getDb()
      .db(dbName)
      .collection(collection)
      .findOne({ _id })
      .then((response: object) => {
        res.send(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  static fetchMany = (req: Request, res: Response, collection: string) => {
    getDb()
      .db(dbName)
      .collection(collection)
      .find()
      .toArray()
      .then((array: object[]) => {
        res.send(array);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  static updateOne = (req: Request, res: Response, collection: string) => {
    const _id = new ObjectId(req.params.id);
    const updateOne = req.body;
    getDb()
      .db(dbName)
      .collection(collection)
      .updateOne({ _id }, { $set: updateOne })
      .then((response: UpdateWriteOpResult) => {
        res.send(response.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
