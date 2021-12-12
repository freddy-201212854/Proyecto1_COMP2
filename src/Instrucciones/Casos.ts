import { Nodo } from "../Abstracto/Nodo";
import { Tabla } from "../Simbolos/Tabla";
import { Arbol } from "../Simbolos/Arbol";

/**
 * @class Nodo expresion break, nos indica cuando terminar un ciclo
 */
export class Casos extends Nodo {
  expression: Nodo;
  List: Array<Nodo>;
  /**
   * @constructor Retorna el objeto break creado
   * @param valor valor a comparar en case
   * @param List Lista de instrucciones a ejecutar si se cumple el caso
   * @param linea Linea del break
   * @param columna Columna del break
   */
  constructor(
    expression: Nodo,
    List: Array<Nodo>,
    linea: Number,
    columna: Number
  ) {
    super(null, linea, columna);
    this.expression = expression;
    this.List = List;
  }

  execute(table: Tabla, tree: Arbol) {
    /* console.log("CASOS ", this.expression);
    console.log("CASOS INSTR ", this.List);

    const newtable = new Tabla(table);
    let result: Nodo;

    result = this.expression.execute(newtable, tree);

    return result;*/
    return this;
  }
}
