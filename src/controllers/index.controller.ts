import { Response, Request } from 'express';
import pool from '../database';

class IndexController {


    public async index(req: Request, res: Response) {
        // asi recibire los filtros
        const productos = await pool.query(`
        select p.id , p.nombre , p.precio, p.img from productos p
        left join categorias cat on cat.id = p.id_categoria 
        where p.id_estado = 1 and p.fecha_eliminado is null
        ORDER BY  p.fecha  DESC
        limit 8
        `);

        res.render('index', { productos });
    }



}

export default new IndexController();