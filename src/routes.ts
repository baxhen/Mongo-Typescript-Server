import express from 'express';
import * as StoreController from './controllers/StoreController';
import * as UserController from './controllers/UserController';

const routes = express.Router();

routes.post('/store', StoreController.insertStore);
routes.get('/store/:id', StoreController.fetchStore);
routes.get('/store', StoreController.fetchStores);
routes.patch('/store/:id', StoreController.updateStore);

routes.get('/menu/:id', StoreController.fetchMenu);
routes.patch('/menu/:_id', StoreController.updateSectionPosition);
routes.patch(
  '/menu-switch',
  StoreController.updateSectionsSwitchObjectsPositions
);

routes.post('/user', UserController.insertUser);
routes.get('/user/:id', UserController.fetchUser);
routes.get('/user', UserController.fetchUsers);
routes.patch('/user/:id', UserController.updateUser);

export default routes;
