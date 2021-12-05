"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const Nodo_1 = require("../Abstracto/Nodo");
const Exception_1 = require("../Utilidades/Exception");
/**
 * @class Reasigna el valor de una variable existente
 */
class Asignacion extends Nodo_1.Nodo {
    /**
     * @constructor Crea el nodo instruccion para la sentencia Asignacion
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(identifier, value, line, column) {
        super(null, line, column);
        this.identifier = identifier;
        this.value = value;
    }
    execute(table, tree) {
        const result = this.value.execute(table, tree);
        if (result instanceof Exception_1.Exception) {
            return result;
        }
        let variable;
        variable = table.getVariable(this.identifier);
        if (variable == null) {
            const error = new Exception_1.Exception('Semantico', 'No se ha encontrado la variable ' + this.identifier, this.linea, this.columna);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        }
        if (this.value.tipo.type != variable.Tipo.type) {
            const error = new Exception_1.Exception('Semantico', `No se puede asignar la variable porque los tipos no coinciden.`, this.linea, this.columna);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        }
        variable.valor = result;
        return null;
    }
}
exports.Asignacion = Asignacion;
