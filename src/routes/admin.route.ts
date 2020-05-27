import { Router } from 'express';
import AdminController from '../controllers/admin.controller';
import auth from '../lib/auth';
class UsersRouter {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // Dirigir vista inicio
        this.router.get('/', auth.isLoggedInAdmin, AdminController.index);
        // ruta que dirige a la vista del datatable de productos
        this.router.get('/productos', auth.isLoggedInAdmin, AdminController.productos);
        // ruta que dirige a la vista del datatable de solicitudes
        this.router.get('/solicitudes', auth.isLoggedInAdmin, AdminController.solicitudes);

        // ruta que dirige a la vista del datatable de categorias
        this.router.get('/categorias', auth.isLoggedInAdmin, AdminController.categorias);

        // ruta que dirige a la vista de reportes
        this.router.get('/reportes', auth.isLoggedInAdmin, AdminController.reportes);

        this.router.get('/reportesInfo', auth.isLoggedInAdmin, AdminController.reportesInfo);

        // ruta que dirige a la vista del datatable de usuarios
        this.router.get('/usuarios', auth.isLoggedInAdmin, AdminController.usuarios);


    }

}

const usersRouter = new UsersRouter();
export default usersRouter.router;