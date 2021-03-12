import { Router } from 'express';
import { ImageController } from '../controllers/image.controller';
import { OptionController } from '../controllers/option.controller';
import { ProductController } from '../controllers/product.controller';
import { VariantController } from '../controllers/variant.controller';
import { upload } from '../util/fileUpload';

const router = Router();
const productController = new ProductController();

// Crud controllers
router.get('/', productController.get);
router.get('/:filter', productController.getOne);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

// Properties controllers
const imageController = new ImageController();
const variantController = new VariantController();
const optionController = new OptionController();

router.post('/:id/categories', productController.assignCategory);
router.delete(
	'/:productId/categories/:categoryId',
	productController.removeCategory
);

router.post('/:id/images', upload.single('image'), imageController.create);
router.delete('/:productId/images/:imageId', imageController.delete);

router.post('/:productId/variants', variantController.create);
router.delete('/:productId/variants/:variantId', variantController.remove);

router.post('/:productId/variants/:variantId/options', optionController.create);
router.delete(
	'/:productId/variants/:variantId/options/:optionId',
	optionController.delete
);

export default router;
