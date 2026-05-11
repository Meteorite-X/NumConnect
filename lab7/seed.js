// ══════════════════════════════════════════════════════════════
//  Seed script: data/*.json → MongoDB
//  Хэрэглээ: npm run seed
// ══════════════════════════════════════════════════════════════
import 'dotenv/config';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './db.js';
import mongoose from 'mongoose';

import User           from './models/User.js';
import Filter         from './models/Filter.js';
import RecentMatch    from './models/RecentMatch.js';
import Message        from './models/Message.js';
import GeneralMessage from './models/GeneralMessage.js';
import Stat           from './models/Stat.js';
import Feature        from './models/Feature.js';
import KPI            from './models/KPI.js';
import Report         from './models/Report.js';
import DAU            from './models/DAU.js';
import ScheduleConfig from './models/ScheduleConfig.js';
import Plan           from './models/Plan.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, 'data');
const loadJson = (file) => JSON.parse(readFileSync(resolve(dataDir, file), 'utf8'));

async function seed() {
  await connectDB();
  console.log('→ Seeding эхэллээ...\n');

  // ─── Гишүүн 1: Users, Filters, RecentMatches ───────────────
  const users = loadJson('users.json');
  await User.deleteMany({});
  await User.insertMany(users);
  console.log(`✓ Users: ${users.length}`);

  const filters = loadJson('filters.json').map((f, i) => ({ ...f, order: i }));
  await Filter.deleteMany({});
  await Filter.insertMany(filters);
  console.log(`✓ Filters: ${filters.length}`);

  const recentMatches = loadJson('recent-matches.json');
  await RecentMatch.deleteMany({});
  await RecentMatch.insertMany(recentMatches);
  console.log(`✓ RecentMatches: ${recentMatches.length}`);

  // ─── Гишүүн 2: Messages, GeneralMessages ───────────────────
  const messagesByUser = loadJson('messages.json');
  const flatMessages = Object.entries(messagesByUser).flatMap(
    ([userId, msgs]) => msgs.map(m => ({ ...m, userId }))
  );
  await Message.deleteMany({});
  await Message.insertMany(flatMessages);
  console.log(`✓ Messages: ${flatMessages.length}`);

  const general = loadJson('general.json');
  await GeneralMessage.deleteMany({});
  await GeneralMessage.insertMany(general);
  console.log(`✓ GeneralMessages: ${general.length}`);

  // ─── Гишүүн 3: Landing/Admin/Schedule/Premium ──────────────
  const stats = loadJson('stats.json').map((s, i) => ({ ...s, order: i }));
  await Stat.deleteMany({});
  await Stat.insertMany(stats);
  console.log(`✓ Stats: ${stats.length}`);

  const features = loadJson('features.json').map((f, i) => ({ ...f, order: i }));
  await Feature.deleteMany({});
  await Feature.insertMany(features);
  console.log(`✓ Features: ${features.length}`);

  const kpis = loadJson('kpis.json');
  await KPI.deleteMany({});
  await KPI.insertMany(kpis);
  console.log(`✓ KPIs: ${kpis.length}`);

  const reports = loadJson('reports.json');
  await Report.deleteMany({});
  await Report.insertMany(reports);
  console.log(`✓ Reports: ${reports.length}`);

  const dau = loadJson('dau.json').map((d, i) => ({ ...d, order: i }));
  await DAU.deleteMany({});
  await DAU.insertMany(dau);
  console.log(`✓ DAU: ${dau.length}`);

  const schedule = loadJson('schedule.json');
  await ScheduleConfig.deleteMany({});
  await ScheduleConfig.create({ key: 'default', ...schedule });
  console.log(`✓ ScheduleConfig: 1 (template ${schedule.template.length}×${schedule.template[0].length})`);

  const plans = loadJson('plans.json');
  await Plan.deleteMany({});
  await Plan.insertMany(plans);
  console.log(`✓ Plans: ${plans.length}`);

  console.log('\n✓ Seeding амжилттай дууссан');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('✗ Seeding алдаа:', err);
  process.exit(1);
});
