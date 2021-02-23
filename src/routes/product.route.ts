import { Router } from 'express';
import { ImageController } from '../controllers/image.controller';
import { OptionController } from '../controllers/option.controller';
import { ProductController } from '../controllers/product.controller';
import { VariantController } from '../controllers/variant.controller';
import { upload } from '../util/fileUpload';

const router = Router();

// Product
router.get('/', ProductController.get);
router.get('/:filter', ProductController.getOne);
router.post('/', ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

// Categories
router.put('/:id/categories', ProductController.assignCategory);
router.delete(
	'/:productId/categories/:categoryId',
	ProductController.removeCategory
);

// Images
router.post('/:id/images', upload.array('images'), ImageController.create);
router.delete('/:productId/images/:imageId', ImageController.delete);

// Product variants
router.post('/:productId/variants', VariantController.create);
router.delete('/:productId/variants/:variantId', VariantController.remove);

// Product variants options
router.post('/:productId/variants/:variantId/options', OptionController.create);
router.delete(
	'/:productId/variants/:variantId/options/:optionId',
	OptionController.delete
);

export default router;
