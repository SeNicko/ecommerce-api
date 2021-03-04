import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import VariantService from '../services/variant.service';

export class VariantController {
	// Create variant
	static async create(req: Request, res: Response, next: NextFunction) {
		const { productId } = req.params;

		try {
			const variant = await VariantService.create(productId, req.body);
			res.status(StatusCodes.CREATED).json({
				...variant,
			});
		} catch (err) {
			next(err);
		}
	}

	// Delete variant
	static async remove(req: Request, res: Response, next: NextFunction) {
		const { productId, variantId } = req.params;

		try {
			await VariantService.delete(productId, variantId);
			res.status(StatusCodes.OK).json({
				message: 'Variant succesfully removed',
			});
		} catch (err) {
			next(err);
		}
	}
}
