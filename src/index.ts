import express from "express";
import { Declaracion } from "./Instrucciones/Declaracion";
import { Main } from "./Instrucciones/Main";
import { Tabla } from "./Simbolos/Tabla";
import { Exception } from "./Utilidades/Exception";

const parser = require("./Gramatica/OLC2.js");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(cors());

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.set("views", __dirname);
app.use(express.urlencoded());
app.use(express.json());

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
  
  const tabla = new Tabla(null);
  arbolAST.instrucciones.forEach((m: any) => {
    if (!(m instanceof Main || m instanceof Declaracion)) {
      console.log(m);
      const error = new Exception('Semantico', 'Sentencia no valida, sentencia fuera del main', m.linea, m.columna);
      arbolAST.excepciones.push(error);
      arbolAST.console.push(error.toString());
    } else {
      const res = m.execute(tabla, arbolAST);
    }
  });

  console.log("lo quer viene en consola es ",arbolAST.console);
  res.render('views/index', {
    codigo_fuente,
    consola: arbolAST.console,
    errores: arbolAST.excepciones
  });
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
