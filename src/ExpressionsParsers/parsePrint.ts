import ExpressionNode from "../ASC/ExpressionNode";
import UnarOperationNode from "../ASC/UnarOperationNode";
import { Parser } from "../Parser";
import { tokenTypeList } from "../TokenType";
import parseFormula from "./parseFormula";

// Парсит выражения с выводом строк (Print)
const parsePrint = (parser: Parser): ExpressionNode | void => {
  const operator = parser.match(tokenTypeList.LOG)
  if (operator !== null) {
    return new UnarOperationNode(operator, parseFormula(parser))
  }
}

export default parsePrint