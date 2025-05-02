import { getRandom } from "../logic/random.js";
import { askToRestart, askToWinCondition, userInput } from "../logic/input.js";
import { compareNumber } from "../logic/compare.js";
import { isValidGuess, shouldExit } from "../utils/helpers.js";
import { THREE_STRIKE } from "../constants.js";
import { gameManager } from "../gameManager.js";
import { handleGameEnd, handleRestartOption } from "./handlers.js";
import { printResult } from "../utils/result.js";
import { giveTime } from "../utils/time.js";

export async function gameLoop(rl) {
  const computerAnswer = getRandom();
  const winCondition = await askToWinCondition(rl);
  const startTime = giveTime();

  const gameState = {
    gameId: ++gameManager.gameId,
    tryCount: 0,
    resultLogs: [],
    startTime,
    endTime: "",
    winCondition,
    winOrLose: "",
  };

  await playTurn(rl, computerAnswer, gameState);
}

async function playTurn(rl, computerAnswer, gameState) {
  const input = await userInput(rl);
  if (shouldExit(input)) return rl.close();

  const userAnswer = input.map(Number);
  if (!isValidGuess(userAnswer)) {
    console.log("1부터 9까지의 수를 3개 입력해 주세요.");
    return playTurn(rl, computerAnswer, gameState);
  }
  console.log(computerAnswer);
  const { strike, ball } = compareNumber(userAnswer, computerAnswer);
  gameState.tryCount++;

  const tryResult = printResult({ strike, ball });
  gameState.resultLogs.push([userAnswer, tryResult]);
  console.log(tryResult);

  if (strike === THREE_STRIKE) {
    handleGameEnd(gameState);
    const restartOption = await askToRestart(rl);
    handleRestartOption(restartOption, rl);
  } else {
    playTurn(rl, computerAnswer, gameState);
  }
}
