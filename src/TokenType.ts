export class TokenType {
  name: string;
  regex: string;

  constructor(name: string, regex: string) {
    this.name = name
    this.regex = regex
  }
}

export const tokenTypeList = {
  'LPAR': new TokenType('LPAR', '\\('),
  'RPAR': new TokenType('RPAR', '\\)'),
  'GREATEROREQUAL': new TokenType('GREATEROREQUAL', '\\>='),
  'LESSOREQUAL': new TokenType('LESSOREQUAL', '\\<='),
  'GREATER': new TokenType('GREATER', '\\>'),
  'LESS': new TokenType('LESS', '\\<'),
  'STRING': new TokenType('STRING', '"[a-z | 0-9]*"'),
  'ASSIGNCHECK': new TokenType('ASSIGNCHECK', '\\=='),
  'IF': new TokenType('IF', 'if '),
  'DO': new TokenType('DO', '\\:'),
  'LOG': new TokenType('LOG', 'log'),
  'NUMBER': new TokenType('NUMBER', '[0-9]*'),
  'VARIABLE': new TokenType('VARIABLE', '[a-z]*'),
  'SEMICOLON': new TokenType('SEMICOLON', ';'),
  'SPACE': new TokenType('SPACE', '[ \\n\\t\\r]'),
  'ASSIGN': new TokenType('ASSIGN', '\\='),
  'PLUS': new TokenType('PLUS', '\\+'),
  'MINUS': new TokenType('MINUS', '\\-'),
}
