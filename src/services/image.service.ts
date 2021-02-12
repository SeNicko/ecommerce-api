import { StatusCodes } from 'http-status-codes';
import { Image, IImage } from '../entities/image';
import { Product } from '../entities/product';
import { HttpError } from '../util/httpError';

export class ImageService {
	static async create(doc: IImage, productId: string) {
		const product = await Product.findOne(productId, { relations: ['images'] });

		if (!product)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Product not found',
			});

		const image = await Image.create(doc);
		await image.save();

		product.images = [image, ...product.images];
		await product.save();

		return image;
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
