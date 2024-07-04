import BinOperationNode from "../ASC/BinOperationNode";
import ExpressionNode from "../ASC/ExpressionNode";
import { tokenTypeList } from "../TokenType";
import { Parser } from "./../Parser";
import parseParentheses from "./parseParentheses";

// Парсит формулы, создаёт дерево (используя своеобразную рекурсию).
// Формулы подразумевают в себе переменные, цифры, скобки и т.д.
const parseFormula = (parser: Parser): ExpressionNode => {
	let leftNode = parseParentheses(parser);

	let operator = parser.match(
		tokenTypeList.PLUS,
		tokenTypeList.MINUS,
		tokenTypeList.ASSIGNCHECK,
    tokenTypeList.GREATER,
    tokenTypeList.GREATEROREQUAL,
    tokenTypeList.LESS,
    tokenTypeList.LESSOREQUAL,
		tokenTypeList.AND,
		tokenTypeList.OR
	);
	while (operator !== null) {
		let rightNode = parseParentheses(parser);
		leftNode = new BinOperationNode(operator, leftNode, rightNode);
		operator = parser.match(
			tokenTypeList.PLUS,
		  tokenTypeList.MINUS,
		  tokenTypeList.ASSIGNCHECK,
      tokenTypeList.GREATER,
      tokenTypeList.GREATEROREQUAL,
      tokenTypeList.LESS,
      tokenTypeList.LESSOREQUAL,
			tokenTypeList.AND,
			tokenTypeList.OR
		);
	}
	return leftNode;
};

export default parseFormula;
