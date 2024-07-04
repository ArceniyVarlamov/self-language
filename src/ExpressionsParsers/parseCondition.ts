import ExpressionNode from "../ASC/ExpressionNode";
import { Parser } from "../Parser";
import { tokenTypeList } from "../TokenType";
import parseFormula from "./parseFormula";
import parseExpression from "./parseExpression";
import ConditionNode from "../ASC/ConditionNode";

// if var + 5 == (var2 == var3)
const parseCondition = (parser: Parser): ExpressionNode | void => {
	const conditionOperator = parser.match(tokenTypeList.IF);
	let elifBrenches: ConditionNode[] = [];
	if (conditionOperator !== null) {
		const condition = parseFormula(parser);
		parser.require(tokenTypeList.DO);
		const thenBrench = parseExpression(parser);
		let elifOperator = parser.match(tokenTypeList.ELIF);
		while (elifOperator !== null) {
			const elifCondition = parseFormula(parser);
			parser.require(tokenTypeList.DO);
			const elifThenBrench = parseExpression(parser);
			elifBrenches.push(
				new ConditionNode(
					elifOperator,
					elifCondition,
					elifThenBrench,
				),
			);
			elifOperator = parser.match(tokenTypeList.ELIF);
		}
		const elseOperator = parser.match(tokenTypeList.ELSE);
		let elseThenBrench;
		if (elseOperator !== null) {
			parser.require(tokenTypeList.DO);
			elseThenBrench = parseExpression(parser);
		}
		return new ConditionNode(
			conditionOperator,
			condition,
			thenBrench,
			elifBrenches,
			elseThenBrench
		);
	}
};

export default parseCondition;
