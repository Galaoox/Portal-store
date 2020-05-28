import express, { Request, Response } from 'express';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import path from 'path';
import flash from 'connect-flash';
import passport from 'passport';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import keys from './keys';

import IndexRoutes from './routes/index.route';
import AuthRoutes from './routes/auth.route';
import ProductosRoutes from './routes/productos.route';
import CarritoRoutes from './routes/carrito.route';
import UsuarioRoutes from './routes/usuario.route';
import AdminRoutes from './routes/admin.route';
import CategoriasRoutes from './routes/categorias.route';


const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('./lib/passport');


class Server {
    public app: express.Application;
    private port: Number = 3000;
    private options = keys.database;
    constructor() {
        this.app = express();
        this.config();
        this.middlewares();
        this.global();
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
        this.app.use(session({
            secret: 'portalsession',
            resave: false,
            saveUninitialized: false,
            store: new MySQLStore(keys.database)
        }));
        this.app.use(flash());
        this.app.use(fileUpload());
        //this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(passport.initialize());
        this.app.use(passport.session());

    }

    routes() {

        this.app.use('/', IndexRoutes);
        this.app.use('/auth', AuthRoutes);
        this.app.use('/productos', ProductosRoutes);
        this.app.use('/carrito', CarritoRoutes);
        this.app.use('/usuario', UsuarioRoutes);
        this.app.use('/admin', AdminRoutes);
        this.app.use('/categorias', CategoriasRoutes);



        this.app.use(express.static(path.join(__dirname, 'public')));

    }

    global() {
        this.app.use((req: Request | any, res: Response, next) => {
            this.app.locals.message = req.flash('message');
            this.app.locals.success = req.flash('success');
            this.app.locals.user = req.user;
            next();
        });
    }

    start(): void {
        this.app.listen(this.port, () => {
            console.log("Server run on port: ", this.port);
        })
    }

}
export default Server;