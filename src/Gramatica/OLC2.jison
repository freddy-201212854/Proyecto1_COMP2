%{
    const { Excepcion } = require('../Utilidades/Exception');
    const { Tipo, Tipos } = require('../Utilidades/Tipo');
    const { Arbol } = require('../Simbolos/Arbol');
    const { Main } = require('../Instrucciones/Main');
    const { Declaracion } = require('../Instrucciones/Declaracion');
    const { Asignacion } = require('../Instrucciones/Asignacion');
    const { Primitivo } = require('../Expresiones/Primitivo');
%}

%lex
%options case-insensitive
entero [0-9]+
decimal {entero}("."{entero})?
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
            | PRINT
            ;

MAIN : 'main' '(' ')' BLOQUE_INSTRUCCIONES {$$ = new Main($4, _$.first_line, _$.first_column);}
     ;

TIPO : 'string' {$$ = new Tipo(Tipos.STRING);}
     | 'boolean' {$$ = new Tipo(Tipos.BOOLEAN);}
     | 'int' {$$ = new Tipo(Tipos.NUMERIC);}
     | 'double' {$$ = new Tipo(Tipos.DOUBLE);}
     | 'char' {$$ = new Tipo(Tipos.CHAR);}
     | 'null' {$$ = new Tipo(Tipos.NULL);}
     ;

DECLARACION : TIPO identifier '=' EXPRESION ';' {$$ = new Declaracion($1, $2, $4, _$.first_line, _$.first_column);}
            ;

ASIGNACION : identifxier '=' EXPRESION ';' {$$ = new Asignacion($1, $3, _$.first_line, _$.first_column);}
           ;

PRINT : 'print' '(' EXPRESION ')' ';' {console.log("LLego a PRINT", $3);}
        |'print' '(' EXPRESION ')' {console.log("LLego a PRINT", $3);}
        ;

BLOQUE_INSTRUCCIONES : '{' INSTRUCCIONES '}' {$$ = $2;}
                     | '{' '}' {$$ = [];}
                     ;

EXPRESION : EXPRESION '+' EXPRESION		    
          | EXPRESION '-' EXPRESION		    
          | EXPRESION '*' EXPRESION		   
          | EXPRESION '/' EXPRESION	         
          | 'decimal'				    {$$ = new Primitivo(new Tipo(Tipos.NUMERIC), Number($1), _$.first_line, _$.first_column);}
          | identifier			          
          | '(' EXPRESION ')'
          ;
