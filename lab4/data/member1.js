// ══════════════════════════════════════════════════════════════
//  ГИШҮҮН 1 — Хэрэглэгч, Discover өгөгдөл
// ══════════════════════════════════════════════════════════════

export const users = [
  { id: "nomin",   name: "Номинчимэг", age: 21, av: "👩‍💻", mbti: "INTJ", major: "Программ хангамж", year: "3-р курс", score: 87, online: true,  email: "nomin@num.edu.mn",  plan: "premium", status: "active",   tags: ["💻 Код", "📚 Судалгаа", "☕ Кофе", "🤖 AI"],              bio: "React болон ML-д сонирхолтой.",           commonHours: 14, gradient: ["var(--accent-lt)","var(--accent)"]   },
  { id: "enkh",    name: "Энхтуяа",    age: 19, av: "👩‍🎨", mbti: "ENFP", major: "Дизайн",           year: "1-р курс", score: 79, online: true,  email: "enkh@num.edu.mn",   plan: "free",    status: "reported", tags: ["🎨 Дизайн", "📸 Фото", "🎬 Кино", "☕ Кофе"],             bio: "UI/UX дизайнд сонирхолтой.",             commonHours: 11, gradient: ["var(--purple-bg)","#C4B5FD"]      },
  { id: "bat",     name: "Батмөнх",    age: 20, av: "🧑‍🔬", mbti: "INFP", major: "Эдийн засаг",      year: "2-р курс", score: 72, online: true,  email: "bat@num.edu.mn",    plan: "free",    status: "active",   tags: ["🔬 Судалгаа", "📖 Уншлага", "🎵 Хөгжим", "♟️ Chess"],    bio: "Статистик, өгөгдөл шинжилгээнд дуртай.", commonHours: 9,  gradient: ["var(--ok-bg)","#6EE7B7"]          },
  { id: "tem",     name: "Тэмүүлэн",   age: 22, av: "🧑‍💼", mbti: "ENTJ", major: "Бизнес",           year: "4-р курс", score: 65, online: false, email: "tem@num.edu.mn",    plan: "free",    status: "active",   tags: ["💼 Бизнес", "🗣️ Хэл", "🏃 Гүйлт", "📊 Санхүү"],         bio: "Startup founder зорилготой.",             commonHours: 7,  gradient: ["var(--purple-bg)","#C4B5FD"]      },
  { id: "oyun",    name: "Оюунцэцэг",  age: 20, av: "👩‍💻", mbti: "ISFJ", major: "Математик",        year: "2-р курс", score: 61, online: false, email: "oyun@num.edu.mn",   plan: "free",    status: "active",   tags: ["📐 Математик", "📚 Уншлага", "🍵 Цай"],                   bio: "Олимпиадын математикаар оролцдог.",       commonHours: 6,  gradient: ["var(--bg)","var(--mute)"]         },
  { id: "monkh",   name: "Мөнхбат",    age: 21, av: "🧑‍💻", mbti: "ISTP", major: "МТ",               year: "3-р курс", score: 58, online: false, email: "monkh@num.edu.mn",  plan: "free",    status: "active",   tags: ["🔧 Hardware", "🎮 Тоглоом", "🤖 Робот", "⚡ Электроник"], bio: "Robotics клубын тэргүүн.",               commonHours: 5,  gradient: ["var(--bg)","var(--mute)"]         },
  { id: "saran",   name: "Сарантуяа",  age: 20, av: "👩‍💼", mbti: "ESFJ", major: "Бизнес",           year: "2-р курс", score: 54, online: false, email: "saran@num.edu.mn",  plan: "free",    status: "active",   tags: ["💼 Бизнес", "🗣️ Харилцаа", "☕ Кофе"],                   bio: "TEDx клубын гишүүн.",                    commonHours: 4,  gradient: ["var(--warn-bg)","var(--warn)"]    }
];

export const filters = [
  { label: "Бүгд", active: true },
  { label: "💻 Программ" },
  { label: "📊 Бизнес" },
  { label: "⚖️ Хууль" },
  { label: "📅 ≥5ц" },
  { label: "3-р курс" },
  { label: "🟢 Онлайн" }
];

export const recentMatches = [
  { name: "Энхтуяа",  av: "👩‍🎨", preview: "Маргааш цагтай уу?", unread: 2, online: true  },
  { name: "Батмөнх",  av: "🧑‍🔬", preview: "Сайн байна уу 👋",   time: "1ц", online: false },
  { name: "Тэмүүлэн", av: "🧑‍💼", preview: "React project?",     time: "3ц", online: false }
];
