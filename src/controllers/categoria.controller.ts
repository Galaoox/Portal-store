import { Response, Request } from 'express';
import pool from '../database';

class CategoriaController {

    public async store(req: Request, res: Response) {
        await pool.query('INSERT INTO categorias SET ?', [req.body]);
        req.flash('success', 'Categoria creada exitosamente');

        res.redirect('back');
    }

    public async edit(req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('UPDATE categorias set ? WHERE id = ?', [req.body, id]);
        req.flash('success', 'Categoria editada exitosamente');
        res.redirect('back');
    }


    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('UPDATE categorias set fecha_eliminado = NOW() WHERE id = ?', [id]);
        req.flash('success', 'Categoria eliminada exitosamente');
        res.redirect('back');
    }



}
const categoriaController = new CategoriaController();
export default categoriaController;