import cookieParser from 'cookie-parser';
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
const route = Router();

route.post('/register', UserController.register);
route.post('/login', UserController.login);
route.post('/logout', cookieParser(), UserController.logout);

export default route;
