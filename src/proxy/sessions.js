export const sessions = {
  list: {},
  remove(hash) {
    delete this.list[hash]
  },
  create(user) {
    const hash =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    this.list[hash] = user

    return hash
  },
}
