import express from 'express';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import path from 'path';


import IndexRoutes from './routes/index.route';
import AuthRoutes from './routes/auth.route';
import ProductosRoutes from './routes/productos.route';
import CarritoRoutes from './routes/carrito.route';
import PedidosRoutes from './routes/pedidos.route';
import UsuarioRoutes from './routes/usuario.route';
import AdminRoutes from './routes/admin.route';
import CategoriasRoutes from './routes/categorias.route';




class Server {
    public app: express.Application;
    private port: Number = 3000;
    constructor() {
        this.app = express();
        this.config();
        this.middlewares();

        this.routes();

    }


    config(): void {
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('partials', path.join(__dirname, 'views/partials'));
        this.app.engine('.hbs', exphbs({
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: [
                path.join(this.app.get('views'), 'partials'),
                path.join(this.app.get('partials'), 'index'),
                path.join(this.app.get('partials'), 'usuario'),
                path.join(this.app.get('partials'), 'admin')

            ],
            defaultLayout: 'main',
            extname: '.hbs',
            helpers: require('./lib/handlebars')

        }));
        this.app.set('view engine', '.hbs');
    }

    middlewares(): void {

        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());

    }

    routes() {

        this.app.use('/', IndexRoutes);
        this.app.use('/auth', AuthRoutes);
        this.app.use('/productos', ProductosRoutes);
        this.app.use('/carrito', CarritoRoutes);
        this.app.use('/pedidos', PedidosRoutes);
        this.app.use('/usuario', UsuarioRoutes);
        this.app.use('/admin', AdminRoutes);
        this.app.use('/categorias', CategoriasRoutes);



        this.app.use(express.static(path.join(__dirname, 'public')));

    }

    start(): void {
        this.app.listen(this.port, () => {
            console.log("Server run on port: ", this.port);
        })
    }

}
export default Server;