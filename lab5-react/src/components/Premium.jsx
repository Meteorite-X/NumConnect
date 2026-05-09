const PLANS = [
  {
    name: 'Үнэгүй',
    price: '₮0',
    period: 'үүрд үнэгүй',
    features: [
      { yes: true,  text: 'Долоо хоногт 10 холболт' },
      { yes: true,  text: '1:1 чат' },
      { yes: true,  text: 'Хуваарь тохируулах' },
      { yes: true,  text: '# general суваг' },
      { yes: false, text: 'Бүлгийн чат' },
      { yes: false, text: 'Хэн үзсэнийг харах' }
    ],
    btnText: 'Одоогийн багц',
    btnClass: 'btn-s',
    btnDisabled: true
  },
  {
    name: 'Pro',
    price: '₮4,900',
    period: '/ сар',
    badge: '🔥 ОЮУТНУУДЫН СОНГОЛТ',
    best: true,
    features: [
      { yes: true,  text: 'Хязгааргүй холболт' },
      { yes: true,  text: 'Бүлгийн чат (5 хүртэл бүлэг)' },
      { yes: true,  text: 'Хэн профайл үзсэнийг харах' },
      { yes: true,  text: 'Мессеж уншсан эсэх (✓✓)' },
      { yes: true,  text: 'Discover-д эхэнд харагдах' },
      { yes: false, text: 'Эвент үүсгэх' }
    ],
    btnText: 'Pro болох →',
    btnClass: 'btn-p'
  },
  {
    name: 'Pro+',
    price: '₮8,900',
    period: '/ сар · бүх боломж',
    features: [
      { yes: true, text: "Pro-ийн бүх боломж" },
      { yes: true, text: 'Хязгааргүй бүлгийн чат' },
      { yes: true, text: 'Уулзалт/эвент зохион байгуулах' },
      { yes: true, text: 'Хуваарийн дэлгэрэнгүй шинжилгээ' },
      { yes: true, text: 'Нэмэлт профайл тохиргоо' },
      { yes: true, text: 'Pro+ badge ✦' }
    ],
    btnText: 'Pro+ сонгох →',
    btnClass: 'btn-s'
  }
];

export default function Premium() {
  return (
    <div className="sc on">
      <div className="prem-page">
        <div className="prem-badge">🚀 NumConnect Багцууд</div>
        <div className="prem-h">
          Илүү ихийг<br /><em>холбогдож</em> нээ
        </div>
        <div className="prem-sub">
          Бүлгийн суралцлага, хэн таныг харсныг мэдэх, Discover-д тэргүүлэх — бүгд энд.
        </div>

        <div className="price-grid">
          {PLANS.map(p => (
            <div key={p.name} className={'pc' + (p.best ? ' best' : '')}>
              {p.badge && <div className="pc-pop">{p.badge}</div>}
              <div className="pc-plan" style={p.best ? {color:'var(--accent)'} : {}}>{p.name}</div>
              <div className="pc-amt" style={p.best ? {color:'var(--accent)'} : {}}>{p.price}</div>
              <div className="pc-per">{p.period}</div>
              <ul className="pc-feat">
                {p.features.map(f => (
                  <li key={f.text}>
                    <span className={f.yes ? 'pf-yes' : 'pf-no'}>{f.yes ? '✓' : '✗'}</span>
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
              <button
                className={'btn ' + p.btnClass + ' btn-full'}
                style={p.btnDisabled ? {opacity:0.6,cursor:'default'} : {}}
                disabled={p.btnDisabled}
              >
                {p.btnText}
              </button>
            </div>
          ))}
        </div>

        <div className="prem-note">
          🔒 QPay · Хэдийд ч цуцлах боломжтой · Эхний 7 хоног үнэгүй
        </div>
      </div>
    </div>
  );
}
