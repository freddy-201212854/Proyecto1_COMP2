"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const Nodo_1 = require("../Abstracto/Nodo");
const Tipo_1 = require("../Utilidades/Tipo");
/**
 * Permite imprimir expresiones en la consola
 */
class Main extends Nodo_1.Nodo {
    /**
     * @constructor Retorna el objeto Main
     * @param expression Expresion que se va a mostrar en consola
     * @param line Fila de donde se creo la sentencia
     * @param column Columna donde se creo la sentencia
     */
    constructor(expression, line, column) {
        super(new Tipo_1.Tipo(Tipo_1.Tipos.VOID), line, column);
        this.expression = expression;
    }
    execute(table, tree) {
        this.expression.forEach(element => {
            element.execute(table, tree);
        });
        return null;
    }
}
exports.Main = Main;
