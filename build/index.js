"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
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
    console.log(res);
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
