"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tipo = exports.Tipos = void 0;
var Tipos;
(function (Tipos) {
    Tipos[Tipos["NUMERIC"] = 0] = "NUMERIC";
    Tipos[Tipos["STRING"] = 1] = "STRING";
    Tipos[Tipos["BOOLEAN"] = 2] = "BOOLEAN";
    Tipos[Tipos["VOID"] = 3] = "VOID";
    Tipos[Tipos["CHAR"] = 4] = "CHAR";
    Tipos[Tipos["DOUBLE"] = 5] = "DOUBLE";
    Tipos[Tipos["NULL"] = 6] = "NULL";
    Tipos[Tipos["INT"] = 7] = "INT";
})(Tipos = exports.Tipos || (exports.Tipos = {}));
/**
 *
 * @class Permite llevar el control de los tipos del lenguaje
 */
class Tipo {
    /**
     *
     * @constructor Crea un nuevo tipo con el tipo primitivo indicado en el enum
     * @param type Tipo seleccionado para la variable o funcion
     *
     */
    constructor(type) {
        this.type = type;
    }
    toString() {
        if (this.type === Tipos.BOOLEAN) {
            return 'boolean';
        }
        else if (this.type === Tipos.NUMERIC) {
            return 'numeric';
        }
        else if (this.type === Tipos.STRING) {
            return 'string';
        }
        else if (this.type === Tipos.INT) {
            return 'int';
        }
        else if (this.type === Tipos.DOUBLE) {
            return 'double';
        }
        else if (this.type === Tipos.CHAR) {
            return 'char';
        }
        else if (this.type === Tipos.NULL) {
            return 'null';
        }
    }
}
exports.Tipo = Tipo;
