import { createAccessToken, createRefreshToken } from '../auth/tokenGenerator';
import { Request, Response, NextFunction } from 'express';
import { getExpirationDate } from '../util/dateHelper';
import UserService from '../services/user.service';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../util/httpError';

export class UserController {
	static async register(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await UserService.register(req.body);
			const accessToken = createAccessToken(user);

			// Send cookie with refresh token
			console.log(getExpirationDate({ days: 7 }));
			res.cookie('rtk', createRefreshToken(user), {
				httpOnly: true,
				expires: getExpirationDate({ days: 7 }),
			});

			// Send access token
			res.status(StatusCodes.OK).json({
				userEmail: user.email,
				accessToken,
			});
		} catch (err) {
			next(err);
		}
	}

	static async login(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await UserService.login(req.body);
			const accessToken = createAccessToken(user);

			console.log(getExpirationDate({ days: 7 }));
			res.cookie('rtk', createRefreshToken(user), {
				httpOnly: true,
				expires: getExpirationDate({ days: 7 }),
			});

			res.status(StatusCodes.OK).json({
				userEmail: user.email,
				accessToken,
			});
		} catch (err) {
			next(err);
		}
	}

	static async logout(req: Request, res: Response, next: NextFunction) {
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
