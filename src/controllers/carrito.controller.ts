import { Response, Request } from 'express';
import pool from '../database';

class CarritoController {

    public async index(req: Request | any, res: Response) {
        const carrito: any[] = req.session.carrito;
        if (carrito.length == 0) {
            req.flash('message', 'No hay productos en el carrito')
            res.render('carrito/');
        } else {
            const productos: any = [];
            let total = 0;
            let responsePromises: any = [];
            let responsePromise;
            carrito.forEach(async (producto: any) => {
                const responsePromise = pool.query(`select id,(${producto.cantidad}) as cantidad , nombre, (precio * ${Number(producto.cantidad)}) as total, precio from  productos where id = ${Number(producto.id)} and fecha_eliminado is null and id_estado = 1`);

                await responsePromises.push(responsePromise);
            });

            const response = await Promise.all(responsePromises);
            response.forEach((registro: any) => {
                const producto = registro[0];
                total += producto.total;
                productos.push(producto)
            });
            res.render('carrito/', { productos: productos, total: total });

        }
    }


    public obtenerProducto() {

    }

    public async add(req: Request | any, res: Response) {
        if (!req.session.carrito) {
            req.session.carrito = [];
        } else {
            if (!req.session.carrito.find((producto: any) => producto.id == req.query.producto)) {
                req.session.carrito.push({
                    cantidad: req.query.cantidad,
                    id: req.query.producto
                });
            } else {
                req.flash('message', 'El producto ya se encuentra agregado al carrito');
                res.redirect('back');

            }
        }
        req.flash('success', 'Producto agregado al carrito');
        res.redirect('back');
    }


    public async clear(req: Request | any, res: Response) {
        req.session.carrito = [];
        res.redirect('/productos');
    }

    public async remove(req: Request | any, res: Response) {
        req.session.carrito = req.session.carrito.filter((producto: any) => producto.id != req.params.id);
        res.redirect('back');
    }

    public async procesar(req: Request | any, res: Response) {
        if (req.session.carrito.length > 0) {
            if (req.isAuthenticated()) {
                const carrito = req.session.carrito;

                const crearPedido = await pool.query(`insert into pedidos set fecha_creacion = NOW() , id_usuario = ${Number(req.user.id)}  `);
                const idPedido = crearPedido.insertId;
                let responsePromise;
                let responsePromises: any = [];
                carrito.forEach(async (producto: any) => {
                    const datos = {
                        id_pedido: idPedido,
                        id_producto: producto.id,
                        cantidad: producto.cantidad

                    };
                    responsePromise = pool.query(`insert into pedidos_has_productos set precio = (select precio from productos where id = ${producto.id}), ? `, [datos]);
                    responsePromises.push(responsePromise);
                });

                await Promise.all(responsePromises);
                req.session.carrito = [];
                req.flash('success', 'Compra procesada');
                res.redirect('back')
            } else {
                req.flash('message', 'Inicie sesión para procesar su compra');
                res.redirect('/carrito');
            }
        }
        req.flash('message', 'Añada productos al carrito');
        res.redirect('/carrito');
    }




}
export default new CarritoController();