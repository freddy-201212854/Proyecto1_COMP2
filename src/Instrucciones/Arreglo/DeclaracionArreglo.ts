import { Nodo } from "../../Abstracto/Nodo";
import { Arbol } from "../../Simbolos/Arbol";
import { Simbolo } from "../../Simbolos/Simbol";
import { Tabla } from "../../Simbolos/Tabla";
import { Exception } from "../../Utilidades/Exception";
import { Tipo, Tipos } from "../../Utilidades/Tipo";
import { Declaracion } from "../Declaracion";

export class DeclaracionArreglo extends Declaracion implements Nodo {
    dimensiones: Array<Nodo>;

    constructor(a: Tipo, b: String, c: Array<Nodo>, linea: Number, columna: Number) {
        super(a, b, null, linea, columna);
        this.dimensiones = c;
        console.log("Declaracion arreglo ", a, b, this.dimensiones);
    }

    // integer[] a = new integer[5*4+7]
    execute(tabla: Tabla, arbol: Arbol): any {
        var tamaniosDimensiones: Array<number> = [];
        const exists = tabla.getVariable(this.identifier);
        if (exists !== null) {
            const excepcion = new Exception('Semantico', `La variable ${this.identifier} ya existe.`, this.linea, this.columna);
            arbol.excepciones.push(excepcion);
            return excepcion;
        }
        this.dimensiones.forEach(dimension => {
            var er = dimension.execute(tabla, arbol);
            console.log(er);
            if (!Number.isInteger(er)) {
                console.log("Los indices para declarar un arreglo deben ser de tipo numérico. El indice [" + er + "] no es numérico.");
                return null;
            }

            tamaniosDimensiones.push(er);
        });
        var simbol = new Simbolo(this.tipo, this.identifier, null, this.posicion, true, tamaniosDimensiones);
        const res = tabla.setVariable(simbol);
        console.log("Declaracion arreglo ", simbol);
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