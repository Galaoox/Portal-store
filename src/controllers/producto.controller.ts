import { Response, Request } from 'express';
import pool from '../database';

class ProductoController {

    public async store(req: Request, res: Response) {
        await pool.query('INSERT INTO productos SET fecha = NOW() , ?', [req.body]);
        req.flash('success', 'Producto creado exitosamente');
        res.redirect('back');
    }

    public async edit(req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('UPDATE productos set ? WHERE id = ?', [req.body, id]);
        req.flash('success', 'Producto editado exitosamente');
        res.redirect('back');
    }


    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('UPDATE productos set fecha_eliminado = NOW() WHERE id = ?', [id]);
        req.flash('success', 'Producto eliminado exitosamente');
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
        const producto = await pool.query(`
        select p.id, p.nombre, DATE_FORMAT(p.fecha , '%Y/%m/%d') as fecha , p.descripcion , p.precio , p.cantidad , p.img, cat.nombre as categoria
        from productos p 
        left join usuarios usu on usu.id = p.id_usuario 
        left join categorias cat on cat.id = p.id_categoria 
        where p.id = ${req.params.producto} and  p.id_estado = 1 and p.fecha_eliminado is null 
        `);
        if (producto.length > 0) {
            res.render('productos/detalle', { producto: producto[0] });

        } else {
            req.flash('message', 'No se encontro el producto');
            res.redirect('/');
        }
    }


    public async index(req: Request, res: Response) {
        const productos = await pool.query(`
        select p.id , p.nombre , p.precio, cat.nombre as categoria,
		CONCAT(us.nombres , ' ', us.apellidos ) as vendedor
        from productos p
        left join categorias cat on cat.id = p.id_categoria 
        left join usuarios us on us.id = p.id_estado 
        where p.id_estado = 1 and p.fecha_eliminado is null and p.nombre like '%${req.query.busqueda ? req.query.busqueda : ''}%' ${req.query.categoria ? 'and p.id_categoria = ' + req.query.categoria : ''}
        ORDER BY  p.fecha  DESC
        `);
        const categorias = await pool.query('select * from categorias where fecha_eliminado is null');
        res.render('productos/lista', { productos, categorias });
    }



}
const productoController = new ProductoController();
export default productoController;