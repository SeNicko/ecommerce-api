import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthorizedRequest } from '../middlewares/authHandler';
import CartService from '../services/cart.service';
import { HttpError } from '../util/httpError';

class CartController {
	async getOne(req: AuthorizedRequest, res: Response, next: NextFunction) {
		const { id: userId } = req.params;
		const user = req.user!;

		try {
			if (parseInt(userId) !== user.id)
				throw new HttpError({
					status: StatusCodes.FORBIDDEN,
					error: 'Forbidden',
				});

			const cart = await CartService.getOne(user);

			res.status(200).json(cart);
		} catch (err) {
			next(err);
		}
	}

	async addProduct(req: AuthorizedRequest, res: Response, next: NextFunction) {
		const user = req.user!;

		try {
			await CartService.addCartItem(user, req.body);
			res.status(200).json({
				message: 'Cart item succesfully assigned',
			});
		} catch (err) {
			next(err);
		}
	}

	async removeProduct(
		req: AuthorizedRequest,
		res: Response,
		next: NextFunction
	) {
		const user = req.user!;
		const { id: cartId } = req.params;
		const { quantity } = req.body;

		try {
			await CartService.removeCartItem(user, cartId, parseInt(quantity));
			res.status(200).json({
				message: 'Cart item succesfully removed',
			});
		} catch (err) {
			next(err);
		}
	}

	async delete(req: AuthorizedRequest, res: Response, next: NextFunction) {
		const { id: userId } = req.params;
		const user = req.user!;

		try {
			if (parseInt(userId) !== user.id)
				throw new HttpError({
					status: StatusCodes.FORBIDDEN,
					error: 'Forbidden',
				});

			const cart = await CartService.delete(user);

			res.status(200).json(cart);
		} catch (err) {
			next(err);
		}
	}
}

export default CartController;
