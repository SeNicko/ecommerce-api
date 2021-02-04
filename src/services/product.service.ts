import { Product } from '../entities/product';
import { HttpError } from '../util/httpError';
import StatusCodes from 'http-status-codes';
import { IProduct } from '../entities/product';
import slug from 'slug';

enum IGetOneOptions {
	ID = 'id',
	SLUG = 'slug',
}

export class ProductService {
	static async get() {
		const products = await Product.find();
		return products;
	}

	static async getOne(filter: string, type: string = IGetOneOptions.ID) {
		let product;

		switch (type) {
			case IGetOneOptions.ID:
				product = await Product.findOne(filter);
				break;
			case IGetOneOptions.SLUG:
				product = await Product.findOne({ where: { slug: filter } });
				break;
			default:
				throw new HttpError({ status: StatusCodes.BAD_REQUEST });
		}

		return product;
	}

	static async create(doc: IProduct) {
		if (!doc.slug) doc.slug = slug(doc.name);

		const product = Product.create(doc);
		await Product.save(product);

		return product;
	}

	static async update(id: string, doc: IProduct) {
		const product = await Product.findOne(id);

		if (!product)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Product not found',
			});

		await Product.update(id, doc);
		return await Product.findOne(id);
	}

	static async delete(id: string) {
		const product = await Product.findOne(id);

		if (!product)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Product not found',
			});

		return await product.remove();
	}
}
