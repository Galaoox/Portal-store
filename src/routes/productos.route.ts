import { Router, Response, Request } from 'express';

const router = Router();


router.get('/', (req: Request, res: Response) => {
    // asi recibire los filtros
    console.log(req.query.busqueda);
    console.log(req.query.categoria);
    res.render('productos/lista');
});



router.get('/detalle/:producto', (req: Request, res: Response) => {
    console.log(req.params.producto);
    res.render('productos/detalle');
});

export default router;