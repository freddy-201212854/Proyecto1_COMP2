import { NodoArreglo } from "../Instrucciones/Arreglo/NodoArreglo";
import { Tipo, Tipos } from "../Utilidades/Tipo";

/**
 * @class Esta clase me permite almacenar nodos en mis tablas de simbolos y de funciones 
 */

export class Simbolo {
    Tipo: Tipo;
    identificador: String
    valor: Object
    posicion: number;
    tamaniosDimensiones: Array<number>;

    /**
     * @constructor Para crear un nuevo simbolo a utilizar en una tabla de simbolos o funciones
     * @param Tipo Tipo de la varible o funcion
     * @param identificador Nombre de la variable o funcion
     * @param valor Valor de la variable u objeto completo de la función
     */
    constructor(Tipo: Tipo, identificador: String, valor: Object, posicion: number, isArray: boolean = false, tamaniosDimensiones: Array<number> = []) {
        this.Tipo = Tipo;
        this.identificador = identificador;
        this.valor = valor;
        this.posicion = posicion;
        this.tamaniosDimensiones = [];
        if (isArray) {
            var arr: NodoArreglo = new NodoArreglo();
            arr.setTipo(Tipo);
            arr.inicializarNodo(tamaniosDimensiones.length, 1, tamaniosDimensiones);
            this.tamaniosDimensiones = tamaniosDimensiones;
            this.valor = arr;
        }
    }

    getValor(identifier: String, indices: Array<number>) : Object | null {
        if (this.valor instanceof NodoArreglo) {
            var arr: NodoArreglo = this.valor;
                return arr.getValor(indices.length, 1, indices, identifier);
            if (this.tamaniosDimensiones.length == indices.length) {
                
            } else {
                console.log("La cantidad de indices indicados no "
                        + "coincide con la cantidad de dimensiones del arreglo "+identifier+", no puede accederse a este arreglo.");
            }
        } else {
            console.log("La variable " + identifier + " no es un arreglo, por lo "
                + "que no se puede accesar de esta manera.");
        }

        return null;
    }
}