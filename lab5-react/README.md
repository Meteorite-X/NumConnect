# Лаб 5 — React Coding (NumConnect)

NumConnect веб аппликешныг **React + Vite + React Router v6** ашиглан SPA болгон хэрэгжүүлэв.

## Бүтэц

```
lab5-react/
├── index.html              # Үндсэн HTML (Vite entry)
├── package.json            # Хамаарал, скриптүүд
├── vite.config.js          # Vite тохиргоо
├── public/                 # Статик файлууд
└── src/
    ├── main.jsx            # React оруулга, BrowserRouter
    ├── App.jsx             # Routes-ийн жагсаалт
    ├── components/         # Хуудас бүрийн компонент
    │   ├── NavBar.jsx
    │   ├── Landing.jsx
    │   ├── Login.jsx
    │   ├── Otp.jsx
    │   ├── Setup.jsx
    │   ├── Discover.jsx
    │   ├── Schedule.jsx
    │   ├── Chat.jsx
    │   ├── Premium.jsx
    │   └── Admin.jsx
    ├── data/               # ES6 module — багийн өгөгдөл
    │   ├── member1.js      # Гишүүн 1: users, filters, recentMatches
    │   ├── member2.js      # Гишүүн 2: chat, generalMessages
    │   └── member3.js      # Гишүүн 3: stats, kpis, schedule
    └── styles/
        └── numconnect.css  # Үндсэн загвар
```

## SPA дэмжлэг (11 SPA лекцийн дагуу)

- **React Router v6** — `<BrowserRouter>` + `<Routes>` + `<Route>`
- URL → context: хуудас бүрийн URL нь deep linking-д тохиромжтой
- `<Link>` компонент — браузерын history API ашиглан refresh-гүй шилжих
- URL параметр: `/chat/:userId` хэлбэрээр user-д шууд линк хийх

| URL | Хуудас |
|-----|--------|
| `/` | Landing |
| `/login` | Нэвтрэх |
| `/otp` | OTP баталгаажуулалт |
| `/setup` | Профайл бүрдүүлэх |
| `/discover` | Хайх |
| `/schedule` | Хуваарь |
| `/chat` | Чат жагсаалт |
| `/chat/:userId` | Тухайн хэрэглэгчтэй чат |
| `/premium` | Premium багц |
| `/admin` | Admin самбар |

## Ажиллуулах

> Шаардлагатай: **Node.js 18+** ([nodejs.org](https://nodejs.org)-аас суулгах)

```bash
npm install   # хамаарлуудыг суулгах
npm run dev   # хөгжүүлэлтийн сервер
```

Браузерт http://localhost:5173 дээр нээгдэнэ. Vite hot-reload идэвхтэй.

```bash
npm run build    # production build (dist/)
npm run preview  # build-ийг турших
```

## React Router v6 ашиглалт (лекцийн дагуу)

```jsx
// main.jsx — App-ийг BrowserRouter дотор боож өгнө
<BrowserRouter>
  <App />
</BrowserRouter>

// App.jsx — URL-аар conditional render
<Routes>
  <Route path="/" element={<Landing />} />
  <Route path="/chat/:userId" element={<Chat />} />  {/* URL параметр */}
  <Route path="*" element={<Navigate to="/" />} />   {/* fallback */}
</Routes>

// NavBar.jsx — Link/NavLink-р refresh-гүй шилжих
<NavLink to="/discover" className={({isActive}) => 'nt' + (isActive ? ' on' : '')}>
  Discover
</NavLink>

// Chat.jsx — URL-аас параметр унших
const { userId } = useParams();      // /chat/enkh → 'enkh'
const navigate = useNavigate();
navigate('/chat/' + userId);         // программчилсан navigation
```

## Багийн өгөгдөл (ES6 modules)

`src/data/` дотор гишүүн бүрийн өгөгдөл **тусдаа файлд**:

```js
// src/components/Discover.jsx
import { users, filters, recentMatches } from '../data/member1.js';

// src/components/Chat.jsx
import { chatMessages, generalMessages } from '../data/member2.js';

// src/components/Landing.jsx, Admin.jsx, Schedule.jsx
import { stats, features, kpis, ... } from '../data/member3.js';
```
