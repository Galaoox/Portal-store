import { Response, Request } from 'express';
import pool from '../database';

class AdminController {

    /** Metodo encargado de dirigir al usuario a la vista inicial
     * 
     * @param req 
     * @param res 
     */
    public async  index(req: Request, res: Response) {
        const usuarios = await pool.query('select count(*) as cantidad from usuarios where fecha_eliminado IS NULL');
        const productos = await pool.query('select count(*) as cantidad from productos where fecha_eliminado IS NULL and id_estado = 1');
        const pedidos = await pool.query('select count(*) as cantidad from pedidos where fecha_eliminado IS NULL ');
        const ganancias = await pool.query('select sum(php.cantidad * precio ) as valor from pedidos_has_productos php')
        const datos = {
            usuarios: usuarios[0].cantidad,
            productos: productos[0].cantidad,
            pedidos: pedidos[0].cantidad,
            ganancias: ganancias[0].valor
        };

        res.render('admin/', { title: 'my other page', layout: 'admin', titulo: "Inicio", datos });

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
    public async reportes(req: Request, res: Response) {

        res.render('admin/reportes', { layout: 'admin', titulo: "Reportes", });
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

    /**
     * Reportes info metodo encargado de retornar la informacion usada en el reporte de administracion
     * @param req 
     * @param res 
     */
    public async  reportesInfo(req: Request, res: Response) {

        const dias = [];
        const registros: any = [];
        const consultaRegistros = await pool.query(`
        select day(p2.fecha_creacion) as dia , SUM((php.precio * php.cantidad)) as total from pedidos p2 
        left join pedidos_has_productos php on php.id_pedido = p2.id 
        where month(p2.fecha_creacion) = month(now() )
                        GROUP BY dia
                ORDER BY dia asc
        `);
        const consultaDias = await pool.query('select day(LAST_DAY(NOW())) as dias')
        for (let index = 1; index <= consultaDias[0].dias; index++) {
            dias.push(String(index));
            const filtro = consultaRegistros.find((registro: any) => registro.dia == index);
            registros.push(filtro && filtro.total ? filtro.total : 0);
        }



        const datos = {
            dias: dias,
            registros: registros
        }
        res.json(datos);
    }


}
const usersController = new AdminController();
export default usersController;