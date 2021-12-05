import { Tabla } from "../Simbolos/Tabla";
import { Arbol } from "../Simbolos/Arbol";
import { Tipo } from "../Utilidades/Tipo";
import { Tipos } from "../Utilidades/Tipo";
export abstract class Nodo {
    tipo: Tipo;
    linea: Number;
    columna: Number;

    /**
     * @abstract Metodo que sirver para ejecutar una instruccion o expresion
     * si fuera instruccion devuelve nulo y si fuera expresion devuelve un valor
     */
    abstract execute(table: Tabla, tree: Arbol): any;
 
    /**
     * 
     * @constructor Base para cualquier instruccion o expresion, omitir tipo si fuera una instruccion
     * @param tipo Tipo de la expresion, si fuera una expresion poner valor de nulo
     * @param linea lineaa de la instruccion o expresion
     * @param columna columnaa de la instruccion o expresion
     */
    constructor(tipo: Tipo, linea: Number, columna: Number) {
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
    }
}