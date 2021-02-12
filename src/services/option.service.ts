import { StatusCodes } from 'http-status-codes';
import { IOption, Option } from '../entities/option';
import { Variant } from '../entities/variant';
import { HttpError } from '../util/httpError';

export class OptionService {
	static async create(productId: string, variantId: string, doc: IOption) {
		console.log(variantId, productId);

		// Check if variant exists
		const variant = await Variant.findOne({
			where: { id: variantId, product: productId },
			relations: ['options'],
		});

		console.log(variant);

		if (!variant)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Variant not found',
			});

		// Create option
		const option = await Option.create(doc);
		await option.save();

		console.log(option);

		variant.options = [option, ...variant.options];
		await variant.save();

		return option;
	}

	static async delete(productId: string, variantId: string, optionId: string) {
		const option = await Option.findOne({
			relations: ['variant'],
			where: { variant: { id: variantId, product: productId }, id: optionId },
		});

		if (!option)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Option not found',
			});

		await option.remove();
	}
}
