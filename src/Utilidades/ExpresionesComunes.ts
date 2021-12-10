import { Nodo } from "../Abstracto/Nodo";
import { Declaracion } from "../Instrucciones/Declaracion";
import { DoWhile } from "../Instrucciones/DoWhile";
import { Funcion } from "../Instrucciones/Funcion";
import { While } from "../Instrucciones/While";
import { Arbol } from "../Simbolos/Arbol";
import { SimboloFuncion } from "../Simbolos/SimboloFuncion";
import { Tabla } from "../Simbolos/Tabla";
import { Exception } from "./Exception";

/**
 * 
 * @param {Tabla} tabla Contiene los metodos necesarios para agregar funciones
 * @param {arbol} arbol clase que nos ayuda a almacenar errores e instrucciones
 * @param {funcion} funcion objeto funcion que contiene los atributos necesarios para crear un nodo funcion
 */
export function agregarFuncion(tabla: Tabla, arbol: Arbol, funcion: Funcion) {
    // Para la funcion necesitamos: tipo, identificador, cantidad de parametros y tamaño de la funcion

    const tipo = funcion.tipo;

    const identificador = funcion.nombre;
    const parametros = funcion.parametros.length;
    tabla.setStack(1);
    funcion.parametros.map(m => {
        m.posicion = tabla.getStack();
    });
    // Agregamos 1 extra para el return
    // y tambien agregamos la cantidad de parametros al tamaño
    const functionSize = getFuncionSize(tabla, funcion.instrucciones) + parametros + 1;
    const simbolo = new SimboloFuncion(tipo, identificador, parametros, functionSize, funcion);
    const result = tabla.setFuncion(simbolo);
    if (result != null) {
        arbol.excepciones.push(new Exception('Semantico', result, funcion.linea, funcion.columna));
    }
}

/**
 * @function getFuncionSize Devuelve el tamaño de la funcion, 
 * este tamaño se calcula en base a la cantidad de variables locales de la funcion
 * 
 * @param instrucciones Lista de instrucciones a evaluar y determinar si son variables locales
 */

export function getFuncionSize(tabla: Tabla, instrucciones: Array<Nodo>) {
    let size = 0;
    for (const i in instrucciones) {
        const currentIns = instrucciones[i];
        if (currentIns instanceof Declaracion) {
            size = size + 1;
            currentIns.posicion = tabla.getStack();
        } else if (currentIns instanceof DoWhile || currentIns instanceof While) {
            size = size + getFuncionSize(tabla, currentIns.List);
        } else {
            continue;
        }
    }
    return size;
}