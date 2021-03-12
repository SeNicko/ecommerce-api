import { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { HttpError } from '../util/httpError';
import ProductService from '../services/product.service';

export class ProductController {
	async get(_req: Request, res: Response, next: NextFunction) {
		try {
			// Get all products
			const products = await ProductService.get();
			res.status(StatusCodes.OK).json({
				data: products,
			});
		} catch (err) {
			next(err);
		}
	}

	async getOne(req: Request, res: Response, next: NextFunction) {
		const type = req.query.type;
		const { filter } = req.params;

		try {
			const product = await ProductService.getOne(filter, type as string);

			// Check if product exists
			if (!product)
				throw new HttpError({
					status: StatusCodes.NOT_FOUND,
					error: 'Product not found',
				});

			res.status(StatusCodes.OK).json({ ...product });
		} catch (err) {
			next(err);
		}
	}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const product = await ProductService.create(req.body);
			res.status(StatusCodes.CREATED).json({
				...product,
			});
		} catch (err) {
			next(err);
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const updatedProduct = await ProductService.update(id, req.body);
			res.status(StatusCodes.OK).json({
				...updatedProduct,
			});
		} catch (err) {
			next(err);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			await ProductService.delete(id);
			res.status(StatusCodes.OK).json({
				message: 'Product succesfully deleted',
			});
		} catch (err) {
			next(err);
		}
	}

	async assignCategory(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;
		const { categoryId } = req.body;

		try {
			await ProductService.assignCategory(id, categoryId);
			res.status(StatusCodes.OK).json({
				message: 'Category succesfully assigned',
			});
		} catch (err) {
			next(err);
		}
	}

	async removeCategory(req: Request, res: Response, next: NextFunction) {
		const { productId, categoryId } = req.params;

		try {
			await ProductService.removeCategory(productId, categoryId);
			res.status(StatusCodes.OK).json({
				message: 'Category succesfully removed',
			});
		} catch (err) {
			next(err);
		}
	}
}
