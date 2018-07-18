export default hand => {
  const points= hand.map(card => (card.number > 10 ? 10 : card.number))
  const sum = points.reduce((ret, cur) => ret + cur)

  if (20 > sum && sum > 9) {
    return sum - 10
  }

  if (sum >= 20) {
    return sum -20
  }

  return sum
}
