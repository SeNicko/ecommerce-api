import { StatusCodes } from 'http-status-codes';
import { Cart } from '../entities/cart';
import { CartItem, ICartItemDoc } from '../entities/cartItem';
import { Product } from '../entities/product';
import { User } from '../entities/user';
import { HttpError } from '../util/httpError';

interface ICartItemAddDoc extends ICartItemDoc {
	productId: number;
}

class CartService {
	async getOne(user: User) {
		return user.cart;
	}

	async addCartItem(user: User, doc: ICartItemAddDoc) {
		const product = await Product.findOne(doc.productId);

		if (!product)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Not found',
			});

		let cartItem = user.cart.items.find(
			cartItem => cartItem.product.id === product.id
		);

		if (cartItem) {
			cartItem.quantity++;
			await cartItem.save();
		} else {
			cartItem = CartItem.create({ quantity: doc.quantity });
			cartItem.product = product;
			cartItem.cart = user.cart;
			cartItem.save();
			user.cart.items.push(cartItem);
			await user.cart.save();
		}
	}

	async removeCartItem(user: User, cartId: string, quantity: number = 1) {
		const cartItem = user.cart.items.find(
			cartItem => cartItem.id === parseInt(cartId)
		);

		if (!cartItem)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'Not found',
			});

		cartItem.quantity -= quantity;
		if (cartItem?.quantity <= 0) await cartItem.remove();
		else await cartItem.save();
	}

	async delete(user: User) {
		await user.cart.remove();

		const newCart = Cart.create();
		await newCart.save();

		user.cart = newCart;
		await user.save();
	}
}

export default new CartService();
