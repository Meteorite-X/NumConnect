import { useState } from 'react';
import './discover.css';
import Navbar from '../../shared/Navbar';

const Discover = () => {
  // Хуудсыг хэрхэн харуулах төлөв (swipe эсвэл list)
  const [viewMode, setViewMode] = useState('swipe'); 
  // Modal цонхыг харуулах эсэх төлөв
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar />

      {/* MATCH MODAL */}
      <div className={`modal-ov ${showModal ? 'show' : ''}`} id="mm">
        <div className="match-modal">
          <div className="mm-sparkle">🎉</div>
          <div className="mm-title">Connect!</div>
          <div className="mm-sub">Та хоёр холбогдохыг хүсэж байна!</div>
          <div className="mm-avs">
            <div className="mm-av">😊</div>
            <div className="mm-heart">🤝</div>
            <div className="mm-av">👩‍💻</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button className="btn btn-p btn-full">💬 Чат эхлүүлэх</button>
            <button className="btn btn-s btn-full" onClick={() => setShowModal(false)}>Дараа</button>
          </div>
        </div>
      </div>

      {/* APP SHELL */}
      <div className="app-shell">

        {/* Зүүн nav */}
        <aside className="icon-nav">
          <div className="nav-logo-sm">N</div>
          <div className="n-ico on">💫</div>
          <div className="n-ico">💬<div className="n-badge">3</div></div>
          <div className="n-ico">🤝</div>
          <div className="n-sep"></div>
          <div className="n-ico">📅</div>
          <div className="n-ico">👑</div>
          <div className="n-ico">⚙️</div>
          <div className="nav-ava">😊</div>
        </aside>

        {/* Үндсэн хэсэг */}
        <main className="feed-main">

          {/* Дээд хэсэг */}
          <div className="feed-top">
            <div>
              <div className="feed-h">Discover <span>💫</span></div>
              <div className="feed-sub">Таны хуваарьтай таарсан оюутнууд</div>
            </div>
            <div className="feed-right">
              {/* View toggle (React state-ээр удирдав) */}
              <div className="vtgl">
                <button 
                  className={`vt ${viewMode === 'swipe' ? 'on' : ''}`} 
                  onClick={() => setViewMode('swipe')}
                >
                  🃏 Swipe
                </button>
                <button 
                  className={`vt ${viewMode === 'list' ? 'on' : ''}`} 
                  onClick={() => setViewMode('list')}
                >
                  ☰ Жагсаалт
                </button>
              </div>
            </div>
          </div>

          {/* Filter chips */}
          <div className="filter-row">
            <button className="chip on">🎯 Бүгд</button>
            <button className="chip">💻 Программ</button>
            <button className="chip">📊 Эдийн засаг</button>
            <button className="chip">🎨 Дизайн</button>
            <button className="chip">⚖️ Хууль</button>
            <button className="chip">📐 Математик</button>
          </div>

          {/* Swipe view (Зөвхөн viewMode === 'swipe' үед харагдана) */}
          {viewMode === 'swipe' && (
            <div id="view-swipe" className="swipe-view">
              <div className="card-stack">

                {/* Арын карт */}
                <div className="sw-peek sw-peek-back">
                  <div className="sw-peek-photo" style={{ background: 'linear-gradient(145deg,#E0F2FE,#BAE6FD)' }}>
                    <div style={{ fontSize: '90px', opacity: 0.9 }}>🧑‍🔬</div>
                  </div>
                  <div className="sw-peek-info">
                    <div className="sw-peek-name">Батмөнх, 20</div>
                    <div className="sw-peek-meta">Эдийн засаг · 2-р курс</div>
                  </div>
                  <div className="sw-peek-blur"></div>
                </div>

                {/* Урдах карт */}
                <div className="sw-peek sw-peek-front">
                  <div className="sw-peek-photo" style={{ background: 'linear-gradient(145deg,#F3E8FF,#DDD6FE)' }}>
                    <div style={{ fontSize: '90px', opacity: 0.9 }}>👩‍🎨</div>
                  </div>
                  <div className="sw-peek-info">
                    <div className="sw-peek-name">Энхтуяа, 19</div>
                    <div className="sw-peek-meta">Дизайн · 1-р курс</div>
                  </div>
                  <div className="sw-peek-blur"></div>
                </div>

                {/* Үндсэн карт */}
                <div className="sw-card">
                  <div className="sw-photo">
                    <div className="sw-emo">👩‍💻</div>
                    <div className="sw-badge-top">📅 87% таарсан</div>
                    <div className="sw-online">● Онлайн</div>
                  </div>
                  <div className="sw-info">
                    <div className="sw-name">
                      Номинчимэг, 21
                      <span className="sw-mbti-tag">INTJ</span>
                    </div>
                    <div className="sw-meta">Программ хангамж · 3-р курс · 14 нийтлэг цаг</div>
                    <div className="sw-tags">
                      <span className="sw-tag">💻 Проект</span>
                      <span className="sw-tag">📚 Судалгаа</span>
                      <span className="sw-tag">☕ Кофе</span>
                      <span className="sw-tag">🎨 Дизайн</span>
                    </div>
                  </div>
                </div>

                {/* Үйлдлийн товчнууд */}
                <div className="sw-acts">
                  <button className="act-btn act-pass">
                    <div className="act-c">✕</div>
                    <span className="act-lbl">Алгасах</span>
                  </button>
                  {/* Холбогдох товч нь Modal-ийг дуудна */}
                  <button className="act-btn act-like" onClick={() => setShowModal(true)}>
                    <div className="act-c">🤝</div>
                    <span className="act-lbl">Холбогдох</span>
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* List view (Зөвхөн viewMode === 'list' үед харагдана) */}
          {viewMode === 'list' && (
            <div id="view-list" className="list-view active">
              <div className="list-top">
                <span className="list-count"><strong>12</strong> оюутан</span>
                <select className="sort-select" defaultValue="Хуваарийн оноо ↓">
                  <option>Хуваарийн оноо ↓</option>
                  <option>Онлайн эхэнд</option>
                </select>
              </div>

              {/* Хэрэглэгч карт */}
              <div className="user-card">
                <div className="u-av" style={{ background: 'linear-gradient(135deg,var(--accent-lt),var(--accent))' }}>
                  👩‍💻<div className="u-dot"></div>
                </div>
                <div className="u-info">
                  <div className="u-namerow">
                    <span className="u-name">Номинчимэг, 21</span>
                    <span className="u-mbti">INTJ</span>
                  </div>
                  <div className="u-meta">Программ хангамж · 3-р курс · 14 нийтлэг</div>
                  <div className="u-tags">
                    <span className="u-tag">💻 Код</span>
                    <span className="u-tag">📚 Судалгаа</span>
                  </div>
                </div>
                <div className="u-right">
                  <div className="score-ring">
                    <div className="sr-n">87%</div>
                    <div className="sr-l">таарсан</div>
                  </div>
                  <button className="msg-btn">💬 Мессеж</button>
                </div>
              </div>

              <div className="user-card">
                <div className="u-av" style={{ background: 'linear-gradient(135deg,var(--ok-bg),#6EE7B7)' }}>
                  🧑‍🔬<div className="u-dot"></div>
                </div>
                <div className="u-info">
                  <div className="u-namerow">
                    <span className="u-name">Батмөнх, 20</span>
                    <span className="u-mbti">INFP</span>
                  </div>
                  <div className="u-meta">Эдийн засаг · 2-р курс · 10 нийтлэг</div>
                  <div className="u-tags">
                    <span className="u-tag">🔬 Судалгаа</span>
                    <span className="u-tag">📖 Уншлага</span>
                  </div>
                </div>
                <div className="u-right">
                  <div className="score-ring">
                    <div className="sr-n">72%</div>
                    <div className="sr-l">таарсан</div>
                  </div>
                  <button className="msg-btn">💬 Мессеж</button>
                </div>
              </div>

              <div className="user-card">
                <div className="u-av" style={{ background: 'linear-gradient(135deg,var(--purple-bg),#C4B5FD)' }}>
                  👩‍🎨<div className="u-dot"></div>
                </div>
                <div className="u-info">
                  <div className="u-namerow">
                    <span className="u-name">Энхтуяа, 19</span>
                    <span className="u-mbti">ENFP</span>
                  </div>
                  <div className="u-meta">Дизайн · 1-р курс · 8 нийтлэг</div>
                  <div className="u-tags">
                    <span className="u-tag">🎨 Дизайн</span>
                    <span className="u-tag">📸 Фото</span>
                  </div>
                </div>
                <div className="u-right">
                  <div className="score-ring">
                    <div className="sr-n">79%</div>
                    <div className="sr-l">таарсан</div>
                  </div>
                  <button className="msg-btn">💬 Мессеж</button>
                </div>
              </div>

            </div>
          )}

        </main>

        {/* Баруун тал */}
        <aside className="right-col">

          {/* Хуваарь */}
          <div className="rp-hd">Миний хуваарь</div>
          <div className="mini-sched">
            <div className="ms-days">
              <div className="ms-d">Да</div>
              <div className="ms-d">Мя</div>
              <div className="ms-d">Лх</div>
              <div className="ms-d">Пү</div>
              <div className="ms-d">Ба</div>
              <div className="ms-d">Бя</div>
              <div className="ms-d">Ня</div>
            </div>
            <div className="ms-slots">
              <div className="ms-col"><div className="ms-slot b"></div><div className="ms-slot f"></div><div className="ms-slot f"></div><div className="ms-slot b"></div><div className="ms-slot f"></div><div className="ms-slot f"></div></div>
              <div className="ms-col"><div className="ms-slot f"></div><div className="ms-slot b"></div><div className="ms-slot f"></div><div className="ms-slot f"></div><div className="ms-slot b"></div><div className="ms-slot f"></div></div>
              <div className="ms-col"><div className="ms-slot b"></div><div className="ms-slot b"></div><div class="ms-slot f"></div><div className="ms-slot f"></div><div className="ms-slot f"></div><div className="ms-slot f"></div></div>
              <div className="ms-col"><div className="ms-slot f"></div><div className="ms-slot f"></div><div className="ms-slot b"></div><div className="ms-slot f"></div><div className="ms-slot f"></div><div className="ms-slot f"></div></div>
              <div className="ms-col"><div className="ms-slot b"></div><div className="ms-slot f"></div><div className="ms-slot f"></div><div className="ms-slot b"></div><div className="ms-slot f"></div><div className="ms-slot f"></div></div>
              <div className="ms-col"><div className="ms-slot f"></div><div className="ms-slot f"></div><div className="ms-slot f"></div><div className="ms-slot f"></div><div className="ms-slot f"></div><div className="ms-slot f"></div></div>
              <div className="ms-col"><div className="ms-slot f"></div><div className="ms-slot f"></div><div className="ms-slot f"></div><div className="ms-slot f"></div><div className="ms-slot f"></div><div className="ms-slot f"></div></div>
            </div>
            <button className="ms-edit">✏️ Хуваарь засах</button>
          </div>

          {/* Сүүлийн холбоосууд */}
          <div className="rp-hd">Сүүлийн холбоосууд</div>
          <div className="match-list">
            <div className="mi">
              <div className="mi-av">👩‍💻<div className="mi-dot"></div></div>
              <div>
                <div className="mi-name">Номинчимэг</div>
                <div className="mi-pre">💬 Чат эхлүүлэх</div>
              </div>
              <div className="mi-unread">2</div>
            </div>
            <div className="mi">
              <div className="mi-av">🧑‍🔬<div className="mi-dot"></div></div>
              <div>
                <div className="mi-name">Батмөнх</div>
                <div className="mi-pre">Сайн байна уу 👋</div>
              </div>
              <div className="mi-time">12:15</div>
            </div>
            <div className="mi">
              <div className="mi-av">👩‍🎨</div>
              <div>
                <div className="mi-name">Энхтуяа</div>
                <div className="mi-pre">Маргааш уу?</div>
              </div>
              <div className="mi-time">Өчигдөр</div>
            </div>
          </div>

        </aside>

      </div>
    </>
  );
};

export default Discover;