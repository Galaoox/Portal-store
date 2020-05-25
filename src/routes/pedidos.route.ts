import { Router, Response, Request } from 'express';

const router = Router();


router.get('/', (req: Request, res: Response) => {
    // asi recibire los filtros
    res.render('carrito/');
});



router.get('/create/', (req: Request, res: Response) => {


    res.redirect('back');
});





router.get('/remove', (req: Request, res: Response) => {


    res.redirect('back');
});



export default router;