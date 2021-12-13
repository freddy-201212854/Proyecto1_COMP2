import { Nodo } from "../Abstracto/Nodo";
import { Tabla } from "../Simbolos/Tabla";
import { Arbol } from "../Simbolos/Arbol";

/**
 * @class Nodo expresion continue, nos indica saltar iteraciones
 */
export class Continue extends Nodo {
  /**
   * @constructor Retorna el objeto continue creado
   * @param Linea Linea del continue
   * @param columna Columna del continue
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
