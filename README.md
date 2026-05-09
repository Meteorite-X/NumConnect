# NumConnect

МУИС оюутнуудад зориулсан хуваарь дээр суурилсан холбогдох платформ.

| Хавтас | Лаб | Технологи |
|--------|------|-----------|
| [`lab5-react/`](./lab5-react) | **Лаб 5 — React Coding** | React 18 + Vite + React Router v6 |
| [`lab6-backend/`](./lab6-backend) | **Лаб 6 — Backend API** | Node.js + Express.js + Static JSON |
| [`test/`](./test) | Туршилт / анхны template | React 19 + Vite (хадгалагдсан) |

---

## Лаб 5 — React Coding

> **Даалгавар:** Бичсэн кодоо React эсвэл Next.js-ээр хэрэгжүүлэх.

- React 18 + Vite + **React Router v6**
- 9 хуудас бүр **тусдаа компонент** (`src/components/`)
- URL-д суурилсан SPA navigation (`<Link>`, `<NavLink>`, `useNavigate`)
- URL параметртэй deep linking: `/chat/:userId`
- Багийн өгөгдөл — гишүүн бүр өөр өөр data модуль (`src/data/member1.js`, `member2.js`, `member3.js`)

```bash
cd lab5-react
npm install
npm run dev   # http://localhost:5173
```

Дэлгэрэнгүй: [`lab5-react/README.md`](./lab5-react/README.md)

---

## Лаб 6 — Back-end API

> **Даалгавар:** Системийн бүх API-г Node.js + Express.js дээр статик JSON-р
> хэрэгжүүлэх. Гишүүн бүр тус тусдаа хэд хэдэн API хийх. URL-ийг SPA лекцийн дагуу.
> **DB байхгүй.**

- Express 4 + ES Modules
- Гишүүн бүрийн route файл тусдаа: `routes/member1.js`, `member2.js`, `member3.js`
- Нийт **27 endpoint** (GET, POST, DELETE)
- REST стандартын дагуу: `/api/{resource}/:id` хэлбэр
- Query string шүүлтүүр: `?online=true`, `?status=open`
- Browser-аас тестлэх **dashboard** хуудас

```bash
cd lab6-backend
npm install
npm start    # http://localhost:3000
             # http://localhost:3000/dashboard.html
```

Дэлгэрэнгүй: [`lab6-backend/README.md`](./lab6-backend/README.md)

---

## test/

Анхны React + Vite template-ыг түүхэндээ хадгалахын тулд `test/` хавтас руу шилжүүлсэн.
Шинэ ажил эндээс ороогүй — зөвхөн ишлэлд зориулагдсан.

---

## Багийн гишүүдийн хариуцсан хэсэг

| Гишүүн | Өгөгдөл (Лаб 4, 5) | API endpoint-ууд (Лаб 6) |
|--------|---------------------|--------------------------|
| **Гишүүн 1** | `users`, `filters`, `recentMatches` | Хэрэглэгч / Discover / Auth (8 endpoint) |
| **Гишүүн 2** | `chatMessages`, `generalMessages` | Чат / General (7 endpoint) |
| **Гишүүн 3** | `stats`, `features`, `kpis`, `reports`, `dau`, `schedule`, `plans` | Landing / Admin / Schedule / Premium (11 endpoint) |
