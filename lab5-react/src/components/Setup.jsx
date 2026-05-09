import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const INTERESTS = [
  '💻 Код бичих','☕ Кофе','📖 Уншлага','🎵 Хөгжим','⚽ Спорт',
  '🎬 Кино','✈️ Аялал','🍳 Хоол','📷 Фото','🎨 Дизайн',
  '🧬 Шинжлэх ухаан','🎮 Тоглоом'
];

const GOALS = [
  { icon:'📚', name:'Хамт суралцах' },
  { icon:'💻', name:'Проект хийх' },
  { icon:'🔬', name:'Судалгаа' },
  { icon:'☕', name:'Амрах' },
  { icon:'🗣️', name:'Хэлний практик' },
  { icon:'🎯', name:'Клуб' }
];

const MBTI_GROUPS = [
  { label:'🔭 Аналитик', items:['INTJ','INTP','ENTJ','ENTP'] },
  { label:'🌿 Дипломат', items:['INFJ','INFP','ENFJ','ENFP'] },
  { label:'🛡️ Хамгаалагч', items:['ISTJ','ISFJ','ESTJ','ESFJ'] },
  { label:'⚡ Судлаач', items:['ISTP','ISFP','ESTP','ESFP'] }
];

export default function Setup() {
  const navigate = useNavigate();
  const [year, setYear] = useState(3);
  const [interests, setInterests] = useState(new Set(['💻 Код бичих','☕ Кофе','📖 Уншлага']));
  const [goals, setGoals] = useState(new Set(['Хамт суралцах','Проект хийх']));
  const [mbti, setMbti] = useState('');

  const toggle = (set, val, setter) => {
    const next = new Set(set);
    next.has(val) ? next.delete(val) : next.add(val);
    setter(next);
  };

  return (
    <div className="sc on">
      <div className="setup-wrap">
        <div className="step-bar">
          <div className="step-dots">
            <div className="sd done"></div>
            <div className="sd active"></div>
            <div className="sd"></div>
            <div className="sd"></div>
          </div>
          <div className="step-lbl">Алхам <strong>2/4</strong> — Мэдээлэл</div>
          <button onClick={() => navigate('/discover')} style={{fontSize:'13px',color:'var(--dim)',background:'none',border:'none',cursor:'pointer',fontWeight:600}}>
            Алгасах →
          </button>
        </div>

        <div className="step-content">
          <div className="step-h">Профайл бүрдүүлэх</div>
          <div className="step-p">Таны профайл бусдад хэрхэн харагдахыг тодорхойлно.</div>

          <div style={{marginBottom:'28px'}}>
            <div className="lbl" style={{marginBottom:'14px'}}>
              Профайл зураг <span style={{color:'var(--accent)'}}>*</span>{' '}
              <span className="lbl-h">— 1–5</span>
            </div>
            <div className="photo-grid">
              <div className="ph-main">
                <div className="ph-main-plus">+</div>
                <div className="ph-main-lbl">Гол зураг</div>
                <div className="ph-main-badge">ГОЛ</div>
              </div>
              {[2,3,4,5].map(n => (
                <div key={n} className="ph-sec">
                  <div className="ph-sec-ico">+</div>
                  <div className="ph-sec-lbl">Зураг {n}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="fg">
            <label className="lbl">Нэр <span style={{color:'var(--accent)'}}>*</span></label>
            <input className="inp" defaultValue="Мягмарсүрэн Д." />
          </div>

          <div className="row2">
            <div className="fg">
              <label className="lbl">Мэргэжил *</label>
              <select className="inp" style={{cursor:'pointer'}}>
                <option>Программ хангамж</option>
                <option>МТ</option>
                <option>Бизнес</option>
                <option>Эдийн засаг</option>
              </select>
            </div>
            <div className="fg">
              <label className="lbl">Дамжаа *</label>
              <div className="pill-row">
                {[1,2,3,4,5,6].map(n => (
                  <button key={n} className={'pill' + (year === n ? ' on' : '')} onClick={() => setYear(n)}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="fg">
            <label className="lbl">
              Товч танилцуулга <span className="lbl-h">(132/300)</span>
            </label>
            <textarea
              className="inp"
              rows={3}
              style={{resize:'none'}}
              defaultValue="Программ хангамжийн 3-р курсын оюутан. AI, веб хөгжүүлэлтэд сонирхолтой ☕"
            />
          </div>

          <div className="fg">
            <label className="lbl">Сонирхол <span className="lbl-h">— хэд ч дарж болно</span></label>
            <div className="pill-row" style={{marginTop:'10px'}}>
              {INTERESTS.map(it => (
                <button
                  key={it}
                  className={'pill' + (interests.has(it) ? ' on' : '')}
                  onClick={() => toggle(interests, it, setInterests)}
                >
                  {it}
                </button>
              ))}
            </div>
          </div>

          <div className="fg">
            <label className="lbl">Хамтрах зорилго</label>
            <div className="goal-grid">
              {GOALS.map(({ icon, name }) => (
                <button
                  key={name}
                  className={'goal-card' + (goals.has(name) ? ' on' : '')}
                  onClick={() => toggle(goals, name, setGoals)}
                >
                  <span className="goal-icon">{icon}</span>
                  <span className="goal-name">{name}</span>
                  <span className="goal-check">✓</span>
                </button>
              ))}
            </div>
          </div>

          <div className="fg">
            <label className="lbl">MBTI</label>
            {!mbti ? (
              <div className="mbti-picker">
                {MBTI_GROUPS.map(({ label, items }) => (
                  <div key={label} className="mbti-group">
                    <div className="mbti-group-label">{label}</div>
                    <div className="mbti-group-pills">
                      {items.map(it => (
                        <button key={it} className="mbti-pill" onClick={() => setMbti(it)}>
                          {it}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mbti-selected" style={{display:'flex'}}>
                <span className="mbti-selected-badge">{mbti}</span>
                <span style={{fontSize:'13px',color:'var(--sub)'}}>
                  сонгогдлоо —{' '}
                  <span style={{color:'var(--accent)',cursor:'pointer',fontWeight:600}} onClick={() => setMbti('')}>
                    солих
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="setup-foot">
          <button className="back-btn" onClick={() => navigate('/otp')}>← Буцах</button>
          <button className="next-btn" onClick={() => navigate('/schedule')}>
            Дараах: Хуваарь →
          </button>
        </div>
      </div>
    </div>
  );
}
