import { IncomingMessage, ServerResponse } from 'http'
import { validToken } from '../data/auth'

export function checkAuth(req: IncomingMessage, res: ServerResponse): boolean {
  const auth = req.headers['authorization']

  if (auth !== `Bearer ${validToken}`) {
    res.writeHead(401, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Unauthorized' }))
    return false
  }

  return true
}
