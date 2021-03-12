import { createAccessToken, createRefreshToken } from '../auth/tokenGenerator';
import { Request, Response, NextFunction } from 'express';
import { getExpirationDate } from '../util/dateHelper';
import UserService from '../services/user.service';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../util/httpError';

export class UserController {
	async get(_req: Request, res: Response, next: NextFunction) {
		try {
			const users = await UserService.get();
			res.status(200).json(users);
		} catch (err) {
			next(err);
		}
	}

	async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const user = await UserService.getOne(id);
			res.status(200).json(user);
		} catch (err) {
			next(err);
		}
	}

	async register(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await UserService.register(req.body);
			const accessToken = createAccessToken(user);

			const refreshToken = createRefreshToken(user);
			res.cookie('rtk', refreshToken, {
				httpOnly: true,
				expires: getExpirationDate({ days: 7 }),
			});

			res.status(StatusCodes.OK).json({
				user: {
					email: user.email,
					cart: user.cart,
				},
				accessToken,
			});
		} catch (err) {
			next(err);
		}
	}

	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await UserService.login(req.body);
			const accessToken = createAccessToken(user);

			const refreshToken = createRefreshToken(user);
			res.cookie('rtk', refreshToken, {
				httpOnly: true,
				expires: getExpirationDate({ days: 7 }),
			});

			res.status(StatusCodes.OK).json({
				user: {
					email: user.email,
				},
				accessToken,
			});
		} catch (err) {
			next(err);
		}
	}

	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.cookies.rtk)
				throw new HttpError({
					status: StatusCodes.BAD_REQUEST,
					error: 'Cookie not provided',
				});

			res.clearCookie('rtk');
			res.sendStatus(StatusCodes.OK);
		} catch (err) {
			next(err);
		}
	}
}
