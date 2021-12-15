import { Nodo } from "../../Abstracto/Nodo";
import { Arbol } from "../../Simbolos/Arbol";
import { Simbolo } from "../../Simbolos/Simbol";
import { Tabla } from "../../Simbolos/Tabla";
import { Exception } from "../../Utilidades/Exception";
import { Tipo, Tipos } from "../../Utilidades/Tipo";
import { Asignacion } from "../Asignacion";
import { Declaracion } from "../Declaracion";

export class AsignacionArreglo extends Asignacion implements Nodo {
    indices: Array<Nodo>;

    constructor(a: String, b: Nodo, c: Array<Nodo>, linea: Number, columna: Number) {
        super(a, b, linea, columna);
        this.indices = c;
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
        console.log("Asignacion del arreglo: ", valoresIndices);
        var simbol = new Simbolo(this.tipo, this.identifier, null, 0, true, valoresIndices);
        const res = tabla.ActualizarVariable(simbol);
        if (res != null) {
            const error = new Exception('Semantico', res, this.linea, this.columna);
            arbol.excepciones.push(error);
            arbol.console.push(error.toString());
        }
        return null;
    }

    getC3D(tabla: Tabla, arbol: Arbol): String {
        return '';
    }
}