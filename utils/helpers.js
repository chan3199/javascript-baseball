import {
  BASEBALL_ANSWER_LENGTH,
  BASEBALL_ANSWER_MIN,
  BASEBALL_ANSWER_MAX,
  EMPTY_NUMBER,
  LEAVE_IN_THE_MIDDLE_LENGTH,
  LEAVE_IN_THE_MIDDLE_NUMBER,
} from "../constants.js";

export function arrayIsEmpty(arr) {
  return arr.length === EMPTY_NUMBER;
}

export function isValidGuess(user) {
  return (
    user.length === BASEBALL_ANSWER_LENGTH &&
    user.every((n) => n >= BASEBALL_ANSWER_MIN && n <= BASEBALL_ANSWER_MAX)
  );
}

export function shouldExit(input) {
  const singleNumber = Number(input[0]);
  return (
    input.length === LEAVE_IN_THE_MIDDLE_LENGTH &&
    singleNumber === LEAVE_IN_THE_MIDDLE_NUMBER
  );
}
