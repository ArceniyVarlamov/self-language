import Token from "./Token";
import { tokenTypeList } from "./TokenType";

export default class Lexer {
	code: string;
	pos: number = 0;
	tokenList: Token[] = [];

	constructor(code: string) {
		this.code = code;
	}

	lexAnalysis(): Token[] {
		while (this.nextToken()) {}
		this.tokenList = this.tokenList.filter(
			(token) => token.type.name !== tokenTypeList.SPACE.name,
		);
		return this.tokenList;
	}

	nextToken(): boolean {
		if (this.pos >= this.code.length) {
			return false;
		}
		const tokenTypesValues = Object.values(tokenTypeList);
		for (let tokenType of tokenTypesValues) {
			let regex = new RegExp(`^${tokenType.regex}`)
      const result = this.code.substring(this.pos).match(regex);
			
			if (result && result[0]) {
				let token;
				if (tokenType === tokenTypeList.STRING) {
					token = new Token(tokenType, result[0].slice(1, -1), this.pos)
				} else {
					token = new Token(tokenType, result[0], this.pos)
				}
				this.pos += result[0].length;
				this.tokenList.push(token);
				return true;
			}
		}
		throw new Error(`Error at position: ${this.pos}`);
	}
}
