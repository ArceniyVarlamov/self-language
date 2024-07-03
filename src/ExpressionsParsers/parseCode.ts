import ExpressionNode from "../ASC/ExpressionNode"
import StatementsNode from "../ASC/StatementsNode"
import { Parser } from "../Parser"
import { tokenTypeList } from "../TokenType"
import parseExpression from "./parseExpression"

const parseCode = (parser: Parser): ExpressionNode => {
  // Переменная, в которой хранятся строчки кода (до разделителя ;)
  const root = new StatementsNode()
  while (parser.pos < parser.tokens.length) {
    const codeStringNode = parseExpression(parser)
    parser.require(tokenTypeList.SEMICOLON)
    root.addNode(codeStringNode)
  }
  return root
}

export default parseCode