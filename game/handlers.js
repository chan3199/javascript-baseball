import { gameManager } from "../gameManager.js";
import { giveTime } from "../utils/time.js";
import { retrieveLog } from "./retrieveLog.js";
import { showData } from "./showData.js";

export function handleGameEnd(gameState) {
  const endTime = giveTime();
  gameState.endTime = endTime;

  if (gameState.tryCount <= gameState.winCondition) {
    console.log("사용자가 승리했습니다.");
    gameState.winOrLose = "사용자";
  } else {
    console.log("사용자가 패배했습니다.");
    gameState.winOrLose = "컴퓨터";
  }

  console.log("3개의 숫자를 모두 맞추셨습니다!");
  const gameSave = new Map(Object.entries(gameState));
  gameManager.gameLogs.push(gameSave);
}

export function handleRestartOption(option, rl) {
  import("./gameLoop.js").then(({ gameLoop }) => {
    switch (option) {
      case 1:
        gameLoop(rl);
        break;
      case 2:
        retrieveLog(rl);
        break;
      case 3:
        showData();
        break;
      default:
        console.log("애플리케이션이 종료되었습니다.");
        rl.close();
    }
  });
}
