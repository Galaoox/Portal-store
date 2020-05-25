import { Router, Response, Request } from 'express';

const router = Router();

router.get('/', function (req, res) {
    res.render('admin/', { title: 'my other page', layout: 'admin', titulo: "Inicio" });

});

router.get('/productos', function (req, res) {
    res.render('admin/productos/productos', { layout: 'admin', titulo: "Productos" });
});

router.get('/solicitudes', function (req, res) {
    res.render('admin/productos/solicitudes', { layout: 'admin', titulo: "Solicitudes" });
});

router.get('/reportes', function (req, res) {
    res.render('admin/reportes', { layout: 'admin', titulo: "Reportes" });
});


router.get('/categorias', function (req, res) {
    res.render('admin/categorias', { layout: 'admin', titulo: "Categorias" });
});


router.get('/usuarios', function (req, res) {
    res.render('admin/usuarios', { layout: 'admin', titulo: "Usuarios" });
});

export default router;