// ══════════════════════════════════════════════════════════════
//  ГИШҮҮН 1 — Хэрэглэгч / Discover API (MongoDB)
// ══════════════════════════════════════════════════════════════
import { Router } from 'express';
import User        from '../models/User.js';
import Filter      from '../models/Filter.js';
import RecentMatch from '../models/RecentMatch.js';

const EMAIL_RE = /^[\w.+-]+@num\.edu\.mn$/i;
const OTP_RE   = /^\d{6}$/;

const router = Router();

// GET /api/users — бүх хэрэглэгч (шүүлтүүртэй)
router.get('/users', async (req, res, next) => {
  try {
    const { online, plan, major, year } = req.query;
    const filter = {};

    if (online !== undefined) filter.online = online === 'true';
    if (plan)  filter.plan  = plan;
    if (major) filter.major = { $regex: major, $options: 'i' };
    if (year)  filter.year  = { $regex: year,  $options: 'i' };

    const users = await User.find(filter).lean();
    res.json({ count: users.length, data: users });
  } catch (err) { next(err); }
});

// GET /api/users/:id — нэг хэрэглэгчийн дэлгэрэнгүй
router.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.params.id }).lean();
    if (!user) return res.status(404).json({ error: 'Хэрэглэгч олдсонгүй' });
    res.json(user);
  } catch (err) { next(err); }
});

// GET /api/users/:id/tags
router.get('/users/:id/tags', async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.params.id }, 'id tags').lean();
    if (!user) return res.status(404).json({ error: 'Хэрэглэгч олдсонгүй' });
    res.json(user);
  } catch (err) { next(err); }
});

// GET /api/users/:id/match
router.get('/users/:id/match', async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.params.id }).lean();
    if (!user) return res.status(404).json({ error: 'Хэрэглэгч олдсонгүй' });
    res.json({
      userId:      user.id,
      name:        user.name,
      score:       user.score,
      commonHours: user.commonHours,
      sharedTags:  (user.tags || []).slice(0, 3),
      online:      user.online
    });
  } catch (err) { next(err); }
});

// GET /api/filters
router.get('/filters', async (_req, res, next) => {
  try {
    const filters = await Filter.find().sort({ order: 1 }).lean();
    res.json(filters);
  } catch (err) { next(err); }
});

// GET /api/matches/recent
router.get('/matches/recent', async (_req, res, next) => {
  try {
    const matches = await RecentMatch.find().lean();
    res.json(matches);
  } catch (err) { next(err); }
});

// ─── Auth (mock) ─────────────────────────────────────────────
router.post('/auth/login', (req, res) => {
  const { email } = req.body || {};
  if (!email)               return res.status(400).json({ error: 'Email шаардлагатай' });
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: '@num.edu.mn хаяг шаардлагатай' });

  res.json({ success: true, email, otpSentTo: email, expiresIn: 300, message: 'OTP илгээгдлээ' });
});

router.post('/auth/verify', (req, res) => {
  const { email, code } = req.body || {};
  if (!email || !code)        return res.status(400).json({ error: 'Email, code шаардлагатай' });
  if (!EMAIL_RE.test(email))  return res.status(400).json({ error: '@num.edu.mn хаяг шаардлагатай' });
  if (!OTP_RE.test(code))     return res.status(400).json({ error: 'OTP 6 оронтой байх ёстой' });

  res.json({
    success: true, email,
    token: 'mock-jwt-token-' + Date.now(),
    user: { id: 'me', name: 'Шинэ хэрэглэгч' }
  });
});

export default router;
