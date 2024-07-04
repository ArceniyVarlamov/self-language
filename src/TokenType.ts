export class TokenType {
  name: string;
  regex: string;

  constructor(name: string, regex: string) {
    this.name = name
    this.regex = regex
  }
}

export const tokenTypeList = {
  'ELSE': new TokenType('ELSE', 'else\\b(?=\\s*:)'),
  'ELIF': new TokenType('ELIF', 'elif '),
  'IF': new TokenType('IF', 'if '),
  'AND': new TokenType('AND', 'and '),
  'OR': new TokenType('OR', 'or '),
  'LOG': new TokenType('LOG', 'log'),
  'LPAR': new TokenType('LPAR', '\\('),
  'RPAR': new TokenType('RPAR', '\\)'),
  'GREATEROREQUAL': new TokenType('GREATEROREQUAL', '\\>='),
  'LESSOREQUAL': new TokenType('LESSOREQUAL', '\\<='),
  'GREATER': new TokenType('GREATER', '\\>'),
  'LESS': new TokenType('LESS', '\\<'),
  'STRING': new TokenType('STRING', '"[a-z | 0-9]*"'),
  'ASSIGNCHECK': new TokenType('ASSIGNCHECK', '\\=='),
  'DO': new TokenType('DO', '\\:'),
  'NUMBER': new TokenType('NUMBER', '[0-9]*'),
  'VARIABLE': new TokenType('VARIABLE', '[a-z]*'),
  'SEMICOLON': new TokenType('SEMICOLON', ';'),
  'SPACE': new TokenType('SPACE', '[ \\n\\t\\r]'),
  'ASSIGN': new TokenType('ASSIGN', '\\='),
  'PLUS': new TokenType('PLUS', '\\+'),
  'MINUS': new TokenType('MINUS', '\\-'),
}
