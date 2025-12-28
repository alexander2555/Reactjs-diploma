export const throttle = async delay =>
  await new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
