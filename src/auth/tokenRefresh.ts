import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verify } from 'jsonwebtoken';
import { User } from '../entities/user';
import { HttpError } from '../util/httpError';
import { createAccessToken } from './tokenGenerator';

export const tokenRefresh = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const refreshToken = req.cookies.rtk;

		if (!refreshToken)
			throw new HttpError({
				status: StatusCodes.UNAUTHORIZED,
				error: 'Missing refresh token',
			});

		let refreshTokenPayload: any;
		try {
			refreshTokenPayload = verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET!
			);
		} catch (err) {
			throw new HttpError({
				status: StatusCodes.UNAUTHORIZED,
				error: 'Invalid refresh token',
			});
		}

		const user = await User.findOne(refreshTokenPayload.userId);

		if (!user)
			throw new HttpError({
				status: StatusCodes.UNAUTHORIZED,
				error: 'Invalid refresh token',
			});

		const accessToken = createAccessToken(user);

		res.status(200).send({
			userEmail: user.email,
			accessToken,
		});
	} catch (err) {
		next(err);
	}
};
