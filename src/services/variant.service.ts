import { StatusCodes } from 'http-status-codes';
import { Product } from '../entities/product';
import { Variant, IVariant } from '../entities/variant';
import { HttpError } from '../util/httpError';

export class VariantService {
	static async create(doc: IVariant) {
		const variant = await Variant.create(doc);
		await Product.save(variant);
		return variant;
	}

	static async remove(id: string) {
		const variant = await Variant.findOne(id);

		if (!variant)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Variant not found',
			});

		return await variant.remove();
	}
}
