# NumConnect

МУИС оюутнуудад зориулсан хуваарь дээр суурилсан холбогдох платформ.

| Хавтас | Лаб | Технологи |
|--------|------|-----------|
| [`lab4/`](./lab4) | **Лаб 4 — Dynamic Data Handling** | Static HTML/CSS/JS + ES6 modules |
| [`lab5-react/`](./lab5-react) | **Лаб 5 — React Coding** | React 18 + Vite + React Router v6 |
| [`lab6-backend/`](./lab6-backend) | **Лаб 6 — Backend API** | Node.js + Express.js + Static JSON |
| [`test/`](./test) | Туршилт / анхны template | React 19 + Vite (хадгалагдсан) |

---

## Лаб 4 — Dynamic Data Handling

> **Даалгавар:** Багийн гишүүн бүр статик JSON дата хувьсагч бэлдэж, ES6 модулиар оруулж ирэн вэб сайтдаа load хийнэ.

- ES6 `import` / `export`-р 3 гишүүний өгөгдлийг тусдаа модулиас уншина
- `<script type="module">`-р browser-т модуль ачаалж, `Array.map()`-р DOM-д render
- `data/member1.js` (Төгөлдөр), `data/member2.js` (Баасанбат), `data/member3.js` (Хүдэрчулуун)

```bash
cd lab4
python -m http.server 8000   # эсвэл npx serve
```

Дэлгэрэнгүй: [`lab4/README.md`](./lab4/README.md)

---

## Лаб 5 — React Coding

> **Даалгавар:** Бичсэн кодоо React эсвэл Next.js-ээр хэрэгжүүлэх.

- React 18 + Vite + **React Router v6**
- 9 хуудас бүр **тусдаа компонент** (`src/components/`)
- URL-д суурилсан SPA navigation (`<Link>`, `<NavLink>`, `useNavigate`)
- URL параметртэй deep linking: `/chat/:userId`

```bash
cd lab5-react
npm install
npm run dev   # http://localhost:5173
```

Дэлгэрэнгүй: [`lab5-react/README.md`](./lab5-react/README.md)

---

## Лаб 6 — Back-end API

> **Даалгавар:** Системийн бүх API-г Node.js + Express.js дээр статик JSON-р хэрэгжүүлэх.

- Express 4 + ES Modules
- Гишүүн бүрийн route файл тусдаа: `routes/member1.js`, `member2.js`, `member3.js`
- Нийт **27 endpoint** (GET, POST, DELETE)

```bash
cd lab6-backend
npm install
npm start    # http://localhost:3000/dashboard.html
```

Дэлгэрэнгүй: [`lab6-backend/README.md`](./lab6-backend/README.md)

---

## Багийн гишүүдийн хариуцсан хэсэг

| Гишүүн | Хариуцсан өгөгдөл (Лаб 4, 5) | API endpoint-ууд (Лаб 6) |
|--------|-------------------------------|--------------------------|
| **Төгөлдөр** (Гишүүн 1)    | `users`, `filters`, `recentMatches` | Хэрэглэгч / Discover / Auth (8 endpoint) |
| **Баасанбат** (Гишүүн 2)   | `chatMessages`, `generalMessages` | Чат / General (7 endpoint) |
| **Хүдэрчулуун** (Гишүүн 3) | `stats`, `features`, `kpis`, `reports`, `dau`, `schedule`, `plans` | Landing / Admin / Schedule / Premium (11 endpoint) |
