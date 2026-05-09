# Лаб 6 — Back-end API (Node.js + Express.js)

NumConnect системийн бүх API-г Express.js дээр хэрэгжүүлсэн.
Өгөгдлийг **статик JSON** файлуудаас уншина (DB байхгүй).

## Бүтэц

```
lab6-backend/
├── server.js           # Express үндсэн файл
├── package.json
├── data/               # Статик JSON өгөгдөл
│   ├── users.json
│   ├── filters.json
│   ├── recent-matches.json
│   ├── messages.json
│   ├── general.json
│   ├── stats.json
│   ├── features.json
│   ├── kpis.json
│   ├── reports.json
│   ├── dau.json
│   └── schedule.json
└── routes/
    ├── member1.js      # Гишүүн 1: Хэрэглэгч/Discover API
    ├── member2.js      # Гишүүн 2: Чат/Мессеж API
    └── member3.js      # Гишүүн 3: Landing/Admin/Schedule API
```

## API Дизайн (SPA лекцийн дагуу)

URL-ууд **deep linking**-д тохирсон, **REST стандартыг** дагасан байдлаар:
- Resource-д үндэслэсэн pattern: `/api/{resource}/{id}`
- Параметрүүд URL-д суугдсан (path параметр) — bookmark болон share хийхэд тохиромжтой
- Query string шүүлтүүрт: `?online=true`, `?plan=premium`

---

### Гишүүн 1 — Хэрэглэгч / Discover / Auth (`routes/member1.js`)

| Method | URL | Тайлбар |
|--------|-----|---------|
| GET    | `/api/users` | Бүх хэрэглэгч. `?online=true`, `?major=...`, `?plan=...`, `?year=...` |
| GET    | `/api/users/:id` | Хэрэглэгчийн дэлгэрэнгүй |
| GET    | `/api/users/:id/tags` | Хэрэглэгчийн сонирхол |
| GET    | `/api/users/:id/match` | Тухайн хэрэглэгчтэй match score |
| GET    | `/api/filters` | Discover шүүлтүүрүүд |
| GET    | `/api/matches/recent` | Сүүлд холбогдсон хэрэглэгчид |
| POST   | `/api/auth/login` | Email-ыг шалгаад OTP илгээх (mock) |
| POST   | `/api/auth/verify` | OTP кодыг шалгаж нэвтрүүлэх (mock) |

### Гишүүн 2 — Чат / General (`routes/member2.js`)

| Method | URL | Тайлбар |
|--------|-----|---------|
| GET    | `/api/chat/threads` | Бүх ярианы товч жагсаалт |
| GET    | `/api/chat/messages` | Идэвхтэй чатын мессежүүд |
| GET    | `/api/chat/:userId/messages` | Хэрэглэгчтэй чатлах түүх |
| POST   | `/api/chat/:userId/messages` | Шинэ мессеж илгээх |
| DELETE | `/api/chat/:userId/messages` | Чатын түүхийг устгах |
| GET    | `/api/general/messages` | # general сувгийн мессежүүд |
| POST   | `/api/general/messages` | # general сувагт нийтлэх |

### Гишүүн 3 — Landing / Admin / Schedule / Premium (`routes/member3.js`)

| Method | URL | Тайлбар |
|--------|-----|---------|
| GET    | `/api/stats` | Landing статистик |
| GET    | `/api/features` | Landing онцлогууд |
| GET    | `/api/admin/kpis` | Admin KPI |
| GET    | `/api/admin/reports` | Гомдлуудын жагсаалт. `?status=open` |
| GET    | `/api/admin/reports/:id` | Тодорхой гомдлын дэлгэрэнгүй |
| GET    | `/api/admin/dau` | DAU графикийн өгөгдөл |
| GET    | `/api/schedule/template` | Хуваарийн default загвар |
| GET    | `/api/schedule/days` | Долоо хоногийн өдрүүд |
| GET    | `/api/schedule/hours` | Цагийн жагсаалт |
| GET    | `/api/premium/plans` | Premium багцууд |
| GET    | `/api/premium/plans/:id` | Тодорхой багц |

---

## Ажиллуулах

```bash
npm install
npm start
```

Сервер дараах хаягт нээгдэнэ: **http://localhost:3000**

### 🎯 Test dashboard

Браузерт нээгээд бүх endpoint-уудыг **товшихоор** туршиж болно:

**http://localhost:3000/dashboard.html**

(POST хүсэлтэд тест-body урьдчилан бэлтгэсэн)

### Туршихад жишээ

```bash
# Бүх endpoint-ийн жагсаалт
curl http://localhost:3000/

# Бүх хэрэглэгч
curl http://localhost:3000/api/users

# Зөвхөн онлайн + premium хэрэглэгч
curl "http://localhost:3000/api/users?online=true&plan=premium"

# Тухайн хэрэглэгчтэй match
curl http://localhost:3000/api/users/nomin/match

# Login mock
curl -X POST -H "Content-Type: application/json" \
  -d "{\"email\":\"20B1NUM0042@num.edu.mn\"}" \
  http://localhost:3000/api/auth/login

# Чат түүх
curl http://localhost:3000/api/chat/enkh/messages

# Шинэ мессеж илгээх
curl -X POST -H "Content-Type: application/json" \
  -d "{\"text\":\"Сайн уу!\"}" \
  http://localhost:3000/api/chat/enkh/messages

# Premium багцууд
curl http://localhost:3000/api/premium/plans
```

### URL дизайны зарчим (SPA лекцийн дагуу)

- **Resource-based URL** — `/api/users/:id` хэлбэр (`/api/getUser?id=...` биш)
- **Nested resources** — `/api/users/:id/tags` (хэрэглэгчид хамаарах сонирхол)
- **HTTP verbs** — GET (унших), POST (нэмэх), DELETE (устгах)
- **Query string** — шүүлтүүрт зориулсан: `?online=true`, `?status=open`
- **Bookmark/share-д тохирсон** — параметр URL-д шигдсэн (deep linking)
