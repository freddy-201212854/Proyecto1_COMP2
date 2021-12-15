import { Simbolo } from "./Simbol";
import { SimboloFuncion } from "./SimboloFuncion";
/**
 * @class En esta clase es donde vamos a guardar y obtener las variables y funciones
 */
export class Tabla {
    Previous: Tabla;
    Variables: Map<String, Simbolo>;
    //variables: Array<Simbolo>;
    funciones: Array<SimboloFuncion>;
    temporal: number;
    etiqueta: number;
    heap: number;
    stack: number;
    tempStorage: Array<String>;
    ambito: Boolean;
    listaReturn: Array<String>;
    sizeActual: Array<number>;

    /**
     * @constructor Nos devuelve un nuevo objeto con los elementos necesarios para compilar
     * @param {Array<Simbolo>} variables Aqui se van a almacenar todos los simbolos de las variables
     * @param {Array<Simbolo>} funciones Aqui se van a almacenar todos los simbolos de las funciones
     * @param {number} temporal Contador que sirve de base para generar temporales, cuando se crea un temporal aumenta en 1 este atributo
     * @param {number} etiqueta Contador que sirve de base para generar etiquetas, cuando se crea una etiqueta aumenta en 1 este atributo
     * @param {Array<String>} tempStorage Lista que almacena los temporales que vamos almacenando
     * @param {Boolean} ambito Si fuera falso indica que estamos en el ambito global y si es verdadero estamos en un local
     * @param {Array<String>} listaReturn Lista de etiquetas(String) que utilizamos para almacenar las etiquetas de destino para el return
     * @param {Array<number>} sizeActual Tamaño del ambito donde me encuentro actualmente (el global vale 0)
     */
    constructor(previous: Tabla) {
        this.Previous = previous;
        this.Variables = new Map<String, Simbolo>();
        this.funciones = [];
        this.temporal = 0;
        this.etiqueta = 0;
        this.heap = 0;
        this.stack = 0;
        this.tempStorage = [];
        this.ambito = false; // false = global, true = local
        this.listaReturn = [];
        this.sizeActual = [];
    }

    /**
     * 
     * @method setVariable Almacena una variable, si ya existe arroja error
     * @param simbol Simbolo que contiene la informacion de la variable a almacenar
     */
    setVariable(simbol: Simbolo) {
        let env: Tabla;
        for (env = this; env != null; env = env.Previous) {
            for (let key of Array.from(env.Variables.keys())) {
                if (key === simbol.identificador) {
                    return `La variable ${key} ya ha sido declarada.`;
                }
            }
        }
        this.Variables.set(simbol.identificador, simbol);
        return null;
    }

    /**
     * 
     * @method setVariable Almacena una variable, si ya existe arroja error
     * @param simbol Simbolo que contiene la informacion de la variable a almacenar
     */
     ActualizarVariable(simbol: Simbolo) {
        let env: Tabla;
        for (env = this; env != null; env = env.Previous) {
            for (let key of Array.from(env.Variables.keys())) {
                if (key === simbol.identificador) {
                    this.Variables.set(simbol.identificador, simbol);
                    return null;
                }
            }
        }
        
        return "Error al actualizar la asignacion de la variable";
    }

    setParametroInicializado(id: String) {
        let env: Tabla;
        for (env = this; env != null; env = env.Previous) {
            for (let key of Array.from(env.Variables.keys())) {
                if (key === id) {
                    let simbolo = env.Variables.get(key) as Simbolo;
                    simbolo.valor = true;
                }
            }
        }
    }

    /**
     * 
     * @method getVariable Obtiene una variable dentro de la tabla de simbolos
     * @param identifier Nombre de la variable a obtener
     */
    getVariable(identifier: String): Simbolo | null | undefined {
        let env: Tabla;
        for (env = this; env != null; env = env.Previous) {
            for (let key of Array.from(env.Variables.keys())) {
                if (key === identifier) {
                    return env.Variables.get(key);
                }
            }
        }
        return null;
    }

    /**
     * 
     * @method getVariable Obtiene una variable dentro de la tabla de simbolos
     * @param identifier Nombre de la variable a obtener
     */
     getVariableArreglo(identifier: String, indices: Array<number>): Object | undefined | null {
        let env: Tabla;
        for (env = this; env != null; env = env.Previous) {
            for (let key of Array.from(env.Variables.keys())) {
                if (key === identifier) {
                    let simbolo = env.Variables.get(key) as Simbolo;
                    console.log("Simbolo en tabla ",simbolo);
                    return simbolo.getValor(identifier, indices);
                }
            }
        }
        return null;
    }

    /**
     * @function setFuncion Almacena un nuevo simbolo en la tabla de funciones
     * @param {SimboloFuncion} simbolo Simbolo que se va almacenar
     * @return {String} Si la funcion ya existe retorna un string con un mensaje de error 
     * caso contrario retorna null que significa que la funcion se ha insertado
     */
    setFuncion(simbolo: SimboloFuncion): String | null {
        for (let i of this.funciones) {
            if (i.identificador === simbolo.identificador) {
                return `La funcion ${simbolo.identificador} ya existe.`
            }
        }
        this.funciones.push(simbolo);
        return null;
    }

    /**
     * @function getFuncion Obtiene una funcion por medio de su identificador
     * @param {String} identificador Nombre de la funcion que queremos obtener
     * @return {SimboloFuncion} Retorna el simbolo con la información de la funcion, 
     * si se obtiene null es que no se encontro la funcion
     */
    getFuncion(identificador: String): SimboloFuncion | null {
        let env: Tabla;
        for (env = this; env != null; env = env.Previous) {
            /*for(let key of Array.from(env.funciones.keys()) ) {
                if(key === identificador){
                    return env.Variables.get(key);
                }
            }*/
            for (let i of env.funciones) {
                if (i.identificador === identificador) {
                    return i;
                }
            }
        }

        /*console.log("las funciones son: ", this.funciones);
        for (let i of this.funciones) {
            if (i.identificador === identificador) {
                return i;
            }
        }*/
        return null;
    }

    /**
     * @function getTemporal Obtiene un nuevo temporal
     * @return {String} devuelve un temporal con el siguiente formato ^t[0-9]+$
     */
    getTemporal(): String {
        return "t" + ++this.temporal;
    }

    /**
     * @function getTemporalActual Obtiene el ultimo temporal generado
     * @return {String} devuelve un temporal con el siguiente formato ^t[0-9]+$
     */
    getTemporalActual(): String {
        return "t" + this.temporal;
    }

    /**
    * @function getHeap Lleva control de las variables globales en el heap, 
    * en cada llamada a este metodo incrementa el valor del atributo heap. 
    * @return {number} devuelve el valor actual del contador heap
    */
    getHeap(): number {
        return this.heap++;
    }

    /**
    * @function getStack Lleva control de las variables locales en el stack, 
    * en cada llamada a este metodo incrementa el valor del atributo stack. 
    * @return {number} devuelve el valor actual del contador stack
    */
    getStack(): number {
        return this.stack++;
    }

    /**
    * @method setStack Cambia el valor del atributo stack 
    * @param {number} value nuevo valor que sera asignado al atributo stack
    */
    setStack(value: number): void {
        this.stack = value;
    }

    /**
     * @function getEtiqueta Obtiene una nueva etiqueta
     * @return {String} devuelve una etiqueta con el siguiente formato ^L[0-9]+$
     */
    getEtiqueta(): String {
        return "L" + ++this.etiqueta;
    }

    /**
     * @function getEtiquetaActual Obtiene la ultima etiqueta generada
     * @return {String} devuelve una etiqueta con el siguiente formato ^t[0-9]+$
     */
    getEtiquetaActual(): String {
        return "L" + this.etiqueta;
    }

    /**
     * @method AgregarTemporal Agrega un temporal a la lista de temporales no utilizados
     * @param {String} temp Temporal que sera almacenado en la lista de temporales
     *  
     */
    AgregarTemporal(temp: String): void {
        if (this.tempStorage.indexOf(temp) == -1) {
            this.tempStorage.push(temp);
        }
    }

    /**
     * @method AgregarTemporal Quita un temporal de la lista de temporales no utilizados
     * @param {String} temp Temporal que sera removido de la lista de temporales
     *  
     */
    QuitarTemporal(temp: String): void {
        let index = this.tempStorage.indexOf(temp);
        if (index > -1) {
            this.tempStorage.splice(index, 1);
        }
    }
}