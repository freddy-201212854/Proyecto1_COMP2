"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.While = void 0;
const Nodo_1 = require("../Abstracto/Nodo");
const Tabla_1 = require("../Simbolos/Tabla");
const Exception_1 = require("../Utilidades/Exception");
const Tipo_1 = require("../Utilidades/Tipo");
/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
class While extends Nodo_1.Nodo {
    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condition Condicion que debe ser tipo boolean
     * @param List Lista de instrucciones a ejecutar mientras la condicion sea verdadera
     * @param line Linea de la sentencia while
     * @param column Columna de la sentencia while
     */
    constructor(condition, List, line, column) {
        super(null, line, column);
        this.condition = condition;
        this.List = List;
    }
    execute(table, tree) {
        const newtable = new Tabla_1.Tabla(table);
        let result;
        do {
            result = this.condition.execute(newtable, tree);
            if (result instanceof Exception_1.Exception) {
                return result;
            }
            if (this.condition.tipo.type !== Tipo_1.Tipos.BOOLEAN) {
                const error = new Exception_1.Exception('Semantico', `Se esperaba una expresion booleana para la condicion`, this.linea, this.columna);
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
}
exports.While = While;
