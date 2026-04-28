import { createProdMockServer } from 'vite-plugin-mock/client'

const modules = import.meta.glob('./**/*.ts', { eager: true })

export function setupProdMockServer() {
  const mockModules: any[] = []

  Object.values(modules).forEach((mod: any) => {
    if (mod.default) {
      mockModules.push(...mod.default)
    }
  })

  createProdMockServer(mockModules)
}
