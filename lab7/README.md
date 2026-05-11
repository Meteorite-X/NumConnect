# Лаб 7 — DB Integration (MongoDB + Mongoose)

NumConnect-ийн backend API-ийг **MongoDB Atlas** өгөгдлийн сантай холбож, Mongoose ODM-ээр дамжуулан өгөгдөл уншиж/бичих болгосон хувилбар.

> Лаб 6-аас ялгаа: static JSON файл — болиод, **жинхэнэ DB** ашиглана.

## Бүтэц

```
lab7/
├── .env.example         # MONGODB_URI placeholder
├── .gitignore
├── package.json         # mongoose, dotenv нэмсэн
├── server.js            # connectDB() → app.listen()
├── db.js                # mongoose.connect() холболт
├── seed.js              # data/*.json → MongoDB шилжүүлэх script
├── models/              # 12 Mongoose schema
│   ├── User.js, Filter.js, RecentMatch.js
│   ├── Message.js, GeneralMessage.js
│   ├── Stat.js, Feature.js, KPI.js, Report.js,
│   └── DAU.js, ScheduleConfig.js, Plan.js
├── routes/              # async/await + Mongoose query
│   ├── member1.js (Төгөлдөр)
│   ├── member2.js (Баасанбат)
│   └── member3.js (Хүдэрчулуун)
├── data/                # анхны seed эх (lab6-той ижил)
└── public/dashboard.html
```

## Тохиргоо (MongoDB Atlas)

1. <https://cloud.mongodb.com/> хаягт нэвтрэх (Google Sign-In-р шууд)
2. **Build a Database** → **M0 FREE** сонгож cluster үүсгэх (Mongolia/Asia Pacific region)
3. **Database Access** → New User → username + password
4. **Network Access** → Add IP Address → `0.0.0.0/0` (демо зориулалтаар)
5. **Connect** → **Drivers** → "Node.js" → connection string-г хуулах:
   ```
   mongodb+srv://USERNAME:PASSWORD@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. URL-н төгсгөлд `/numconnect` (DB нэр) нэмж өг:
   ```
   mongodb+srv://USERNAME:PASSWORD@cluster0.xxxx.mongodb.net/numconnect?retryWrites=true&w=majority
   ```

## Суулгах ба ажиллуулах

```bash
cd lab7
npm install                          # mongoose, express, cors, dotenv
cp .env.example .env                 # дараа нь .env-д өөрийн MONGODB_URI-г хуулна
```

`.env` файлыг нээж засна:
```
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxx.mongodb.net/numconnect?retryWrites=true&w=majority
PORT=3000
NODE_ENV=development
```

### 1. Өгөгдлийг DB рүү ачаалах (seed)

```bash
npm run seed
```

Гаралт:
```
✓ MongoDB холбогдсон: cluster0-shard-00-00.xxxx.mongodb.net/numconnect
→ Seeding эхэллээ...
✓ Users: 7
✓ Filters: 7
✓ RecentMatches: 3
✓ Messages: 5
✓ GeneralMessages: 8
✓ Stats: 3
✓ Features: 3
✓ KPIs: 4
✓ Reports: 3
✓ DAU: 7
✓ ScheduleConfig: 1
✓ Plans: 3
✓ Seeding амжилттай дууссан
```

### 2. Сервер асаах

```bash
npm start              # production
npm run dev            # development (auto-reload)
```

→ http://localhost:3000
→ http://localhost:3000/dashboard.html (browser-аас 26 endpoint тестлэх)

## Mongoose Schemas

12 collection-ийг **strict schema**-р зохион байгуулсан:

| Model              | Collection         | Гишүүн | Хариуцлага                  |
|--------------------|--------------------|--------|------------------------------|
| `User`             | `users`            | 1      | хэрэглэгчийн профайл         |
| `Filter`           | `filters`          | 1      | Discover-ын chip-үүд         |
| `RecentMatch`      | `recentmatches`    | 1      | сүүлд холбогдсон             |
| `Message`          | `messages`         | 2      | хувийн чат (userId-р индекс) |
| `GeneralMessage`   | `generalmessages`  | 2      | # general суваг              |
| `Stat`             | `stats`            | 3      | Landing статистик            |
| `Feature`          | `features`         | 3      | Landing онцлог               |
| `KPI`              | `kpis`             | 3      | Admin KPI                    |
| `Report`           | `reports`          | 3      | Admin гомдол                 |
| `DAU`              | `daus`             | 3      | DAU график                   |
| `ScheduleConfig`   | `scheduleconfigs`  | 3      | хуваарийн загвар (singleton) |
| `Plan`             | `plans`            | 3      | Premium багц                 |

### Жишээ schema (`models/User.js`)

```js
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  id:          { type: String, required: true, unique: true, index: true },
  name:        { type: String, required: true },
  age:         Number,
  online:      { type: Boolean, default: false },
  plan:        { type: String, enum: ['free', 'premium'], default: 'free' },
  tags:        [String],
  // ...
}, { timestamps: true });

export default model('User', userSchema);
```

## Route жишээ (async + Mongoose)

```js
// routes/member1.js
import User from '../models/User.js';

router.get('/users', async (req, res, next) => {
  try {
    const { online, plan } = req.query;
    const filter = {};
    if (online !== undefined) filter.online = online === 'true';
    if (plan) filter.plan = plan;

    const users = await User.find(filter).lean();
    res.json({ count: users.length, data: users });
  } catch (err) { next(err); }
});

router.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.params.id }).lean();
    if (!user) return res.status(404).json({ error: 'Хэрэглэгч олдсонгүй' });
    res.json(user);
  } catch (err) { next(err); }
});
```

## Endpoint жагсаалт

Лаб 6-той бүрэн адил **26 endpoint**. Зөвхөн өгөгдлийн эх **JSON-аас → MongoDB** болов. URL дизайн, HTTP verb, query string ижил.

## Frontend холбоо (lab5-react)

`lab5-react/src/api.js` + `src/hooks/useApi.js` ашиглан бүх компонент **backend-аас fetch** хийдэг болсон. Backend унтарсан үед локал data руу буцна (fallback).

```jsx
// Landing.jsx
import { useApi } from '../hooks/useApi.js';
import { stats as localStats } from '../data/member3.js';

export default function Landing() {
  const { data: stats } = useApi('/api/stats', localStats);
  return stats.map(s => <div>{s.value} — {s.label}</div>);
}
```

## Тест dashboard

http://localhost:3000/dashboard.html — Лаб 6-той ижил. Endpoint бүрд click → JSON хариу.

DB-аас өгөгдөл ирж байгаа эсэхийг шалгах хялбар арга:

```bash
# users.json дотор Номинчимэг score 87 байна
curl http://localhost:3000/api/users/nomin
```

MongoDB Atlas → **Collections** хэсэгт орж тэр баримтыг өөрчилбөл API хариу шууд өөрчлөгдөнө.

## Багийн гишүүдийн хариуцлага

| Гишүүн             | Models                                                | Routes        |
|--------------------|-------------------------------------------------------|---------------|
| **1 — Төгөлдөр**   | User, Filter, RecentMatch                             | `member1.js`  |
| **2 — Баасанбат**  | Message, GeneralMessage                               | `member2.js`  |
| **3 — Хүдэрчулуун**| Stat, Feature, KPI, Report, DAU, ScheduleConfig, Plan | `member3.js`  |
