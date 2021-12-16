import { Nodo } from "../Abstracto/Nodo";
import { Tabla } from "../Simbolos/Tabla";
import { Arbol } from "../Simbolos/Arbol";
import { Tipo, Tipos } from "../Utilidades/Tipo";
import { Exception } from "../Utilidades/Exception";

/**
 * Crea un nuevo objeto Nodo expresion en base a un valor primitivo,
 * por ejemplo numeros, booleanos o cadenas(suponiendo que la cadena es primitivo)
 */
export class Nativas extends Nodo {
  value: any;
  types: Tipo;
  cadenas: boolean;
  /**
   * @constructor Devuelve un nodo que internamente sera una expresion por tener un tipo
   * @param type Tipo del valor, puede ser numero, cadena o booleano
   * @param value Valor primitivo que crear
   * @param line Fila de donde se creo la sentencia
   * @param column Columna donde se creo la sentencia
   */
  constructor(
    types: Tipo,
    value: any,
    cadenas: boolean,
    line: Number,
    column: Number
  ) {
    super(types, line, column);
    this.value = value;
    this.types = types;
    this.cadenas = cadenas;
  }

  /**
   * Devuelve el valor inicial e.g. 4
   * @param table Tabla de simbolos
   * @param tree Arbol de instrucciones y excepciones
   */
  execute(table: Tabla, tree: Arbol) {
    try {
      if (this.cadenas) {
        if (this.types.type === Tipos.INT) {
          const result = parseInt(this.value);
          if (Number.isNaN(result)) {
            return this.errorSemanticNumeric(table, tree);
          }
          return result;
        } else if (this.types.type === Tipos.DOUBLE) {
          const result = parseFloat(this.value);
          if (Number.isNaN(result)) {
            return this.errorSemanticNumeric(table, tree);
          }
          return result;
        } else if (this.types.type === Tipos.BOOLEAN) {
          if (Number(this.value) === 1) {
            this.value = true;
          } else if (Number(this.value) === 0) {
            this.value = false;
          } else {
            const error = new Exception(
              "Semántico",
              `Error al convertir valor, tiene que ser 1 o 0 `,
              this.linea,
              this.columna
            );
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
          }
          return this.value;
        } else {
          const error = new Exception(
            "Semántico",
            `Error al convertir valor, no existe el tipo de dato`,
            this.linea,
            this.columna
          );
          tree.excepciones.push(error);
          tree.console.push(error.toString());
          return error;
        }
      } else {
        if (this.types.type === Tipos.INT) {
          const result = parseInt(this.value.execute());
          if (Number.isNaN(result)) {
            return this.errorSemanticNumeric(table, tree);
          }
          return result;
        } else if (this.types.type === Tipos.DOUBLE) {
          const result = Number.parseFloat(this.value.execute());
          if (Number.isNaN(result)) {
            return this.errorSemanticNumeric(table, tree);
          }
          return result;
        } else if (this.types.type === Tipos.STRING) {
          const result = this.value.execute().toString();
          return result;
        } else if (this.types.type === Tipos.TYPEOF) {
          const result = typeof this.value.execute();

          return result;
        }
      }
    } catch (err) {
      const error = new Exception(
        "Semántico",
        `Error al convertir valor`,
        this.linea,
        this.columna
      );
      tree.excepciones.push(error);
      tree.console.push(error.toString());
      return error;
    }
  }

  errorSemanticNumeric(table: Tabla, tree: Arbol) {
    const error = new Exception(
      "Semántico",
      `Error al convertir valor, no es numerico`,
      this.linea,
      this.columna
    );
    tree.excepciones.push(error);
    tree.console.push(error.toString());
    return error;
  }

  getC3D(tabla: Tabla, arbol: Arbol): String {
    return "";
  }
}
