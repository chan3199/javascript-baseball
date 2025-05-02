import readline from "readline";
import {
  GAME_START_NUMBER,
  GAME_LOG_NUMBER,
  GAME_DATA_NUMBER,
  GAME_END_NUMBER,
} from "./constants.js";
import { gameLoop } from "./game/gameLoop.js";
import { retrieveLog } from "./game/retrieveLog.js";
import { showData } from "./game/showData.js";

export function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "게임을 새로 시작하려면 1, 기록을 보려면 2, 통계를 보려면 3, 종료하려면 9을 입력하세요. ",
    (answer) => {
      answer = parseInt(answer);
      switch (answer) {
        case GAME_START_NUMBER:
          console.log("게임을 시작합니다 !");
          gameLoop(rl);
          break;
        case GAME_LOG_NUMBER:
          retrieveLog(rl);
          break;
        case GAME_DATA_NUMBER:
          showData(rl);
          break;
        case GAME_END_NUMBER:
        default:
          console.log("애플리케이션이 종료되었습니다.");
          rl.close();
          break;
      }
    }
  );
}

main();
