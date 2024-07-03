import BinOperationNode from "./ASC/BinOperationNode";
import ExpressionNode from "./ASC/ExpressionNode";
import NumberNode from "./ASC/NumberNode";
import StatementsNode from "./ASC/StatementsNode";
import UnarOperationNode from "./ASC/UnarOperationNode";
import VariableNode from "./ASC/VariableNode";
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
      throw new Error(`Expected ${expected} at position: ${this.pos}`);
    }
    return token
  }

  // Парсит каждую строку кода (до ;)
  parseCode(): ExpressionNode {
    // Переменная, в которой хранятся строчки кода (до разделителя ;)
    const root = new StatementsNode()
    while (this.pos < this.tokens.length) {
      const codeStringNode = this.parseExpression()
      this.require(tokenTypeList.SEMICOLON)
      root.addNode(codeStringNode)
    }
    return root
  }

  // Парсит (проверят) строчку кода
  // Здесь и находится вся логика языка программирования
  parseExpression(): ExpressionNode {
    // Если не переменная, то возможно только LOG в начале
    if (this.match(tokenTypeList.VARIABLE) == null) {
      const printNode = this.parsePrint()
      return printNode
    }
    // Если всё же переменная, то сдвигаем позицию на 1 влево, т.к. match сдвинул
    // её вправо, а нам нужно записать эту переменную
    this.pos -= 1
    // Записали переменную (можно и число, но это ни на что не повлияет)
    const variableNode = this.parseVariableOrNumber()
    // Находим знак =
    const assignOperator = this.match(tokenTypeList.ASSIGN)
    if (assignOperator != null) {
      // Парсим правый операнд (формула)
      const rightFormulaNode = this.parseFormula()
      // Записываем узел как бинарную операцию (с 2 операндами и оператором)
      const binaryNode = new BinOperationNode(assignOperator, variableNode, rightFormulaNode)
      return binaryNode
    }
    // Иначе всплывает ошибка
    throw new Error(`Expected assign operator at position: ${this.pos}`);
  }

  // Парсит переменные или числа
  parseVariableOrNumber(): ExpressionNode {
    const number = this.match(tokenTypeList.NUMBER)
    if (number != null) {
      return new NumberNode(number)
    }
    const variable = this.match(tokenTypeList.VARIABLE)
    if (variable != null) {
      return new VariableNode(variable)
    }
    throw new Error(`Expected number or variable at position: ${this.pos}`);
  }

  // Парсит формулы, создаёт дерево (используя своеобразную рекурсию). 
  // Формулы подразумевают в себе переменные, цифры, скобки.
  parseFormula(): ExpressionNode {
    let leftNode = this.parseParentheses()
    let operator = this.match(tokenTypeList.PLUS, tokenTypeList.MINUS)
    while (operator != null) {
      let rightNode = this.parseParentheses()
      leftNode = new BinOperationNode(operator, leftNode, rightNode)
      operator = this.match(tokenTypeList.PLUS, tokenTypeList.MINUS)
    }
    return leftNode
  }

  // Парсит выражения в скобках
  parseParentheses(): ExpressionNode {
    if (this.match(tokenTypeList.LPAR) != null) {
      const node = this.parseFormula()
      this.require(tokenTypeList.RPAR)
      return node
    } else {
      return this.parseVariableOrNumber()
    }
  }

  // Парсит выражения с выводом строк (Print)
  parsePrint(): ExpressionNode {
    const operator = this.match(tokenTypeList.LOG)
    if (operator != null) {
      return new UnarOperationNode(operator, this.parseFormula())
    }
    throw new Error(`Expected unar operator at position: ${this.pos}`);
  }

  run(node: ExpressionNode): any {
    if (node instanceof StatementsNode) {
      node.codeStrings.forEach(codeString => {
          this.run(codeString);
      })
      return;
    }

    if (node instanceof NumberNode) {
      return parseInt(node.number.text)
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
