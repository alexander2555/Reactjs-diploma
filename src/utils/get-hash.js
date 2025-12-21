export const getHash = l =>
  Math.random()
    .toString(l + 4)
    .substring(2, l + 2) +
  Math.random()
    .toString(l + 4)
    .substring(4, l + 4)
