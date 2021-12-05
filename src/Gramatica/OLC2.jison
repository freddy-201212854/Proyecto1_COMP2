%{

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
"numeric"             return 'numeric'
"string"              return 'string'
"boolean"             return 'boolean'
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

INICIO : INSTRUCCIONES EOF
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION
              | INSTRUCCION              
              ;

INSTRUCCION : PRINT
            ;

PRINT : 'print' '(' EXPRESION ')' ';' { console.log("LLego a PRINT", $3); }
        |'print' '(' EXPRESION ')' { console.log("LLego a PRINT", $3); }
        ;
      
EXPRESION : EXPRESION '+' EXPRESION		    
          | EXPRESION '-' EXPRESION		    
          | EXPRESION '*' EXPRESION		   
          | EXPRESION '/' EXPRESION	         
          | 'decimal'				    
          | identifier			          
          | '(' EXPRESION ')'
          ;
