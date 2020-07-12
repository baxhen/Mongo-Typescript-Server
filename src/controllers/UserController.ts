import { Request, Response } from 'express';
import { Mongo } from './Mongo';

export const insertUser = (req: Request, res: Response) => {
  Mongo.insertOne(req.body, res, 'Users');
};

export const fetchUser = (req: Request, res: Response) => {
  Mongo.fetchOne(req, res, 'Users');
};

export const fetchUsers = (req: Request, res: Response) => {
  Mongo.fetchMany(req, res, 'Users');
};

export const updateUser = (req: Request, res: Response) => {
  Mongo.updateOne(req, res, 'Users');
};
