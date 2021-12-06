"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Nodo_1 = require("../Abstracto/Nodo");
const Exception_1 = require("../Utilidades/Exception");
const Tipo_1 = require("../Utilidades/Tipo");
const Simbol_1 = require("../Simbolos/Simbol");
/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
class Declaracion extends Nodo_1.Nodo {
    /**
     * @constructor Crea el nodo instruccion para la sentencia Declaracion
     * @param tipo Tipo de la variable
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(tipo, identifier, value, line, column) {
        super(tipo, line, column);
        this.identifier = identifier;
        this.value = value;
    }
    execute(table, tree) {
        let result = this.value.execute(table, tree);
        if (result instanceof Exception_1.Exception) {
            return result;
        }
        /* if (this.tipo.type != this.value.tipo.type) {
                const error = new Exception('Semantico', `No se puede declarar la variable porque los tipos no coinciden.`, this.linea, this.columna);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }*/
        if (this.tipo.type === Tipo_1.Tipos.DOUBLE) {
            result = parseFloat(result);
        }
        else if (this.tipo.type === Tipo_1.Tipos.INT) {
            if (this.tipo.type != this.value.tipo.type) {
                const error = new Exception_1.Exception("Semantico", `No se puede declarar la variable porque los tipos no coinciden.`, this.linea, this.columna);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        }
        let simbol;
        simbol = new Simbol_1.Simbolo(this.tipo, this.identifier, result);
        const res = table.setVariable(simbol);
        if (res != null) {
            const error = new Exception_1.Exception("Semantico", res, this.linea, this.columna);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
        }
        return null;
    }
}
exports.Declaracion = Declaracion;
