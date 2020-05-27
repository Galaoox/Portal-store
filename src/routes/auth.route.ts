import { Router, Request, Response } from 'express';
import AuthController from '../controllers/auth.controller';
import passport from 'passport';
import auth from '../lib/auth';
class AuthRouter {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/login', AuthController.login);


        this.router.post('/register', passport.authenticate('local.register', {
            successRedirect: '/usuario',
            failureRedirect: '/',
            failureFlash: true
        }));

        this.router.post('/edit/:id', auth.isLoggedIn, AuthController.edit);

        this.router.get('/delete/:id', auth.isLoggedInAdmin, AuthController.delete);

        this.router.get('/cerrarSesion', auth.isLoggedIn, AuthController.cerrarSesion);

    }

}

const authRouter = new AuthRouter();
export default authRouter.router;