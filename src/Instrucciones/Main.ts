import { Nodo } from "../Abstracto/Nodo";
import { Tabla } from "../Simbolos/Tabla";
import { Arbol } from "../Simbolos/Arbol";
import { Tipo, Tipos } from "../Utilidades/Tipo";
/**
 * Permite imprimir expresiones en la consola
 */
export class Main extends Nodo{
    expression : Array<Nodo>;
    /**
     * @constructor Retorna el objeto Main
     * @param expression Expresion que se va a mostrar en consola
     * @param line Fila de donde se creo la sentencia
     * @param column Columna donde se creo la sentencia
     */
    constructor(expression: Array<Nodo>, line: Number, column: Number){
        super(new Tipo(Tipos.VOID), line, column);
        this.expression = expression;
    }

    execute(table: Tabla, tree: Arbol): any {
        this.expression.forEach(element => {
            element.execute(table, tree);
        });
        return null;
    }
}