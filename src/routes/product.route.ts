import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

const router = Router();

router.get('/', ProductController.get);
router.get('/:filter', ProductController.getOne);
router.post('/', ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

export default router;
