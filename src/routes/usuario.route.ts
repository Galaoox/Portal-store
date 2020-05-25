import { Router, Response, Request } from 'express';

const router = Router();


router.get('/', function (req, res) {
    res.render('usuario', { verFormulario: true });
});


router.get('/pedidos', function (req, res) {
    res.render('usuario', { verPedidos: true });
});

router.get('/productos', function (req, res) {
    res.render('usuario', { verProductos: true });
});


export default router;