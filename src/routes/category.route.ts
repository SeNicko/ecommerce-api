import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';

const router = Router();

// Categories
router.get('/', CategoryController.get);
router.get('/:id', CategoryController.getOne);
router.get('/:id/products', CategoryController.retriveProducts);
router.post('/', CategoryController.create);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.delete);

export default router;
