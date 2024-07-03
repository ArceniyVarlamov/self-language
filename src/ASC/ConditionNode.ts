import Token from "../Token";
import ExpressionNode from "./ExpressionNode";

export default class ConditionNode extends ExpressionNode {
  brenchOperator: Token;
	condition: ExpressionNode;
  doOperator: Token;
	thenBrench: ExpressionNode;

	constructor(
		brenchOperator: Token,
		condition: ExpressionNode,
    doOperator: Token,
		thenBrench: ExpressionNode,
	) {
		super();
		this.brenchOperator = brenchOperator;
		this.condition = condition;
    this.doOperator = doOperator;
    this.thenBrench = thenBrench;
	}
}
