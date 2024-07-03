// Корневой узел, который хранит строки кода

import ExpressionNode from "./ExpressionNode";

export default class StatementsNode extends ExpressionNode {
  codeStrings: ExpressionNode[] = [];

  addNode(code: ExpressionNode): void {
    this.codeStrings.push(code)
  }
}