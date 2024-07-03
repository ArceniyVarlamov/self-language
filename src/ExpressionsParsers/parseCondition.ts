import ExpressionNode from "../ASC/ExpressionNode";
import { Parser } from "../Parser";
import { tokenTypeList } from "../TokenType";
import parseFormula from "./parseFormula";
import parseExpression from "./parseExpression";
import ConditionNode from "../ASC/ConditionNode";

// if var + 5 == (var2 == var3)
const parseCondition = (parser: Parser): ExpressionNode | void => {
	const conditionOperator = parser.match(tokenTypeList.IF);
	if (conditionOperator !== null) {
		const condition = parseFormula(parser);
		const doOperator = parser.require(tokenTypeList.DO);
		const thenBrench = parseExpression(parser);
    return new ConditionNode(conditionOperator, condition, doOperator, thenBrench)
	}
};

export default parseCondition;
