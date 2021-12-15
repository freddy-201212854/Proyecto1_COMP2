import { Tabla } from "../../Simbolos/Tabla";
import { Arbol } from "../../Simbolos/Arbol";
import { Tipo } from "../../Utilidades/Tipo";
import { Tipos } from "../../Utilidades/Tipo";

export class NodoArreglo {
    tipo: Tipo;
    linea: Number;
    columna: Number;
    valor: Object;
    celdasVecinas: Array<NodoArreglo>;

    /**
     * 
     * @constructor Base para cualquier instruccion o expresion, omitir tipo si fuera una instruccion
     * @param tipo Tipo de la expresion, si fuera una expresion poner valor de nulo
     * @param linea lineaa de la instruccion o expresion
     * @param columna columnaa de la instruccion o expresion
     */
    constructor() {
        this.celdasVecinas = [];
        this.valor = null; //Inicializando cada celda con objeto nulo
    }

    inicializarNodo(cantDimensiones: number, dimensionActual: number, tamaniosDimensiones: Array<number>) {
        if (dimensionActual > cantDimensiones) {
            return;
        }
        for (let i = 0; i < tamaniosDimensiones[dimensionActual - 1]; i++) {
            var arreglo: NodoArreglo = new NodoArreglo();
            arreglo.setTipo(this.tipo);
            this.celdasVecinas.push(arreglo);
            arreglo.inicializarNodo(cantDimensiones, dimensionActual + 1, tamaniosDimensiones);
        }
    }

    setValor(cantIndices: number, indiceActual: number, indices: Array<number>, val: Object, id: String) {
        var valIndiceActual = indices[indiceActual - 1];
        if (valIndiceActual < this.celdasVecinas.length && valIndiceActual >= 0) {
            var arr: NodoArreglo = this.celdasVecinas[valIndiceActual];
            if (indiceActual == cantIndices) {
                if (this.tipo.type != Tipos.INT) {
                    if (this.tipo.type != Tipos.BOOLEAN) {
                        if (this.tipo.type != Tipos.STRING) {
                            console.log("Esta intentando insertar un valor de tipo " + val.toString() + " al arreglo de tipo " + this.tipo);
                            return;
                        }
                    }
                }
                arr.valor = val;
            } else {
                arr.setValor(cantIndices, indiceActual + 1, indices, val, id);
            }
        } else {
            console.log("La asignación al arreglo " + id + " no puede "
                + "realizarse porque uno o más de los indices exceden "
                + "los límites del arreglo.");
        }
    }

    getValor(cantIndices: number, indiceActual: number, indices: Array<number>, id: String): Object {
        var valIndiceActual: number = indices[indiceActual - 1];
        if (valIndiceActual < this.celdasVecinas.length && valIndiceActual >= 0) {
            var arr: NodoArreglo = this.celdasVecinas[valIndiceActual];
            if (indiceActual == cantIndices) {
                var val: Object = arr.valor;
                return val == null ? null : val;
            } else {
                return arr.getValor(cantIndices, indiceActual + 1, indices, id);
            }
        } else {
            console.log("El acceso al arreglo " + id + " no puede "
                + "realizarse porque uno o más de los indices exceden "
                + "los límites del arreglo.");
        }
        return null;
    }

    setTipo(tipo: Tipo) {
        this.tipo = tipo;
    }

    getTipo(): Tipo {
        return this.tipo;
    }

    getCeldasVecinas(): Array<NodoArreglo> {
        return this.celdasVecinas;
    }
}