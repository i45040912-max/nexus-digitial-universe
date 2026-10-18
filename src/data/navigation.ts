import {
  Activity, Aperture, AppWindow, Archive, BookOpen, CalendarDays, CheckSquare,
  CircleUserRound, Code2, Compass, FileText, FolderKanban, Gauge, Globe2,
  Grid2X2, Heart, Home, Layers3, Link2, MessageSquare, NotebookPen, Settings2,
  ShieldCheck, Sparkles, Users, Workflow
} from 'lucide-react'

export const navigation = [
  { group: 'SPACE', items: [
    { label: 'Обзор', path: '/', icon: Home },
    { label: 'Исследовать', path: '/explore', icon: Compass },
    { label: 'Приложения', path: '/apps', icon: AppWindow },
    { label: 'Лаборатория', path: '/lab', icon: Sparkles },
  ]},
  { group: 'WORKSPACE', items: [
    { label: 'Проекты', path: '/projects', icon: FolderKanban },
    { label: 'Сообщество', path: '/community', icon: Users },
    { label: 'Лента событий', path: '/feed', icon: Activity },
    { label: 'Аналитика', path: '/analytics', icon: Gauge },
    { label: 'Закладки', path: '/bookmarks', icon: Heart },
    { label: 'Коллекции', path: '/collections', icon: Layers3 },
    { label: 'Задачи', path: '/tasks', icon: CheckSquare },
    { label: 'Календарь', path: '/calendar', icon: CalendarDays },
  ]},
  { group: 'RESOURCES', items: [
    { label: 'Заметки', path: '/notes', icon: NotebookPen },
    { label: 'Файлы', path: '/files', icon: Archive },
    { label: 'Интеграции', path: '/integrations', icon: Link2 },
    { label: 'API и разработка', path: '/api', icon: Code2 },
    { label: 'Документация', path: '/docs', icon: BookOpen },
    { label: 'Статус системы', path: '/status', icon: ShieldCheck },
  ]},
  { group: 'PERSONAL', items: [
    { label: 'Профиль', path: '/profile', icon: CircleUserRound },
    { label: 'Настройки', path: '/settings', icon: Settings2 },
  ]},
]

export const allNavigation = navigation.flatMap(section => section.items)
