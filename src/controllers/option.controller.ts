import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import OptionService from '../services/option.service';

export class OptionController {
	static async create(req: Request, res: Response, next: NextFunction) {
		const { productId, variantId } = req.params;

		try {
			const option = await OptionService.create(productId, variantId, req.body);
			res.status(StatusCodes.CREATED).json({
				...option,
			});
		} catch (err) {
			console.log(err);
			next(err);
		}
	}

	static async delete(req: Request, res: Response, next: NextFunction) {
		const { productId, variantId, optionId } = req.params;

		try {
			await OptionService.delete(productId, variantId, optionId);
			res.status(StatusCodes.OK).json({
				message: 'Option succesfully removed',
			});
		} catch (err) {
			next(err);
		}
	}
}
