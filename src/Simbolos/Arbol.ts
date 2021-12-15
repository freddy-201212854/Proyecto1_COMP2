import { Declaracion } from "../Instrucciones/Declaracion";
import { Nodo }  from "../Abstracto/Nodo";
import { Exception } from "../Utilidades/Exception";
import { Tabla } from "./Tabla";
import { Funcion } from "../Instrucciones/Funcion";
import { Main } from "../Instrucciones/Main";
/**
 * @class Almacena el ast y ademas la lista de excepciones
 */
export class Arbol {
    instrucciones: Array<Nodo>
    excepciones: Array<Exception>
    console: Array<String>
    tablaDeSimbolosGlobal: Tabla;

    /**
     * Retorna un arbol con 2 atributos: 1 ast y 1 lista de excepciones
     * @param instrucciones AST generado por la gramatica
     */
    constructor(instrucciones: Array<Nodo>) {
        this.instrucciones = instrucciones;
        this.excepciones = new Array<Exception>();
        this.console = new Array<String>();
    }

    execute(tabla: Tabla, arbol: Arbol) {
        this.tablaDeSimbolosGlobal = tabla;
        this.instrucciones.map(m => {
            if (m instanceof Declaracion) {
                var d: Declaracion = m;
                d.execute(tabla, arbol);
            }
        });

        this.instrucciones.map(m => {
            if (m instanceof Funcion) {
                var f: Funcion = m;
                f.execute(tabla, arbol);
                var id: String = f.getIdentifier();
            }

            if (m instanceof Main) {
                m.execute(tabla, arbol);
            }
        });

    }
}