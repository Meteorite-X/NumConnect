# Лабуудын дотоод ревью — алдаа, засвар, зөвлөмж

Senior дэвэлэгчийн нүдээр өөрийн хийсэн **Лаб 4, Лаб 5, Лаб 6**-г шалгаж, олсон асуудал бүрд **(1) тайлбар, (2) сайжруулах алхам, (3) кодын жишээ, (4) суралцах сэдэв**-ээр хариулсан баримт.

> Шинэчлэлт: Гишүүн 2 (**Баасанбатын**) код — `data/member2.js`, `lab5-react/src/data/member2.js`, `lab6-backend/routes/member2.js` — **хөндөгдөөгүй** (зааврын дагуу).

---

## Лаб 4 — Dynamic Data Handling

### 4.1. `<script type="module">` дотор global function

**Алдааны тайлбар.** ES6 module нь өөрийн scope-той (IIFE шиг). Module дотор `function foo(){}` бичвэл `window.foo` болохгүй. Гэтэл HTML-д `onclick="toggleTheme()"` гэх мэт инлайн handler нь зөвхөн **global** функц олдог. Үр дүнд: рендер ажиллана, гэхдээ товчлуурт даралт `Uncaught ReferenceError: toggleTheme is not defined` өгнө.

**Сайжруулах алхам.**

1. Module-ын төгсгөлд `Object.assign(window, { ... })`-р HTML-аас дуудагдах функцүүдийг тодорхой `window` рүү гаргана.
2. Эсвэл илүү цэвэр аргачлал — HTML-ээс `onclick`-уудыг бүгд устгаж, JS дотор `addEventListener` хийнэ.

**Кодын жишээ (одоогийн засвар — хадгалагдсан):**

```js
// numconnect.js (төгсгөлд)
Object.assign(window, {
  go, toggleTheme, clearMbti, setView,
  setDragMode, clearAll,
  openGeneral, closeGeneral, openGenProfile, closeGenProfile, sendGenMsg,
  openChat, showUserProfile, closeUserPanel, startChatFromPanel,
  sendMsg, switchChatTab
});
```

**Илүү сайн аргачлал (цаашдын зориулалт):**

```js
// numconnect.js
document.querySelector('#theme-btn').addEventListener('click', toggleTheme);
document.querySelectorAll('[data-go]').forEach(el =>
  el.addEventListener('click', () => go(el.dataset.go))
);
```

```html
<!-- HTML -->
<button id="theme-btn">🌙</button>
<button data-go="discover">Discover</button>
```

**Зөвлөмж.** "Unobtrusive JavaScript", "Event delegation", "Module scope vs global scope" сэдвүүдийг уншина уу. MDN: JavaScript modules.

---

### 4.2. `innerHTML`-р template literal-аас render — XSS эрсдэл

**Алдааны тайлбар.** `container.innerHTML = '<span>' + user.name + '</span>'` — хэрэв `name` нь `<img onerror=alert(1)>` шиг утгатай байвал browser script-ийг ажиллуулна. Static demo-д өгөгдөл хяналттай байж магадгүй ч, backend (Лаб 6)-аас орж ирэх дата эсвэл хэрэглэгчийн оруулсан мессежийг ингэж бичвэл аюултай.

**Сайжруулах алхам.**

1. Зөвхөн plain text-д `textContent` ашиглана.
2. Хэрэв HTML-тэй элемент үүсгэх хэрэгтэй бол `document.createElement` + `textContent` хослуулна.
3. Хэрэглэгчийн оруулсан мессежийг render хийхээс өмнө `escapeHtml(str)` гэх мэт функцээр хувирга.

**Кодын жишээ:**

```js
// Аюултай
gen.innerHTML = `<span>${userName}</span>`;

// Аюулгүй
const span = document.createElement('span');
span.textContent = userName;
gen.appendChild(span);

// Хэрэв массив render бол DocumentFragment ашиглах
const frag = document.createDocumentFragment();
for (const { name } of items) {
  const div = document.createElement('div');
  div.className = 'item';
  div.textContent = name;
  frag.appendChild(div);
}
container.replaceChildren(frag);
```

**Зөвлөмж.** OWASP Top 10 → A03 Cross-Site Scripting (XSS). DOMPurify гэх sanitization library-тай танилц.

---

## Лаб 5 — React Coding

### 5.1. Inline style-ууд хэт олон

**Алдааны тайлбар.** Components дотор `style={{fontSize:'13px',color:'var(--sub)'}}` гэх мэт инлайн style 30+ газар тааралддаг. Энэ нь:
- Cache хийгдэхгүй (render бүрт object шинээр үүснэ)
- CSS-ийн `:hover`, `media query`-г ашиглах боломжгүй
- Code review-д хүнд

**Сайжруулах алхам.**

1. Давтагдаж буй inline style-уудыг class болгож `numconnect.css`-д шилжүүлнэ.
2. Зөвхөн динамик утгыг (жишээ нь background image URL) inline-аар үлдээнэ.

**Кодын жишээ:**

```jsx
// Урьд
<div style={{fontSize:'13px',color:'var(--sub)',marginTop:'3px'}}>
  Таны хуваарьтай таарсан оюутнууд
</div>

// Дараа
<div className="feed-sub">Таны хуваарьтай таарсан оюутнууд</div>
```

```css
.feed-sub { font-size: 13px; color: var(--sub); margin-top: 3px; }
```

**Зөвлөмж.** "CSS Modules", "BEM naming", "Tailwind utility-first" сонголтуудтай танилц.

---

### 5.2. URL deep-link-д `userId` шалгахгүй байна

**Алдааны тайлбар.** `/chat/:userId`-д тогтоогүй id (жишээ нь `/chat/foo`) орвол Chat компонент `users.find(u => u.id === userId)` олохгүй, дараа нь `topUser.av` гэх рүү харахаар `Cannot read property 'av' of undefined` алдаа гарна.

**Сайжруулах алхам.**

1. `useParams`-аас авсан `userId`-аар хайх ба олдоогүй бол fallback UI харуулах.
2. Эсвэл `<Navigate to="/chat" />`-р redirect хийнэ.

**Кодын жишээ:**

```jsx
import { Navigate, useParams } from 'react-router-dom';
import { users } from '../data/member1.js';

export default function Chat() {
  const { userId } = useParams();
  const user = users.find(u => u.id === userId);

  if (userId && !user) {
    return <Navigate to="/chat" replace />;
  }
  // ...
}
```

**Зөвлөмж.** "React Router data routes", "Error boundaries", "Defensive UI" сэдвүүд.

---

## Лаб 6 — Backend API

### 6.1. JSON файлыг хүсэлт бүрт уншиж байна

**Алдааны тайлбар.** `loadJson('users.json')` нь хүсэлт ирэх бүрт диск рүү очиж синхрон уншиж, JSON.parse хийж байна. 27 endpoint бүрд адил. Үүний асуудал:
- Disk I/O нь node-ын event loop-ийг түр блоклоно
- 1000 хүсэлт ирэхэд 1000 удаа диск унших
- Файл байхгүй бол `ENOENT` exception-р сервер crash болно

**Сайжруулах алхам.**

1. Дата нь статик тул серверийг асаахад нэг л удаа ачаалж, module-level `const`-д хадгална.
2. Хэрэв cluster mode-д ажиллахаар бол runtime mutation-уудыг жинхэнэ DB рүү шилжүүлнэ.

**Кодын жишээ (засагдсан):**

```js
// routes/member1.js
const USERS          = loadJson('users.json');
const FILTERS        = loadJson('filters.json');
const RECENT_MATCHES = loadJson('recent-matches.json');

router.get('/users', (req, res) => {
  let users = USERS;
  if (req.query.online !== undefined) {
    users = users.filter(u => u.online === (req.query.online === 'true'));
  }
  res.json({ count: users.length, data: users });
});
```

**Зөвлөмж.** "Node.js event loop", "Memory vs disk caching", "12-Factor App principles".

---

### 6.2. `PORT = 3000` hardcoded байна

**Алдааны тайлбар.** Heroku, Railway, Vercel, Render зэрэг сервер дээр deploy хийхэд тэдгээр нь `PORT` орчны хувьсагчаар сонгож өгдөг. Hardcoded бол 3000-аас өөр порт авч ажиллахгүй.

**Сайжруулах алхам.**

```js
const PORT = process.env.PORT || 3000;
```

**Зөвлөмж.** "Environment variables", "12-Factor: Config", "dotenv" сэдвүүд.

---

### 6.3. `express.json()` body-н хэмжээ хязгааргүй байна

**Алдааны тайлбар.** Default `express.json()` нь өндөр хэмжээтэй payload-ыг шууд хүлээж авна. Том payload (DoS attack) сервер удаашруулна.

**Сайжруулах алхам.**

```js
app.use(express.json({ limit: '100kb' }));
```

**Зөвлөмж.** OWASP API Security Top 10 → "Lack of Resources & Rate Limiting".

---

### 6.4. Input validation бараг байхгүй

**Алдааны тайлбар.** `auth/login` хэсэгт `email.endsWith('@num.edu.mn')` шалгаж байгаа боловч "name@num.edu.mn.attacker.com" гэх мэт хорлонтой утгыг түүгээр оруулж болно.

**Сайжруулах алхам.** Регулар илэрхийллээр бүтэн email pattern-ийг шалгана.

**Кодын жишээ (засагдсан):**

```js
const EMAIL_RE = /^[\w.+-]+@num\.edu\.mn$/i;
const OTP_RE   = /^\d{6}$/;

if (!EMAIL_RE.test(email)) return res.status(400).json({ error: '@num.edu.mn хаяг шаардлагатай' });
if (!OTP_RE.test(code))    return res.status(400).json({ error: 'OTP 6 оронтой байх ёстой' });
```

**Зөвлөмж.** zod, joi, express-validator — schema-based validation libs.

---

## Цаашид сурахад зөвлөгдөх сэдвүүд

| Сэдэв | Лаб | Эх сурвалж |
|-------|-----|-------------|
| JavaScript modules (ESM) | 4 | MDN — JavaScript Modules |
| DOM manipulation patterns | 4 | MDN — Document.createElement, replaceChildren |
| OWASP Top 10 (XSS, A03) | 4, 5 | owasp.org/Top10 |
| React rendering & hooks | 5 | react.dev → Hooks reference, useEffect deps |
| React Router data routes | 5 | reactrouter.com → loaders, errorElement |
| Node.js event loop | 6 | nodejs.dev → "The Node.js Event Loop" |
| 12-Factor App | 6 | 12factor.net |
| Schema-based validation | 6 | zod.dev, joi.dev |
| Express.js middleware order | 6 | expressjs.com → "Writing middleware" |

---

## Хийсэн засвар (commit `7`)

- `lab6-backend/server.js` — `process.env.PORT || 3000`, `express.json({ limit: '100kb' })`, `NODE_ENV` дагуу logger
- `lab6-backend/routes/member1.js` — JSON-г module init үед нэг удаа load, email regex чангатгасан
- `lab6-backend/routes/member3.js` — JSON-г module init үед нэг удаа load
- `lab6-backend/routes/member2.js` — **Баасанбатын код, хөндсөнгүй**
- `REVIEW.md` (энэ файл) — алдааны тайлбар, сайжруулах алхам, кодын жишээ, суралцах сэдвүүд
