import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { User, IUserRegister } from '../entities/user';
import { HttpError } from '../util/httpError';

class UserService {
	private async hashPassword(password: string) {
		const salt = await bcrypt.genSalt(12);
		const hash = await bcrypt.hash(password, salt);
		return hash;
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
		await newUser.save();

		return newUser;
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
