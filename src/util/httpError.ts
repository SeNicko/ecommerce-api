import { getReasonPhrase, StatusCodes } from 'http-status-codes';

type error = string | string[];

export interface IHttpError {
	status: StatusCodes;
	error?: error;
}

export class HttpError {
	status: StatusCodes;
	error: error;

	constructor(
		{ status, error }: IHttpError = {
			status: StatusCodes.INTERNAL_SERVER_ERROR,
		}
	) {
		this.status = status;
		this.error = error || getReasonPhrase(this.status);
	}
}
