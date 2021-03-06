import { Nodo } from "../../Abstracto/Nodo";
import { Arbol } from "../../Simbolos/Arbol";
import { Tabla } from "../../Simbolos/Tabla";
import { Exception } from "../../Utilidades/Exception";
import { Tipo, Tipos } from "../../Utilidades/Tipo";

export class Arreglo extends Nodo {
    tipo: Tipo;
    dimensiones: Array<Nodo>;
    constructor(tipo: Tipo, dimensiones: Array<Nodo>, fila: number, columna: number) {
        super(tipo, fila, columna);
        this.dimensiones = dimensiones;
    }

    // integer[] a = new integer[5*4+7]
    execute(tabla: Tabla, arbol: Arbol): any {
        const result = this.dimensiones[0].execute(tabla, arbol);

        if (result instanceof Exception) {
            return result;
        }

        // Validar que el tipo sea numerico
        if (result !== Tipos.INT) {
            const excepcion = new Exception('Semantico', `El tipo de la dimension debe ser numerico.`, this.linea, this.columna);
            arbol.excepciones.push(excepcion);
            return excepcion;
        }

        return new Tipo(this.tipo.type, this.dimensiones.length);
    }

    getC3D(tabla: Tabla, arbol: Arbol): String {
        let codigo = '';
        let defaultValue = '';
        if (this.tipo.toString() === 'string') {
            defaultValue = '-1';
        } else {
            defaultValue = '0';
        }

        // Posicion inicial del arreglo
        let temp1 = tabla.getTemporal();
        codigo += `${temp1} = h\n`
        tabla.AgregarTemporal(temp1);

        // Tamaño del arreglo
        const size = this.dimensiones[0];
        codigo += size.getC3D(tabla, arbol);
        const temp2 = tabla.getTemporalActual();
        codigo += `heap[${temp1}] = ${temp2}\n`
        codigo += `h = h + 1\n` // aumentamos el puntero h

        // creamos cada posicion y adicionalmente guardamos su valor por defecto
        const temp3 = tabla.getTemporal(); // Temporal contador auxiliar
        const label = tabla.getEtiqueta();
        const label2 = tabla.getEtiqueta();

        codigo += `${temp3} = 0\n`
        tabla.AgregarTemporal(temp3);

        codigo += `${label2}:\n`
        codigo += `if(${temp3} >= ${temp2}) goto ${label}\n`
        tabla.QuitarTemporal(temp3);
        tabla.QuitarTemporal(temp2);
        codigo += `heap[h] = ${defaultValue}\n` // Asignamos valor por defecto
        codigo += `h = h + 1\n` // aumentamos el puntero h
        codigo += `${temp3} = ${temp3} + 1\n`
        codigo += `goto ${label2}\n`
        codigo += `${label}:\n`

        codigo += `${tabla.getTemporal()} = ${temp1}\n`;
        tabla.QuitarTemporal(temp1);
        return codigo;
    }
}