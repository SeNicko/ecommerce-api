import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import ProductRoute from './routes/product.route';
import { errorHandler } from './middlewares/errorhandler';

const bootstrap = async () => {
	await createConnection();

	const app = express();
	const port = process.env.PORT || 3000;

	app.use(express.json());
	app.use('/products', ProductRoute);
	app.use(errorHandler);

	await app.listen(port, () => console.log(`App listening on port ${port}`));
};

bootstrap();
