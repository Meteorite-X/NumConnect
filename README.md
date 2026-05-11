# NumConnect

МУИС оюутнуудад зориулсан хуваарь дээр суурилсан холбогдох платформ.

| Хавтас | Лаб | Технологи |
|--------|------|-----------|
| [`lab4/`](./lab4) | **Лаб 4 — Dynamic Data Handling** | Static HTML/CSS/JS + ES6 modules |
| [`lab5-react/`](./lab5-react) | **Лаб 5 — React Coding** | React 18 + Vite + React Router v6 |
| [`lab6-backend/`](./lab6-backend) | **Лаб 6 — Backend API (Static JSON)** | Node.js + Express.js |
| [`lab7/`](./lab7) | **Лаб 7 — DB Integration (MongoDB)** | Express + Mongoose + MongoDB Atlas |
| [`test/`](./test) | Туршилт / анхны template | React 19 + Vite (хадгалагдсан) |

---

## Лаб 4 — Dynamic Data Handling

> Багийн гишүүн бүр статик JSON дата хувьсагч бэлдэж, ES6 модулиар оруулж ирэн вэб сайтдаа load хийнэ.

- ES6 `import` / `export`-р 3 гишүүний өгөгдлийг тусдаа модулиас уншина
- `<script type="module">`-р browser-т модуль ачаалж, `Array.map()`-р DOM-д render

```bash
cd lab4 && python -m http.server 8000
```

## Лаб 5 — React Coding

> Бичсэн кодоо React эсвэл Next.js-ээр хэрэгжүүлэх.

- React 18 + Vite + **React Router v6**
- 9 хуудас бүр **тусдаа компонент**
- **Лаб 7-аас хойш** — бүх компонент `useApi` hook-р backend-аас fetch хийнэ

```bash
cd lab5-react && npm install && npm run dev   # http://localhost:5173
```

## Лаб 6 — Back-end API (Static JSON)

> Системийн бүх API-г Node.js + Express.js дээр статик JSON-р хэрэгжүүлэх.

- Express 4, гишүүн бүрд тусдаа `routes/memberN.js`
- 26 endpoint, RESTful URL, `dashboard.html` тестлэгч

```bash
cd lab6-backend && npm install && npm start   # http://localhost:3000
```

## Лаб 7 — DB Integration (MongoDB + Mongoose)

> Backend-ийг **MongoDB Atlas**-тай холбож, өгөгдлийг сангаас уншиж API-аар дамжуулна.

- Лаб 6-ийн endpoint-ууд яг адил — зөвхөн **JSON-аас → MongoDB**
- Mongoose ODM, 12 strict schema, indexes
- `seed.js`-р анхны JSON-ыг DB рүү шилжүүлнэ
- Frontend (`lab5-react`) `fetch`-р backend-аас данс татна

```bash
cd lab7
npm install
cp .env.example .env       # MONGODB_URI-г хуулж бичнэ
npm run seed               # data/*.json → DB
npm start                  # http://localhost:3000
```

---

## Багийн гишүүдийн хариуцсан хэсэг

| Гишүүн | Өгөгдөл (Лаб 4, 5) | API (Лаб 6) | Mongoose model (Лаб 7) |
|--------|---------------------|--------------|-------------------------|
| **Төгөлдөр** (1)    | users, filters, recentMatches | 8 endpoint | User, Filter, RecentMatch |
| **Баасанбат** (2)   | chatMessages, generalMessages | 7 endpoint | Message, GeneralMessage |
| **Хүдэрчулуун** (3) | stats, features, kpis, reports, schedule, dau, plans | 11 endpoint | Stat, Feature, KPI, Report, DAU, ScheduleConfig, Plan |

## SPA лекцийн зарчим

- **URL-д контекст агуулагдах** — `/chat/enkh` шиг линк хуваалцах боломжтой
- **Browser History API** — refresh, back/forward товч ажиллана
- **Resource-based URL** — `/api/users/:id` (RESTful)
- **Path параметр** vs **Query string** — өөр өөр зориулалт
