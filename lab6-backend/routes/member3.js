// ══════════════════════════════════════════════════════════════
//  ГИШҮҮН 3 — Landing / Admin / Schedule API
// ══════════════════════════════════════════════════════════════
import { Router } from 'express';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, '..', 'data');
const loadJson = (file) => JSON.parse(readFileSync(resolve(dataDir, file), 'utf8'));

// ─── Эхлэхэд нэг л удаа уншина (статик data) ──────────────────
const STATS    = loadJson('stats.json');
const FEATURES = loadJson('features.json');
const KPIS     = loadJson('kpis.json');
const REPORTS  = loadJson('reports.json');
const DAU      = loadJson('dau.json');
const SCHEDULE = loadJson('schedule.json');
const PLANS    = loadJson('plans.json');

const router = Router();

// ─── Landing ─────────────────────────────────────────────────
router.get('/stats',    (_req, res) => res.json(STATS));
router.get('/features', (_req, res) => res.json(FEATURES));

// ─── Admin ───────────────────────────────────────────────────
router.get('/admin/kpis', (_req, res) => res.json(KPIS));

// GET /api/admin/reports — Жишээ: ?status=open
router.get('/admin/reports', (req, res) => {
  const reports = req.query.status
    ? REPORTS.filter(r => r.status === req.query.status)
    : REPORTS;
  res.json({ count: reports.length, data: reports });
});

router.get('/admin/reports/:id', (req, res) => {
  const report = REPORTS.find(r => r.id === req.params.id);
  if (!report) return res.status(404).json({ error: 'Гомдол олдсонгүй' });
  res.json(report);
});

router.get('/admin/dau', (_req, res) => res.json(DAU));

// ─── Schedule ────────────────────────────────────────────────
router.get('/schedule/template', (_req, res) => res.json({
  days:     SCHEDULE.days,
  hours:    SCHEDULE.hours,
  template: SCHEDULE.template
}));
router.get('/schedule/days',  (_req, res) => res.json(SCHEDULE.days));
router.get('/schedule/hours', (_req, res) => res.json(SCHEDULE.hours));

// ─── Premium багц ────────────────────────────────────────────
router.get('/premium/plans', (_req, res) => res.json(PLANS));

router.get('/premium/plans/:id', (req, res) => {
  const plan = PLANS.find(p => p.id === req.params.id);
  if (!plan) return res.status(404).json({ error: 'Багц олдсонгүй' });
  res.json(plan);
});

export default router;
