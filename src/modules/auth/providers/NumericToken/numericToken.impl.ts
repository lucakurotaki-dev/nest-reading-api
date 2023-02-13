import { INumericToken } from './numericToken.interface';

export class NumericTokenImpl implements INumericToken {
  generateNumericTokenWith5digits(): string {
    const numericToken = String(
      Math.abs(Math.floor(Math.random() * 99999) - 10000),
    );

    const lengthDiference = 5 - numericToken.length;

    return lengthDiference > 0
      ? '0'.repeat(lengthDiference) + numericToken
      : numericToken;
  }
}
