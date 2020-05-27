import passport from 'passport';
import { Strategy } from 'passport-local';
import pool from '../database';
import helpers from '../lib/helpers';


passport.use('local.login', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (rows.length > 0) {
        const usuario = rows[0];
        const validPassword = await helpers.mathPassword(password, usuario.password)
        if (validPassword) {
            done(null, usuario, req.flash('success', `Bienvenido ${usuario.nombres} ${usuario.apellidos}`));
        } else {
            done(null, false, req.flash('message', 'Contraseña incorrecta'));
        }
    } else {
        return done(null, false, req.flash('message', 'El correo electronico no existe.'));
    }
}));


passport.use('local.register', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const { nombres, apellidos } = req.body;
    const nuevoUsuario: any = {
        email,
        password,
        nombres,
        apellidos
    }
    nuevoUsuario.password = await helpers.encryptPassword(nuevoUsuario.password);
    const resultado = await pool.query('INSERT INTO usuarios SET ?', [nuevoUsuario]);
    nuevoUsuario.id = resultado.insertId;
    return done(null, nuevoUsuario);
}));


passport.serializeUser((usuario: any, done) => {
    done(null, usuario.id);
});


passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('select * from usuarios where id = ?', [id]);
    done(null, rows[0]);
});


export default passport;