import { Nodo } from "../Abstracto/Nodo";
import { Tabla } from "../Simbolos/Tabla";
import { Arbol } from "../Simbolos/Arbol";
import { Tipo, Tipos } from "../Utilidades/Tipo";
import { Exception } from "../Utilidades/Exception";

export class Relacionales extends Nodo {
  opIzq: Nodo;
  opDer: Nodo;
  operador: String;

  /**
   * @constructor Devuelve el nodo expresion para ser utilizado con otras operaciones
   * @param opIzq Nodo expresion izquierdo
   * @param opDer Nodo expresion derecho
   * @param operador Operador
   * @param linea linea de la operacion
   * @param columna columna de la operacion
   */
  constructor(
    opIzq: Nodo,
    opDer: Nodo,
    operador: String,
    linea: Number,
    columna: Number
  ) {
    super(new Tipo(Tipos.BOOLEAN), linea, columna);
    this.opIzq = opIzq;
    this.opDer = opDer;
    this.operador = operador;
  }

  execute(table: Tabla, tree: Arbol) {
    const LeftResult = this.opIzq.execute(table, tree);
    if (LeftResult instanceof Exception) {
      return LeftResult;
    }
    const RightResult = this.opDer.execute(table, tree);
    if (RightResult instanceof Exception) {
      return RightResult;
    }

    if (this.operador === "<") {
      if (
        (this.opIzq.tipo.type === Tipos.INT &&
          this.opDer.tipo.type === Tipos.INT) ||
        (this.opIzq.tipo.type === Tipos.DOUBLE &&
          this.opDer.tipo.type === Tipos.DOUBLE) ||
        (this.opIzq.tipo.type === Tipos.INT &&
          this.opDer.tipo.type === Tipos.DOUBLE) ||
        (this.opIzq.tipo.type === Tipos.DOUBLE &&
          this.opDer.tipo.type === Tipos.INT)
      ) {
        return LeftResult < RightResult;
      } else {
        const error = new Exception(
          "Semantico",
          `Error de tipos en MENOR QUE se esta tratando de operar ${this.opIzq.tipo.type} y ${this.opDer.tipo.type}`,
          this.linea,
          this.columna
        );
        tree.excepciones.push(error);
        tree.console.push(error.toString());
        return error;
      }
    } else if (this.operador === ">") {
      if (
        (this.opIzq.tipo.type === Tipos.INT &&
          this.opDer.tipo.type === Tipos.INT) ||
        (this.opIzq.tipo.type === Tipos.DOUBLE &&
          this.opDer.tipo.type === Tipos.DOUBLE) ||
        (this.opIzq.tipo.type === Tipos.INT &&
          this.opDer.tipo.type === Tipos.DOUBLE) ||
        (this.opIzq.tipo.type === Tipos.DOUBLE &&
          this.opDer.tipo.type === Tipos.INT)
      ) {
        return LeftResult > RightResult;
      } else {
        const error = new Exception(
          "Semantico",
          `Error de tipos en MAYOR QUE se esta tratando de operar ${this.opIzq.tipo.type} y ${this.opDer.tipo.type}`,
          this.linea,
          this.columna
        );
        tree.excepciones.push(error);
        tree.console.push(error.toString());
        return error;
      }
    } else if (this.operador === ">=") {
      if (
        (this.opIzq.tipo.type === Tipos.INT &&
          this.opDer.tipo.type === Tipos.INT) ||
        (this.opIzq.tipo.type === Tipos.DOUBLE &&
          this.opDer.tipo.type === Tipos.DOUBLE) ||
        (this.opIzq.tipo.type === Tipos.INT &&
          this.opDer.tipo.type === Tipos.DOUBLE) ||
        (this.opIzq.tipo.type === Tipos.DOUBLE &&
          this.opDer.tipo.type === Tipos.INT)
      ) {
        return LeftResult >= RightResult;
      } else {
        const error = new Exception(
          "Semantico",
          `Error de tipos en MAYOR IGUAL se esta tratando de operar ${this.opIzq.tipo.type} y ${this.opDer.tipo.type}`,
          this.linea,
          this.columna
        );
        tree.excepciones.push(error);
        tree.console.push(error.toString());
        return error;
      }
    } else if (this.operador === "<=") {
      if (
        (this.opIzq.tipo.type === Tipos.INT && this.opDer.tipo.type === Tipos.INT) ||
        (this.opIzq.tipo.type === Tipos.DOUBLE && this.opDer.tipo.type === Tipos.DOUBLE) ||
        (this.opIzq.tipo.type === Tipos.INT && this.opDer.tipo.type === Tipos.DOUBLE) ||
        (this.opIzq.tipo.type === Tipos.DOUBLE && this.opDer.tipo.type === Tipos.INT)
      ) {
        return LeftResult <= RightResult;
      } else {
        const error = new Exception(
          "Semantico",
          `Error de tipos en MENOR IGUAL se esta tratando de operar ${this.opIzq.tipo.type} y ${this.opDer.tipo.type}`,
          this.linea,
          this.columna
        );
        tree.excepciones.push(error);
        tree.console.push(error.toString());
        return error;
      }
    } else if (this.operador === "!=") {
      if (
        (this.opIzq.tipo.type === Tipos.INT &&
          this.opDer.tipo.type === Tipos.INT) ||
        (this.opIzq.tipo.type === Tipos.DOUBLE &&
          this.opDer.tipo.type === Tipos.DOUBLE) ||
        (this.opIzq.tipo.type === Tipos.INT &&
          this.opDer.tipo.type === Tipos.DOUBLE) ||
        (this.opIzq.tipo.type === Tipos.DOUBLE &&
          this.opDer.tipo.type === Tipos.INT)
      ) {
        return LeftResult != RightResult;
      } else if (
        (this.opIzq.tipo.type === Tipos.INT &&
          this.opDer.tipo.type === Tipos.INT) ||
        (this.opIzq.tipo.type === Tipos.DOUBLE &&
          this.opDer.tipo.type === Tipos.DOUBLE) ||
        (this.opIzq.tipo.type === Tipos.INT &&
          this.opDer.tipo.type === Tipos.DOUBLE) ||
        (this.opIzq.tipo.type === Tipos.DOUBLE &&
          this.opDer.tipo.type === Tipos.INT)
      ) {
        return LeftResult != RightResult;
      } else {
        const error = new Exception(
          "Semantico",
          `Error de tipos en DIFERENTE QUE se esta tratando de operar ${this.opIzq.tipo.type} y ${this.opDer.tipo.type}`,
          this.linea,
          this.columna
        );
        tree.excepciones.push(error);
        tree.console.push(error.toString());
        return error;
      }
    } else if (this.operador === "==") {
      if (
        (this.opIzq.tipo.type === Tipos.INT && this.opDer.tipo.type === Tipos.INT) ||
        (this.opIzq.tipo.type === Tipos.DOUBLE && this.opDer.tipo.type === Tipos.DOUBLE) ||
        (this.opIzq.tipo.type === Tipos.INT && this.opDer.tipo.type === Tipos.DOUBLE) ||
        (this.opIzq.tipo.type === Tipos.DOUBLE && this.opDer.tipo.type === Tipos.INT)
      ) {
        return LeftResult == RightResult;
      } else if (
        this.opIzq.tipo.type === Tipos.STRING &&
        this.opDer.tipo.type === Tipos.STRING
      ) {
        return LeftResult == RightResult;
      } else {
        const error = new Exception(
          "Semantico",
          `Error de tipos en IGUAL IGUAL se esta tratando de operar ${this.opIzq.tipo.type} y ${this.opDer.tipo.type}`,
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

  getC3D(tabla: Tabla, arbol: Arbol): String {
    return "";
  }
}
