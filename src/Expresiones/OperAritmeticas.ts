import { Nodo } from "../Abstracto/Nodo";
import { Tabla } from "../Simbolos/Tabla";
import { Arbol } from "../Simbolos/Arbol";
import { Tipo, Tipos } from "../Utilidades/Tipo";
import { Exception } from "../Utilidades/Exception";

export class OperAritmeticas extends Nodo {
  opIzq: Nodo;
  opDer: Nodo;
  operador: String;

  /**
   * @constructor Devuelve el nodo expresion para ser utilizado con otras operaciones
   * @param opIzq Nodo izquierdo
   * @param opDer Nodo derecho
   * @param operador Operador aritmetico
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
    // Envio null porque aun no se el tipo de la operación
    super(null, linea, columna);
    this.opIzq = opIzq;
    this.opDer = opDer;
    this.operador = operador;
  }

  execute(table: Tabla, tree: Arbol) {
    if (this.opDer !== null) {
      const izqResult = this.opIzq.execute(table, tree);
      if (izqResult instanceof Exception) {
        return izqResult;
      }
      const derResult = this.opDer.execute(table, tree);
      if (derResult instanceof Exception) {
        return derResult;
      }
      if (this.operador === "+") {
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
          this.tipo = new Tipo(Tipos.DOUBLE);
          if (Number.isInteger(izqResult + derResult)) {
            this.tipo = new Tipo(Tipos.INT);
          }
          return izqResult + derResult;
        } else {
          const error = new Exception(
            "Semántico",
            `Error de tipo de datos al operar suma: ${this.opIzq.tipo.type} y ${this.opDer.tipo.type}`,
            this.linea,
            this.columna
          );
          tree.excepciones.push(error);
          tree.console.push(error.toString());
          return error;
        }
      } else if (this.operador === "-") {
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
          this.tipo = new Tipo(Tipos.DOUBLE);
          if (Number.isInteger(izqResult + derResult)) {
            this.tipo = new Tipo(Tipos.INT);
          }
          return izqResult - derResult;
        } else {
          const error = new Exception(
            "Semántico",
            `Error de tipo de datos al operar resta: ${this.opIzq.tipo.type} y ${this.opDer.tipo.type}`,
            this.linea,
            this.columna
          );
          tree.excepciones.push(error);
          tree.console.push(error.toString());
          return error;
        }
      } else if (this.operador === "*") {
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
          this.tipo = new Tipo(Tipos.DOUBLE);
          if (Number.isInteger(izqResult + derResult)) {
            this.tipo = new Tipo(Tipos.INT);
          }
          return izqResult * derResult;
        } else {
          const error = new Exception(
            "Semántico",
            `Error de tipo de datos al multiplicar: ${this.opIzq.tipo.type} y ${this.opDer.tipo.type}`,
            this.linea,
            this.columna
          );
          tree.excepciones.push(error);
          tree.console.push(error.toString());
          return error;
        }
      } else if (this.operador === "/") {
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
          this.tipo = new Tipo(Tipos.DOUBLE);
          if (Number.isInteger(izqResult + derResult)) {
            this.tipo = new Tipo(Tipos.INT);
          }
          if (derResult === 0) {
            const error = new Exception(
              "Semántico",
              `Error al dividir entre 0`,
              this.linea,
              this.columna
            );
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
          }
          return izqResult / derResult;
        }
      } else if (this.operador === "%") {
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
          if (
            (izqResult === 0 && derResult === 0) ||
            izqResult === 0 ||
            derResult === 0
          ) {
            const error = new Exception(
              "Semántico",
              `Error al operar % entre 0`,
              this.linea,
              this.columna
            );
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
          }
          this.tipo = new Tipo(Tipos.DOUBLE);
          if (Number.isInteger(izqResult % derResult)) {
            this.tipo = new Tipo(Tipos.INT);
          }
          return izqResult % derResult;
        } else {
          const error = new Exception(
            "Semántico",
            `Error de tipos de datos al dividir: ${this.opIzq.tipo.type} y ${this.opDer.tipo.type}`,
            this.linea,
            this.columna
          );
          tree.excepciones.push(error);
          tree.console.push(error.toString());
          return error;
        }
      } else if (this.operador === "pow") {
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
          this.tipo = new Tipo(Tipos.DOUBLE);
          if (Number.isInteger(Math.pow(izqResult, derResult))) {
            this.tipo = new Tipo(Tipos.INT);
          }
          return Math.pow(izqResult, derResult);
        } else {
          const error = new Exception(
            "Semántico",
            `Error de tipo de datos al aplicar potencia: ${this.opIzq.tipo.type} y ${this.opDer.tipo.type}`,
            this.linea,
            this.columna
          );
          tree.excepciones.push(error);
          tree.console.push(error.toString());
          return error;
        }
      } else if (this.operador === "&") {
        if (
          this.opIzq.tipo.type === Tipos.STRING &&
          this.opDer.tipo.type === Tipos.STRING
        ) {
          return izqResult + derResult;
        } else {
          const error = new Exception(
            "Semántico",
            `Error de tipos de datos al dividir: ${this.opIzq.tipo.type} y ${this.opDer.tipo.type}`,
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
          `Error, no se puede reconocer el operador`,
          this.linea,
          this.columna
        );
        tree.excepciones.push(error);
        tree.console.push(error.toString());
        return error;
      }
    } else {
      const izqResult = this.opIzq.execute(table, tree);
      if (izqResult instanceof Exception) {
        return izqResult;
      }
      if (this.operador === "-") {
        if (this.opIzq.tipo.type === Tipos.NUMERIC) {
          this.tipo = new Tipo(Tipos.NUMERIC);
          return -1 * izqResult;
        } else {
          const error = new Exception(
            "Semantico",
            `Error de tipo de datos con operador unario: ${this.opIzq.tipo.type}`,
            this.linea,
            this.columna
          );
          tree.excepciones.push(error);
          tree.console.push(error.toString());
          return error;
        }
      } else if (this.operador === "sqrt") {
        if (
          this.opIzq.tipo.type === Tipos.INT ||
          this.opIzq.tipo.type === Tipos.DOUBLE
        ) {
          this.tipo = new Tipo(Tipos.DOUBLE);
          if (Number.isInteger(Math.sqrt(izqResult))) {
            this.tipo = new Tipo(Tipos.INT);
          }
          return Math.sqrt(izqResult);
        } else {
          const error = new Exception(
            "Semántico",
            `Error de tipo de datos al aplicar raíz cuadrada: ${this.opIzq.tipo.type}`,
            this.linea,
            this.columna
          );
          tree.excepciones.push(error);
          tree.console.push(error.toString());
          return error;
        }
      } else if (this.operador === "sin") {
        if (
          this.opIzq.tipo.type === Tipos.INT ||
          this.opIzq.tipo.type === Tipos.DOUBLE
        ) {
          this.tipo = new Tipo(Tipos.DOUBLE);
          if (Number.isInteger(Math.sin(izqResult))) {
            this.tipo = new Tipo(Tipos.INT);
          }
          return Math.sin(izqResult);
        } else {
          const error = new Exception(
            "Semántico",
            `Error de tipo de datos al aplicar Seno de: ${this.opIzq.tipo.type}`,
            this.linea,
            this.columna
          );
          tree.excepciones.push(error);
          tree.console.push(error.toString());
          return error;
        }
      } else if (this.operador === "cos") {
        if (
          this.opIzq.tipo.type === Tipos.INT ||
          this.opIzq.tipo.type === Tipos.DOUBLE
        ) {
          this.tipo = new Tipo(Tipos.DOUBLE);
          if (Number.isInteger(Math.cos(izqResult))) {
            this.tipo = new Tipo(Tipos.INT);
          }
          return Math.cos(izqResult);
        } else {
          const error = new Exception(
            "Semántico",
            `Error de tipo de datos al aplicar Coseno de: ${this.opIzq.tipo.type}`,
            this.linea,
            this.columna
          );
          tree.excepciones.push(error);
          tree.console.push(error.toString());
          return error;
        }
      } else if (this.operador === "tan") {
        if (
          this.opIzq.tipo.type === Tipos.INT ||
          this.opIzq.tipo.type === Tipos.DOUBLE
        ) {
          this.tipo = new Tipo(Tipos.DOUBLE);
          if (Number.isInteger(Math.tan(izqResult))) {
            this.tipo = new Tipo(Tipos.INT);
          }
          return Math.tan(izqResult);
        } else {
          const error = new Exception(
            "Semántico",
            `Error de tipo de datos al aplicar Seno: ${this.opIzq.tipo.type}`,
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

  getC3D(tabla: Tabla, arbol: Arbol): String {
    return "";
  }
}
