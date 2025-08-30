import type { IncomingMessage, ServerResponse } from 'http'
import { parseRawRequest } from './utils'
import { validToken, user, password as userPassword } from './data/auth'
import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/login',
    method: 'post',
    rawResponse: async (req: IncomingMessage, res: ServerResponse) => {
      const redData = await parseRawRequest(req)
      const { email, password } = redData

      res.setHeader('Content-Type', 'application/json')

      if (email === user.email && password === userPassword) {
        res.statusCode = 200
        res.end(
          JSON.stringify({
            token: validToken,
            user,
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
    rawResponse: async (req: IncomingMessage, res: ServerResponse) => {
      res.setHeader('Content-Type', 'application/json')

      res.statusCode = 200
      res.end(JSON.stringify(user))
    },
  },
] as MockMethod[]
