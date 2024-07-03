import BinOperationNode from "../ASC/BinOperationNode";
import ExpressionNode from "../ASC/ExpressionNode";
import { Parser } from "../Parser";
import { tokenTypeList } from "../TokenType";
import parseCondition from "./parseCondition";
import parseFormula from "./parseFormula";
import parsePrint from "./parsePrint";
import parseVariableDefinition from "./parseVariableDefinition";
import parseVariableOrNumberOrString from "./parseVariableOrNumberOrString";


// Парсит (проверят) строчку кода
// Здесь и находится вся логика языка программирования
const parseExpression = (parser: Parser): ExpressionNode => {
	// Парсинг определения переменной
	const binaryNode = parseVariableDefinition(parser)
	if (binaryNode) {
		return binaryNode
	}
	// Парсинг вывода в консоль
	const printNode = parsePrint(parser);
	if (printNode) {
		return printNode;
	}

	const conditionNode = parseCondition(parser)
	if (conditionNode) {
		return conditionNode
	}

	throw new Error(`Unexpected expression at position: ${parser.pos}`);
};

export default parseExpression;
