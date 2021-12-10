import { Nodo } from "../Abstracto/Nodo"
import { Tabla } from "../Simbolos/Tabla";
import { Arbol } from "../Simbolos/Arbol";
import { Exception } from "../Utilidades/Exception";
import { Tipos } from "../Utilidades/Tipo";

/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
export class ForIn extends Nodo {
    condition: Nodo;
    List: Array<Nodo>;

    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condition Condicion que debe ser tipo boolean
     * @param List Lista de instrucciones a ejecutar mientras la condicion sea verdadera
     * @param line Linea de la sentencia while
     * @param column Columna de la sentencia while
     */
    constructor(condition: Nodo, List: Array<Nodo>, line: Number, column: Number) {
        super(null, line, column);
        this.condition = condition;
        this.List = List;
    }

    execute(table: Tabla, tree: Arbol) {
        const newtable = new Tabla(table);
        let result: Nodo;
        do {
            result = this.condition.execute(newtable, tree);
            if (result instanceof Exception) {
                return result;
            }

            if (this.condition.tipo.type !== Tipos.BOOLEAN) {
                const error = new Exception('Semantico', `Se esperaba una expresion booleana para la condicion`, this.linea, this.columna);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
            if (result) {
                for (let i = 0; i < this.List.length; i++) {
                    const res = this.List[i].execute(newtable, tree);
                }
            }
        } while (result);
        return null;
    }

    getC3D(tabla: Tabla, arbol: Arbol): String {
        return "";
    }
}