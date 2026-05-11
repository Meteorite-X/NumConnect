// ══════════════════════════════════════════════════════════════
//  ГИШҮҮН 3 — Landing / Admin / Schedule API (MongoDB)
// ══════════════════════════════════════════════════════════════
import { Router } from 'express';
import Stat            from '../models/Stat.js';
import Feature         from '../models/Feature.js';
import KPI             from '../models/KPI.js';
import Report          from '../models/Report.js';
import DAU             from '../models/DAU.js';
import ScheduleConfig  from '../models/ScheduleConfig.js';
import Plan            from '../models/Plan.js';

const router = Router();

// ─── Landing ─────────────────────────────────────────────────
router.get('/stats', async (_req, res, next) => {
  try { res.json(await Stat.find().sort({ order: 1 }).lean()); }
  catch (err) { next(err); }
});

router.get('/features', async (_req, res, next) => {
  try { res.json(await Feature.find().sort({ order: 1 }).lean()); }
  catch (err) { next(err); }
});

// ─── Admin ───────────────────────────────────────────────────
router.get('/admin/kpis', async (_req, res, next) => {
  try { res.json(await KPI.find().lean()); }
  catch (err) { next(err); }
});

router.get('/admin/reports', async (req, res, next) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};
    const reports = await Report.find(filter).lean();
    res.json({ count: reports.length, data: reports });
  } catch (err) { next(err); }
});

router.get('/admin/reports/:id', async (req, res, next) => {
  try {
    const report = await Report.findOne({ id: req.params.id }).lean();
    if (!report) return res.status(404).json({ error: 'Гомдол олдсонгүй' });
    res.json(report);
  } catch (err) { next(err); }
});

router.get('/admin/dau', async (_req, res, next) => {
  try { res.json(await DAU.find().sort({ order: 1 }).lean()); }
  catch (err) { next(err); }
});

// ─── Schedule ────────────────────────────────────────────────
router.get('/schedule/template', async (_req, res, next) => {
  try {
    const sched = await ScheduleConfig.findOne({ key: 'default' }).lean();
    if (!sched) return res.status(404).json({ error: 'Хуваарийн загвар олдсонгүй' });
    res.json({ days: sched.days, hours: sched.hours, template: sched.template });
  } catch (err) { next(err); }
});

router.get('/schedule/days', async (_req, res, next) => {
  try {
    const sched = await ScheduleConfig.findOne({ key: 'default' }, 'days').lean();
    res.json(sched?.days || []);
  } catch (err) { next(err); }
});

router.get('/schedule/hours', async (_req, res, next) => {
  try {
    const sched = await ScheduleConfig.findOne({ key: 'default' }, 'hours').lean();
    res.json(sched?.hours || []);
  } catch (err) { next(err); }
});

// ─── Premium багц ────────────────────────────────────────────
router.get('/premium/plans', async (_req, res, next) => {
  try { res.json(await Plan.find().lean()); }
  catch (err) { next(err); }
});

router.get('/premium/plans/:id', async (req, res, next) => {
  try {
    const plan = await Plan.findOne({ id: req.params.id }).lean();
    if (!plan) return res.status(404).json({ error: 'Багц олдсонгүй' });
    res.json(plan);
  } catch (err) { next(err); }
});

export default router;
