import { Response, Request, NextFunction } from 'express';

export class VariantController {
	// Create variant
	static async create(req: Request, res: Response, next: NextFunction) {
		try {
		} catch (err) {
			next(err);
		}
	}
}
