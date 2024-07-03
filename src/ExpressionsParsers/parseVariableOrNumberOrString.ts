import ExpressionNode from "../ASC/ExpressionNode"
import NumberNode from "../ASC/NumberNode"
import StringNode from "../ASC/StringNode"
import VariableNode from "../ASC/VariableNode"
import { Parser } from "../Parser"
import { tokenTypeList } from "../TokenType"

// Парсит переменные или числа
const parseVariableOrNumberOrString = (parser: Parser): ExpressionNode =>  {
  
  const number = parser.match(tokenTypeList.NUMBER)
  if (number !== null) {
    return new NumberNode(number)
  }
  const variable = parser.match(tokenTypeList.VARIABLE)
  if (variable !== null) {
    return new VariableNode(variable)
  }
  const string = parser.match(tokenTypeList.STRING)
  if (string !== null) {
    return new StringNode(string)
  }
  throw new Error(`Expected number or variable at position: ${parser.pos}`);
}

export default parseVariableOrNumberOrString