import { Tipo } from "../Utilidades/Tipo";

/**
 * @class Esta clase me permite almacenar nodos en mis tablas de simbolos y de funciones 
 */

export class Simbolo {
    Tipo: Tipo;
    identificador: String
    valor: Object
    posicion: number;

    /**
     * @constructor Para crear un nuevo simbolo a utilizar en una tabla de simbolos o funciones
     * @param Tipo Tipo de la varible o funcion
     * @param identificador Nombre de la variable o funcion
     * @param valor Valor de la variable u objeto completo de la función
     */
    constructor(Tipo: Tipo, identificador: String, valor: Object, posicion: number) {
        this.Tipo = Tipo;
        this.identificador = identificador;
        this.valor = valor;
        this.posicion = posicion;
    }
}