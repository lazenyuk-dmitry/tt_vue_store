import http from './http.ts'

export function setupInterceptors() {
  http.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  http.interceptors.response.use(
    (res) => {
      const { code, message } = res.data;
      const isSuccessCode = code >= 200 && code < 300;

      if (code === 401) {
        window.location.href = '/login'
        return Promise.reject(new Error(message || 'Unauthorized'));
      }

      if (!isSuccessCode && code !== undefined) {
        return Promise.reject(new Error(message || 'API Error'));
      }

      return res;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}
