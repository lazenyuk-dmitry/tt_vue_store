import type { IncomingMessage } from 'http'

export async function parseRawRequest(req: IncomingMessage) {
  let reqbody = ''

  await new Promise((resolve) => {
    req.on('data', (chunk: string) => {
      reqbody += chunk
    })
    req.on('end', () => resolve(undefined))
  })

  return JSON.parse(reqbody)
}

export function getRandomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
