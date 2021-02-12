import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CategoryService } from '../services/category.service';

export class CategoryController {
	static async get(_req: Request, res: Response, next: NextFunction) {
		try {
			const categories = await CategoryService.get();
			res.status(StatusCodes.OK).json({
				data: categories,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const category = await CategoryService.getOne(id);
			res.status(StatusCodes.OK).json(category);
		} catch (err) {
			next(err);
		}
	}

	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			const category = await CategoryService.create(req.body);
			res.status(StatusCodes.CREATED).json({
				...category,
			});
		} catch (err) {
			next(err);
		}
	}

	static async update(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			await CategoryService.update(id, req.body);
			res.status(StatusCodes.OK).json({
				message: 'Category succesfully updated',
			});
		} catch (err) {
			next(err);
		}
	}

	static async delete(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			await CategoryService.delete(id);
			res.status(StatusCodes.OK).json({
				message: 'Category succesfully deleted',
			});
		} catch (err) {
			next(err);
		}
	}

	static async retriveProducts(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { id } = req.params;

		try {
			const products = await CategoryService.retriveProducts(id);
			res.status(StatusCodes.OK).json({
				data: products,
			});
		} catch (err) {
			next(err);
		}
	}
}
