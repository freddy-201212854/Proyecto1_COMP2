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
"&"                   return '&'
";"                   return ';'
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
"break"               return 'break'
"continue"            return 'continue'
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
{identifier}          return 'identifier'

<<EOF>>                 return 'EOF';

.                       { console.error('Error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex
%left 'else'
%left '||'
%left '&&'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/' '%'
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
            | WHILE {$$ = $1;}
            | DOWHILE {$$ = $1;}
            | FOR {$$ = $1;}
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

LISTA_EXPRESIONES : LISTA_EXPRESIONES ',' EXPRESION      {$$.push($3);}
            | EXPRESION                                  {$$ = [$1];}
            ;

EXPRESION : EXPRESION '+' EXPRESION		    {$$ = new OperAritmeticas($1, $3, '+', this._$.first_line, this._$.first_column);}
          | EXPRESION '-' EXPRESION		    {$$ = new OperAritmeticas($1, $3, '-', this._$.first_line,this._$.first_column);}
          | EXPRESION '*' EXPRESION		    {$$ = new OperAritmeticas($1, $3, '*', this._$.first_line,this._$.first_column);}
          | EXPRESION '/' EXPRESION	          {$$ = new OperAritmeticas($1, $3, '/', this._$.first_line,this._$.first_column);}
          
          | EXPRESION '%' EXPRESION	          {$$ = new OperAritmeticas($1, $3, '%', this._$.first_line,this._$.first_column);}
          | 'pow' '(' EXPRESION ',' EXPRESION ')'	            {$$ = new OperAritmeticas($3, $5, 'pow', this._$.first_line,this._$.first_column);}
          | 'sqrt' '(' EXPRESION ')'	    {$$ = new OperAritmeticas($3,null, 'sqrt', this._$.first_line,this._$.first_column);}
          | 'sin' '(' EXPRESION ')'	          {$$ = new OperAritmeticas($3,null, 'sin', this._$.first_line,this._$.first_column);}
          | 'cos' '(' EXPRESION ')'	          {$$ = new OperAritmeticas($3,null, 'cos', this._$.first_line,this._$.first_column);}
          | 'tan' '(' EXPRESION ')'	          {$$ = new OperAritmeticas($3,null, 'tan', this._$.first_line,this._$.first_column);}

          | EXPRESION '<' EXPRESION		    { $$ = new Relacionales($1, $3, '<', this._$.first_line, this._$.first_column); }
          | EXPRESION '>' EXPRESION		    { $$ = new Relacionales($1, $3, '>', this._$.first_line, this._$.first_column); }
          | EXPRESION '>' '=' EXPRESION	    { $$ = new Relacionales($1, $4, '>=', this._$.first_line, this._$.first_column); }
          | EXPRESION '<' '=' EXPRESION	    { $$ = new Relacionales($1, $4, '<=', this._$.first_line, this._$.first_column); }
          | EXPRESION '==' EXPRESION	    { $$ = new Relacionales($1, $3, '==', this._$.first_line, this._$.first_column); }
          | EXPRESION '!=' EXPRESION	    { $$ = new Relacionales($1, $3, '!=', this._$.first_line, this._$.first_column); }
          | EXPRESION '||' EXPRESION	    { $$ = new Logicas($1, $3, '||', this._$.first_line, _$.first_column); }
          | EXPRESION '&&' EXPRESION	    { $$ = new Logicas($1, $3, '&&', this._$.first_line, this._$.first_column); }
          | 'entero'				    {$$ = new Primitivo(new Tipo(Tipos.INT), Number($1), this._$.first_line,this._$.first_column);}
          | 'decimal'				    {$$ = new Primitivo(new Tipo(Tipos.DOUBLE), Number($1), this._$.first_line,this._$.first_column);}
          | identifier			          {$$ = new Identificador($1, this._$.first_line,this._$.first_column);}
          | STRING_LITERAL                    {$$ = new Primitivo(new Tipo(Tipos.STRING), $1.replace(/\"/g,""), this._$.first_line,this._$.first_column); }
          | '(' EXPRESION ')'                 {$$=$2;}
          ;