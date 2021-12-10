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
    dimensiones: Number;
    /**
     * 
     * @constructor Crea un nuevo tipo con el tipo primitivo indicado en el enum
     * @param type Tipo seleccionado para la variable o funcion
     * 
     */
    constructor(type: Tipos, dimensiones: Number = 0){
        this.type = type;
        this.dimensiones = dimensiones;
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
        }else if(this.type === Tipos.VOID){
            return 'void';
        }
    }
}