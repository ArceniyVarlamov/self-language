import Token from "../Token";
import ExpressionNode from "./ExpressionNode";

export default class StringNode extends ExpressionNode {
  string: Token;

  constructor(string: Token) {
    super()
    this.string = string
  }
}