import { Nodo } from "../Abstracto/Nodo"
import { Tabla } from "../Simbolos/Tabla";
import { Arbol } from "../Simbolos/Arbol";
import { Exception } from "../Utilidades/Exception";
import { Tipos, Tipo } from "../Utilidades/Tipo";

import { Simbolo } from "../Simbolos/Simbol";

/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
export class Declaracion extends Nodo {
    tipo: Tipo;
    identifier: String;
    value: Nodo;

    /**
     * @constructor Crea el nodo instruccion para la sentencia Declaracion
     * @param tipo Tipo de la variable
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(tipo: Tipo, identifier: String, value: Nodo, line: Number, column: Number) {
        super(tipo, line, column);
        this.identifier = identifier;
        this.value = value;
    }

    execute(table: Tabla, tree: Arbol) {
        var result = this.value.execute(table, tree);
        if (result instanceof Exception) {
            return result;
        }

        console.log("result ",result);
        for (let i = 0; i < this.identifier.length; i++) {
            const identifier = this.identifier[i];
            
            if (this.tipo.type === Tipos.DOUBLE) {
                result = parseFloat(result);
            } else if (this.tipo.type === Tipos.INT) {
                if (this.tipo.type != this.value.tipo.type) {
                  const error = new Exception(
                    "Semántico",
                    `No se puede declarar la variable porque los tipos no coinciden.`,
                    this.linea,
                    this.columna
                  );
                  tree.excepciones.push(error);
                  tree.console.push(error.toString());
                  return error;
                }
            }
            
            let simbol: Simbolo;
            simbol = new Simbolo(this.tipo, identifier, result);
            const res = table.setVariable(simbol);
            if (res != null) {
                const error = new Exception('Semantico', res, this.linea, this.columna);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
            }   
        }
        return null;
    }
}