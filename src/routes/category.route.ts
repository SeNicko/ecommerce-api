import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';

const router = Router();
const controller = new CategoryController();

// Categories
router.get('/', controller.get);
router.get('/:id', controller.getOne);
router.get('/:filter/products', controller.retriveProducts);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
