import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import ProductRoute from './routes/product.route';
import CategoryRoute from './routes/category.route';
import UserRoute from './routes/user.route';
import { errorHandler } from './middlewares/errorHandler';
import { resolve } from 'path';
import cors from 'cors';
import { tokenRefresh } from './auth/tokenRefresh';
import cookieParser from 'cookie-parser';

const bootstrap = async () => {
	// Connect to the database
	await createConnection();

	const app = express();

	// Set up middlewares
	app.use(
		cors({
			origin: 'http://localhost:3001',
			credentials: true,
		})
	);
	app.use(express.json());
	app.use('/static', express.static(resolve(__dirname, '../uploads')));
	app.use('/products', ProductRoute);
	app.use('/categories', CategoryRoute);
	app.use('/users', UserRoute);
	app.get('/token-refresh', cookieParser(), tokenRefresh);
	app.use(errorHandler);

	// listen app
	await app.listen(process.env.PORT!, () =>
		console.log(`App listening on port ${process.env.PORT!}`)
	);
};

bootstrap();
