// ══════════════════════════════════════════════════════════════
//  ГИШҮҮН 1 — Хэрэглэгч / Discover API
// ══════════════════════════════════════════════════════════════
import { Router } from 'express';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, '..', 'data');
const loadJson = (file) => JSON.parse(readFileSync(resolve(dataDir, file), 'utf8'));

// ─── Эхлэхэд нэг л удаа уншина (статик data) ──────────────────
const USERS          = loadJson('users.json');
const FILTERS        = loadJson('filters.json');
const RECENT_MATCHES = loadJson('recent-matches.json');

const EMAIL_RE = /^[\w.+-]+@num\.edu\.mn$/i;
const OTP_RE   = /^\d{6}$/;

const router = Router();

// GET /api/users — бүх хэрэглэгч (шүүлтүүртэй)
// Жишээ: /api/users?online=true&plan=premium&major=Программ
router.get('/users', (req, res) => {
  const { online, plan, major, year } = req.query;
  let users = USERS;

  if (online !== undefined) {
    const want = online === 'true';
    users = users.filter(u => u.online === want);
  }
  if (plan)  users = users.filter(u => u.plan === plan);
  if (major) users = users.filter(u => u.major.includes(major));
  if (year)  users = users.filter(u => u.year.includes(year));

  res.json({ count: users.length, data: users });
});

// GET /api/users/:id — нэг хэрэглэгчийн дэлгэрэнгүй
router.get('/users/:id', (req, res) => {
  const user = USERS.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'Хэрэглэгч олдсонгүй' });
  res.json(user);
});

// GET /api/users/:id/tags — хэрэглэгчийн сонирхол
router.get('/users/:id/tags', (req, res) => {
  const user = USERS.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'Хэрэглэгч олдсонгүй' });
  res.json({ id: user.id, tags: user.tags });
});

// GET /api/filters — Discover хуудасны шүүлтүүрүүд
router.get('/filters', (_req, res) => res.json(FILTERS));

// GET /api/matches/recent — сүүлд холбогдсон хэрэглэгчид
router.get('/matches/recent', (_req, res) => res.json(RECENT_MATCHES));

// ─── Authentication (mock — DB байхгүй) ──────────────────────

// POST /api/auth/login — email шалгаад OTP илгээх
router.post('/auth/login', (req, res) => {
  const { email } = req.body || {};
  if (!email)             return res.status(400).json({ error: 'Email шаардлагатай' });
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: '@num.edu.mn хаяг шаардлагатай' });

  res.json({
    success: true,
    email,
    otpSentTo: email,
    expiresIn: 300,
    message: 'OTP код илгээгдлээ'
  });
});

// POST /api/auth/verify — OTP код шалгах
router.post('/auth/verify', (req, res) => {
  const { email, code } = req.body || {};
  if (!email || !code)       return res.status(400).json({ error: 'Email, code шаардлагатай' });
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: '@num.edu.mn хаяг шаардлагатай' });
  if (!OTP_RE.test(code))    return res.status(400).json({ error: 'OTP 6 оронтой байх ёстой' });

  res.json({
    success: true,
    email,
    token: 'mock-jwt-token-' + Date.now(),
    user: { id: 'me', name: 'Шинэ хэрэглэгч' }
  });
});

// GET /api/users/:id/match — тухайн хэрэглэгчтэй match score тооцох
router.get('/users/:id/match', (req, res) => {
  const user = USERS.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'Хэрэглэгч олдсонгүй' });

  res.json({
    userId:      user.id,
    name:        user.name,
    score:       user.score,
    commonHours: user.commonHours,
    sharedTags:  user.tags.slice(0, 3),
    online:      user.online
  });
});

export default router;
