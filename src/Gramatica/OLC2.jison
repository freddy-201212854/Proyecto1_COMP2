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
%}

%lex
%options case-insensitive
entero [0-9]+
decimal {entero}"."{entero}
stringliteral (\"[^"]*\")
identifier ([a-zA-Z_])[a-zA-Z0-9_]*
%%

\s+                   /* skip whitespace */

{decimal}             return 'decimal' 
{entero}              return 'entero' 
{stringliteral}       return 'STRING_LITERAL'
"*"                   return '*'
"/"                   return '/'
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
"true"                return 'true'
"false"               return 'false'
"print"               return 'print'
"println"             return 'println'
"if"                  return 'if'
"else"                return 'else'
"break"               return 'break'
"continue"            return 'continue'
"while"               return 'while'
"main"                return 'main'
"numeric"             return 'numeric'
"string"              return 'string'
"boolean"             return 'boolean'
"int"                 return 'int'
"null"                return 'null'
"double"              return 'double'
"char"                return 'char'
{identifier}          return 'identifier'

<<EOF>>	          return 'EOF'

/lex
%left 'else'
%left '||'
%left '&&'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/'
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
            ;

MAIN : 'main' '(' ')' BLOQUE_INSTRUCCIONES {$$ = new Main($4, _$.first_line, _$.first_column);}
     ;

TIPO : 'string' {$$ = new Tipo(Tipos.STRING);}
     | 'boolean' {$$ = new Tipo(Tipos.BOOLEAN);}
     | 'int' {$$ = new Tipo(Tipos.INT);}
     | 'double' {$$ = new Tipo(Tipos.DOUBLE);}
     | 'char' {$$ = new Tipo(Tipos.CHAR);}
     | 'null' {$$ = new Tipo(Tipos.NULL);}
     ;

DECLARACION : TIPO identifier '=' EXPRESION ';' {$$ = new Declaracion($1, [$2], $4, _$.first_line, _$.first_column);}
            | TIPO LISTA_VAR ';' {$$ = new Declaracion($1, $2, new Primitivo($1, null, _$.first_line, _$.first_column), _$.first_line, _$.first_column);}
            ;

LISTA_VAR : LISTA_VAR ',' identifier      {$$.push($3);}
            | identifier                  {$$ = [$1];}
            ;

ASIGNACION : identifier '=' EXPRESION ';' {$$ = new Asignacion($1, $3, _$.first_line, _$.first_column);}
           ;

PRINT : 'print' '(' EXPRESION ')' ';' {$$ = new Print($3, _$.first_line, _$.first_column);}
      ;

PRINTLN : 'println' '(' EXPRESION ')' ';' {$$ = new Println($3, _$.first_line, _$.first_column);}
        ;

WHILE : 'while' CONDICION BLOQUE_INSTRUCCIONES {$$ = new While($2, $3, _$.first_line, _$.first_column);}
      ;



CONDICION : '(' EXPRESION ')' {$$ = $2;}
          ;

BLOQUE_INSTRUCCIONES : '{' INSTRUCCIONES '}' {$$ = $2;}
                     | '{' '}' {$$ = [];}
                     ;

EXPRESION : EXPRESION '+' EXPRESION		    
          | EXPRESION '-' EXPRESION		    
          | EXPRESION '*' EXPRESION		   
          | EXPRESION '/' EXPRESION	         
          | 'entero'				    {$$ = new Primitivo(new Tipo(Tipos.INT), Number($1), _$.first_line, _$.first_column);}
          | 'decimal'				    {$$ = new Primitivo(new Tipo(Tipos.DOUBLE), Number($1), _$.first_line, _$.first_column);}
          | identifier			            {$$ = new Identificador($1, _$.first_line, _$.first_column);}
          | STRING_LITERAL			    {$$ = new Primitivo(new Tipo(Tipos.STRING), $1.replace(/\"/g,""), _$.first_line, _$.first_column); }
          | '(' EXPRESION ')'
          ;
