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
        code: 1,
        message: 'Неверный email или пароль',
      }
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
