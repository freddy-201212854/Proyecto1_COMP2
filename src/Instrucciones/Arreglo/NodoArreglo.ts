import { Tabla } from "../../Simbolos/Tabla";
import { Arbol } from "../../Simbolos/Arbol";
import { Tipo } from "../../Utilidades/Tipo";
import { Tipos } from "../../Utilidades/Tipo";

export class NodoArreglo {
    tipo: Tipo | null;
    linea: Number;
    columna: Number;
    valor: Object | null;
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
        this.tipo = null;
        this.linea = 0;
        this.columna = 0;
    }

    inicializarNodo(cantDimensiones: number, dimensionActual: number, tamaniosDimensiones: Array<number>) {
        if (dimensionActual > cantDimensiones) {
            return;
        }
        for (let i = 0; i < tamaniosDimensiones[dimensionActual - 1]; i++) {
            var arreglo: NodoArreglo = new NodoArreglo();
            var tipo = this.tipo as Tipo;
            arreglo.setTipo(tipo);
            this.celdasVecinas.push(arreglo);
            arreglo.inicializarNodo(cantDimensiones, dimensionActual + 1, tamaniosDimensiones);
        }
    }

    setValor(cantIndices: number, indiceActual: number, indices: Array<number>, val: Object, id: String) {
        var valIndiceActual = indices[indiceActual - 1];
        if (valIndiceActual < this.celdasVecinas.length && valIndiceActual >= 0) {
            var arr: NodoArreglo = this.celdasVecinas[valIndiceActual];
            if (indiceActual == cantIndices) {
                var tipo = this.tipo as Tipo;
                if (tipo.type != Tipos.INT) {
                    if (tipo.type != Tipos.BOOLEAN) {
                        if (tipo.type != Tipos.STRING) {
                            console.log("Esta intentando insertar un valor de tipo " + val.toString() + " al arreglo de tipo " + tipo);
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

    getValor(cantIndices: number, indiceActual: number, indices: Array<number>, id: String): Object | null {
        var valIndiceActual: number = indices[indiceActual - 1];
        if (valIndiceActual < this.celdasVecinas.length && valIndiceActual >= 0) {
            var arr: NodoArreglo = this.celdasVecinas[valIndiceActual];
            if (indiceActual == cantIndices) {
                var val: Object | null = arr.valor;
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
        return this.tipo as Tipo;
    }

    getCeldasVecinas(): Array<NodoArreglo> {
        return this.celdasVecinas;
    }
}