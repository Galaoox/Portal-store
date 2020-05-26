import { Router, Request, Response } from 'express';
import ProductoController from '../controllers/producto.controller';

class ProductoRouter {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        this.router.post('/store', ProductoController.store);


        this.router.post('/edit/:id', ProductoController.edit);


        this.router.get('/delete/:id', ProductoController.delete);

        this.router.get('/', ProductoController.index);

        this.router.get('/detalle/:producto', ProductoController.detalle);

        this.router.get('/estado/:id_estado/:id', ProductoController.estado);


    }

}

const productoRouter = new ProductoRouter();
export default productoRouter.router;