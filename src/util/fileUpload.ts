import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, 'uploads');
	},
	filename: (_req, file, cb) => {
		console.log(file);
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

export const upload = multer({
	storage,
	fileFilter: (_req, file, cb) => {
		if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
			cb(null, true);
		} else {
			cb(null, false);
		}
	},
});
