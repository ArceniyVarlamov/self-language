import parseCode from "./ExpressionsParsers/parseCode";
import Lexer from "./Lexer";
import { Parser } from "./Parser";


const code =
`
var = 2;
if 2 == 2 == var: log "4";
`

const lexer = new Lexer(code);

lexer.lexAnalysis()
console.log('----------------------------------------');
console.log(lexer.tokenList);
console.log('----------------------------------------');

const parser = new Parser(lexer.tokenList);

const rootNode = parseCode(parser)

parser.run(rootNode);
