import { Router, Request, Response } from 'express';
import CategoriaController from '../controllers/categoria.controller';
import auth from '../lib/auth';
class CategoriaRouter {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        this.router.post('/store', auth.isLoggedInAdmin, CategoriaController.store);


        this.router.post('/edit/:id', auth.isLoggedInAdmin, CategoriaController.edit);


        this.router.get('/delete/:id', auth.isLoggedInAdmin, CategoriaController.delete);




    }

}

const categoriaRouter = new CategoriaRouter();
export default categoriaRouter.router;