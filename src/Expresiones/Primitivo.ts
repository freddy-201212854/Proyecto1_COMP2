import { Nodo } from "../Abstracto/Nodo";
import { Tabla } from "../Simbolos/Tabla";
import { Arbol } from "../Simbolos/Arbol";
import { Tipo, Tipos} from "../Utilidades/Tipo";

/**
 * Crea un nuevo objeto Nodo expresion en base a un valor primitivo,
 * por ejemplo numeros, booleanos o cadenas(suponiendo que la cadena es primitivo)
 */
export class Primitivo extends Nodo{
    value: Object;

    /**
     * @constructor Devuelve un nodo que internamente sera una expresion por tener un tipo
     * @param type Tipo del valor, puede ser numero, cadena o booleano
     * @param value Valor primitivo que crear
     * @param line Fila de donde se creo la sentencia
     * @param column Columna donde se creo la sentencia
     */
    constructor(type:Tipo, value: Object, line: Number, column: Number){
        super(type, line, column);
        this.value = value;
    }

    /**
     * Devuelve el valor inicial e.g. 4
     * @param table Tabla de simbolos
     * @param tree Arbol de instrucciones y excepciones
     */
    execute(table: Tabla, tree: Arbol) {
        return this.value;
    }

    getC3D(tabla: Tabla, arbol: Arbol): String {
        return "";
    }
}