import { validToken, user, password as userPassword } from './data/auth'
import type { MockMethod } from 'vite-plugin-mock'
import { LoginRequest, LoginResponse } from './types/auth';
import { Response } from './types';
import { DataErrorType } from './types/errors';
import { ApiErrorResponse } from './utils/errors';

export default [
  {
    url: '/api/login',
    method: 'post',
    response: ({ body }: { body: LoginRequest }): Response<LoginResponse> => {
      const { email, password } = body;

      if (email === user.email && password === userPassword) {
        return {
          code: 200,
          data: {
            token: validToken,
            user: user,
          },
        };
      }

      return ApiErrorResponse(DataErrorType.INVALID_EMAIL_OR_PASSWORD)
    },
  },
  {
    url: '/api/userinfo',
    method: 'get',
    response: (): Response<LoginResponse> => {
      return {
        code: 200,
        data: {
          token: validToken,
          user: user,
        },
      };
    },
  },
] as MockMethod[]
