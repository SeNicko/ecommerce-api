import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verify } from 'jsonwebtoken';
import { HttpError } from '../util/httpError';

export const requireAuthorization = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	const authorization = req.headers['authorization'];

	if (!authorization)
		throw new HttpError({
			status: StatusCodes.UNAUTHORIZED,
			error: 'Authorization token not provided',
		});

	try {
		const accessToken = authorization.split(' ')[1];
		const tokenPayload = verify(accessToken, process.env.ACCESS_SECRET!);
		console.log(tokenPayload);
	} catch (err) {
		throw new HttpError({
			status: StatusCodes.UNAUTHORIZED,
			error: 'Invalid authorization token',
		});
	}

	// Call next middleware
	next();
};
