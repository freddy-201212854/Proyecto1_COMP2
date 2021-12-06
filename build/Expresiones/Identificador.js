"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identificador = void 0;
const Nodo_1 = require("../Abstracto/Nodo");
const Exception_1 = require("../Utilidades/Exception");
/**
 * @class Nodo expresion identificador que obtendra el valor de una variable
 */
class Identificador extends Nodo_1.Nodo {
    /**
     * @constructor Retorna el objeto identificador creado
     * @param identifier nombre de la variable
     * @param line Linea del identificador
     * @param column Columna del identificador
     */
    constructor(identifier, line, column) {
        // tipo null porque aun no se el tipo
        super(null, line, column);
        this.identifier = identifier;
    }
    execute(table, tree) {
        let variable;
        variable = table.getVariable(this.identifier);
        if (variable == null) {
            const error = new Exception_1.Exception('Semantico', 'No se ha encontrado la variable ' + this.identifier, this.linea, this.columna);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        }
        else if (variable.valor == null) {
            const error = new Exception_1.Exception('Semantico', 'No se ha inicializado la variable ' + this.identifier, this.linea, this.columna);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        }
        this.tipo = variable.Tipo;
        return variable.valor;
    }
}
exports.Identificador = Identificador;
