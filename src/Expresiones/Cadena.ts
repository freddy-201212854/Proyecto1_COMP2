import { Nodo } from "../Abstracto/Nodo";
import { Arbol } from "../Simbolos/Arbol";
import { Tabla } from "../Simbolos/Tabla";
import { Exception } from "../Utilidades/Exception";
import { Tipo, Tipos } from "../Utilidades/Tipo";

export class Cadena extends Nodo {
  tipo: Tipo;
  cadena: Nodo;
  posicion: Nodo;
  final: Nodo;
  operador: String;

  constructor(
    operador: String,
    cadena: Nodo,
    posicion: Nodo,
    final: Nodo,
    line: Number,
    column: Number
  ) {
    var tipo;
    if (operador == "length") {
      tipo = new Tipo(Tipos.INT);
    } else {
      tipo = new Tipo(Tipos.STRING);
    }
    super(tipo, line, column);
    this.operador = operador;
    this.cadena = cadena;
    this.posicion = posicion;
    this.final = final;
  }

  execute(table: Tabla, tree: Arbol) {
    let resultado;
    if (this.operador != "^") {
      resultado = this.cadena.execute(table, tree);
    } else {
      resultado = this.cadena.toString().replace(/\"/g, "");
      let concat = "";
      console.log(this.posicion);
      for (let i = 0; i < Number(this.posicion); i++) {
        concat = concat + resultado;
      }
      return concat;
    }
    if (resultado instanceof Exception) {
      return resultado;
    }

    if (this.cadena.tipo.type !== Tipos.STRING) {
      const error = new Exception(
        "Semantico",
        "La cadena ingresada debe ser de tipo String",
        this.linea,
        this.columna
      );
      tree.excepciones.push(error);
      tree.console.push(error.toString());
      return error;
    }

    if (this.operador == "length") {
      return resultado.length;
    } else if (this.operador == "toLowercase") {
      return resultado.toLowerCase();
    } else if (this.operador == "toUppercase") {
      return resultado.toUpperCase();
    } else if (this.operador == "caracterOfPosition") {
      const pos = this.posicion.execute(table, tree);
      if (resultado instanceof Exception) {
        return resultado;
      }
      return resultado.charAt(pos);
    } else if (this.operador == "subString") {
      const inicio = this.posicion.execute(table, tree);
      const final = this.final.execute(table, tree);
      if (this.posicion.tipo.type !== Tipos.INT) {
        const error = new Exception(
          "Semantico",
          "Posicion inicial del substring debe ser numerica entera",
          this.linea,
          this.columna
        );
        tree.excepciones.push(error);
        tree.console.push(error.toString());
        return error;
      }

      if (this.final.tipo.type !== Tipos.INT) {
        const error = new Exception(
          "Semantico",
          "Posicion final del substring debe ser numerica entera",
          this.linea,
          this.columna
        );
        tree.excepciones.push(error);
        tree.console.push(error.toString());
        return error;
      }

      if (inicio > final) {
        const error = new Exception(
          "Semantico",
          "La posicion inicio debe ser mayor a la final",
          this.linea,
          this.columna
        );
        tree.excepciones.push(error);
        tree.console.push(error.toString());
        return error;
      }

      return resultado.substring(inicio, final + 1);
    } else {
      const error = new Exception(
        "Semantico",
        "No se encuentra la funcionalidad indicada ",
        this.linea,
        this.columna
      );
      tree.excepciones.push(error);
      tree.console.push(error.toString());
      return error;
    }
  }

  getC3D(tabla: Tabla, arbol: Arbol): String {
    throw new Error("Method not implemented.");
  }
}
