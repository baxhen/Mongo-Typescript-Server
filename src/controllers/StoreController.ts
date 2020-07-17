import { Request, Response } from 'express';
import { Mongo } from './Mongo';

const collection = 'stores';

export const insertStore = (req: Request, res: Response) => {
  Mongo.insertOne(req.body, res, collection);
};

export const fetchStore = (req: Request, res: Response) => {
  Mongo.fetchOne(req, res, collection);
};

export const fetchStores = (req: Request, res: Response) => {
  Mongo.fetchMany(req, res, collection);
};

export const updateStore = (req: Request, res: Response) => {
  Mongo.updateOne(req, res, collection);
};

export const fetchMenu = (req: Request, res: Response) => {
  Mongo.fetchOneFiltered(req, res, collection, { menu: 1, _id: 0 });
};
