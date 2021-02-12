import { StatusCodes } from 'http-status-codes';
import { Product } from '../entities/product';
import { Variant, IVariant } from '../entities/variant';
import { HttpError } from '../util/httpError';

export class VariantService {
	static async create(productId: string, doc: IVariant) {
		const product = await Product.findOne(productId, {
			relations: ['variants'],
		});

		if (!product)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Product not found',
			});

		const variant = await Variant.create(doc);
		await variant.save();

		product.variants = [variant, ...product.variants];
		await product.save();

		return variant;
	}

	static async delete(productId: string, variantId: string) {
		const variant = await Variant.findOne({
			where: { product: productId, id: variantId },
		});

		if (!variant)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Variant not found',
			});

		return await variant.remove();
	}
}
