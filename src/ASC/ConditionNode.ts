import Token from "../Token";
import ExpressionNode from "./ExpressionNode";

export default class ConditionNode extends ExpressionNode {
  brenchOperator: Token;
	condition: ExpressionNode;
	thenBrench: ExpressionNode;
	elifBrenches?: ConditionNode[];
	elseBrench?: ExpressionNode;
	isElse: boolean = true;

	constructor(
		brenchOperator: Token,
		condition: ExpressionNode,
		thenBrench: ExpressionNode,
		elifBrenches?: ConditionNode[],
		elseBrench?: ExpressionNode,
	) {
		super();
		this.brenchOperator = brenchOperator;
		this.condition = condition;
    this.thenBrench = thenBrench;
		this.elifBrenches = elifBrenches;
		this.elseBrench = elseBrench;
	}
}
