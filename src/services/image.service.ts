import { StatusCodes } from 'http-status-codes';
import { Image } from '../entities/image';
import { Product } from '../entities/product';
import { HttpError } from '../util/httpError';

export class ImageService {
	static async create(images: Express.Multer.File[], productId: string) {
		const product = await Product.findOne(productId, { relations: ['images'] });

		if (!product)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Product not found',
			});

		images.forEach(async imageFile => {
			const image = await Image.create({
				url: `http://localhost:3000/static/${imageFile.filename}`,
			});

			image.product = product;
			await image.save();

			product.images = [image, ...product.images];
		});

		return await product.save();
	}

	static async delete(imageId: string, productId: string) {
		const product = await Product.findOne(productId);

		if (!product)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Product not found',
			});

		const image = await Image.findOne(imageId);

		if (!image)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Image not found',
			});

		await image.remove();
	}
}
