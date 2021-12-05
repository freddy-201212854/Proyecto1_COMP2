"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arbol = void 0;
/**
 * @class Almacena el ast y ademas la lista de excepciones
 */
class Arbol {
    /**
     * Retorna un arbol con 2 atributos: 1 ast y 1 lista de excepciones
     * @param instrucciones AST generado por la gramatica
     */
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.excepciones = new Array();
        this.console = new Array();
    }
}
exports.Arbol = Arbol;
