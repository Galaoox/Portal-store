import { Response, Request } from 'express';
import pool from '../database';

class CategoriaController {

    public async store(req: Request, res: Response) {
        console.log(req.body);
        await pool.query('INSERT INTO categorias SET ?', [req.body],
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
        await pool.query('UPDATE categorias set ? WHERE id = ?', [req.body, id],
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
        await pool.query('UPDATE categorias set fecha_eliminado = NOW() WHERE id = ?', [id],
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
const categoriaController = new CategoriaController();
export default categoriaController;