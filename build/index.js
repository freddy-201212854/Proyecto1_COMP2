"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Declaracion_1 = require("./Instrucciones/Declaracion");
const Main_1 = require("./Instrucciones/Main");
const Tabla_1 = require("./Simbolos/Tabla");
const Exception_1 = require("./Utilidades/Exception");
const parser = require("./Gramatica/OLC2.js");
const cors = require("cors");
const app = express_1.default();
const port = 3000;
app.use(cors());
app.use(express_1.default.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", __dirname);
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.render("views/index", {
        codigo_fuente: "",
        consola: [],
        errores: [],
    });
});
app.post("/ejecutar", (req, res) => {
    const { codigo_fuente, consola } = req.body;
    if (!codigo_fuente) {
        return res.redirect("/");
    }
    const arbolAST = parser.parse(codigo_fuente);
    const tabla = new Tabla_1.Tabla(null);
    arbolAST.instrucciones.forEach((m) => {
        if (!(m instanceof Main_1.Main || m instanceof Declaracion_1.Declaracion)) {
            console.log(m);
            const error = new Exception_1.Exception('Semantico', 'Sentencia no valida, sentencia fuera del main', m.linea, m.columna);
            arbolAST.excepciones.push(error);
            arbolAST.console.push(error.toString());
        }
        else {
            const res = m.execute(tabla, arbolAST);
        }
    });
    res.render('views/index', {
        codigo_fuente,
        consola: arbolAST.console,
        errores: arbolAST.excepciones
    });
});
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
