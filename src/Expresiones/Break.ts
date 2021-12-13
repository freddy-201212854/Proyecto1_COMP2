import { Nodo } from "../Abstracto/Nodo";
import { Tabla } from "../Simbolos/Tabla";
import { Arbol } from "../Simbolos/Arbol";

/**
 * @class Nodo expresion break, nos indica cuando terminar un ciclo
 */
export class Break extends Nodo {
  /**
   * @constructor Retorna el objeto break creado
   * @param linea Linea del break
   * @param column Columna del break
   */
  constructor(linea: Number, columna: Number) {
    super(null, linea, columna);
  }

  execute(table: Tabla, tree: Arbol) {
    return this;
  }

  getC3D(tabla: Tabla, arbol: Arbol): String {
    throw new Error("Method not implemented.");
  }
}
