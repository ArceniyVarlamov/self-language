import Lexer from "./Lexer";
import { Parser } from "./Parser";


const code =
`
var = 5 - 9;
varr = 0 - 6;
LOG var;
LOG varr;
LOG var - varr + ( 5 + 3 );
`

const lexer = new Lexer(code);

lexer.lexAnalysis()
console.log('----------------------------------------');
console.log(lexer.tokenList);
console.log('----------------------------------------');

const parser = new Parser(lexer.tokenList);

const rootNode = parser.parseCode()

parser.run(rootNode);
