import { Router, Request, Response } from 'express';
import CategoriaController from '../controllers/categoria.controller';

class CategoriaRouter {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        this.router.post('/store', CategoriaController.store);


        this.router.post('/edit/:id', CategoriaController.edit);


        this.router.get('/delete/:id', CategoriaController.delete);




    }

}

const categoriaRouter = new CategoriaRouter();
export default categoriaRouter.router;