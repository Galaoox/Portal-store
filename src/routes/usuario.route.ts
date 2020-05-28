import { Router, Response, Request } from 'express';

import usuarioController from '../controllers/usuario.controller';

const router = Router();


router.get('/', usuarioController.index);



router.get('/productos', usuarioController.productos);


export default router;