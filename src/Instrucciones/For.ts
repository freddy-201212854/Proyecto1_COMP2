import { Nodo } from "../Abstracto/Nodo"
import { Tabla } from "../Simbolos/Tabla";
import { Arbol } from "../Simbolos/Arbol";
import { Exception } from "../Utilidades/Exception";
import { Tipos } from "../Utilidades/Tipo";
import { Identificador } from "../Expresiones/Identificador";

/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
export class For extends Nodo {
    condition: Nodo;
    List: Array<Nodo>;
    expresionInicial: Nodo;
    expresionAumento: Nodo;

    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condition Condicion que debe ser tipo boolean
     * @param List Lista de instrucciones a ejecutar mientras la condicion sea verdadera
     * @param line Linea de la sentencia while
     * @param column Columna de la sentencia while
     */
    constructor(expressionInitial: Nodo, expressionLogic: Nodo, expressionAumento: Nodo, List: Array<Nodo>, line: Number, column: Number) {
        super(null, line, column);
        this.condition = expressionLogic;
        this.expresionInicial = expressionInitial;
        this.expresionAumento = expressionAumento;
        this.List = List;
    }

    execute(table: Tabla, tree: Arbol) {
        const newtable = new Tabla(table);
        let result: Nodo;
        
        if (this.expresionInicial instanceof Identificador) {
            const error = new Exception('Semantico', `Se esperaba una expresion numerica`, this.expresionInicial.linea, this.expresionInicial.columna);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        }

        result = this.expresionInicial.execute(newtable, tree);
        console.log("Inicializacion For ", this.expresionInicial);

        if (this.expresionInicial.tipo.type !== Tipos.INT) {
            if (this.expresionInicial.tipo.type !== Tipos.DOUBLE) {
                const error = new Exception('Semantico', `No se puede asignar el tipo ` + this.expresionInicial.tipo.toString(), this.expresionInicial.linea, this.expresionInicial.columna);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        }
        if (result instanceof Exception) {
            return result;
        }

        //return null;
        do {
            result = this.condition.execute(newtable, tree);
            console.log("Condiciona For ", result, this.condition.tipo);
            if (result instanceof Exception) {
                return result;
            }

            if (this.condition.tipo.type !== Tipos.BOOLEAN) {
                const error = new Exception('Semantico', `Se esperaba una expresion booleana para la condicion`, this.condition.linea, this.condition.columna);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
            if (result) {
                result = this.expresionAumento.execute(newtable, tree);
                console.log("expresion aumento", result);
                if (result instanceof Exception) {
                    return result;
                }

                if (this.expresionAumento.tipo.type !== Tipos.INT) {
                    if (this.expresionAumento.tipo.type !== Tipos.DOUBLE) {
                        const error = new Exception('Semantico', `No se puede asignar el tipo ` + this.expresionAumento.tipo.toString(), this.expresionAumento.linea, this.expresionAumento.columna);
                        tree.excepciones.push(error);
                        tree.console.push(error.toString());
                        return error;
                    }
                }
                
                let res: Nodo;
                let error: Boolean = false;
                for (let i = 0; i < this.List.length; i++) {
                    res = this.List[i].execute(newtable, tree);
                    if (res instanceof Exception) {
                        error = true;
                        break;
                    }
                }

                if (error) {
                    return res;
                }
            }
        } while (result);

        return null;
    }
}