import express from 'express';
import * as StoreController from './controllers/StoreController';
import * as UserController from './controllers/UserController';
import * as OrderController from './controllers/OrderController';

const routes = express.Router();

routes.post('/store', StoreController.insertStore);
routes.get('/store/:id', StoreController.fetchStore);
routes.get('/store', StoreController.fetchStores);
routes.patch('/store/:id', StoreController.updateStore);

routes.get('/menu/:id', StoreController.fetchMenu);

routes.post('/user', UserController.insertUser);
routes.get('/user/:id', UserController.fetchUser);
routes.get('/user', UserController.fetchUsers);
routes.patch('/user/:id', UserController.updateUser);

routes.post('/order', OrderController.insertOrder);
routes.get('/order', OrderController.fetchOrders);
routes.get('/order/:id', OrderController.fetchOrdersByUserIdOrStoreId);
routes.patch('/order/:id', OrderController.updateOneOrder);

export default routes;
