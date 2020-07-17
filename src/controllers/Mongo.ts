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
        res.send({ message: 'Successfully updated', isUpdated: true });
      })
      .catch((err) => {
        console.log(err);
        res.send({ message: 'Document not updated', isUpdated: false });
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

  static fetchManyByField = (
    req: Request,
    res: Response,
    collection: string,
    fieldToSearch: { [key: string]: ObjectId }
  ) => {
    getDb()
      .db(dbName)
      .collection(collection)
      .find(fieldToSearch)
      .toArray()
      .then((array: object[]) => {
        res.send(array);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  static insertOneWithRefs = (
    insertObject: object,
    res: Response,
    collection: string,
    refs: {
      [key: string]: {
        _id: ObjectId;
        collection: string;
        fieldToStoresRefs: string;
      };
    }
  ) => {
    getDb()
      .db(dbName)
      .collection(collection)
      .insertOne(insertObject)
      .then((response: InsertOneWriteOpResult<{ _id: ObjectId }>) => {
        const _id = response.insertedId;
        for (var key in refs) {
          const newField = { [refs[key].fieldToStoresRefs]: { _id } };
          getDb()
            .db(dbName)
            .collection(refs[key].collection)
            .updateOne({ _id: refs[key]._id }, { $push: newField });
        }

        res.send(response.ops);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
