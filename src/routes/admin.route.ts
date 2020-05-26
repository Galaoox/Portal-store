import { Router } from 'express';
import AdminController from '../controllers/admin.controller';

class UsersRouter {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // Dirigir vista inicio
        this.router.get('/', AdminController.index);
        // ruta que dirige a la vista del datatable de productos
        this.router.get('/productos', AdminController.productos);
        // ruta que dirige a la vista del datatable de solicitudes
        this.router.get('/solicitudes', AdminController.solicitudes);

        // ruta que dirige a la vista del datatable de categorias
        this.router.get('/categorias', AdminController.categorias);

        // ruta que dirige a la vista de reportes
        this.router.get('/reportes', AdminController.reportes);

        // ruta que dirige a la vista del datatable de usuarios
        this.router.get('/usuarios', AdminController.usuarios);


    }

}

const usersRouter = new UsersRouter();
export default usersRouter.router;