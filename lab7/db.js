// ══════════════════════════════════════════════════════════════
//  MongoDB холболт (Mongoose)
// ══════════════════════════════════════════════════════════════
import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI тохиргоо алга. .env файл шалгана уу.');
  }

  mongoose.connection.on('connected', () => {
    console.log(`✓ MongoDB холбогдсон: ${mongoose.connection.host}/${mongoose.connection.name}`);
  });
  mongoose.connection.on('error', (err) => {
    console.error('✗ MongoDB алдаа:', err.message);
  });
  mongoose.connection.on('disconnected', () => {
    console.warn('⚠ MongoDB салав');
  });

  await mongoose.connect(uri);
}
