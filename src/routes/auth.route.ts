import { Router, Request, Response } from 'express';
import AuthController from '../controllers/auth.controller';

class AuthRouter {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/login', AuthController.login);


        this.router.post('/register', AuthController.register);

        this.router.post('/edit/:id', AuthController.edit);

        this.router.get('/delete/:id', AuthController.delete);




    }

}

const authRouter = new AuthRouter();
export default authRouter.router;