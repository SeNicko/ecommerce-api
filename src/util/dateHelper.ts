interface IExpirationDateOptions {
	days?: number;
	hours?: number;
	minutes?: number;
}

export const getExpirationDate = ({
	days,
	hours,
	minutes,
}: IExpirationDateOptions) => {
	if (!days) days = 0;
	if (!hours) hours = 0;
	if (!minutes) minutes = 0;

	return new Date(
		Date.now() +
			minutes * 60 * 1000 + // number of minutes
			hours * 60 * 60 * 1000 + // number of hours
			days * 24 * 60 * 60 * 1000 // number of days
	);
};
