import { Nodo } from "../Abstracto/Nodo";
import { Tabla } from "../Simbolos/Tabla";
import { Arbol } from "../Simbolos/Arbol";
import { Simbolo } from "../Simbolos/Simbol";
import { Exception } from "../Utilidades/Exception";

/**
 * @class Nodo expresion identificador que obtendra el valor de una variable
 */
export class Identificador extends Nodo {
    identifier: String;
    /**
     * @constructor Retorna el objeto identificador creado
     * @param identifier nombre de la variable
     * @param line Linea del identificador
     * @param column Columna del identificador
     */
    constructor(identifier: String, line: Number, column: Number) {
        // tipo null porque aun no se el tipo
        super(null, line, column);
        this.identifier = identifier;
    }

    execute(table: Tabla, tree: Arbol) {
        let variable: Simbolo;
        variable = table.getVariable(this.identifier);
        if (variable == null) {
            const error = new Exception('Semantico', 'No se ha encontrado la variable ' + this.identifier, this.linea, this.columna);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        } else if(variable.valor == null) {
            const error = new Exception('Semantico', 'No se ha inicializado la variable ' + this.identifier, this.linea, this.columna);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        }
        this.tipo = variable.Tipo;
        return variable.valor;
    }

    getC3D(tabla: Tabla, arbol: Arbol): String {
        return "";
    }
}