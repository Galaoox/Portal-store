import { Response, Request } from 'express';
import pool from '../database';
import passport from 'passport';


class AuthController {

    public async login(req: Request | any, res: Response, next: any) {

        passport.authenticate('local.login', {
            successRedirect: '/usuario',
            failureRedirect: '/',
            failureFlash: true
        })(req, res, next);

    }


    public async register(req: Request, res: Response) {
        passport.authenticate('local.register', {
            successRedirect: '/usuario',
            failureRedirect: '/',
            failureFlash: true
        });
        //   await pool.query('INSERT INTO usuarios SET ?', [req.body]);
        // res.redirect('back');

    }



    public async cerrarSesion(req: Request, res: Response) {
        req.logOut();
        res.redirect('/');

    }

    public async edit(req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('UPDATE usuarios set ? WHERE id = ?', [req.body, id]);
        res.redirect('back');

    }


    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('UPDATE usuarios set fecha_eliminado = NOW() WHERE id = ?', [id]);
        res.redirect('back');

    }



}
const authController = new AuthController();
export default authController;