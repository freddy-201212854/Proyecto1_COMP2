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
     * @abstract Sirve para generar codigo en direcciones dependiendo de la instruccion o expresion 
     * @param {Tabla} tabla Tabla de simbolos global
     * @param {Arbol} arbol Arbol que contiene las instrucciones y excepciones
     * @param arbol 
     */
     abstract getC3D(tabla: Tabla, arbol: Arbol): String;
     
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