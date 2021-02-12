import { Category, ICategory } from '../entities/category';
import slug from 'slug';
import { HttpError } from '../util/httpError';
import { StatusCodes } from 'http-status-codes';

export class CategoryService {
	static async get() {
		const categories = await Category.find();
		return categories;
	}

	static async getOne(id: string) {
		const category = await Category.findOne(id);

		if (!category)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Category not found',
			});

		return category;
	}

	static async create(doc: ICategory) {
		if (!doc.slug) doc.slug = slug(doc.name);

		const category = Category.create(doc);
		await category.save();

		return category;
	}

	static async update(id: string, doc: ICategory) {
		const category = await Category.findOne(id);

		if (!category)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Category not found',
			});

		return await Category.update(id, doc);
	}

	static async delete(id: string) {
		const category = await Category.findOne(id);

		if (!category)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Category not found',
			});

		return await category.remove();
	}
}
