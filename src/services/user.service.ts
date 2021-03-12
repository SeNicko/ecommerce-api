import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { Cart } from '../entities/cart';
import { User, IUserRegister } from '../entities/user';
import { HttpError } from '../util/httpError';

class UserService {
	private relations: string[] = ['cart', 'cart.items'];

	private async hashPassword(password: string) {
		const salt = await bcrypt.genSalt(12);
		const hash = await bcrypt.hash(password, salt);
		return hash;
	}

	async get() {
		const users = await User.find({ relations: this.relations });
		return users;
	}

	async getOne(id: string) {
		const user = await User.findOne(id, { relations: this.relations });

		if (!user)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'User not found',
			});

		return user;
	}

	async register({ email, password }: IUserRegister) {
		const user = await User.findOne({ email });

		if (user)
			throw new HttpError({
				status: StatusCodes.BAD_REQUEST,
				error: 'This user already exists',
			});

		const newUser = User.create({ email });
		const passwordHash = await this.hashPassword(password);
		newUser.password = passwordHash;

		const userCart = Cart.create();
		await userCart.save();

		newUser.cart = userCart;
		await newUser.save();

		return (await User.findOne({ email }))!;
	}

	async login({ email, password }: IUserRegister) {
		const user = await User.findOne({ email });

		if (!user)
			throw new HttpError({
				status: StatusCodes.NOT_FOUND,
				error: 'User not found',
			});

		const validPassword = await bcrypt.compare(password, user.password);

		if (!validPassword)
			throw new HttpError({
				status: StatusCodes.FORBIDDEN,
				error: 'Incorrect password',
			});

		return user;
	}
}

export default new UserService();
