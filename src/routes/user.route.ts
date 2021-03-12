import cookieParser from 'cookie-parser';
import { Router } from 'express';
import CartController from '../controllers/cart.controller';
import { UserController } from '../controllers/user.controller';
import { requireAuthorization } from '../middlewares/authHandler';

const route = Router();
const userController = new UserController();

// Crud controllers
route.get('/', userController.get);
route.get('/:id', userController.getOne);

// Properties controllers
const cartController = new CartController();
route.get('/:id/cart', requireAuthorization, cartController.getOne);
route.post('/:id/cart', requireAuthorization, cartController.addProduct);
route.delete(
	'/:id/cart/:id',
	requireAuthorization,
	cartController.removeProduct
);
route.delete('/:id/cart', requireAuthorization, cartController.delete);

// Auth controllers
route.post('/register', userController.register);
route.post('/login', userController.login);
route.post('/logout', cookieParser(), userController.logout);

export default route;
