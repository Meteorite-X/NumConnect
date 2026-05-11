// ══════════════════════════════════════════════════════════════
//  NumConnect Back-end v2 — Express.js + MongoDB (Лаб 7)
// ══════════════════════════════════════════════════════════════
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './db.js';
import member1 from './routes/member1.js';
import member2 from './routes/member2.js';
import member3 from './routes/member3.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '100kb' }));
app.use(express.static(resolve(__dirname, 'public')));

if (process.env.NODE_ENV !== 'production') {
  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
}

// API routes
app.use('/api', member1);
app.use('/api', member2);
app.use('/api', member3);

// Үндсэн хариу
app.get('/', (req, res) => {
  res.json({
    name: 'NumConnect API (Mongo)',
    version: '2.0.0',
    dashboard: `http://localhost:${PORT}/dashboard.html`,
    storage: 'MongoDB (Mongoose)',
    endpoints: {
      member1: ['GET /api/users', 'GET /api/users/:id', 'GET /api/users/:id/tags',
                'GET /api/users/:id/match', 'GET /api/filters', 'GET /api/matches/recent',
                'POST /api/auth/login', 'POST /api/auth/verify'],
      member2: ['GET /api/chat/threads', 'GET /api/chat/messages',
                'GET /api/chat/:userId/messages', 'POST /api/chat/:userId/messages',
                'DELETE /api/chat/:userId/messages',
                'GET /api/general/messages', 'POST /api/general/messages'],
      member3: ['GET /api/stats', 'GET /api/features', 'GET /api/admin/kpis',
                'GET /api/admin/reports', 'GET /api/admin/reports/:id',
                'GET /api/admin/dau', 'GET /api/schedule/template',
                'GET /api/schedule/days', 'GET /api/schedule/hours',
                'GET /api/premium/plans', 'GET /api/premium/plans/:id']
    }
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint олдсонгүй', path: req.url });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Серверийн алдаа', message: err.message });
});

// Эхлээд DB-д холбогдоод дараа нь HTTP server асаана
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✓ NumConnect API:  http://localhost:${PORT}`);
      console.log(`✓ Endpoint жагсаалт: http://localhost:${PORT}/`);
      console.log(`✓ Test dashboard:   http://localhost:${PORT}/dashboard.html`);
    });
  })
  .catch(err => {
    console.error('✗ DB холбогдож чадсангүй:', err.message);
    process.exit(1);
  });
