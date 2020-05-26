import { Response, Request } from 'express';
import pool from '../database';

class ProductoController {

    public async store(req: Request, res: Response) {
        console.log(req.body);
        await pool.query('INSERT INTO productos SET fecha = NOW() , ?', [req.body]);
        res.redirect('back');
    }

    public async edit(req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('UPDATE productos set ? WHERE id = ?', [req.body, id]);
        res.redirect('back');

    }


    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('UPDATE productos set fecha_eliminado = NOW() WHERE id = ?', [id]);

        res.redirect('back');

    }


    public async estado(req: Request, res: Response) {
        const { id, id_estado } = req.params;
        await pool.query('UPDATE productos set id_estado = ? WHERE id = ?', [id_estado, id]);
        res.redirect('back');

    }

    /**
     * Detalles producto controller muestra la informacion detallada de un producto
     * @param req 
     * @param res 
     */
    public async detalle(req: Request, res: Response) {
        console.log(req.params.producto);
        res.render('productos/detalle');
    }


    public async index(req: Request, res: Response) {
        // asi recibire los filtros
        console.log(req.query.busqueda);
        console.log(req.query.categoria);
        res.render('productos/lista');
    }



}
const productoController = new ProductoController();
export default productoController;