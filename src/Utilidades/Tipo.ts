export enum Tipos {
    NUMERIC,
    STRING,
    BOOLEAN,
    VOID,
    CHAR,
    DOUBLE,
    NULL,
    INT
}

/**
 * 
 * @class Permite llevar el control de los tipos del lenguaje
 */
export class Tipo{
    type : Tipos;

    /**
     * 
     * @constructor Crea un nuevo tipo con el tipo primitivo indicado en el enum
     * @param type Tipo seleccionado para la variable o funcion
     * 
     */
    constructor(type: Tipos){
        this.type = type;
    }

    toString(){
        if(this.type === Tipos.BOOLEAN){
            return 'boolean';
        }else if(this.type === Tipos.NUMERIC){
            return 'numeric';
        }else if(this.type === Tipos.STRING){
            return 'string';
        }else if(this.type === Tipos.INT){
            return 'int';
        }else if(this.type === Tipos.DOUBLE){
            return 'double';
        }else if(this.type === Tipos.CHAR){
            return 'char';
        }else if(this.type === Tipos.NULL){
            return 'null';
        }
    }
}