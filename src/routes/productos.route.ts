import { Router, Request, Response } from 'express';
import ProductoController from '../controllers/producto.controller';
import auth from '../lib/auth';

class ProductoRouter {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        this.router.post('/store', auth.isLoggedIn, ProductoController.store);


        this.router.post('/edit/:id', auth.isLoggedIn, ProductoController.edit);


        this.router.get('/delete/:id', auth.isLoggedIn, ProductoController.delete);

        this.router.get('/', ProductoController.index);

        this.router.get('/detalle/:producto', ProductoController.detalle);

        this.router.get('/estado/:id_estado/:id', auth.isLoggedInAdmin, ProductoController.estado);


    }

}

const productoRouter = new ProductoRouter();
export default productoRouter.router;