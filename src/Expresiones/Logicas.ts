import { Nodo } from "../Abstracto/Nodo";
import { Tabla } from "../Simbolos/Tabla";
import { Arbol } from "../Simbolos/Arbol";
import { Tipo, Tipos } from "../Utilidades/Tipo";
import { Exception } from "../Utilidades/Exception";
/**
 * @class Genera un nuevo nodo expresion para realizar operaciones logicas
 */
export class Logicas extends Nodo {
  opIzq: Nodo;
  opDer: Nodo;
  operador: String;

  /**
   * @constructor Devuelve el nodo expresion para ser utilizado con otras operaciones
   * @param opIzq Nodo expresion izquierdo
   * @param opDer Nodo expresion derecho
   * @param operador Operador
   * @param line linea de la operacion
   * @param column columna de la operacion
   */
  constructor(
    opIzq: Nodo,
    opDer: Nodo,
    operador: String,
    line: Number,
    column: Number
  ) {
    super(new Tipo(Tipos.BOOLEAN), line, column);
    this.opIzq = opIzq;
    this.opDer = opDer;
    this.operador = operador;
  }

  execute(table: Tabla, tree: Arbol) {
    if (this.opDer !== null) {
      const LeftResult = this.opIzq.execute(table, tree);
      if (LeftResult instanceof Exception) {
        return LeftResult;
      }
      const RightResult = this.opDer.execute(table, tree);
      if (RightResult instanceof Exception) {
        return RightResult;
      }

      if (this.operador === "||") {
        if (
          this.opIzq.tipo.type === Tipos.BOOLEAN &&
          this.opDer.tipo.type === Tipos.BOOLEAN
        ) {
          return LeftResult || RightResult;
        } else {
          const error = new Exception(
            "Semantico",
            `Error de tipos en OR se esta tratando de operar ${this.opIzq.tipo.type} y ${this.opDer.tipo.type}`,
            this.linea,
            this.columna
          );
          tree.excepciones.push(error);
          tree.console.push(error.toString());
          return error;
        }
      } else if (this.operador === "&&") {
        if (
          this.opIzq.tipo.type === Tipos.BOOLEAN &&
          this.opDer.tipo.type === Tipos.BOOLEAN
        ) {
          return LeftResult && RightResult;
        } else {
          const error = new Exception(
            "Semantico",
            `Error de tipos en AND se esta tratando de operar ${this.opIzq.tipo.type} y ${this.opDer.tipo.type}`,
            this.linea,
            this.columna
          );
          tree.excepciones.push(error);
          tree.console.push(error.toString());
          return error;
        }
      } else {
        const error = new Exception(
          "Semantico",
          `Error, Operador desconocido`,
          this.linea,
          this.columna
        );
        tree.excepciones.push(error);
        tree.console.push(error.toString());
        return error;
      }
    } else {
      const LeftResult = this.opIzq.execute(table, tree);
      if (LeftResult instanceof Exception) {
        return LeftResult;
      }
      if (this.operador === "!") {
        if (this.opIzq.tipo.type === Tipos.BOOLEAN) {
          return !LeftResult;
        } else {
          const error = new Exception(
            "Semantico",
            `Error de tipos en el operador not se esta tratando de operar ${this.opIzq.tipo.type}`,
            this.linea,
            this.columna
          );
          tree.excepciones.push(error);
          tree.console.push(error.toString());
          return error;
        }
      } else {
        const error = new Exception(
          "Semantico",
          `Error, Operador desconocido`,
          this.linea,
          this.columna
        );
        tree.excepciones.push(error);
        tree.console.push(error.toString());
        return error;
      }
    }
  }
}
