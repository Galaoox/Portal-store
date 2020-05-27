import { Response, Request } from 'express';

export default {
    isLoggedIn(req: Request, res: Response, next: any) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect('/');
        }
    },
    isLoggedInAdmin(req: Request, res: Response, next: any) {
        if (req.isAuthenticated()) {
            const datos: any = req.user;
            if (datos && datos.id_rol == 1) {
                return next();

            }
            return res.redirect('/');
        } else {
            return res.redirect('/');
        }
    },
}