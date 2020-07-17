import { Request, Response } from 'express';
import { Mongo } from './Mongo';
import { ObjectId } from 'mongodb';

const collection = 'orders';

export const insertOrder = (req: Request, res: Response) => {
  const { userId, storeId, orderDetail } = req.body;
  const serializedOrder = {
    userId: new ObjectId(userId),
    storeId: new ObjectId(storeId),
    orderDetail,
  };
  Mongo.insertOne(serializedOrder, res, collection);
};

export const fetchOrders = (req: Request, res: Response) => {
  Mongo.fetchMany(req, res, collection);
};

export const fetchOrdersByUserIdOrStoreId = (req: Request, res: Response) => {
  const { id } = req.params;
  const fieldName = req.body.fieldName;
  const fieldToSearch = { [fieldName]: new ObjectId(id) };
  Mongo.fetchManyByField(req, res, collection, fieldToSearch);
};

export const updateOneOrder = (req: Request, res: Response) => {
  Mongo.updateOne(req, res, collection);
};
