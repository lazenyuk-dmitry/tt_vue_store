import type { IncomingMessage, ServerResponse } from 'http'
import { parseRawRequest } from './utils'
import { validToken } from './data/auth'

export default [
  {
    url: '/api/login',
    method: 'post',
    rawResponse: async (req: IncomingMessage, res: ServerResponse) => {
      const redData = await parseRawRequest(req)
      const { email, password } = redData

      res.setHeader('Content-Type', 'application/json')

      if (email === 'test@test.com' && password === '123456') {
        res.statusCode = 200
        res.end(
          JSON.stringify({
            token: validToken,
            user: {
              id: 1,
              name: 'Test User',
              email,
              avatar: `https://i.pravatar.cc/150?u=${1}`,
            },
          }),
        )

        return
      }

      res.statusCode = 400
      res.end(
        JSON.stringify({
          message: 'Неверный email или пароль',
        }),
      )
    },
  },
  {
    url: '/api/userinfo',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          id: 1,
          name: 'Test User',
          email: 'test@test.com',
        },
      }
    },
  },
]
