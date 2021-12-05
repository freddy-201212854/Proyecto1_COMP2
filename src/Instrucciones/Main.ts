import { Nodo } from "../Abstracto/Nodo";
import { Tabla } from "../Simbolos/Tabla";
import { Arbol } from "../Simbolos/Arbol";
import { Tipo, Tipos } from "../Utilidades/Tipo";
/**
 * Permite imprimir expresiones en la consola
 */
export class Main extends Nodo{
    expression : Nodo;
    /**
     * @constructor Retorna el objeto Main
     * @param expression Expresion que se va a mostrar en consola
     * @param line Fila de donde se creo la sentencia
     * @param column Columna donde se creo la sentencia
     */
    constructor(expression: Nodo, line: Number, column: Number){
        super(new Tipo(Tipos.VOID), line, column);
        this.expression = expression;
    }

    execute(table: Tabla, tree: Arbol): any {
        const value = this.expression.execute(table, tree);
        tree.console.push(value);
        return null;
    }
}