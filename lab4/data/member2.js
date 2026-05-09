// ══════════════════════════════════════════════════════════════
//  ГИШҮҮН 2 — Чат, General суваг өгөгдөл
// ══════════════════════════════════════════════════════════════

export const chatMessages = [
  { sender: "Энхтуяа", av: "👩‍🎨", time: "14:12", text: "Сайн байна уу! Хуваарийг харвал нийтлэг цаг их байна 😊", me: false },
  { sender: "Би",      av: "😊",    time: "14:15", text: "Сайн уу! Лхагва 14 цагт кофе уух уу? ☕",                  me: true  },
  { sender: "Энхтуяа", av: "👩‍🎨", time: "14:18", text: "Сайн санаа! Bolor cafe мэддэг үү?",                         me: false },
  { sender: "Би",      av: "😊",    time: "14:25", text: "Мэднэ! Лхагва 14:00 уулзацгаая 🙌",                        me: true  },
  { sender: "Энхтуяа", av: "👩‍🎨", time: "14:32", text: "Маргааш portfolio-д тусалж чадах уу? 😅",                  me: false }
];

export const generalMessages = [
  { name: "Номинчимэг", av: "👩‍💻", time: "14:02", text: "Хэн нэгэн <strong>React hooks</strong> мэддэг үү?",                                                                        gradient: ["var(--accent-lt)","var(--accent)"],   clickable: true  },
  { name: "Мөнхбат",    av: "🧑‍💻", time: "14:05", text: "<code style='background:var(--bg);padding:2px 8px;border-radius:6px;font-size:12px'>useEffect</code> — Cleanup function мартаж болохгүй 👍", gradient: ["var(--blue-bg)","var(--blue)"],       clickable: true  },
  { name: "Энхтуяа",    av: "👩‍🎨", time: "14:08", text: "Маргааш <strong>Library-д</strong> хамт суух хүн бий юу? 📚",                                                               gradient: ["var(--ok-bg)","var(--ok)"],           clickable: true  },
  { name: "Батмөнх",    av: "🧑‍🔬", time: "14:10", text: "@Энхтуяа Би байна! Python coursework хийх хэрэгтэй 😅",                                                                     gradient: ["var(--purple-bg)","var(--purple)"],   clickable: true  },
  { name: "Сарантуяа",  av: "👩‍💼", time: "14:15", text: "NumConnect-р танилцсан найзуудтайгаа <strong>бүлгийн проект</strong> хийж байна 🎉",                                          gradient: ["var(--warn-bg)","var(--warn)"],       clickable: false },
  { name: "Тэмүүлэн",   av: "🧑‍💼", time: "14:22", text: "<strong>Data Science / ML</strong> study group байгуулмаар байна — сонирхолтой хэн нэгэн?",                                  gradient: ["var(--err-bg)","var(--err)"],         clickable: false },
  { name: "Оюунцэцэг",  av: "👩‍🏫", time: "14:25", text: "@Тэмүүлэн Би! Sklearn-тэй танилцаж байна 🤓",                                                                                gradient: ["var(--blue-bg)","var(--blue)"],       clickable: false },
  { name: "Номинчимэг", av: "👩‍💻", time: "14:31", text: "@Мөнхбат Баярлалаа! AbortController-тэй хийлээ 🙌",                                                                          gradient: ["var(--accent-lt)","var(--accent)"],   clickable: true  }
];
