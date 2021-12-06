"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperAritmeticas = void 0;
const Nodo_1 = require("../Abstracto/Nodo");
const Tipo_1 = require("../Utilidades/Tipo");
const Exception_1 = require("../Utilidades/Exception");
class OperAritmeticas extends Nodo_1.Nodo {
    /**
     * @constructor Devuelve el nodo expresion para ser utilizado con otras operaciones
     * @param opIzq Nodo izquierdo
     * @param opDer Nodo derecho
     * @param operador Operador aritmetico
     * @param linea linea de la operacion
     * @param columna columna de la operacion
     */
    constructor(opIzq, opDer, operador, linea, columna) {
        // Envio null porque aun no se el tipo de la operación
        super(null, linea, columna);
        this.opIzq = opIzq;
        this.opDer = opDer;
        this.operador = operador;
    }
    execute(table, tree) {
        if (this.opDer !== null) {
            const izqResult = this.opIzq.execute(table, tree);
            if (izqResult instanceof Exception_1.Exception) {
                return izqResult;
            }
            const derResult = this.opDer.execute(table, tree);
            if (derResult instanceof Exception_1.Exception) {
                return derResult;
            }
            if (this.operador === "+") {
                if ((this.opIzq.tipo.type === Tipo_1.Tipos.INT &&
                    this.opDer.tipo.type === Tipo_1.Tipos.INT) ||
                    (this.opIzq.tipo.type === Tipo_1.Tipos.DOUBLE &&
                        this.opDer.tipo.type === Tipo_1.Tipos.DOUBLE) ||
                    (this.opIzq.tipo.type === Tipo_1.Tipos.INT &&
                        this.opDer.tipo.type === Tipo_1.Tipos.DOUBLE) ||
                    (this.opIzq.tipo.type === Tipo_1.Tipos.DOUBLE &&
                        this.opDer.tipo.type === Tipo_1.Tipos.INT)) {
                    this.tipo = new Tipo_1.Tipo(Tipo_1.Tipos.DOUBLE);
                    return izqResult + derResult;
                }
                else {
                    const error = new Exception_1.Exception("Semántico", `Error de tipo de datos al operar suma: ${this.opIzq.tipo.type} y ${this.opDer.tipo.type}`, this.linea, this.columna);
                    tree.excepciones.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else if (this.operador === "-") {
                if (this.opIzq.tipo.type === Tipo_1.Tipos.NUMERIC &&
                    this.opDer.tipo.type === Tipo_1.Tipos.NUMERIC) {
                    this.tipo = new Tipo_1.Tipo(Tipo_1.Tipos.NUMERIC);
                    return izqResult - derResult;
                }
                else {
                    const error = new Exception_1.Exception("Semántico", `Error de tipo de datos al operar resta: ${this.opIzq.tipo.type} y ${this.opDer.tipo.type}`, this.linea, this.columna);
                    tree.excepciones.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else if (this.operador === "*") {
                if (this.opIzq.tipo.type === Tipo_1.Tipos.NUMERIC &&
                    this.opDer.tipo.type === Tipo_1.Tipos.NUMERIC) {
                    this.tipo = new Tipo_1.Tipo(Tipo_1.Tipos.NUMERIC);
                    return izqResult * derResult;
                }
                else {
                    const error = new Exception_1.Exception("Semántico", `Error de tipo de datos al multiplicar: ${this.opIzq.tipo.type} y ${this.opDer.tipo.type}`, this.linea, this.columna);
                    tree.excepciones.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else if (this.operador === "/") {
                if (this.opIzq.tipo.type === Tipo_1.Tipos.NUMERIC &&
                    this.opDer.tipo.type === Tipo_1.Tipos.NUMERIC) {
                    this.tipo = new Tipo_1.Tipo(Tipo_1.Tipos.NUMERIC);
                    if (derResult === 0) {
                        const error = new Exception_1.Exception("Semántico", `Error al dividir entre 0`, this.linea, this.columna);
                        tree.excepciones.push(error);
                        tree.console.push(error.toString());
                        return error;
                    }
                    return izqResult / derResult;
                }
                else {
                    const error = new Exception_1.Exception("Semántico", `Error de tipos de datos al dividir: ${this.opIzq.tipo.type} y ${this.opDer.tipo.type}`, this.linea, this.columna);
                    tree.excepciones.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else {
                const error = new Exception_1.Exception("Semantico", `Error, no se puede reconocer el operador`, this.linea, this.columna);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        }
        else {
            const izqResult = this.opIzq.execute(table, tree);
            if (izqResult instanceof Exception_1.Exception) {
                return izqResult;
            }
            if (this.operador === "-") {
                if (this.opIzq.tipo.type === Tipo_1.Tipos.NUMERIC) {
                    this.tipo = new Tipo_1.Tipo(Tipo_1.Tipos.NUMERIC);
                    return -1 * izqResult;
                }
                else {
                    const error = new Exception_1.Exception("Semantico", `Error de tipo de datos con operador unario: ${this.opIzq.tipo.type}`, this.linea, this.columna);
                    tree.excepciones.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else {
                const error = new Exception_1.Exception("Semantico", `Error, Operador desconocido`, this.linea, this.columna);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        }
    }
}
exports.OperAritmeticas = OperAritmeticas;
