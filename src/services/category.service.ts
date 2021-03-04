import { Category, ICategory } from '../entities/category';
import slug from 'slug';
import { HttpError } from '../util/httpError';
import { StatusCodes } from 'http-status-codes';

enum IGetProductsOptions {
	ID = 'id',
	SLUG = 'slug',
}

export class CategoryService {
	async get() {
		const categories = await Category.find();
		return categories;
	}

	async getOne(id: string) {
		const category = await Category.findOne(id);

		if (!category)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Category not found',
			});

		return category;
	}

	async create(doc: ICategory) {
		if (!doc.slug) doc.slug = slug(doc.name);

		const category = Category.create(doc);
		await category.save();

		return category;
	}

	async update(id: string, doc: ICategory) {
		const category = await Category.findOne(id);

		if (!category)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Category not found',
			});

		return await Category.update(id, doc);
	}

	async delete(id: string) {
		const category = await Category.findOne(id);

		if (!category)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Category not found',
			});

		return await category.remove();
	}

	async retriveProducts(filter: string, type: string = IGetProductsOptions.ID) {
		const relations = [
			'products',
			'products.variants',
			'products.images',
			'products.variants.options',
		];

		let category;

		switch (type) {
			case IGetProductsOptions.SLUG:
				category = await Category.findOne({
					where: {
						slug: filter,
					},
					relations,
				});
				break;
			case IGetProductsOptions.ID:
				category = await Category.findOne(filter, {
					relations,
				});
				break;
			default:
				throw new HttpError({ status: StatusCodes.BAD_REQUEST });
		}

		if (!category)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Category not found',
			});

		return category.products;
	}
}

export default new CategoryService();
