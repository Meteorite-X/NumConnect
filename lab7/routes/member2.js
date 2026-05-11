// ══════════════════════════════════════════════════════════════
//  ГИШҮҮН 2 — Чат / Мессеж API (MongoDB)
// ══════════════════════════════════════════════════════════════
import { Router } from 'express';
import Message        from '../models/Message.js';
import GeneralMessage from '../models/GeneralMessage.js';

const nowTs = () => {
  const d = new Date();
  return d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
};

const router = Router();

// GET /api/chat/messages — анхдагч чат (Энхтуяа)
router.get('/chat/messages', async (_req, res, next) => {
  try {
    const msgs = await Message.find({ userId: 'enkh' }).sort({ createdAt: 1 }).lean();
    res.json(msgs);
  } catch (err) { next(err); }
});

// GET /api/chat/:userId/messages
router.get('/chat/:userId/messages', async (req, res, next) => {
  try {
    const msgs = await Message.find({ userId: req.params.userId }).sort({ createdAt: 1 }).lean();
    if (!msgs.length) return res.status(404).json({ error: 'Чатын түүх олдсонгүй' });
    res.json({ userId: req.params.userId, count: msgs.length, data: msgs });
  } catch (err) { next(err); }
});

// POST /api/chat/:userId/messages
router.post('/chat/:userId/messages', async (req, res, next) => {
  try {
    const { text } = req.body || {};
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Мессежийн текст хоосон байна' });
    }
    const msg = await Message.create({
      userId: req.params.userId,
      sender: 'Би',
      av: '😊',
      time: nowTs(),
      text: text.trim(),
      me: true
    });
    res.status(201).json(msg);
  } catch (err) { next(err); }
});

// DELETE /api/chat/:userId/messages
router.delete('/chat/:userId/messages', async (req, res, next) => {
  try {
    const result = await Message.deleteMany({ userId: req.params.userId });
    if (!result.deletedCount) {
      return res.status(404).json({ error: 'Чат олдсонгүй' });
    }
    res.json({ success: true, removed: result.deletedCount, userId: req.params.userId });
  } catch (err) { next(err); }
});

// GET /api/chat/threads — нийт яриа
router.get('/chat/threads', async (_req, res, next) => {
  try {
    const threads = await Message.aggregate([
      { $sort: { createdAt: 1 } },
      { $group: {
          _id: '$userId',
          count: { $sum: 1 },
          last: { $last: '$$ROOT' }
      }},
      { $project: { _id: 0, userId: '$_id', count: 1, last: 1 } }
    ]);
    res.json({ count: threads.length, data: threads });
  } catch (err) { next(err); }
});

// GET /api/general/messages
router.get('/general/messages', async (_req, res, next) => {
  try {
    const msgs = await GeneralMessage.find().sort({ createdAt: 1 }).lean();
    res.json(msgs);
  } catch (err) { next(err); }
});

// POST /api/general/messages
router.post('/general/messages', async (req, res, next) => {
  try {
    const { text, name = 'Би', av = '😊' } = req.body || {};
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Мессежийн текст хоосон байна' });
    }
    const msg = await GeneralMessage.create({
      name, av,
      time: nowTs(),
      text: text.trim(),
      clickable: false
    });
    res.status(201).json(msg);
  } catch (err) { next(err); }
});

export default router;
