import { Request, Response } from 'express';
import _ from 'lodash';
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
    const newValue = req.body;
    getDb()
      .db(dbName)
      .collection(collection)
      .updateOne({ _id }, { $set: newValue })
      .then((response: UpdateWriteOpResult) => {
        res.send(response.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  static fetchOneFiltered = (
    req: Request,
    res: Response,
    collection: string,
    filter: object
  ) => {
    const _id = new ObjectId(req.params.id);
    const projection = {
      projection: filter,
    };
    getDb()
      .db(dbName)
      .collection(collection)
      .findOne({ _id }, projection)
      .then((response: object) => {
        res.send(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  static fetchManyFiltered = (
    req: Request,
    res: Response,
    collection: string,
    filter: object
  ) => {
    const projection = {
      fields: filter,
    };
    getDb()
      .db(dbName)
      .collection(collection)
      .find({}, projection)
      .toArray()
      .then((array: object[]) => {
        res.send(array);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  static updateOneObjectKeyValue = (
    req: Request,
    res: Response,
    collection: string,
    fieldToUpdate: string,
    fieldUpdateQuery: string,
    filterQuery: object
  ) => {
    const updateQuery = {
      $set: { [fieldUpdateQuery]: req.body[fieldToUpdate] },
    };

    getDb()
      .db(dbName)
      .collection(collection)
      .updateOne(filterQuery, updateQuery)
      .then((response: UpdateWriteOpResult) => {
        res.send(response.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  static updateOneSwitchTwoObjectKeysValues = (
    req: Request,
    res: Response,
    collection: string,
    firstFieldKeyName: string,
    SecondFieldKeyName: string,
    fieldUpdateQuery: string[],
    filterQuery: object
  ) => {
    const updateQuery = {
      $set: {
        [fieldUpdateQuery[0]]: req.body[firstFieldKeyName].value,
        [fieldUpdateQuery[1]]: req.body[SecondFieldKeyName].value,
      },
    };

    getDb()
      .db(dbName)
      .collection(collection)
      .updateOne(filterQuery, updateQuery)
      .then((response: UpdateWriteOpResult) => {
        res.send(response.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
