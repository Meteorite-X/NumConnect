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

const router = Router();

// ─── Landing ─────────────────────────────────────────────────
// GET /api/stats
router.get('/stats', (req, res) => {
  res.json(loadJson('stats.json'));
});

// GET /api/features
router.get('/features', (req, res) => {
  res.json(loadJson('features.json'));
});

// ─── Admin ───────────────────────────────────────────────────
// GET /api/admin/kpis
router.get('/admin/kpis', (req, res) => {
  res.json(loadJson('kpis.json'));
});

// GET /api/admin/reports
// Жишээ: /api/admin/reports?status=open
router.get('/admin/reports', (req, res) => {
  let reports = loadJson('reports.json');
  if (req.query.status) {
    reports = reports.filter(r => r.status === req.query.status);
  }
  res.json({ count: reports.length, data: reports });
});

// GET /api/admin/reports/:id
router.get('/admin/reports/:id', (req, res) => {
  const reports = loadJson('reports.json');
  const report = reports.find(r => r.id === req.params.id);
  if (!report) return res.status(404).json({ error: 'Гомдол олдсонгүй' });
  res.json(report);
});

// GET /api/admin/dau
router.get('/admin/dau', (req, res) => {
  res.json(loadJson('dau.json'));
});

// ─── Schedule ────────────────────────────────────────────────
// GET /api/schedule/template
router.get('/schedule/template', (req, res) => {
  const sched = loadJson('schedule.json');
  res.json({
    days:     sched.days,
    hours:    sched.hours,
    template: sched.template
  });
});

// GET /api/schedule/days
router.get('/schedule/days', (req, res) => {
  const sched = loadJson('schedule.json');
  res.json(sched.days);
});

// GET /api/schedule/hours
router.get('/schedule/hours', (req, res) => {
  const sched = loadJson('schedule.json');
  res.json(sched.hours);
});

// ─── Premium багц ────────────────────────────────────────────
// GET /api/premium/plans
router.get('/premium/plans', (req, res) => {
  res.json(loadJson('plans.json'));
});

// GET /api/premium/plans/:id
router.get('/premium/plans/:id', (req, res) => {
  const plans = loadJson('plans.json');
  const plan = plans.find(p => p.id === req.params.id);
  if (!plan) return res.status(404).json({ error: 'Багц олдсонгүй' });
  res.json(plan);
});

export default router;
