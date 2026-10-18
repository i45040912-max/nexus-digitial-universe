# NEXUS API

Local base URL: `http://localhost:4000/api`

- `GET /health`
- `POST /auth/register` — `{ "name": "Alex", "email": "alex@example.com", "password": "strong-password" }`
- `POST /auth/login` — `{ "email": "alex@example.com", "password": "strong-password" }`
- `GET /auth/me` and `PATCH /auth/me` with `Authorization: Bearer <token>`
- Projects: `GET/POST /projects`, `PATCH/DELETE /projects/:id`
- Tasks: `GET/POST /tasks`, `PATCH/DELETE /tasks/:id`
- Notes: `GET/POST /notes`, `PATCH/DELETE /notes/:id`

All resource endpoints are authenticated and owner-scoped.
