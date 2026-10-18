export type Tool = {
  id: string
  title: string
  category: string
  description: string
  icon: string
  color: string
  tag: string
  usage: string
}

export const tools: Tool[] = [
  { id: 'pulse', title: 'Pulse Analytics', category: 'Аналитика', description: 'Преобразуй сигналы и события в понятные метрики.', icon: '◈', color: 'violet', tag: 'POPULAR', usage: '2.4k' },
  { id: 'orbit', title: 'Orbit Workspace', category: 'Продуктивность', description: 'Собери задачи, идеи и проекты в одном пространстве.', icon: '◎', color: 'cyan', tag: 'NEW', usage: '1.8k' },
  { id: 'cipher', title: 'Cipher Vault', category: 'Безопасность', description: 'Организуй цифровые ресурсы и важные заметки.', icon: '⌘', color: 'pink', tag: 'SECURE', usage: '980' },
  { id: 'nova', title: 'Nova Studio', category: 'Творчество', description: 'Мастерская для концептов, прототипов и экспериментов.', icon: '✳', color: 'orange', tag: 'BETA', usage: '1.2k' },
  { id: 'relay', title: 'Relay Connect', category: 'Интеграции', description: 'Соединяй сервисы в единые автоматизированные потоки.', icon: '⟲', color: 'green', tag: 'UPDATED', usage: '760' },
  { id: 'atlas', title: 'Atlas Explorer', category: 'Исследование', description: 'Находи новые направления в цифровой вселенной.', icon: '⌖', color: 'blue', tag: 'FEATURED', usage: '3.1k' },
  { id: 'echo', title: 'Echo Community', category: 'Сообщество', description: 'Обменивайся находками и обсуждай идеи с участниками.', icon: '◉', color: 'pink', tag: 'SOCIAL', usage: '4.6k' },
  { id: 'forge', title: 'Forge API Lab', category: 'Разработка', description: 'Проверяй запросы, проектируй схемы и тестируй API.', icon: '</>', color: 'cyan', tag: 'DEV TOOL', usage: '640' },
  { id: 'canvas', title: 'Canvas Board', category: 'Продуктивность', description: 'Визуализируй мысли на бесконечной доске.', icon: '▧', color: 'orange', tag: 'CREATIVE', usage: '1.1k' },
  { id: 'signal', title: 'Signal Monitor', category: 'Аналитика', description: 'Следи за состоянием систем и важными событиями.', icon: '⌁', color: 'green', tag: 'LIVE', usage: '890' },
  { id: 'prism', title: 'Prism Gallery', category: 'Творчество', description: 'Кураторская коллекция визуальных экспериментов.', icon: '◇', color: 'violet', tag: 'CURATED', usage: '2.0k' },
  { id: 'vector', title: 'Vector Docs', category: 'Разработка', description: 'Создавай структурированную документацию проекта.', icon: '≋', color: 'blue', tag: 'DOCS', usage: '520' },
]

export const categories = ['Все', 'Аналитика', 'Продуктивность', 'Безопасность', 'Творчество', 'Интеграции', 'Исследование', 'Сообщество', 'Разработка']
