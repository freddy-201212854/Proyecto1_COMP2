import express from "express";

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
  const tree = parser.parse(codigo_fuente);

  res.render("views/index", {
    codigo_fuente,
    consola: [],
    errores: [],
  });
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
