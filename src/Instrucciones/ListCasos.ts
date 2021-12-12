import { Nodo } from "../Abstracto/Nodo";
import { Tabla } from "../Simbolos/Tabla";
import { Arbol } from "../Simbolos/Arbol";

/**
 * @class Nodo expresion break, nos indica cuando terminar un ciclo
 */
export class ListCasos extends Nodo {
  List: Nodo;
  /**
   * @constructor Retorna el objeto break creado
   * @param valor valor a comparar en case
   * @param List Lista de casos a ejecutar
   * @param linea Linea del break
   * @param columna Columna del break
   */
  constructor(List: Nodo, linea: Number, columna: Number) {
    super(null, linea, columna);
    this.List = List;
  }

  execute(table: Tabla, tree: Arbol) {
    //const newtable = new Tabla(table);
    //let result: Nodo;

    //result = this.List.execute(newtable, tree);

    return this;
  }
}
