import { Nodo } from "../Abstracto/Nodo";
import { Tabla } from "../Simbolos/Tabla";
import { Arbol } from "../Simbolos/Arbol";
import { Tipo, Tipos } from "../Utilidades/Tipo";
import { Exception } from "../Utilidades/Exception";
/**
 * Permite imprimir expresiones en la consola
 */
export class Main extends Nodo{
    expression : Array<Nodo>;
    type: Tipo;
    /**
     * @constructor Retorna el objeto Main
     * @param expression Expresion que se va a mostrar en consola
     * @param line Fila de donde se creo la sentencia
     * @param column Columna donde se creo la sentencia
     */
    constructor(type:Tipo, expression: Array<Nodo>, line: Number, column: Number){
        super(new Tipo(Tipos.VOID), line, column);
        this.expression = expression;
        this.type = type;
    }

    execute(table: Tabla, tree: Arbol): any {
        if (this.type.type !== Tipos.VOID) {
            const error = new Exception('Semantico', `Se esperaba tipo void en el main`, this.linea, this.columna);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        }
        this.expression.forEach(element => {
            const value = element.execute(table, tree);
            console.log(value);
        });
        return null;
    }
}