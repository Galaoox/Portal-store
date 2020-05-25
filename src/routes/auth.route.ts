import { Router, Response, Request } from 'express';

const router = Router();


router.post('/login', async (req: Request, res: Response) => {
    console.log("email", req.body.email);
    res.redirect('back');

});


router.post('/register', async (req: Request, res: Response) => {
    console.log("registro", req);
    res.redirect('back');

});

export default router;