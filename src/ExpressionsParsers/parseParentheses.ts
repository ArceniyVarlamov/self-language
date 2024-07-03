import ExpressionNode from "../ASC/ExpressionNode"
import { Parser } from "../Parser"
import { tokenTypeList } from "../TokenType"
import parseFormula from "./parseFormula";
import parseVariableOrNumberOrString from './parseVariableOrNumberOrString';


// Парсит выражения в скобках
const parseParentheses = (parser: Parser): ExpressionNode => {
  if (parser.match(tokenTypeList.LPAR) !== null) {
    const node = parseFormula(parser)
    parser.require(tokenTypeList.RPAR)
    return node
  } else {
    return parseVariableOrNumberOrString(parser)
  }
}

export default parseParentheses