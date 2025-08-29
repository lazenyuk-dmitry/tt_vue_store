import type { IncomingMessage, ServerResponse } from 'http'
import { parseRawRequest } from './utils'

export default [
  {
    url: '/api/login',
    method: 'post',
    response: ({ body }: any) => {
      const { email, password } = body

      if (email === 'test@test.com' && password === '123456') {
        return {
          code: 0,
          message: 'Успешный вход',
          data: {
            token: 'fake-jwt-token',
            user: {
              id: 1,
              name: 'Test User',
              email,
            },
          },
        }
      }

      return {
        code: 404,
        message: 'Неверный email или пароль',
      }
    },

    rawResponse: async (req: IncomingMessage, res: ServerResponse) => {
      const redData = await parseRawRequest(req)
      const { email, password } = redData

      res.setHeader('Content-Type', 'application/json')

      if (email === 'test@test.com' && password === '123456') {
        res.statusCode = 200
        res.end(
          JSON.stringify({
            message: 'Успешный вход',
            data: {
              token: 'fake-jwt-token',
              user: {
                id: 1,
                name: 'Test User',
                email,
                avatar: `https://i.pravatar.cc/150?u=${1}`,
              },
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
