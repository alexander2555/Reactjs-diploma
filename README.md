# CollageWeb (SPA + API)

Приложение для создания коллажей из пользовательских изображений.

## Стек

- Frontend: React, Redux, React Router, Vite, Sass, Konva
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt

## Установка и запуск

1. Клонировать репозиторий и установить зависимости:

```bash
npm install       # в корне frontend
npm install       # в корне backend
```

2. Настроить окружение:

- `backend/.env` — строка подключения к MongoDB:  
  `DB_CONN_STRING=mongodb://localhost:27017/collage-app`

3. Запуск:

```bash
# Backend
npm run serve     # nodemon (порт 3001)
npm start

# Frontend
npm run dev       # порт 5173
npm run build
npm run preview
```

## Структура репозитория

- `frontend/` — SPA
  - `src/actions/` — Redux actions
  - `src/reducers/` — Redux reducers
  - `src/selectors/` — Redux selectors
  - `src/pages/` — страницы (auth, document, library, main, register)
  - `src/components/` — UI-компоненты
  - `src/helpers/` — мапперы/утилиты данных
  - `src/constants/` — константы (role, color, api, doc defaults)
  - `src/providers/` — контексты (DocEnv, Lib, Scale, Select)
  - `src/utils/` — утилиты и api-request
- `backend/` — REST API
  - `controllers/` — контроллеры (auth/users, documents, elements, docEl)
  - `models/` — Mongoose-модели (User, Document, Element, Doc_El)
  - `routes/` — маршруты `/api`
  - `helpers/` — токены, доступы, мапперы
  - `middlewares/` — auth, optional-auth, hasRole
  - `constants/`
  - `app.js`

## Роли и права

Роли: **Администратор**, **Мастер**, **Редактор**, **Гость**.

Основные правила:

- Пользователи: создавать/редактировать/удалять может только Админ.
- Документы:
  - Создание: Админ, Мастер
  - Редактирование: Админ; Мастер — свои; Редактор — если назначен редактором
  - Удаление: Админ; Мастер — свои
  - Публикация/назначение редактора: Админ; Мастер — свои
  - Просмотр: публичные для всех; приватные — по правам владельца/редактора
- Элементы (графика):
  - Загрузка: Админ, Мастер, Редактор
  - Редактирование/Удаление: Админ; владелец (Мастер/Редактор) своих
  - Использование в документах: публичные или принадлежащие пользователю; для гостей недоступно

## Работа с пользователями

- Регистрация / Логин: `/api/auth/register`, `/api/auth/login`
- Проверка сессии: `/api/auth/me`
- Выход: `/api/auth/logout`
- Роли (константы): `/api/users/roles`
- Список пользователей: `/api/users` (для Админа)

JWT хранится в cookie; проверка — через middleware `auth` или `optional-auth`.

## Документы и элементы

- Документы: CRUD (`/api/documents`, `/api/documents/:id`)
- Элементы (графика): CRUD (`/api/elements`, `/api/elements/:id`)
- Связи документа и элементов: `/api/doc_el` (в настоящей реализации используется только выборка)

При сохранении документа фронтенд отправляет элементы с флагами `create/update/delete`; бэкенд обрабатывает создание/обновление/удаление связей.

## Ключевые хелперы (frontend)

- `mapDoc`, `mapDocElement` — нормализация данных с дефолтами (`DEFAULT_DOC`, `DEFAULT_DOC_ELEMENT`)
- `DEFAULT_DOC`, `DEFAULT_DOC_ELEMENT` — константы по умолчанию для документа/элемента
- Подготовка данных к сохранению: элементы очищаются от лишних полей, но сохраняют флаги `create/delete/update`

## Маршруты API (backend)

- Auth: `POST /api/auth/login`, `POST /api/auth/register`, `GET /api/auth/me`, `POST /api/auth/logout`
- Users: `GET /api/users`, `GET /api/users/roles`
- Documents: `GET /api/documents`, `GET /api/documents/:id`, `POST /api/documents`, `PATCH /api/documents/:id`, `DELETE /api/documents/:id`
- Elements: `GET /api/elements`, `GET /api/elements/:id`, `POST /api/elements`, `PATCH /api/elements/:id`, `DELETE /api/elements/:id`
- Doc_El: `GET /api/doc_el`, `POST /api/doc_el`, `PATCH /api/doc_el/:id`, `DELETE /api/doc_el/:id`

## Сборка и деплой

- Frontend: `npm run build` → директория `dist`
- Backend: `npm start` (использует `process.env.DB_CONN_STRING`)

© 2025 Alexander Mamontov
