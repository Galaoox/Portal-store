import { BorderWidth, Chart, Point, ChartColor } from 'chart.js';
import pool from '../database';

const helpers: any = {};


// Metodo encargado de seleccionar el elemento predeterminado basandose en un id
helpers.isSelected = (value: any, key: any) => {
    return value === key ? "selected" : "";
};


helpers.colorStatus = (idEstado: any) => {
    let estado = "";
    switch (idEstado) {
        case 1:
            estado = "process"
            break;
        case 2:
            estado = "denied"
            break;
    }
    return estado;
};




module.exports = helpers;
