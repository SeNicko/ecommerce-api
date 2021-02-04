import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { HttpError } from '../util/httpError';

export const errorHandler: ErrorRequestHandler = (
	err: HttpError,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	console.log(err);

	if (!(err instanceof HttpError)) {
		err = new HttpError({
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
		});
	}

	res.status(err.status).json({
		error: err.error,
	});
};
