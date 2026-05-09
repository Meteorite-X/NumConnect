// ══════════════════════════════════════════════════════════════
//  ГИШҮҮН 3 — Landing, Admin, Schedule өгөгдөл
// ══════════════════════════════════════════════════════════════

export const stats = [
  { value: "1,200+", label: "Бүртгэлтэй оюутан" },
  { value: "340+",   label: "Амжилттай холбоо"  },
  { value: "87%",    label: "Сэтгэл ханамж"     }
];

export const features = [
  { icon: "📅", iconClass: "ico-a", title: "Хуваарьт суурилсан", desc: "7×24 grid дээр чөлөөт цагаа оруулж, ижил цагтай оюутнуудтай холбогд." },
  { icon: "🔐", iconClass: "ico-g", title: "100% Баталгаажсан",  desc: "Зөвхөн @num.edu.mn хаягтай оюутнууд нэвтэрнэ. Аюулгүй орчин."       },
  { icon: "🎯", iconClass: "ico-b", title: "Нээлттэй жагсаалт",  desc: "Бүртгэлтэй бүх оюутныг хар. Хуваарийн оноогоор эрэмбэлэгдсэн."      }
];

export const kpis = [
  { icon: "👥", iconClass: "ki-a", label: "Нийт хэрэглэгч", value: "1,247", valueClass: "kn-a", change: "↑ +48 долоо хоногт", negative: false },
  { icon: "💬", iconClass: "ki-b", label: "Нийт чат",        value: "342",   valueClass: "kn-b", change: "↑ 40% хариу",       negative: false },
  { icon: "👑", iconClass: "ki-w", label: "Premium",         value: "89",    valueClass: "kn-w", change: "↑ 7.1%",            negative: false },
  { icon: "⚡", iconClass: "ki-g", label: "DAU",             value: "124",   valueClass: "kn-g", change: "↓ −8",              negative: true  }
];

export const reports = [
  { icon: "⚠️", title: "Зохисгүй зураг",  detail: "user#87→#112 · 2ц",     status: "open"     },
  { icon: "🔇", title: "Spam",             detail: "user#34→#56 · 5ц",      status: "open"     },
  { icon: "✅", title: "Буруу мэдээлэл",  detail: "user#91→#23 · Өчигдөр", status: "resolved" }
];

export const schedulePattern = [
  ["b","","b","","f","f",""], ["b","","b","","f","f",""],
  ["","b","","b","f","",""], ["","b","","b","f","",""],
  ["f","f","f","f","f","f","f"], ["f","f","f","f","f","f","f"],
  ["b","f","b","f","f","f",""], ["b","f","b","f","f","f",""],
  ["","","f","","f","f",""], ["","","f","","f","f",""],
  ["f","","","f","","",""], ["f","","","f","","",""],
  ["","","","","","",""], ["","","","","","",""]
];

export const scheduleHours = ["08","09","10","11","12","13","14","15","16","17","18","19","20","21"];
export const scheduleDays  = ["ДА","МЯ","ЛХ","ПҮ","БА","БЯ","НЯ"];

export const dauChart = [
  { day: "Да", value: 98,  height: 55 },
  { day: "Мя", value: 128, height: 72 },
  { day: "Лх", value: 86,  height: 48 },
  { day: "Пү", value: 156, height: 88 },
  { day: "Ба", value: 116, height: 65 },
  { day: "Бя", value: 169, height: 95 },
  { day: "Ня", value: 124, height: 70 }
];
