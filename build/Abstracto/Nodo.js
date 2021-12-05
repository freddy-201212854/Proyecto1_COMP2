"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nodo = void 0;
class Nodo {
    /**
     *
     * @constructor Base para cualquier instruccion o expresion, omitir tipo si fuera una instruccion
     * @param tipo Tipo de la expresion, si fuera una expresion poner valor de nulo
     * @param linea lineaa de la instruccion o expresion
     * @param columna columnaa de la instruccion o expresion
     */
    constructor(tipo, linea, columna) {
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
    }
}
exports.Nodo = Nodo;
