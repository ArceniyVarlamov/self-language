import BinOperationNode from "./ASC/BinOperationNode";
import ConditionNode from "./ASC/ConditionNode";
import ExpressionNode from "./ASC/ExpressionNode";
import NumberNode from "./ASC/NumberNode";
import StatementsNode from "./ASC/StatementsNode";
import StringNode from "./ASC/StringNode";
import UnarOperationNode from "./ASC/UnarOperationNode";
import VariableNode from "./ASC/VariableNode";
import parseCode from "./ExpressionsParsers/parseCode";
import parseCondition from "./ExpressionsParsers/parseCondition";
import parseExpression from "./ExpressionsParsers/parseExpression";
import parseFormula from "./ExpressionsParsers/parseFormula";
import parseParentheses from "./ExpressionsParsers/parseParentheses";
import parsePrint from "./ExpressionsParsers/parsePrint";
import parseVariableOrNumberOrString from "./ExpressionsParsers/parseVariableOrNumberOrString";
import Token from "./Token";
import { TokenType, tokenTypeList } from "./TokenType";

// Что такое узел (node) 
// Это дерево, которое создаётся на основе parser. Каждый узел дерева
// проходит через функцию и в зависимости от класса к которому он 
// принадлежит (instanse of), выполняется определённое действие.
// В стандартных (компилируемых) языках программирования эти действия
// выполняет сам цп.

export class Parser {
	tokens: Token[];
	pos: number = 0;
	scope: any = {};

	constructor(tokens: Token[]) {
		this.tokens = tokens;
	}

  // Проверка на содержание определённого токена в цепи токенов узла программы
	match(...expected: TokenType[]): Token | null {
		if (this.pos < this.tokens.length) {
			const currToken = this.tokens[this.pos];
			if (expected.find(item => item.name === currToken.type.name)) {
				this.pos += 1;
        return currToken
			}
		}
    return null
	}

  // Проверка на существование, чтобы  всегда возвращался Token
  // Вызывает ошибку если что-то не так
	require(...expected: TokenType[]): Token {
    const token = this.match(...expected)
    if (!token) {
      throw new Error(`Expected ${expected[0].name} at position: ${this.pos}`);
    }
    return token
  }

  run(node: ExpressionNode): any {
    if (node instanceof ConditionNode) {
      if (this.run(node.condition)) {
        this.run(node.thenBrench)
      }
      return
    }

    if (node instanceof StatementsNode) {
      node.codeStrings.forEach(codeString => {
          this.run(codeString);
      })
      return;
    }

    if (node instanceof NumberNode) {
      return parseInt(node.number.text)
    }

    if (node instanceof StringNode) {
      return node.string.text.toString()
    }

    if (node instanceof BinOperationNode) {
      switch (node.operator.type.name) {
        case tokenTypeList.ASSIGN.name:
          const leftSide = <VariableNode>node.leftNode
          const rightSide = this.run(node.rightNode)

          this.scope[leftSide.variable.text] = rightSide;
          return rightSide
        case tokenTypeList.MINUS.name:
          return this.run(node.leftNode) - this.run(node.rightNode)
        case tokenTypeList.PLUS.name:
          return this.run(node.leftNode) + this.run(node.rightNode)
        case tokenTypeList.ASSIGNCHECK.name:
          if (this.run(node.leftNode) == this.run(node.rightNode)) {
            return this.run(node.leftNode)
          } else {
            return false
          }
      }
    }

    if (node instanceof VariableNode) {
      if (this.scope[node.variable.text]) {
        return this.scope[node.variable.text]
      } else {
        throw new Error(`No such variable: ${node.variable.text}`);
      }
    }
    
    if (node instanceof UnarOperationNode) {
      switch (node.operator.type.name) {
        case tokenTypeList.LOG.name:
          console.log(this.run(node.operand));
          return
      }
    }
    throw new Error("Error");
    
  }
}
