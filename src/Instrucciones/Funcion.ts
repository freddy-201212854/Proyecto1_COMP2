import { Nodo } from "../Abstracto/Nodo";
import { Arbol } from "../Simbolos/Arbol";
import { Tabla } from "../Simbolos/Tabla";
import { Tipo } from "../Utilidades/Tipo";
import { Declaracion } from "./Declaracion";

export class Funcion extends Nodo {
    nombre: String;
    parametros: Array<Declaracion>;
    instrucciones: Array<Nodo>;

    constructor(tipo: Tipo, nombre: String, parametros: Array<Declaracion>, instrucciones: Array<Nodo>, fila: number, columna: number) {
        super(tipo, fila, columna);
        this.nombre = this.getNombreFuncion(nombre, parametros);
        this.parametros = parametros;
        this.instrucciones = instrucciones;
    }

    execute(tabla: Tabla, arbol: Arbol): any {
        const newtable = new Tabla(tabla);
        // Agregar los parametros a la TS
        this.parametros.map(m => {
            m.execute(newtable, arbol);
        });

        // validar que todas las instrucciones son validas semanticamente
        console.log(this.instrucciones)
        this.instrucciones.map(m => {
            m.execute(newtable, arbol);
        });
    }

    getIdentifier(): String {
        var nombre_funcion = this.nombre + '_';
        this.parametros.map(m => {
            nombre_funcion += '_' + m.tipo.toString() ;
        });
        nombre_funcion = nombre_funcion.slice(0, nombre_funcion.length - 1);
        nombre_funcion += ")";
        return nombre_funcion;
    }

    getC3D(tabla: Tabla, arbol: Arbol): String {
        const existeFuncion = tabla.getFuncion(this.nombre);
        tabla.sizeActual.push(existeFuncion.size_function);
        tabla.ambito = true;
        let codigo = `proc ${this.nombre} begin\n`;
        this.instrucciones.map(m => {
            codigo += m.getC3D(tabla, arbol);
        });

        tabla.listaReturn.map(m => {
            codigo += `${m}:\n`
        });
        codigo += `end\n\n\n\n`
        tabla.ambito = false;
        tabla.listaReturn = [];
        tabla.sizeActual.pop();
        tabla.tempStorage = [];
        return codigo;
    }

    getNombreFuncion(nombre: String, parametros: Array<Nodo>) {
        // El nombre de la funcion va a estar dado por el nombre + el tipo de cada parametro
        // Esto con el fin de diferenciar mas facilmente las funciones y poder crear sobrecarga
        const tipos_parametros: Array<String> = [];
        parametros.map(m => {
            tipos_parametros.push(m.tipo.toString());
        });
        return tipos_parametros.length == 0 ?
            `${nombre}` :
            `${nombre}_${tipos_parametros.join('_')}`;
    }
}
