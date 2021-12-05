"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivo = void 0;
const Nodo_1 = require("../Abstracto/Nodo");
/**
 * Crea un nuevo objeto Nodo expresion en base a un valor primitivo,
 * por ejemplo numeros, booleanos o cadenas(suponiendo que la cadena es primitivo)
 */
class Primitivo extends Nodo_1.Nodo {
    /**
     * @constructor Devuelve un nodo que internamente sera una expresion por tener un tipo
     * @param type Tipo del valor, puede ser numero, cadena o booleano
     * @param value Valor primitivo que crear
     * @param line Fila de donde se creo la sentencia
     * @param column Columna donde se creo la sentencia
     */
    constructor(type, value, line, column) {
        super(type, line, column);
        this.value = value;
    }
    /**
     * Devuelve el valor inicial e.g. 4
     * @param table Tabla de simbolos
     * @param tree Arbol de instrucciones y excepciones
     */
    execute(table, tree) {
        return this.value;
    }
}
exports.Primitivo = Primitivo;
