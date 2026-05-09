import './setup.css';
import Navbar from '../../shared/Navbar';

const Setup = () => {
  return (
    <>
      <Navbar />

      {/* SETUP */}
      <div className="setup-wrap">

        {/* Алхамын мөр */}
        <div className="step-bar">
          <div className="step-dots">
            <div className="sd done"></div>
            <div className="sd active"></div>
            <div className="sd"></div>
            <div className="sd"></div>
          </div>
          <div className="step-lbl">Алхам <strong>2/4</strong> — Мэдээлэл</div>
          <button className="skip-btn">Алгасах →</button>
        </div>

        {/* Агуулга */}
        <div className="step-content">
          <div className="step-h">Профайл бүрдүүлэх</div>
          <div className="step-p">Таны профайл бусдад хэрхэн харагдахыг тодорхойлно.</div>

          {/* Зураг */}
          <div className="fg">
            <div className="lbl">Профайл зураг <span className="req">*</span> <span className="lbl-h">— 1–5</span></div>
            <div className="photo-grid">
              <div className="ph-main">
                <div className="ph-main-plus">+</div>
                <div className="ph-main-lbl">Гол зураг</div>
                <div className="ph-main-badge">ГОЛ</div>
              </div>
              <div className="ph-sec"><div className="ph-sec-ico">+</div><div className="ph-sec-lbl">Зураг 2</div></div>
              <div className="ph-sec"><div className="ph-sec-ico">+</div><div className="ph-sec-lbl">Зураг 3</div></div>
              <div className="ph-sec"><div className="ph-sec-ico">+</div><div className="ph-sec-lbl">Зураг 4</div></div>
              <div className="ph-sec"><div className="ph-sec-ico">+</div><div className="ph-sec-lbl">Зураг 5</div></div>
            </div>
          </div>

          {/* Нэр */}
          <div className="fg">
            <label className="lbl">Нэр <span className="req">*</span></label>
            <input className="inp" defaultValue="Мягмарсүрэн Д." />
          </div>

          {/* Мэргэжил + Дамжаа */}
          <div className="row2">
            <div className="fg">
              <label className="lbl">Мэргэжил <span className="req">*</span></label>
              <select className="inp" style={{ cursor: 'pointer' }} defaultValue="Программ хангамж">
                <option>Программ хангамж</option>
                <option>МТ</option>
                <option>Бизнес</option>
                <option>Эдийн засаг</option>
                <option>Хууль</option>
                <option>Математик</option>
                <option>Дизайн</option>
              </select>
            </div>
            <div className="fg">
              <label className="lbl">Дамжаа <span className="req">*</span></label>
              <div className="pill-row">
                <button className="pill">1</button>
                <button className="pill">2</button>
                <button className="pill on">3</button>
                <button className="pill">4</button>
                <button className="pill">5</button>
                <button className="pill">6</button>
              </div>
            </div>
          </div>

          {/* Танилцуулга */}
          <div className="fg">
            <label className="lbl">Товч танилцуулга <span className="lbl-h">(132/300)</span></label>
            {/* React дээр textarea доторх утгыг defaultValue-аар өгдөг */}
            <textarea 
              className="inp" 
              rows="3" 
              style={{ resize: 'none' }} 
              defaultValue="Программ хангамжийн 3-р курсын оюутан. AI, веб хөгжүүлэлтэд сонирхолтой ☕"
            />
          </div>

          {/* Сонирхол */}
          <div className="fg">
            <label className="lbl">Сонирхол <span className="lbl-h">— хэд ч дарж болно</span></label>
            <div className="pill-row" style={{ marginTop: '10px' }}>
              <button className="pill on">💻 Код бичих</button>
              <button className="pill on">☕ Кофе</button>
              <button className="pill on">📖 Уншлага</button>
              <button className="pill">🎵 Хөгжим</button>
              <button className="pill">⚽ Спорт</button>
              <button className="pill">🎬 Кино</button>
              <button className="pill">✈️ Аялал</button>
              <button className="pill">🍳 Хоол</button>
              <button className="pill">📷 Фото</button>
              <button className="pill">🎨 Дизайн</button>
              <button className="pill">🧬 Шинжлэх ухаан</button>
              <button className="pill">🎮 Тоглоом</button>
            </div>
          </div>

          {/* Зорилго */}
          <div className="fg">
            <label className="lbl">Хамтрах зорилго <span className="lbl-h">— хэд ч сонгож болно</span></label>
            <div className="goal-grid">
              <button className="goal-card on">
                <span className="goal-icon">📚</span>
                <span className="goal-name">Хамт суралцах</span>
                <span className="goal-check">✓</span>
              </button>
              <button className="goal-card on">
                <span className="goal-icon">💻</span>
                <span className="goal-name">Проект хийх</span>
                <span className="goal-check">✓</span>
              </button>
              <button className="goal-card">
                <span className="goal-icon">🔬</span>
                <span className="goal-name">Судалгаа</span>
                <span className="goal-check">✓</span>
              </button>
              <button className="goal-card">
                <span className="goal-icon">☕</span>
                <span className="goal-name">Амрах</span>
                <span className="goal-check">✓</span>
              </button>
              <button className="goal-card">
                <span className="goal-icon">🗣️</span>
                <span className="goal-name">Хэлний практик</span>
                <span className="goal-check">✓</span>
              </button>
              <button className="goal-card">
                <span className="goal-icon">🎯</span>
                <span className="goal-name">Клуб</span>
                <span className="goal-check">✓</span>
              </button>
            </div>
          </div>

          {/* MBTI */}
          <div className="fg">
            <label className="lbl">MBTI <span className="lbl-h">— нэгийг сонгоно уу</span></label>
            <div className="mbti-hint">
              Мэдэхгүй бол <a href="https://www.16personalities.com/mn" target="_blank" rel="noreferrer" className="mbti-link">16personalities.com</a> дээр тест өг
            </div>
            <div className="mbti-picker" id="mbti-picker">
              <div className="mbti-group">
                <div className="mbti-group-label">🔭 Аналитик</div>
                <div className="mbti-group-pills">
                  <button className="mbti-pill" data-mbti="INTJ">INTJ</button>
                  <button className="mbti-pill" data-mbti="INTP">INTP</button>
                  <button className="mbti-pill" data-mbti="ENTJ">ENTJ</button>
                  <button className="mbti-pill" data-mbti="ENTP">ENTP</button>
                </div>
              </div>
              <div className="mbti-group">
                <div className="mbti-group-label">🌿 Дипломат</div>
                <div className="mbti-group-pills">
                  <button className="mbti-pill" data-mbti="INFJ">INFJ</button>
                  <button className="mbti-pill" data-mbti="INFP">INFP</button>
                  <button className="mbti-pill" data-mbti="ENFJ">ENFJ</button>
                  <button className="mbti-pill" data-mbti="ENFP">ENFP</button>
                </div>
              </div>
              <div className="mbti-group">
                <div className="mbti-group-label">🛡️ Хамгаалагч</div>
                <div className="mbti-group-pills">
                  <button className="mbti-pill" data-mbti="ISTJ">ISTJ</button>
                  <button className="mbti-pill" data-mbti="ISFJ">ISFJ</button>
                  <button className="mbti-pill" data-mbti="ESTJ">ESTJ</button>
                  <button className="mbti-pill" data-mbti="ESFJ">ESFJ</button>
                </div>
              </div>
              <div className="mbti-group">
                <div className="mbti-group-label">⚡ Судлаач</div>
                <div className="mbti-group-pills">
                  <button className="mbti-pill" data-mbti="ISTP">ISTP</button>
                  <button className="mbti-pill" data-mbti="ISFP">ISFP</button>
                  <button className="mbti-pill" data-mbti="ESTP">ESTP</button>
                  <button className="mbti-pill" data-mbti="ESFP">ESFP</button>
                </div>
              </div>
              <div>
                <button className="mbti-pill" data-mbti="" style={{ borderStyle: 'dashed', color: 'var(--dim)' }}>❓ Мэдэхгүй</button>
              </div>
            </div>
            
            {/* mbti-selected хэсгийг одоогоор display:none-тойгоор үлдээлээ */}
            <div className="mbti-selected" id="mbti-selected" style={{ display: 'none' }}>
              <span className="mbti-selected-badge" id="mbti-selected-badge">INTJ</span>
              <span className="mbti-selected-txt">сонгогдлоо — <span className="mbti-change">солих</span></span>
            </div>
          </div>

          {/* SNS */}
          <div className="fg">
            <label className="lbl">SNS <span className="lbl-h">— заавал биш</span></label>
            <div className="sns-list">
              <div className="sns-row">
                <span className="sns-lbl">Instagram</span>
                <input className="inp" placeholder="@username" style={{ padding: '10px 14px' }} />
              </div>
              <div className="sns-row">
                <span className="sns-lbl">Facebook</span>
                <input className="inp" placeholder="facebook.com/..." style={{ padding: '10px 14px' }} />
              </div>
            </div>
          </div>

        </div>

        {/* Доод товчнууд */}
        <div className="setup-foot">
          <button className="back-btn">← Буцах</button>
          <button className="next-btn">Дараах: Хуваарь →</button>
        </div>

      </div>
    </>
  );
};

export default Setup;