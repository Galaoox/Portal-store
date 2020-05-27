import { Router, Response, Request } from 'express';
import CarritoController from '../controllers/carrito.controller';

const router = Router();


router.get('/', CarritoController.index);



router.get('/add/', CarritoController.add);


router.get('/clear', CarritoController.clear);


router.get('/remove/:id', CarritoController.remove);

router.get('/procesar/', CarritoController.procesar);




export default router;