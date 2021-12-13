import { Nodo } from "../Abstracto/Nodo";
import { Tabla } from "../Simbolos/Tabla";
import { Arbol } from "../Simbolos/Arbol";
import { Exception } from "../Utilidades/Exception";
import { Tipo, Tipos } from "../Utilidades/Tipo";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";

/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
export class Condiciones extends Nodo {
  condicion: Nodo;
  Lista_If: Array<Nodo>;
  Lista_Else: Array<Nodo>;

  /**
   * @constructor Crea el nodo instruccion para la sentencia IF
   * @param condicion Condicion que debe ser tipo boolean
   * @param Lista_If Lista de instrucciones a ejecutar en caso la condicion sea verdadera
   * @param Lista_Else Lista de instrucciones a ejecutar en caso la condicion sea falsa
   * @param linea Linea de la sentencia if
   * @param columna Columna de la sentencia if
   */
  constructor(
    condicion: Nodo,
    Lista_If: Array<Nodo>,
    Lista_Else: Array<Nodo>,
    linea: Number,
    columna: Number
  ) {
    super(null, linea, columna);
    this.condicion = condicion;
    this.Lista_If = Lista_If;
    this.Lista_Else = Lista_Else;
  }

  execute(table: Tabla, tree: Arbol) {
    const newtable = new Tabla(table);
    let result: Nodo;
    result = this.condicion.execute(newtable, tree);
    if (result instanceof Exception) {
      return result;
    }

    if (this.condicion.tipo.type !== Tipos.BOOLEAN) {
      const error = new Exception(
        "Semantico",
        `Se esperaba una expresion booleana para la condicion`,
        this.linea,
        this.columna
      );
      tree.excepciones.push(error);
      tree.console.push(error.toString());
      return error;
    }

    if (result) {
      for (let i = 0; i < this.Lista_If.length; i++) {
        const res = this.Lista_If[i].execute(newtable, tree);
        if (res instanceof Continue || res instanceof Break) {
          return res;
        }
      }
    } else {
      for (let i = 0; i < this.Lista_Else.length; i++) {
        const res = this.Lista_Else[i].execute(newtable, tree);
        if (res instanceof Continue || res instanceof Break) {
          return res;
        }
      }
    }

    return null;
  }

  getC3D(tabla: Tabla, arbol: Arbol): String {
    throw new Error("Method not implemented.");
  }
}
