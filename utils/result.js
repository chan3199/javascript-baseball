import { EMPTY_NUMBER } from "../constants.js";

export function printResult({ strike, ball }) {
  if (strike === EMPTY_NUMBER && ball === EMPTY_NUMBER) {
    return "Nothing";
  }
  return `${strike}스트라이크 ${ball}볼`;
}
