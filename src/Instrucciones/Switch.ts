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
    let result: Nodo;

    result = this.expression.execute(newtable, tree); // resultado de expresion de switch

    //console.log("Switch ", result);
    //console.log("Switch List ", this.List);

    let res: any;
    let error: Boolean = false;
    for (let i = 0; i < this.List.length; i++) {
      res = this.List[i].execute(newtable, tree);
      console.log("ListCasos", res.linea);
      console.log("ListCasos 2", res.expresion);

      if (res instanceof Exception) {
        error = true;
        break;
      }
    }

    return this;
  }
}
