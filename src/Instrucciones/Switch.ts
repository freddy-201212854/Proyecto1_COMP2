import { Nodo } from "../Abstracto/Nodo";
import { Tabla } from "../Simbolos/Tabla";
import { Arbol } from "../Simbolos/Arbol";
import { Exception } from "../Utilidades/Exception";
import { Tipos } from "../Utilidades/Tipo";

export class Switch extends Nodo {
  expression: Nodo;
  List: Array<Nodo>;

  /**
   * @constructor Crea el nodo instruccion para la sentencia IF
   * @param condition Condicion que debe ser tipo boolean
   * @param List Lista de instrucciones a ejecutar mientras la condicion sea verdadera
   * @param line Linea de la sentencia while
   * @param column Columna de la sentencia while
   */
  constructor(
    expression: Nodo,
    List: Array<Nodo>,
    line: Number,
    column: Number
  ) {
    super(null, line, column);
    this.expression = expression;
    this.List = List;
  }

  execute(table: Tabla, tree: Arbol) {
    const newtable = new Tabla(table);
    let valor_switch: Nodo;
    let error: Boolean = false;

    valor_switch = this.expression.execute(newtable, tree); // resultado de expresion de switch

    if (valor_switch instanceof Exception) {
      error = true;
      return valor_switch;
    }

    for (let i = 0; i < this.List.length; i++) {
      const Casos = this.List[i].execute(newtable, tree);
      if (Casos instanceof Exception) {
        error = true;
        return Casos;
      }

      let defaults_index = false;
      let valor_caso;
      if (Casos.expression) {
        valor_caso = Casos.expression.execute(newtable, tree);
      } else {
        defaults_index = true;
      }

      if (Casos instanceof Exception) {
        error = true;
        return valor_caso;
      }

      if (valor_switch === valor_caso) {
        for (let j = 0; j < Casos.List.length; j++) {
          const instrucciones = Casos.List[j].execute(newtable, tree);
          if (Casos instanceof Exception) {
            error = true;
            return instrucciones;
          }
        }
        break;
      } else {
        if (defaults_index) {
          for (let j = 0; j < Casos.List.length; j++) {
            const instrucciones = Casos.List[j].execute(newtable, tree);
            if (Casos instanceof Exception) {
              error = true;
              return instrucciones;
            }
          }
        }
      }
    }
    return this;
  }
}
