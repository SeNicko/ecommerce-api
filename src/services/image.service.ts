import { StatusCodes } from 'http-status-codes';
import { Image, IImageCreate } from '../entities/image';
import { Product } from '../entities/product';
import { HttpError } from '../util/httpError';

export class ImageService {
	static async create(
		imageFile: Express.Multer.File,
		data: IImageCreate,
		productId: string
	) {
		// Check if product exists
		const product = await Product.findOne(productId, { relations: ['images'] });

		if (!product)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Product not found',
			});

		// Create image
		const image = await Image.create({
			url: `http://localhost:3000/static/${imageFile.filename}`,
		});

		// Assign alt to image
		if (data.alt) image.alt = data.alt;

		// Assign produt to image
		image.product = product;
		await image.save();

		// Add image to product
		product.images = [image, ...product.images];
		return await product.save();
	}

	static async delete(imageId: string, productId: string) {
		// Check if product exists
		const product = await Product.findOne(productId);

		if (!product)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Product not found',
			});

		// Check if image exists
		const image = await Image.findOne(imageId);

		if (!image)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Image not found',
			});

		// Delete image
		await image.remove();
	}
}
