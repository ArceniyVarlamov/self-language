import BinOperationNode from "../ASC/BinOperationNode";
import ExpressionNode from "../ASC/ExpressionNode"
import { tokenTypeList } from "../TokenType";
import { Parser } from './../Parser';
import parseParentheses from "./parseParentheses";


// Парсит формулы, создаёт дерево (используя своеобразную рекурсию). 
// Формулы подразумевают в себе переменные, цифры, скобки.
// (5 + 9 - ((8 + 3) - 9 + 3))
const parseFormula = (parser: Parser): ExpressionNode => {
  let leftNode = parseParentheses(parser)
  
  let operator = parser.match(tokenTypeList.PLUS, tokenTypeList.MINUS, tokenTypeList.ASSIGNCHECK)
  while (operator !== null) {
    let rightNode = parseParentheses(parser)
    leftNode = new BinOperationNode(operator, leftNode, rightNode)
    operator = parser.match(tokenTypeList.PLUS, tokenTypeList.MINUS, tokenTypeList.ASSIGNCHECK)
  }
  return leftNode
}

export default parseFormula