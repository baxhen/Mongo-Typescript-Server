import { Request, Response } from 'express';
import { Mongo } from './Mongo';

const collection = 'users';

export const insertUser = (req: Request, res: Response) => {
  Mongo.insertOne(req.body, res, collection);
};

export const fetchUser = (req: Request, res: Response) => {
  Mongo.fetchOne(req, res, collection);
};

export const fetchUsers = (req: Request, res: Response) => {
  Mongo.fetchMany(req, res, collection);
};

export const updateUser = (req: Request, res: Response) => {
  Mongo.updateOne(req, res, collection);
};
