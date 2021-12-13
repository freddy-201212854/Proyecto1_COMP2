%{
    const { Excepcion } = require('../Utilidades/Exception');
    const { Tipo, Tipos } = require('../Utilidades/Tipo');
    const { Arbol } = require('../Simbolos/Arbol');
    const { Main } = require('../Instrucciones/Main');
    const { Declaracion } = require('../Instrucciones/Declaracion');
    const { Asignacion } = require('../Instrucciones/Asignacion');
    const { Primitivo } = require('../Expresiones/Primitivo');
    const { Identificador } = require('../Expresiones/Identificador');
    const { Print } = require('../Instrucciones/Print');
    const { Println } = require('../Instrucciones/Println');
    const { OperAritmeticas } = require('../Expresiones/OperAritmeticas');
    const { Relacionales } = require('../Expresiones/Relacionales');
    const { Logicas } = require('../Expresiones/Logicas');
    const { While } = require('../Instrucciones/While');
    const { DoWhile } = require('../Instrucciones/DoWhile');
    const { For } = require('../Instrucciones/For');
    const { Llamada } = require('../Instrucciones/Llamada');
    const { Funcion } = require('../Instrucciones/Funcion');
    const { Condiciones } = require('../Instrucciones/Condiciones');
    const { Continue } = require('../Expresiones/Continue');
    const { Break} = require('../Expresiones/Break');
    const { Casos} = require('../Instrucciones/Casos');
    const { ListCasos} = require('../Instrucciones/ListCasos');
    const { Switch} = require('../Instrucciones/Switch');
    const { Cadena } = require('../Expresiones/Cadena');
    const { AsignacionArreglo } = require('../Instrucciones/Arreglo/AsignacionArreglo');
    const { DeclaracionArreglo } = require('../Instrucciones/Arreglo/DeclaracionArreglo');
    const { AccesoArreglo } = require('../Instrucciones/Arreglo/AccesoArreglo');
%}

%lex
%options case-insensitive
entero [0-9]+
decimal {entero}"."{entero}
stringliteral (\"[^"]*\")
identifier ([a-zA-Z_])[a-zA-Z0-9_]*
%%

\s+                   /* skip whitespace */
"//".*                              // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas

{decimal}             return 'decimal' 
{entero}              return 'entero' 
{stringliteral}       return 'STRING_LITERAL'
"*"                   return '*'
"/"                   return '/'
"%"                   return '%'
";"                   return ';'
":"                   return ':'
","                   return ','
"-"                   return '-'
"+"                   return '+'
"*"                   return '*'
"<"                   return '<'
">"                   return '>'
"<="                  return '<='
">="                  return '>='
"=="                  return '=='
"!="                  return '!='
"||"                  return '||'
"&&"                  return '&&'
"&"                   return '&'
"!"                   return '!'
"="                   return '='
"("                   return '('
")"                   return ')'  
"["                   return '['
"]"                   return ']'
"{"                   return '{'
"}"                   return '}'
"pow"                 return 'pow'
"sqrt"                return 'sqrt'
"sin"                 return 'sin'
"cos"                 return 'cos'
"tan"                 return 'tan'
"true"                return 'true'
"false"               return 'false'
"print"               return 'print'
"println"             return 'println'
"if"                  return 'if'
"else"                return 'else'
"switch"              return 'switch'
"case"                return 'case'
"break"               return 'break'
"continue"            return 'continue'
"default"             return 'default'
"while"               return 'while'
"do"                  return 'do'
"for"                 return 'for'
"in"                  return 'in'
"main"                return 'main'
"numeric"             return 'numeric'
"string"              return 'string'
"boolean"             return 'boolean'
"int"                 return 'int'
"void"                return 'void'
"null"                return 'null'
"double"              return 'double'
"char"                return 'char'
"."                   return '.'
"subString"           return 'subString'
"length"              return 'length'
"toUppercase"         return 'toUppercase'
"toLowercase"         return 'toLowercase'
"caracterOfPosition"  return 'caracterOfPosition'
{identifier}          return 'identifier'

<<EOF>>                 return 'EOF';

.                       { console.error('Error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex
%left 'else'
%left '||'
%left '&&', '&', '^', '#', '?' , '.'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+', '-'
%left '*', '/', '%', 'identifier'
%right '!'
%left UMENOS

%start INICIO

%%

INICIO : INSTRUCCIONES EOF {$$ = new Arbol($1); console.log("Arbol desde la gramatica ", $$); return $$;}
        ;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION {$$ = $1; $$.push($2);}
              | INSTRUCCION {$$ = [$1];}
              ;

INSTRUCCION : MAIN {$$ = $1;}
            | DECLARACION {$$ = $1;}
            | ASIGNACION {$$ = $1;}
            | PRINT {$$ = $1;}
            | PRINTLN {$$ = $1;}
            | IF {$$ = $1;}
            | SWITCH {$$ = $1;}
            | WHILE {$$ = $1;}
            | DOWHILE {$$ = $1;}
            | FOR {$$ = $1;}
            | FUNCION {$$ = $1;}
            | LLAMADA {$$ = $1;}
            | ASIGNACION_ARREGLO {$$ = $1;}
            | DECLARACION_ARREGLO {$$ = $1;}
            ;

MAIN : TIPO 'main' '(' ')' BLOQUE_INSTRUCCIONES {$$ = new Main($1, $5, this._$.first_line,this._$.first_column);}
     ;

TIPO : 'string' {$$ = new Tipo(Tipos.STRING);}
     | 'boolean' {$$ = new Tipo(Tipos.BOOLEAN);}
     | 'int' {$$ = new Tipo(Tipos.INT);}
     | 'double' {$$ = new Tipo(Tipos.DOUBLE);}
     | 'char' {$$ = new Tipo(Tipos.CHAR);}
     | 'null' {$$ = new Tipo(Tipos.NULL);}
     | 'void' {$$ = new Tipo(Tipos.VOID);}
     ;

DECLARACION : TIPO identifier '=' EXPRESION ';' {$$ = new Declaracion($1, [$2], $4, this._$.first_line, this._$.first_column);}
            | TIPO LISTA_VAR ';' {$$ = new Declaracion($1, $2, new Primitivo($1, null, this._$.first_line, this._$.first_column), this._$.first_line, this._$.first_column);}
            ;

LISTA_VAR : LISTA_VAR ',' identifier      {$$.push($3);}
            | identifier                  {$$ = [$1];}
            ;

ASIGNACION : identifier '=' EXPRESION ';' {$$ = new Asignacion($1, $3, this._$.first_line,this._$.first_column);}
           ;

PRINT : 'print' '(' LISTA_EXPRESIONES ')' ';' {$$ = new Print($3, this._$.first_line,this._$.first_column);}
      ;


PRINTLN : 'println' '(' LISTA_EXPRESIONES ')' ';' {$$ = new Println($3, this._$.first_line, this._$.first_column);}
        ;

WHILE : 'while' CONDICION BLOQUE_INSTRUCCIONES {$$ = new While($2, $3, this._$.first_line, this._$.first_column);}
      ;

DOWHILE : 'do' BLOQUE_INSTRUCCIONES 'while' CONDICION ';'{$$ = new DoWhile($4, $2, this._$.first_line, this._$.first_column);}
        ;

FOR   : 'for' '(' EXPRESSION_AUMENTO ';' EXPRESION ';' EXPRESSION_AUMENTO ')' BLOQUE_INSTRUCCIONES {$$ = new For($3, $5, $7, $9, this._$.first_line, this._$.first_column);}
      | 'for' EXPRESION 'in' EXPRESION BLOQUE_INSTRUCCIONES
      ;

IF : 'if' CONDICION BLOQUE_INSTRUCCIONES {$$ = new Condiciones($2, $3, [], _$.first_line, _$.first_column);}
   | 'if' CONDICION BLOQUE_INSTRUCCIONES 'else' BLOQUE_INSTRUCCIONES {$$ = new Condiciones($2, $3, $5, _$.first_line, _$.first_column);}
   | 'if' CONDICION BLOQUE_INSTRUCCIONES 'else' IF {$$ = new Condiciones($2, $3, [$5], _$.first_line, _$.first_column);}
   ;

SWITCH: 'switch' '(' EXPRESION ')' '{' CASOS '}' { $$ = new Switch($3, $6, this._$.first_line, this._$.first_column);}
      ;

CASOS : CASOS CASOS_EV { $$.push($2);}
      | CASOS_EV { $$=[$1];}
      ;       

CASOS_EV: 'case' EXPRESION ':' BLOQUE_INSTRUCCIONES2 'break' ';' { $$ = new Casos($2, $4, this._$.first_line, this._$.first_column);}
        | 'default' ':' BLOQUE_INSTRUCCIONES2 { $$ = new Casos(null, $3, this._$.first_line, this._$.first_column);}
        ;

EXPRESSION_AUMENTO : VARIABLES_INICIALIZADAS {$$ = $1;}
                  | TIPO identifier VARIABLES_INICIALIZADAS {$$ = new Declaracion($1, [$2], $3, this._$.first_line, this._$.first_column);}
                  ;

VARIABLES_INICIALIZADAS : identifier '=' EXPRESION {$$ = new Asignacion($1, $3, this._$.first_line,this._$.first_column);}
                        | EXPRESION   {$$ = $1;} 
                        | '=' EXPRESION {$$ = $2;} 
                        ;

CONDICION : '(' EXPRESION ')' {$$ = $2;}
          ;

BLOQUE_INSTRUCCIONES : '{' INSTRUCCIONES '}' {$$ = $2;}
                     | '{' '}' {$$ = [];}
                     ;

BLOQUE_INSTRUCCIONES2 : INSTRUCCIONES {$$ = $1;}
                     | {$$ = [];}
                     ;

LISTA_EXPRESIONES : LISTA_EXPRESIONES ',' EXPRESION      {$$.push($3);}
            | EXPRESION                                  {$$ = [$1];}
            ;

DIMENSIONES : DIMENSIONES '[' EXPRESION ']' {$$ = $1; $$.push($3);}
            | '[' EXPRESION ']' {$$ = [$2];}
            | '[' ']' {$$ = [];}
            ;

LLAMADA : identifier '(' LISTA_EXPRESIONES ')' ';' {$$ = new Llamada($1, $3, this._$.first_line, this._$.first_column);}
        | identifier '(' ')' ';' {$$ = new Llamada($1, [], this._$.first_line, this._$.first_column);} 
        ;

FUNCION : TIPO identifier '(' LISTA_PARAMETROS ')' BLOQUE_INSTRUCCIONES  {$$ = new Funcion($1, $2, $4, $6, this._$.first_line, this._$.first_column);}
        | TIPO identifier '(' ')' BLOQUE_INSTRUCCIONES {$$ = new Funcion($1, $2, [], $5, this._$.first_line, this._$.first_column);}
        ;

LISTA_PARAMETROS : LISTA_PARAMETROS ',' PARAMETRO {$$ = $1; $$.push($3);}
                 | PARAMETRO {$$ = [$1];}
                 ;

PARAMETRO : TIPO identifier {$$ = new Declaracion($1, [$2], new Primitivo($1, null, this._$.first_line, this._$.first_column), this._$.first_line, this._$.first_column)}
          ;


ASIGNACION_ARREGLO : identifier DIMENSIONES '=' '[' LISTA_EXPRESIONES ']' ';' {$$ =new AsignacionArreglo($1, $2, $5, this._$.first_line, this._$.first_column);}
                   | identifier DIMENSIONES '=' '[' ']' ';' {$$ =new AsignacionArreglo($1, $2, [], this._$.first_line, this._$.first_column);}
                   ;

DECLARACION_ARREGLO : TIPO identifier DIMENSIONES ';' {$$ = new DeclaracionArreglo($1, $2, $3, this._$.first_line, this._$.first_column);}
                    ;

EXPRESION : '-' EXPRESION %prec UMENOS	                                { $$ = new OperAritmeticas($2, undefined, '-', this._$.first_line, this._$.first_column); } 
          | EXPRESION '+' EXPRESION		                        {$$ = new OperAritmeticas($1, $3, '+', this._$.first_line, this._$.first_column);}
          | EXPRESION '-' EXPRESION		                        {$$ = new OperAritmeticas($1, $3, '-', this._$.first_line,this._$.first_column);}
          | EXPRESION '*' EXPRESION		                        {$$ = new OperAritmeticas($1, $3, '*', this._$.first_line,this._$.first_column);}
          | EXPRESION '/' EXPRESION	                                {$$ = new OperAritmeticas($1, $3, '/', this._$.first_line,this._$.first_column);}
          | EXPRESION '%' EXPRESION	                                {$$ = new OperAritmeticas($1, $3, '%', this._$.first_line,this._$.first_column);}
          | 'pow' '(' EXPRESION ',' EXPRESION ')'	                {$$ = new OperAritmeticas($3, $5, 'pow', this._$.first_line,this._$.first_column);}
          | 'sqrt' '(' EXPRESION ')'	                                {$$ = new OperAritmeticas($3,null, 'sqrt', this._$.first_line,this._$.first_column);}
          | 'sin' '(' EXPRESION ')'	                                {$$ = new OperAritmeticas($3,null, 'sin', this._$.first_line,this._$.first_column);}
          | 'cos' '(' EXPRESION ')'	                                {$$ = new OperAritmeticas($3,null, 'cos', this._$.first_line,this._$.first_column);}
          | 'tan' '(' EXPRESION ')'	                                {$$ = new OperAritmeticas($3,null, 'tan', this._$.first_line,this._$.first_column);}
          | EXPRESION '<' EXPRESION		                        {$$ = new Relacionales($1, $3, '<', this._$.first_line, this._$.first_column); }
          | EXPRESION '>' EXPRESION		                        {$$ = new Relacionales($1, $3, '>', this._$.first_line, this._$.first_column); }
          | EXPRESION '>' '=' EXPRESION	                                {$$ = new Relacionales($1, $4, '>=', this._$.first_line, this._$.first_column); }
          | EXPRESION '<' '=' EXPRESION	                                {$$ = new Relacionales($1, $4, '<=', this._$.first_line, this._$.first_column); }
          | EXPRESION '==' EXPRESION	                                {$$ = new Relacionales($1, $3, '==', this._$.first_line, this._$.first_column); }
          | EXPRESION '!=' EXPRESION	                                {$$ = new Relacionales($1, $3, '!=', this._$.first_line, this._$.first_column); }
          | EXPRESION '||' EXPRESION	                                {$$ = new Logicas($1, $3, '||', this._$.first_line, _$.first_column); }
          | EXPRESION '&&' EXPRESION	                                {$$ = new Logicas($1, $3, '&&', this._$.first_line, this._$.first_column); }
          | EXPRESION '.' 'toLowercase' '(' ')'                         {$$ = new Cadena('toLowercase', $1, null, null, this._$.first_line, this._$.first_column);}  
          | EXPRESION '.' 'toUppercase' '(' ')'                         {$$ = new Cadena('toUppercase', $1, null, null, this._$.first_line, this._$.first_column);} 
          | EXPRESION '.' 'length' '(' ')'                              {$$ = new Cadena('length', $1, null, null, this._$.first_line, this._$.first_column);}
          | EXPRESION '.' 'caracterOfPosition' '(' EXPRESION ')'        {$$ = new Cadena('caracterOfPosition', $1, $5, null, this._$.first_line, this._$.first_column);}
          | EXPRESION '.' 'subString' '(' EXPRESION ',' EXPRESION ')'   {$$ = new Cadena('subString', $1, $5, $7, this._$.first_line, this._$.first_column);}
          | 'entero'				                        {$$ = new Primitivo(new Tipo(Tipos.INT), Number($1), this._$.first_line,this._$.first_column);}
          | 'decimal'				                        {$$ = new Primitivo(new Tipo(Tipos.DOUBLE), Number($1), this._$.first_line,this._$.first_column);}
          | identifier			                                {$$ = new Identificador($1, this._$.first_line,this._$.first_column);}
          | STRING_LITERAL                                              {$$ = new Primitivo(new Tipo(Tipos.STRING), $1.replace(/\"/g,""), this._$.first_line,this._$.first_column); }
          | 'true'				                        {$$ = new Primitivo(new Tipo(Tipos.BOOLEAN), 1, this._$.first_line, this._$.first_column); }
          | 'false'	     				                {$$ = new Primitivo(new Tipo(Tipos.BOOLEAN), 0, this._$.first_line, this._$.first_column); }
          | LLAMADA				                        { $$ = $1; } 
          | '(' EXPRESION ')'                                           {$$=$2;}
          ;