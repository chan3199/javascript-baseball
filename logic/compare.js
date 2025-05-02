export function compareStrike(user, computer) {
  return user.filter((num, i) => num === computer[i]).length;
}

export function compareBall(user, computer) {
  return user.filter((num, i) => num !== computer[i] && computer.includes(num))
    .length;
}

export function compareNumber(user, computer) {
  const strike = compareStrike(user, computer);
  const ball = compareBall(user, computer);
  return { strike, ball };
}
