"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
/**
 * @class Nodo para almacenar errores ya sean lexicos, sintacticos o semanticos
 */
class Exception {
    /**
     * Devuelve un objeto con un nuevo objeto excepcion
     * @param tipo Tipo de error, e.g. (lexico, sintactico, semantico)
     * @param descripcion Descripcion del error, e.g. (No se encontro la variable X)
     * @param linea Fila donde ocurrio el error
     * @param columna columnaa donde ocurrio el error
     */
    constructor(tipo, descripcion, linea, columna) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
    }
    toString() {
        return `${this.tipo} ${this.descripcion} ${this.linea} ${this.columna}`;
    }
}
exports.Exception = Exception;
