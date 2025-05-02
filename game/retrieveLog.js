import { gameManager } from "../gameManager.js";
import { END_NUMBER } from "../constants.js";
import { arrayIsEmpty } from "../utils/helpers.js";
import { main } from "../main.js";

function getGameLog(gameLogs) {
  return gameLogs
    .map(
      (log) =>
        `[${log.get("gameId")}] / 시작: ${log.get(
          "startTime"
        )} / 종료: ${log.get("endTime")} / 횟수: ${log.get(
          "tryCount"
        )} / 승리자: ${log.get("winOrLose")}`
    )
    .join("\n");
}

function getDetailGameLog(resultLogs) {
  return resultLogs
    .map(
      ([tryLog, tryResult]) =>
        `숫자를 입력해주세요 : ${tryLog.join(",")}\n${tryResult}`
    )
    .join("\n");
}

export function retrieveLog(rl) {
  const gameLogs = gameManager.gameLogs;
  if (arrayIsEmpty(gameLogs)) {
    console.log("저장된 게임 기록이 없습니다.");
    return main();
  }

  console.log(getGameLog(gameLogs));

  rl.question("확인할 게임 번호를 입력하세요 (종료: 0) : ", (input) => {
    const index = parseInt(input);
    if (index === END_NUMBER) return main();

    if (isNaN(index) || index < 1 || index > gameLogs.length) {
      console.log("존재하지 않는 게임 번호입니다. 다시 입력해주세요.");
      return retrieveLog(rl);
    }
    const resultLogs = gameLogs[index - 1].get("resultLogs");
    console.log(
      `${index}번 게임 결과\n${getDetailGameLog(
        resultLogs
      )}\n-------기록 종료-------\n`
    );
    retrieveLog(rl);
  });
}
