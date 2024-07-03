import BinOperationNode from "../ASC/BinOperationNode";
import ExpressionNode from "../ASC/ExpressionNode";
import { Parser } from "../Parser";
import { tokenTypeList } from "../TokenType";
import parseFormula from "./parseFormula";
import parseVariableOrNumberOrString from "./parseVariableOrNumberOrString";


const parseVariableDefinition = (parser: Parser): ExpressionNode | void => {
  if (parser.match(tokenTypeList.VARIABLE) !== null) {
    parser.pos -= 1
    const variable = parseVariableOrNumberOrString(parser)
		const assignOperator = parser.match(tokenTypeList.ASSIGN);
		if (assignOperator !== null) {
			const rightFormulaNode = parseFormula(parser);
			const binaryNode = new BinOperationNode(
				assignOperator,
				variable,
				rightFormulaNode,
			);
			return binaryNode;
		}
	}
}

export default parseVariableDefinition