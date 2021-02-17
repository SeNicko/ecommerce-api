import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import ProductRoute from './routes/product.route';
import CategoryRoute from './routes/category.route';
import { errorHandler } from './middlewares/errorHandler';
import { resolve } from 'path';
import cors from 'cors';

const bootstrap = async () => {
	await createConnection();

	const app = express();
	const port = process.env.PORT || 3000;

	app.use(express.json());
	app.use(
		cors({
			origin: 'http://localhost:3001',
			optionsSuccessStatus: 200,
		})
	);
	app.use('/static', express.static(resolve(__dirname, '../uploads')));
	app.use('/products', ProductRoute);
	app.use('/categories', CategoryRoute);
	app.use(errorHandler);

	await app.listen(port, () => console.log(`App listening on port ${port}`));
};

bootstrap();
