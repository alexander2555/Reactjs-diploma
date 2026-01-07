# Result University Diploma Project | CollageWeb | Backend

## API Endpoints

### Аутентификация

- `POST /api/auth/login` - логин
- `POST /api/auth/register` - регистрация
- `GET /api/auth/me` - проверка текущей сессии
- `POST /api/auth/logout` - выход

Использовать JWT cookie-токены для аутентификации.

### Пользователи

- `GET /api/users` - получение списка пользователей
- `GET /api/users/roles` - получение списка ролей (константы)

### Документы

- `GET /api/documents` - получение списка документов
- `GET /api/documents/:id` - получение документа
- `POST /api/documents` - создание документа
- `PATCH /api/documents/:id` - обновление документа
- `DELETE /api/documents/:id` - удаление документа

### Элементы

- `GET /api/elements` - получение списка элементов
- `GET /api/elements/:id` - получение элемента
- `POST /api/elements` - создание элемента
- `PATCH /api/elements/:id` - обновление элемента
- `DELETE /api/elements/:id` - удаление элемента

### Связи документов с элементами

- `GET /api/doc_el` - получение связей
- `POST /api/doc_el` - создание связи
- `PATCH /api/doc_el/:id` - обновление связи
- `DELETE /api/doc_el/:id` - удаление связи

## Модели данных

- **User** - пользователи системы
- **Document** - документы
- **Element** - графические элементы
- **Doc_El** - связи документов с элементами

Подключение к MongoDB:

`.env`: DB_CONN_STRING=mongodb://localhost:27017/collage-app

## Сервер

Режим разработки с nodemon:

```bash
npm run serve
```

Порт: 3001

---

© 2025 Alexander Mamontov <alexander2555@yandex.ru>
