import express, { Application, Router } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import exphbs from 'express-handlebars'
import path from 'path'
import IndexRoutes from './routes';

class Server {
    public app: Application;
    private port: Number = 3000;
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
        this.config();
    }


    config():void{
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('partials', path.join(__dirname, 'views/partials'));
        console.log("que mierda es esto: ", this.app.get('partials'));
        this.app.engine('.hbs', exphbs({
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: [
                path.join(this.app.get('views'), 'partials'),
                path.join(this.app.get('partials'), 'index')
            ],
            defaultLayout: 'main',
            extname: '.hbs'
        })); 
        this.app.set('view engine', '.hbs');
    }

    middlewares(): void {
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use(cors());
    }

    routes(): void {
        this.app.use(IndexRoutes);


        this.app.use(express.static(path.join(__dirname, 'public')));

    }

    start(): void {
        this.app.listen(this.port, () => {
            console.log("Server run on port: ", this.port);
        })
    }

}
export default Server;