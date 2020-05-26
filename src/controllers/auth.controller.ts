import { Response, Request } from 'express';
import pool from '../database';

class AuthController {

    public async login(req: Request, res: Response) {
        console.log("email", req.body.email);
        res.redirect('back');

    }


    public async register(req: Request, res: Response) {
        console.log(req.body);
        await pool.query('INSERT INTO usuarios SET ?', [req.body],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    res.redirect('back');
                }
                if (results) {
                    res.redirect('back');
                }
            });
    }

    public async edit(req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('UPDATE usuarios set ? WHERE id = ?', [req.body, id],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    res.redirect('back');
                }
                if (results) {
                    res.redirect('back');
                }
            });
    }


    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('UPDATE usuarios set fecha_eliminado = NOW() WHERE id = ?', [id],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    res.redirect('back');
                }
                if (results) {
                    res.redirect('back');
                }
            });
    }



}
const authController = new AuthController();
export default authController;