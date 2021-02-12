import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ImageService } from '../services/image.service';

export class ImageController {
	static async create(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const image = await ImageService.create(
				{
					alt: req.body.alt ?? '',
					url: `http://localhost:3000/static/${req.file.filename}`,
				},
				id
			);

			res.status(StatusCodes.CREATED).json({
				...image,
			});
		} catch (err) {
			next(err);
		}
	}

	static async delete(req: Request, res: Response, next: NextFunction) {
		const { productId, imageId } = req.params;

		try {
			await ImageService.delete(imageId, productId);

			res.status(StatusCodes.OK).json({
				message: 'Image succesfully deleted',
			});
		} catch (err) {
			next(err);
		}
	}
}
