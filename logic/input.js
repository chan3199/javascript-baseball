export function userInput(rl) {
  return new Promise((resolve) => {
    rl.question("숫자를 입력해 주세요 : ", (input) => {
      resolve(input.split(""));
    });
  });
}

export function askToRestart(rl) {
  return new Promise((resolve) => {
    rl.question(
      "새 게임을 시작하려면 1, 기록을 보려면 2, 통계를 보려면 3, 종료하려면 9를 입력하세요: ",
      (input) => {
        resolve(parseInt(input.trim()));
      }
    );
  });
}

export function askToWinCondition(rl) {
  return new Promise((resolve) => {
    rl.question(
      "컴퓨터한테 승리하기 위해 몇 번만에 성공해야 하나요? : ",
      (input) => {
        resolve(parseInt(input.trim()));
      }
    );
  });
}
