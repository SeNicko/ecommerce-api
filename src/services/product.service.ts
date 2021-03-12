import { Product } from '../entities/product';
import { HttpError } from '../util/httpError';
import StatusCodes from 'http-status-codes';
import { IProduct } from '../entities/product';
import slug from 'slug';
import { Category } from '../entities/category';
import { createHash } from '../util/hash';

enum IGetOneOptions {
	ID = 'id',
	SLUG = 'slug',
}

const relations = ['variants', 'variants.options', 'categories', 'images'];

class ProductService {
	async get() {
		const products = await Product.find({
			relations,
		});
		return products;
	}

	async getOne(filter: string, type: string = IGetOneOptions.ID) {
		let product;

		switch (type) {
			case IGetOneOptions.ID:
				product = await Product.findOne(filter, {
					relations,
				});
				break;
			case IGetOneOptions.SLUG:
				product = await Product.findOne({
					where: { slug: filter },
					relations,
				});
				break;
			default:
				throw new HttpError({ status: StatusCodes.BAD_REQUEST });
		}

		if (!product)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Prduct not found',
			});

		return product;
	}

	async create(doc: IProduct) {
		if (!doc.slug) doc.slug = `${slug(doc.name)}-${createHash()}`;

		const product = Product.create(doc);
		await product.save();

		return product;
	}

	async update(id: string, doc: IProduct) {
		const product = await Product.findOne(id);

		if (!product)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Product not found',
			});

		await Product.update(id, doc);
		return await Product.findOne(id, {
			relations,
		});
	}

	async delete(id: string) {
		const product = await Product.findOne(id);

		if (!product)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Product not found',
			});

		return await product.remove();
	}

	async assignCategory(productId: string, categoryId: string) {
		const product = await Product.findOne(productId, { relations });

		if (!product)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Product not found',
			});

		const category = await Category.findOne(categoryId);

		if (!category)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Category not found',
			});

		product.categories = [category, ...product.categories];
		await product.save();
	}

	async removeCategory(productId: string, categoryId: string) {
		const product = await Product.findOne(productId, { relations });

		if (!product)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Product not found',
			});

		const categoryToRemove = await Category.findOne(categoryId);

		if (!categoryToRemove)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Category not found',
			});

		product.categories = product.categories.filter(
			category => category.id !== categoryToRemove.id
		);

		await product.save();
	}
}

export default new ProductService();
