"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
/**
 * @class Esta clase me permite almacenar nodos en mis tablas de simbolos y de funciones
 */
class Simbolo {
    /**
     * @constructor Para crear un nuevo simbolo a utilizar en una tabla de simbolos o funciones
     * @param Tipo Tipo de la varible o funcion
     * @param identificador Nombre de la variable o funcion
     * @param valor Valor de la variable u objeto completo de la función
     */
    constructor(Tipo, identificador, valor) {
        this.Tipo = Tipo;
        this.identificador = identificador;
        this.valor = valor;
    }
}
exports.Simbolo = Simbolo;