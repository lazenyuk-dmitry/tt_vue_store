export function randomDelay(min = 500, max = 2000) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function randomDelayPromise(min = 500, max = 2000) {
  const ms = randomDelay(min, max)
  return delay(ms)
}
