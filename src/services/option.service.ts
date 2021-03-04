import { StatusCodes } from 'http-status-codes';
import { IOption, Option } from '../entities/option';
import { Variant } from '../entities/variant';
import { HttpError } from '../util/httpError';

class OptionService {
	async create(productId: string, variantId: string, doc: IOption) {
		// Check if variant exists
		const variant = await Variant.findOne({
			where: { id: variantId, product: productId },
			relations: ['options'],
		});

		if (!variant)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Variant not found',
			});

		// Create option
		const option = await Option.create(doc);
		await option.save();

		variant.options = [option, ...variant.options];
		await variant.save();

		return option;
	}

	async delete(productId: string, variantId: string, optionId: string) {
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

export default new OptionService();
