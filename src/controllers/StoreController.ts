import { Request, Response } from 'express';
import { Mongo } from './Mongo';

const collection = 'Stores';

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

export const updateSectionPosition = (req: Request, res: Response) => {
  const { _id } = req.params;
  const fieldToUpdate = 'position';
  const fieldQuery = `menu.sections.${_id}._id`;
  const filterQuery = {
    [fieldQuery]: _id,
  };
  const fieldUpdateQuery = `menu.sections.${_id}.${fieldToUpdate}`;
  Mongo.updateOneObjectKeyValue(
    req,
    res,
    collection,
    fieldToUpdate,
    fieldUpdateQuery,
    filterQuery
  );
};

export const updateSectionsSwitchObjectsPositions = (
  req: Request,
  res: Response
) => {
  const { first, second } = req.body;
  const firstFieldKeyName = 'first';
  const SecondFieldKeyName = 'second';
  const fieldToUpdate = 'position';
  const fieldQuery = `menu.sections.${first._id}._id`;
  const filterQuery = {
    [fieldQuery]: first._id,
  };
  const fieldUpdateQuery = [
    `menu.sections.${second._id}.${fieldToUpdate}`,
    `menu.sections.${first._id}.${fieldToUpdate}`,
  ];
  Mongo.updateOneSwitchTwoObjectKeysValues(
    req,
    res,
    collection,
    firstFieldKeyName,
    SecondFieldKeyName,
    fieldUpdateQuery,
    filterQuery
  );

  // The body request expected
  // send the actual position to be switched
  // "first":{
  // 	"value":90,
  // 	"_id":"01"
  // },
  // "second":{
  // 	"value":122,
  // 	"_id":"03"
  // }
};
