# Лаб 4 — Dynamic Data Handling (ES6 модуль)

NumConnect веб сайтын статик JSON өгөгдлийг **ES6 модулиар** import хийж, DOM-д динамикаар load хийсэн хувилбар.

## Бүтэц

```
lab4/
├── index.html        # Үндсэн хуудас (<script type="module"> ашигласан)
├── numconnect.css    # Загвар
├── numconnect.js     # ES6 import + render функцууд
└── data/             # Гишүүн бүрийн JSON-data ES6 модуль
    ├── member1.js    # Гишүүн 1 (Төгөлдөр)   — users, filters, recentMatches
    ├── member2.js    # Гишүүн 2 (Баасанбат)   — chatMessages, generalMessages
    └── member3.js    # Гишүүн 3 (Хүдэрчулуун) — stats, features, kpis, reports, schedule, dauChart
```

## ES6 Module — `import` / `export`

`data/member1.js`:

```js
export const users = [ /* ... */ ];
export const filters = [ /* ... */ ];
export const recentMatches = [ /* ... */ ];
```

`numconnect.js` (root оруулга):

```js
import { users, filters, recentMatches }   from './data/member1.js';
import { chatMessages, generalMessages }   from './data/member2.js';
import { stats, features, kpis, reports,
         schedulePattern, scheduleHours,
         scheduleDays, dauChart }          from './data/member3.js';
```

`index.html`-д **module** төрлөөр оруулна:

```html
<script type="module" src="numconnect.js"></script>
```

## Load хийх процесс

1. Browser `<script type="module">`-г уншиж байна
2. `numconnect.js` нь 3 файлаас `import` хийнэ
3. `DOMContentLoaded` event-д `initApp()` ажиллаж бүх `render*()`-г дуудна
4. Render функц бүр `Array.map()`, destructuring, template literal ашиглан JSON-г HTML болгож DOM-д залгана

## Ажиллуулах

ES6 module нь `file://`-р шууд ажиллахгүй (CORS). Локал HTTP сервер хэрэгтэй:

```bash
# Python (хамгийн хялбар)
cd lab4
python -m http.server 8000

# эсвэл Node (npx serve)
npx serve lab4
```

Дараа нь http://localhost:8000-г нээнэ.

## Багийн гишүүдийн хариуцсан өгөгдөл

| Гишүүн | Файл | Export |
|--------|------|--------|
| **Төгөлдөр** (1) | `data/member1.js` | `users`, `filters`, `recentMatches` |
| **Баасанбат** (2) | `data/member2.js` | `chatMessages`, `generalMessages` |
| **Хүдэрчулуун** (3) | `data/member3.js` | `stats`, `features`, `kpis`, `reports`, `schedulePattern`, `scheduleHours`, `scheduleDays`, `dauChart` |

## Render-д ашигласан ES6 features

- `import` / `export` (модуль систем)
- Arrow functions: `const renderStats = () => {...}`
- Destructuring: `({ value, label }) => ...`
- Template literals: `` `<span>${value}</span>` ``
- Array methods: `.map()`, `.filter()`, `.reduce()`, `.sort()`, `for...of`
- Spread: `[...users].sort(...)`
- Optional chaining: `b.getAttribute('onclick')?.includes(...)`
- Nullish coalescing: `time ?? ''`
- `Object.fromEntries()` + `Object.entries()`
