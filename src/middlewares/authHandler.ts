import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verify } from 'jsonwebtoken';
import { User } from '../entities/user';
import { HttpError } from '../util/httpError';

export interface AuthorizedRequest extends Request {
	user?: User;
}

export const requireAuthorization = async (
	req: AuthorizedRequest,
	_res: Response,
	next: NextFunction
) => {
	const authorization = req.headers['authorization'];

	if (!authorization)
		return next(
			new HttpError({
				status: StatusCodes.UNAUTHORIZED,
				error: 'Authorization token not provided',
			})
		);

	try {
		const accessToken = authorization.split(' ')[1];
		const tokenPayload: any = verify(
			accessToken,
			process.env.ACCESS_TOKEN_SECRET!
		);

		const user = await User.findOne(tokenPayload.userId, {
			relations: ['cart', 'cart.items', 'cart.items.product'],
		});

		if (!user) throw new Error();

		req.user = user;
	} catch (err) {
		return next(
			new HttpError({
				status: StatusCodes.UNAUTHORIZED,
				error: 'Invalid authorization token',
			})
		);
	}

	return next();
};
