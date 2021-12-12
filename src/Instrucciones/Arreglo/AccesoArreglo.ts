import { Nodo } from "../../Abstracto/Nodo";
import { Arbol } from "../../Simbolos/Arbol";
import { Simbolo } from "../../Simbolos/Simbol";
import { Tabla } from "../../Simbolos/Tabla";
import { Exception } from "../../Utilidades/Exception";
import { Tipo, Tipos } from "../../Utilidades/Tipo";
import { Asignacion } from "../Asignacion";
import { Declaracion } from "../Declaracion";
import { NodoArreglo } from "./NodoArreglo";

export class AccesoArreglo implements Nodo {
    indices: Array<Nodo>;
    identifier: String;
    tipo: Tipo;
    linea: Number;
    columna: Number;

    constructor(a: String, b: Array<Nodo>, linea: Number, columna: Number) {
        this.indices = b;
        this.identifier = a;
    }
    

    // integer[] a = new integer[5*4+7]
    execute(tabla: Tabla, arbol: Arbol): any {
        var valoresIndices: Array<number> = [];
        this.indices.forEach(indice => {
            var er = indice.execute(tabla, arbol);
            if (!Number.isInteger(er)) {
                console.log("Los indices para declarar un arreglo deben ser de tipo numérico. El indice [" + er + "] no es numérico.");
                return null;
            }
            valoresIndices.push(er);
        });
        //var simbol = new Simbolo(this.tipo, this.identifier, valoresIndices, 0);
        //const res = tabla.setVariable(simbol);
        var valores = tabla.getVariable(this.identifier) as Simbolo;
        var nodo = valores.valor as NodoArreglo;
        console.log("valores del arreglo ", valores);
        return null;
    }

    getC3D(tabla: Tabla, arbol: Arbol): String {
        return '';
    }
}