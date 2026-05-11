import { useApi } from '../hooks/useApi.js';

// Fallback (backend унтарсан үед)
const FALLBACK_PLANS = [
  { id:'free',     name:'Үнэгүй', price:0,    period:'үүрд', features:[
    { yes:true,  text:'Долоо хоногт 10 холболт' },
    { yes:true,  text:'1:1 чат' },
    { yes:true,  text:'Хуваарь тохируулах' },
    { yes:true,  text:'# general суваг' },
    { yes:false, text:'Бүлгийн чат' },
    { yes:false, text:'Хэн үзсэнийг харах' }
  ] },
  { id:'pro',      name:'Pro', price:4900, period:'сар', popular:true, features:[
    { yes:true,  text:'Хязгааргүй холболт' },
    { yes:true,  text:'Бүлгийн чат (5 хүртэл бүлэг)' },
    { yes:true,  text:'Хэн профайл үзсэнийг харах' },
    { yes:true,  text:'Мессеж уншсан эсэх (✓✓)' },
    { yes:true,  text:'Discover-д эхэнд харагдах' },
    { yes:false, text:'Эвент үүсгэх' }
  ] },
  { id:'pro-plus', name:'Pro+', price:8900, period:'сар', features:[
    { yes:true, text:'Pro-ийн бүх боломж' },
    { yes:true, text:'Хязгааргүй бүлгийн чат' },
    { yes:true, text:'Уулзалт/эвент зохион байгуулах' },
    { yes:true, text:'Хуваарийн дэлгэрэнгүй шинжилгээ' },
    { yes:true, text:'Нэмэлт профайл тохиргоо' },
    { yes:true, text:'Pro+ badge ✦' }
  ] }
];

// DB plan → UI plan
function toUI(p) {
  const isFree = p.id === 'free';
  const isPro  = p.id === 'pro' || p.popular;
  const priceLabel = p.price === 0 ? '₮0' : '₮' + Number(p.price).toLocaleString('en-US');
  return {
    id:        p.id,
    name:      p.name,
    price:     priceLabel,
    period:    isFree ? 'үүрд үнэгүй' : '/ ' + p.period,
    features:  p.features,
    badge:     isPro ? '🔥 ОЮУТНУУДЫН СОНГОЛТ' : undefined,
    best:      isPro,
    btnText:   isFree ? 'Одоогийн багц' : p.name + ' болох →',
    btnClass:  isPro ? 'btn-p' : 'btn-s',
    btnDisabled: isFree
  };
}

export default function Premium() {
  const { data, loading, error } = useApi('/api/premium/plans', FALLBACK_PLANS);
  const plans = (data || []).map(toUI);

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

        {loading && <div style={{textAlign:'center',color:'var(--sub)',margin:'10px 0',fontSize:'12px'}}>Уншиж байна...</div>}
        {error && !loading && <div style={{textAlign:'center',color:'var(--warn)',margin:'10px 0',fontSize:'11px'}}>
          ⚠ Backend холбогдсонгүй — локал өгөгдлийг харуулж байна
        </div>}

        <div className="price-grid">
          {plans.map(p => (
            <div key={p.id} className={'pc' + (p.best ? ' best' : '')}>
              {p.badge && <div className="pc-pop">{p.badge}</div>}
              <div className="pc-plan" style={p.best ? {color:'var(--accent)'} : {}}>{p.name}</div>
              <div className="pc-amt"  style={p.best ? {color:'var(--accent)'} : {}}>{p.price}</div>
              <div className="pc-per">{p.period}</div>
              <ul className="pc-feat">
                {p.features.map((f, i) => (
                  <li key={i}>
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
