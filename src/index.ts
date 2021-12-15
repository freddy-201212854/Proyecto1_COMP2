//import { Funcion } from "./Instrucciones/Funcion";
import { Declaracion } from "./Instrucciones/Declaracion";
import { Main } from "./Instrucciones/Main";
import { Tabla } from "./Simbolos/Tabla";
import { Exception } from "./Utilidades/Exception";
//import { Llamada } from "./Instrucciones/Llamada";
import { Arbol } from "./Simbolos/Arbol";
//import { agregarFuncion } from "./Utilidades/common";

const compile = document.querySelector("#ejecutar");
const codigo = <HTMLInputElement>document.querySelector("#codigo_fuente");
const consola = document.querySelector("#consola");

const parser = require("./Gramatica/OLC2.js");

var editorSelector = "#codigo_fuente";

compile?.addEventListener("click", () => {
  console.log(
    "Editor",
    getCodeMirrorNative(editorSelector).getDoc().getValue()
  );
  //parser.parse("void main() { print(5); }");
  document.getElementById("consola").innerHTML = "";

  const arbolAST: Arbol = parser.parse(
    getCodeMirrorNative(editorSelector).getDoc().getValue()
  );

  const tabla = new Tabla(null);
  //arbolAST.execute(tabla, arbolAST);

  /*arbolAST.instrucciones.forEach((m: any) => {
    if (!(m instanceof Main || m instanceof Declaracion || m instanceof Funcion || m instanceof Llamada)) {
      console.log(m);
      const error = new Exception('Semantico', 'Sentencia no valida, sentencia fuera del main', m.linea, m.columna);
      arbolAST.excepciones.push(error);
      arbolAST.console.push(error.toString());
    } else {
      const res = m.execute(tabla, arbolAST);
    }
  });*/

  /*arbolAST.instrucciones.map(m => {
    if (m instanceof Funcion) {
      tabla.setStack(0);
      agregarFuncion(tabla, arbolAST, m);
    }
  });

  let cantidadGlobales = 0;
  arbolAST.instrucciones.map(m => {
    if (m instanceof Declaracion) {
      m.posicion = tabla.getHeap();
      cantidadGlobales++;
    }
  });*/

  arbolAST.instrucciones.map((m) => {
    // if (!(m instanceof Funcion)) {
    m.execute(tabla, arbolAST);
    // }
  });

  console.log(arbolAST);
  consola.append(arbolAST.console.join(" "));
  /*let source = my_source.value;
	const result = analize_source(source);
	console.log(result);
	const globalScope: Scope = new Scope(null);
	const ast: AST = new AST(result);
	result.forEach((res: Instruction) => {
		res.translate(globalScope, ast);
	});*/
});

function getCodeMirrorNative(target: any) {
  var _target = target;
  if (typeof _target === "string") {
    _target = document.querySelector(_target);
  }
  if (_target === null || !_target.tagName === undefined) {
    throw new Error("Element does not reference a CodeMirror instance.");
  }

  if (_target.className.indexOf("CodeMirror") > -1) {
    return _target.CodeMirror;
  }

  if (_target.tagName === "TEXTAREA") {
    return _target.nextSibling.CodeMirror;
  }

  return null;
}
