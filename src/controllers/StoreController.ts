import { Request, Response } from 'express';
import { Mongo } from './Mongo';

export const insertStore = (req: Request, res: Response) => {
  Mongo.insertOne(req.body, res, 'Stores');
};

export const fetchStore = (req: Request, res: Response) => {
  Mongo.fetchOne(req, res, 'Stores');
};

export const fetchStores = (req: Request, res: Response) => {
  Mongo.fetchMany(req, res, 'Stores');
};

export const updateStore = (req: Request, res: Response) => {
  Mongo.updateOne(req, res, 'Stores');
};
