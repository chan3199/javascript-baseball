import { gameManager } from "../gameManager.js";
import { arrayIsEmpty } from "../utils/helpers.js";
import { main } from "../main.js";

function calculateStat(arr) {
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const avg = (arr.reduce((a, b) => a + b) / arr.length).toFixed(1);
  return { max, min, avg };
}

function getGameIdsByTryCount(gameLogs, target) {
  return gameLogs
    .filter((log) => log.get("tryCount") === target)
    .map((log) => log.get("gameId"));
}

function getWinner(gameLogs) {
  return gameLogs.reduce(
    (acc, log) => {
      if (log.get("winOrLose") === "사용자") {
        acc.playerWin++;
      } else {
        acc.computerWin++;
      }
      return acc;
    },
    { playerWin: 0, computerWin: 0 }
  );
}
export function showData() {
  const gameLogs = gameManager.gameLogs;
  if (arrayIsEmpty(gameLogs)) {
    console.log("기록이 없습니다.");
    return import("./main.js").then(({ main }) => main());
  }

  const tryCounts = gameLogs.map((log) => log.get("tryCount"));
  const winConds = gameLogs.map((log) => log.get("winCondition"));

  const tryStats = calculateStat(tryCounts);
  const winStats = calculateStat(winConds);

  const maxIds = getGameIdsByTryCount(gameLogs, tryStats.max);
  const minIds = getGameIdsByTryCount(gameLogs, tryStats.min);

  const { playerWin, computerWin } = getWinner(gameLogs);

  console.log(`
- 가장 적은 횟수: ${tryStats.min} [${minIds}]
- 가장 많은 횟수: ${tryStats.max} [${maxIds}]
- 평균 횟수: ${tryStats.avg}
- 가장 많이 적용된 승리/패패 횟수: ${winStats.min}
- 가장 적게 적용된 승리/패패 횟수: ${winStats.max}
- 적용된 승리/패패 횟수 평균: ${winStats.avg}
- 사용자 전적: ${playerWin}승 / ${computerWin}패 승률 ${(
    (computerWin / gameLogs.length) *
    100
  ).toFixed(2)}%
- 컴퓨터 전적: ${computerWin}승 /${playerWin}패 승률 ${(
    (playerWin / gameLogs.length) *
    100
  ).toFixed(2)}%
`);
  return main();
}
