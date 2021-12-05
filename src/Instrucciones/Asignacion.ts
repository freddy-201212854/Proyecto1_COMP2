import { Nodo } from "../Abstracto/Nodo"
import { Tabla } from "../Simbolos/Tabla";
import { Arbol } from "../Simbolos/Arbol";
import { Exception } from "../Utilidades/Exception";
import { Tipo, Tipos } from "../Utilidades/Tipo";
import { Simbolo } from "../Simbolos/Simbol";

/**
 * @class Reasigna el valor de una variable existente
 */
export class Asignacion extends Nodo {
    identifier: String;
    value: Nodo;

    /**
     * @constructor Crea el nodo instruccion para la sentencia Asignacion
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(identifier: String, value: Nodo, line: Number, column: Number) {
        super(null, line, column);
        this.identifier = identifier;
        this.value = value;
    }

    execute(table: Tabla, tree: Arbol) {
        const result = this.value.execute(table, tree);
        if (result instanceof Exception) {
            return result;
        }

        let variable: Simbolo;
        variable = table.getVariable(this.identifier);
        if (variable == null) {
            const error = new Exception('Semantico',
                'No se ha encontrado la variable ' + this.identifier,
                this.linea, this.columna);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        }


        if (this.value.tipo.type != variable.Tipo.type) {
            const error = new Exception('Semantico',
                `No se puede asignar la variable porque los tipos no coinciden.`,
                this.linea, this.columna);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        }

        variable.valor = result;
        return null;
    }
}