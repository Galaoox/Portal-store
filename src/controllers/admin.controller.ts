import { Response, Request } from 'express';
import pool from '../database';

class AdminController {

    /** Metodo encargado de dirigir al usuario a la vista inicial
     * 
     * @param req 
     * @param res 
     */
    public index(req: Request, res: Response) {
        res.render('admin/', { title: 'my other page', layout: 'admin', titulo: "Inicio" });

    }


    /** Metodo encargado de dirigir al usuario a la vista de productos
     * 
     * @param req 
     * @param res 
     */
    public async  productos(req: Request, res: Response) {
        const productos = await pool.query(`
        select pro.id, pro.nombre, DATE_FORMAT(pro.fecha , '%Y/%m/%d') as fecha, pro.descripcion, pro.precio, pro.cantidad, pro.img,
        CONCAT(usu.nombres ,' ', usu.apellidos) as vendedor, cat.nombre as categoria, cat.id as id_categoria
        from productos pro 
        left join usuarios usu on  usu.id = pro.id_usuario 
        left join categorias cat on  cat.id = pro.id_categoria 
        where pro.id_estado = 1 and pro.fecha_eliminado is null `);
        const categorias = await pool.query(`select * from categorias where fecha_eliminado IS NULL`);
        res.render('admin/productos/productos', { layout: 'admin', VerProductos: true, titulo: "Productos", productos: productos, categorias: categorias });

    }


    /** Metodo encargado de dirigir al usuario a la vista de solicitudes
     * 
     * @param req 
     * @param res 
     */
    public async  usuarios(req: Request, res: Response) {
        const usuarios = await pool.query('SELECT * FROM usuarios WHERE id_rol != 1 AND fecha_eliminado IS NULL');
        res.render('admin/usuarios', { layout: 'admin', VerUsuario: true, titulo: "Usuarios", usuarios: usuarios });

    }

    /** Metodo encargado de dirigir al usuario a la vista de solicitudes
 * 
 * @param req 
 * @param res 
 */
    public async categorias(req: Request, res: Response) {
        const categorias = await pool.query('SELECT * FROM categorias WHERE  fecha_eliminado IS NULL');
        res.render('admin/categorias', { layout: 'admin', VerCategorias: true, titulo: "Categorias", categorias: categorias });
    }

    /** Metodo encargado de dirigir al usuario a la vista de solicitudes
     * 
     * @param req 
     * @param res 
     */
    public reportes(req: Request, res: Response) {
        res.render('admin/reportes', { layout: 'admin', titulo: "Reportes" });
    }

    /** Metodo encargado de dirigir al usuario a la vista de solicitudes
 * 
 * @param req 
 * @param res 
 */
    public async  solicitudes(req: Request, res: Response) {
        const solicitudes = await pool.query(`
        select pro.id, pro.nombre, DATE_FORMAT(pro.fecha , '%Y/%m/%d') as fecha, pro.descripcion, pro.precio, pro.cantidad, pro.img,
        CONCAT(usu.nombres ,' ', usu.apellidos) as vendedor, cat.nombre as categoria, pro.id_estado, espro.nombre as estado
        from productos pro 
        left join usuarios usu on  usu.id = pro.id_usuario 
        left join categorias cat on  cat.id = pro.id_categoria
        left join estados_productos espro on espro.id = pro.id_estado
        where  pro.fecha_eliminado is null 
        `);

        res.render('admin/productos/solicitudes', { layout: 'admin', titulo: "Solicitudes", VerSolicitudes: true, solicitudes });

    }





}
const usersController = new AdminController();
export default usersController;