import { createProdMockServer } from 'vite-plugin-mock/client';

// 1. Ищем все файлы .ts в папке mock
// { eager: true } — означает, что импорт будет синхронным (сразу все модули)
const modules = import.meta.glob('../mock/*.ts', { eager: true });

const mockModules: any[] = [];

// 2. Проходимся по всем найденным модулям и собираем их экспорты
Object.keys(modules).forEach((key) => {
  // Пропускаем сам файл mockProdServer.ts или конфиг, если они лежат в той же папке
  if (key.includes('_createProductionServer')) return;

  const module = modules[key] as any;
  // Добавляем экспортированный массив моков
  mockModules.push(...(module.default || []));
});

export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
