import { Response, Request } from 'express';
import pool from '../database';

class ProductoController {


    public async index(req: Request, res: Response) {
        // asi recibire los filtros
        res.render('usuario', { verFormulario: true });

    }


    public async productos(req: Request | any, res: Response) {

        const productos = await pool.query(`
        select pro.id, pro.nombre, DATE_FORMAT(pro.fecha , '%Y/%m/%d') as fecha, pro.descripcion, pro.precio, pro.cantidad, pro.img,
        CONCAT(usu.nombres ,' ', usu.apellidos) as vendedor, cat.nombre as categoria, cat.id as id_categoria
        from productos pro 
        left join usuarios usu on  usu.id = pro.id_usuario 
        left join categorias cat on  cat.id = pro.id_categoria 
        where  pro.fecha_eliminado is null and usu.id = ${req.user.id} `);
        const categorias = await pool.query(`select * from categorias where fecha_eliminado IS NULL`);
        console.log(categorias);
        res.render('usuario', { verProductos: true, categorias, productos });

    }



}

export default new ProductoController();