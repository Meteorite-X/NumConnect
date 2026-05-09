// ══════════════════════════════════════════════════════════════
//  ГИШҮҮН 2 — Чат / Мессеж API
// ══════════════════════════════════════════════════════════════
import { Router } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, '..', 'data');

const loadJson = (file) => JSON.parse(readFileSync(resolve(dataDir, file), 'utf8'));
const saveJson = (file, data) => writeFileSync(resolve(dataDir, file), JSON.stringify(data, null, 2), 'utf8');

const nowTs = () => {
  const d = new Date();
  return d.getHours() + ':' + String(d.getMinutes()).padStart(2,'0');
};

const router = Router();

// GET /api/chat/messages — анхдагч идэвхтэй чатын мессеж (Энхтуяа)
router.get('/chat/messages', (req, res) => {
  const all = loadJson('messages.json');
  res.json(all['enkh'] || []);
});

// GET /api/chat/:userId/messages — тухайн хэрэглэгчтэй чатлах түүх
router.get('/chat/:userId/messages', (req, res) => {
  const all = loadJson('messages.json');
  const msgs = all[req.params.userId];
  if (!msgs) return res.status(404).json({ error: 'Чатын түүх олдсонгүй' });
  res.json({ userId: req.params.userId, count: msgs.length, data: msgs });
});

// POST /api/chat/:userId/messages — шинэ мессеж илгээх
router.post('/chat/:userId/messages', (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Мессежийн текст хоосон байна' });
  }
  const all = loadJson('messages.json');
  const userId = req.params.userId;
  if (!all[userId]) all[userId] = [];

  const newMsg = {
    sender: 'Би',
    av: '😊',
    time: nowTs(),
    text: text.trim(),
    me: true
  };
  all[userId].push(newMsg);
  saveJson('messages.json', all);

  res.status(201).json(newMsg);
});

// GET /api/general/messages — # general сувгийн мессежүүд
router.get('/general/messages', (req, res) => {
  res.json(loadJson('general.json'));
});

// POST /api/general/messages — # general сувагт нийтлэх
router.post('/general/messages', (req, res) => {
  const { text, name = 'Би', av = '😊' } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Мессежийн текст хоосон байна' });
  }
  const all = loadJson('general.json');
  const newMsg = {
    name,
    av,
    time: nowTs(),
    text: text.trim(),
    clickable: false
  };
  all.push(newMsg);
  saveJson('general.json', all);

  res.status(201).json(newMsg);
});

// DELETE /api/chat/:userId/messages — тухайн чатын түүхийг бүгдийг арилгах
router.delete('/chat/:userId/messages', (req, res) => {
  const all = loadJson('messages.json');
  if (!all[req.params.userId]) {
    return res.status(404).json({ error: 'Чат олдсонгүй' });
  }
  const removed = all[req.params.userId].length;
  all[req.params.userId] = [];
  saveJson('messages.json', all);
  res.json({ success: true, removed, userId: req.params.userId });
});

// GET /api/chat/threads — нийт яриануудын товч жагсаалт
router.get('/chat/threads', (req, res) => {
  const all = loadJson('messages.json');
  const threads = Object.entries(all).map(([userId, msgs]) => ({
    userId,
    count: msgs.length,
    last:  msgs[msgs.length - 1] || null
  }));
  res.json({ count: threads.length, data: threads });
});

export default router;
