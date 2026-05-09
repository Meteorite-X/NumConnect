import { useState } from 'react';
import './chat.css';
import Navbar from '../../shared/Navbar';

const Chat = () => {
  // 1. Таб солих төлөв (dms эсвэл people)
  const [activeTab, setActiveTab] = useState('dms');
  
  // 2. Хэрэглэгчийн самбар (User Panel) нээлттэй эсэх
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  
  // 3. #general сувгийн цонх нээлттэй эсэх
  const [isGeneralOpen, setIsGeneralOpen] = useState(false);

  // 4. Самбарт харуулах хэрэглэгчийн мэдээллийг хадгалах State
  const [panelData, setPanelData] = useState({
    name: 'Энхтуяа',
    avatar: '👩‍🎨',
    mbti: 'ENFP',
    major: 'Дизайн',
    year: '1-р курс',
    score: '79%',
    isOnline: true,
    tags: ['🎨 Дизайн', '📸 Фото', '☕ Кофе'],
    bio: 'UI/UX дизайнд сонирхолтой.'
  });

  // Хэрэглэгчийн мэдээллийг шинэчилж самбарыг нээх функц
  const openUserPanel = (name, avatar, mbti, major, year, score, isOnline, tags, bio) => {
    setPanelData({ name, avatar, mbti, major, year, score, isOnline, tags, bio });
    setIsUserPanelOpen(true);
  };

  return (
    <>
      <Navbar />

      {/* CHAT SHELL */}
      <div className="chat-shell">

        {/* Зүүн thread жагсаалт */}
        <div className="thread-col">
          <div className="tc-head">
            <div className="tc-title">Мессеж</div>
            <div className="tc-search">
              <span className="tc-search-ico">🔍</span>
              <input className="tc-search-inp" placeholder="Хайх..." />
            </div>
          </div>

          {/* Табууд */}
          <div className="chat-tabs">
            <button 
              className={`chat-tab ${activeTab === 'dms' ? 'on' : ''}`} 
              onClick={() => setActiveTab('dms')}
            >
              💬 Мессеж
            </button>
            <button 
              className={`chat-tab ${activeTab === 'people' ? 'on' : ''}`} 
              onClick={() => setActiveTab('people')}
            >
              👥 Бүгд <span className="ct-badge">1,247</span>
            </button>
          </div>

          {/* DM жагсаалт (activeTab 'dms' үед харагдана) */}
          <div id="tab-dms" className="thread-list" style={{ display: activeTab === 'dms' ? 'block' : 'none' }}>
            <div className="tc-cat">▾ СУВГУУД</div>
            <div className="th-item" onClick={() => setIsGeneralOpen(true)}>
              <div className="th-av" style={{ background: 'linear-gradient(135deg,var(--accent-lt),var(--accent))', borderRadius: '10px', fontSize: '18px', fontWeight: 900 }}>#</div>
              <div className="th-body">
                <div className="th-row">
                  <div className="th-name"># general</div>
                  <div className="th-time">14:31</div>
                </div>
                <div className="th-pre new">Номинчимэг: React мэддэг үү?</div>
              </div>
              <div className="th-unread">12</div>
            </div>

            <div className="tc-cat" style={{ marginTop: '6px' }}>▾ ИДЭВХТЭЙ</div>
            <div className="th-item on">
              <div className="th-av">👩‍🎨<div className="th-on"></div></div>
              <div className="th-body">
                <div className="th-row">
                  <div className="th-name">Энхтуяа</div>
                  <div className="th-time">14:32</div>
                </div>
                <div className="th-pre new">Маргааш 14:00 цагтай уу?</div>
              </div>
              <div className="th-unread">2</div>
            </div>
            <div className="th-item">
              <div className="th-av">🧑‍🔬</div>
              <div className="th-body">
                <div className="th-row">
                  <div className="th-name">Батмөнх</div>
                  <div className="th-time">12:15</div>
                </div>
                <div className="th-pre">Сайн байна уу 👋</div>
              </div>
            </div>

            <div className="tc-cat" style={{ marginTop: '8px' }}>▾ ӨЧИГДӨР</div>
            <div className="th-item">
              <div className="th-av">🧑‍💼</div>
              <div className="th-body">
                <div className="th-row">
                  <div className="th-name">Тэмүүлэн</div>
                  <div className="th-time">Өчигдөр</div>
                </div>
                <div className="th-pre">React project хийж байна уу?</div>
              </div>
            </div>
          </div>

          {/* People жагсаалт (activeTab 'people' үед харагдана) */}
          <div id="tab-people" className="thread-list" style={{ display: activeTab === 'people' ? 'block' : 'none' }}>
            <div className="tc-cat">▾ ОНЛАЙН — 48</div>
            <div className="th-item" onClick={() => openUserPanel('Номинчимэг', '👩‍💻', 'INTJ', 'Программ хангамж', '3-р курс', '87%', true, ['💻 Код', '📚 Судалгаа', '☕ Кофе', '🤖 AI'], 'React болон ML-д сонирхолтой.')}>
              <div className="th-av" style={{ background: 'linear-gradient(135deg,var(--accent-lt),var(--accent))' }}>👩‍💻<div className="th-on"></div></div>
              <div className="th-body">
                <div className="th-row">
                  <div className="th-name">Номинчимэг, 21</div>
                  <div className="ppl-mbti">INTJ</div>
                </div>
                <div className="th-pre">Программ хангамж · 3-р курс</div>
              </div>
              <div className="ppl-score">87%</div>
            </div>
            <div className="th-item" onClick={() => openUserPanel('Батмөнх', '🧑‍🔬', 'INFP', 'Эдийн засаг', '2-р курс', '72%', true, ['🔬 Судалгаа', '📖 Уншлага', '🎵 Хөгжим'], 'Статистик, өгөгдөл шинжилгээнд дуртай.')}>
              <div className="th-av" style={{ background: 'linear-gradient(135deg,var(--ok-bg),#6EE7B7)' }}>🧑‍🔬<div className="th-on"></div></div>
              <div className="th-body">
                <div className="th-row">
                  <div className="th-name">Батмөнх, 20</div>
                  <div className="ppl-mbti">INFP</div>
                </div>
                <div className="th-pre">Эдийн засаг · 2-р курс</div>
              </div>
              <div className="ppl-score">72%</div>
            </div>
            <div className="th-item" onClick={() => openUserPanel('Энхтуяа', '👩‍🎨', 'ENFP', 'Дизайн', '1-р курс', '79%', true, ['🎨 Дизайн', '📸 Фото', '☕ Кофе'], 'UI/UX дизайнд сонирхолтой.')}>
              <div className="th-av" style={{ background: 'linear-gradient(135deg,var(--purple-bg),#C4B5FD)' }}>👩‍🎨<div className="th-on"></div></div>
              <div className="th-body">
                <div className="th-row">
                  <div className="th-name">Энхтуяа, 19</div>
                  <div className="ppl-mbti">ENFP</div>
                </div>
                <div className="th-pre">Дизайн · 1-р курс</div>
              </div>
              <div className="ppl-score">79%</div>
            </div>

            <div className="tc-cat" style={{ marginTop: '8px' }}>▾ ОФЛАЙН</div>
            <div className="th-item" onClick={() => openUserPanel('Тэмүүлэн', '🧑‍💼', 'ENTJ', 'Бизнес', '4-р курс', '65%', false, ['💼 Бизнес', '🗣️ Хэл', '🏃 Гүйлт'], 'Startup founder зорилготой.')}>
              <div className="th-av" style={{ background: 'linear-gradient(135deg,var(--bg),var(--mute))' }}>🧑‍💼</div>
              <div className="th-body">
                <div className="th-row">
                  <div className="th-name">Тэмүүлэн, 22</div>
                  <div className="ppl-mbti">ENTJ</div>
                </div>
                <div className="th-pre">Бизнес · 4-р курс</div>
              </div>
              <div className="ppl-score" style={{ color: 'var(--dim)' }}>65%</div>
            </div>
            <div className="th-item" onClick={() => openUserPanel('Оюунцэцэг', '👩‍💻', 'ISFJ', 'Математик', '2-р курс', '61%', false, ['📐 Математик', '📚 Уншлага', '🍵 Цай'], 'Олимпиадын математикаар оролцдог.')}>
              <div className="th-av" style={{ background: 'linear-gradient(135deg,var(--bg),var(--mute))' }}>👩‍💻</div>
              <div className="th-body">
                <div className="th-row">
                  <div className="th-name">Оюунцэцэг, 20</div>
                  <div className="ppl-mbti">ISFJ</div>
                </div>
                <div className="th-pre">Математик · 2-р курс</div>
              </div>
              <div className="ppl-score" style={{ color: 'var(--dim)' }}>61%</div>
            </div>
          </div>
        </div>

        {/* Чат цонх */}
        <div className="chat-win">

          {/* Дээд мөр */}
          <div className="chat-bar">
            <div className="cb-av">👩‍🎨</div>
            <div>
              <div className="cb-name">Энхтуяа</div>
              <div className="cb-status" style={{ color: '#059669' }}>● Онлайн байна</div>
              <div className="cb-sub">Дизайн · 1-р курс · 79% таарсан</div>
            </div>
            <div className="cb-acts">
              <div className="cb-btn" onClick={() => openUserPanel('Энхтуяа', '👩‍🎨', 'ENFP', 'Дизайн', '1-р курс', '79%', true, ['🎨 Дизайн', '📸 Фото', '☕ Кофе'], 'UI/UX дизайнд сонирхолтой.')}>👤</div>
              <div className="cb-btn">📅</div>
              <div className="cb-btn">⋯</div>
            </div>
          </div>

          {/* Нийтлэг цагийн banner */}
          <div className="ct-banner">
            <div style={{ fontSize: '16px' }}>📅</div>
            <div className="ct-txt">Та хоёр <strong>Лхагва 14:00–16:00, Пүрэв 10:00–12:00</strong> нийтлэг цагтай.</div>
          </div>

          {/* Мессежүүд */}
          <div className="msgs">
            <div className="date-sep">Өнөөдөр</div>

            <div className="msg-row">
              <div className="msg-av">👩‍🎨</div>
              <div className="msg-content">
                <div className="msg-sender">Энхтуяа <span className="msg-ts">14:20</span></div>
                <div className="bubble">Сайн байна уу! Маргааш хамт суралцах боломжтой юу? 📚</div>
              </div>
            </div>

            <div className="msg-row me">
              <div className="msg-av">😊</div>
              <div className="msg-content">
                <div className="msg-sender me-n">Би <span className="msg-ts">14:22</span></div>
                <div className="bubble">Тийм! 14:00 цагаас болох уу?</div>
              </div>
            </div>

            <div className="msg-row">
              <div className="msg-av">👩‍🎨</div>
              <div className="msg-content">
                <div className="msg-sender">Энхтуяа <span className="msg-ts">14:32</span></div>
                <div className="bubble">Маргааш 14:00 цагтай уу? ☕</div>
              </div>
            </div>
          </div>

          {/* Оролт */}
          <div className="chat-inp-row">
            <div className="chat-box">
              <button className="chat-ico">📎</button>
              <input className="chat-inp" placeholder="Энхтуяа руу мессеж..." />
              <button className="chat-ico">😊</button>
            </div>
            <button className="chat-send">➤</button>
          </div>

        </div>

        {/* Хэрэглэгчийн panel */}
        <div className={`user-panel ${isUserPanelOpen ? 'open' : ''}`}>
          <div className="up-close" onClick={() => setIsUserPanelOpen(false)}>✕</div>
          <div className="up-head">
            <div className="up-ava">{panelData.avatar}</div>
            <div className={`up-dot ${panelData.isOnline ? 'on' : 'off'}`}></div>
            <div className="up-name">{panelData.name}</div>
            <div className="up-mbti">{panelData.mbti}</div>
            <div className="up-meta">{panelData.major} · {panelData.year}</div>
          </div>
          <div className="up-match-bar">
            <div className="up-match-lbl">Хуваарийн таарц</div>
            <div className="up-match-n">{panelData.score}</div>
          </div>
          <div className="up-track">
            <div className="up-fill" style={{ width: panelData.score, background: 'linear-gradient(90deg,var(--accent),var(--accent-h))' }}></div>
          </div>
          <div className="up-sec">СОНИРХОЛ</div>
          <div className="up-tags">
            {panelData.tags.map((tag, index) => (
              <span key={index} className="up-tag">{tag}</span>
            ))}
          </div>
          <div className="up-sec" style={{ marginTop: '16px' }}>ТАНИЛЦУУЛГА</div>
          <div className="up-bio">{panelData.bio}</div>
          <div className="up-sec" style={{ marginTop: '16px' }}>НИЙТЛЭГ ЦАГ</div>
          <div className="up-sched">📅 Лхагва 14:00–16:00, Пүрэв 10:00–12:00</div>
          <button className="up-chat-btn">💬 Мессеж илгээх</button>
        </div>

      </div>

      {/* GENERAL CHANNEL */}
      <div className={`gen-ov ${isGeneralOpen ? 'open' : ''}`}>
        <div className="gen-modal">
          <div className="gen-top">
            <button className="gen-back" onClick={() => setIsGeneralOpen(false)}>←</button>
            <div className="gen-hash">#</div>
            <div>
              <span className="gen-title">general</span>
              <span className="gen-desc"> · нийтийн чат</span>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="gen-online"><div className="gen-dot"></div><span><strong style={{ color: 'var(--ink)' }}>48</strong> онлайн</span></div>
              <button className="gen-x" onClick={() => setIsGeneralOpen(false)}>✕ Гарах</button>
            </div>
          </div>

          {/* Мессежүүд */}
          <div className="gen-msgs">
            <div className="gen-msg">
              <div className="gen-av" style={{ background: 'linear-gradient(135deg,var(--accent-lt),var(--accent))' }}>👩‍💻</div>
              <div className="gen-body">
                <div className="gen-head"><span className="gen-name">Номинчимэг</span><span className="gen-ts">14:20</span></div>
                <div className="gen-text">Бүгд сайн байна уу! React мэддэг хүн байна уу? 🙋</div>
              </div>
            </div>
            <div className="gen-msg">
              <div className="gen-av" style={{ background: 'linear-gradient(135deg,var(--ok-bg),#6EE7B7)' }}>🧑‍🔬</div>
              <div className="gen-body">
                <div className="gen-head"><span className="gen-name">Батмөнх</span><span className="gen-ts">14:22</span></div>
                <div className="gen-text">Би мэднэ! Ямар асуудал гарсан бэ?</div>
              </div>
            </div>
            <div className="gen-msg">
              <div className="gen-av" style={{ background: 'linear-gradient(135deg,var(--purple-bg),#C4B5FD)' }}>👩‍🎨</div>
              <div className="gen-body">
                <div className="gen-head"><span className="gen-name">Энхтуяа</span><span className="gen-ts">14:25</span></div>
                <div className="gen-text">Маргааш номын санд хамт суралцах хүн байна уу? ☕</div>
              </div>
            </div>
            <div className="gen-msg">
              <div className="gen-av" style={{ background: 'linear-gradient(135deg,var(--accent-lt),var(--accent))' }}>👩‍💻</div>
              <div className="gen-body">
                <div className="gen-head"><span className="gen-name">Номинчимэг</span><span className="gen-ts">14:31</span></div>
                <div className="gen-text">useEffect дотор async function хэрхэн ашиглах вэ?</div>
              </div>
            </div>
          </div>

          {/* Оролт */}
          <div className="gen-inp-row">
            <div className="gen-box">
              <span style={{ fontSize: '16px', color: 'var(--mute)', cursor: 'pointer' }}>📎</span>
              <input className="gen-inp" placeholder="# general-д мессеж бичих..." />
              <span style={{ fontSize: '16px', color: 'var(--mute)', cursor: 'pointer' }}>😊</span>
            </div>
            <button className="gen-send">➤</button>
          </div>
        </div>
      </div>

    </>
  );
};

export default Chat;