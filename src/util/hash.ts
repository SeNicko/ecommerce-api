export const createHash = () => {
	const chars = 'abcdefghjiklmnoprqstABCDEFGHIJKLMND';

	let hash = '';
	for (let i = 0; i < 5; i++) {
		hash += chars[Math.floor(Math.random() * chars.length)];
	}
	return hash;
};
