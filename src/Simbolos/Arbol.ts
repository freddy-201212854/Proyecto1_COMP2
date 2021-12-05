import { Nodo }  from "../Abstracto/Nodo";
import { Exception } from "../Utilidades/Exception";
/**
 * @class Almacena el ast y ademas la lista de excepciones
 */
export class Arbol {
    instrucciones: Array<Nodo>
    excepciones: Array<Exception>
    console: Array<String>

    /**
     * Retorna un arbol con 2 atributos: 1 ast y 1 lista de excepciones
     * @param instrucciones AST generado por la gramatica
     */
    constructor(instrucciones: Array<Nodo>) {
        this.instrucciones = instrucciones;
        this.excepciones = new Array<Exception>();
        this.console = new Array<String>();
    }
}