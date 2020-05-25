import { Router, Response, Request } from 'express';

const router = Router();


router.get('/', (req: Request, res: Response) => {
    // asi recibire los filtros
    res.render('carrito/');
});



router.get('/add/', (req: Request, res: Response) => {

    console.log(req.query.producto);
    console.log(req.query.cantidad);
    res.redirect('back');
});


router.get('/clear', (req: Request, res: Response) => {


    res.redirect('back');
});


router.get('/remove', (req: Request, res: Response) => {


    res.redirect('back');
});



export default router;