import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { users, filters, recentMatches } from '../data/member1.js';

export default function Discover() {
  const navigate = useNavigate();
  const [view, setView] = useState('swipe');
  const [activeFilter, setActiveFilter] = useState('Бүгд');
  const [showMatch, setShowMatch] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const topUser = users[cardIndex] || users[0];

  const nextCard = () => setCardIndex(i => (i + 1) % users.length);
  const handleLike = () => { setShowMatch(true); };
  const closeMatch = () => { setShowMatch(false); nextCard(); };

  return (
    <div className="sc on">
      {showMatch && (
        <div className="modal-ov show" onClick={closeMatch}>
          <div className="match-modal" onClick={e => e.stopPropagation()}>
            <div className="mm-sparkle">🎉</div>
            <div className="mm-title">Connect!</div>
            <div className="mm-sub">Та хоёр холбогдохыг хүсэж байна!</div>
            <div className="mm-avs">
              <div className="mm-av">😊</div>
              <div className="mm-heart">🤝</div>
              <div className="mm-av">{topUser.av}</div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              <button className="btn btn-p btn-full" onClick={() => navigate('/chat/' + topUser.id)}>
                💬 Чат эхлүүлэх
              </button>
              <button className="btn btn-s btn-full" onClick={closeMatch}>Дараа</button>
            </div>
          </div>
        </div>
      )}

      <div className="app-shell">
        <aside className="icon-nav">
          <div className="nav-logo-sm">N</div>
          <div className="n-ico on">💫</div>
          <div className="n-ico" onClick={() => navigate('/chat')}>
            💬<div className="n-badge">3</div>
          </div>
          <div className="n-ico">🤝</div>
          <div className="n-sep"></div>
          <div className="n-ico" onClick={() => navigate('/schedule')}>📅</div>
          <div className="n-ico" onClick={() => navigate('/premium')}>👑</div>
          <div className="n-ico">⚙️</div>
          <div className="nav-ava">😊</div>
        </aside>

        <main className="feed-main">
          <div className="feed-top">
            <div>
              <div className="feed-h">Discover <span>💫</span></div>
              <div style={{fontSize:'13px',color:'var(--sub)',marginTop:'3px'}}>
                Таны хуваарьтай таарсан оюутнууд
              </div>
            </div>
            <div className="feed-right">
              <div className="vtgl">
                <button className={'vt' + (view === 'swipe' ? ' on' : '')} onClick={() => setView('swipe')}>
                  🃏 Swipe
                </button>
                <button className={'vt' + (view === 'list' ? ' on' : '')} onClick={() => setView('list')}>
                  ☰ Жагсаалт
                </button>
              </div>
            </div>
          </div>

          <div className="filter-row">
            {filters.map(({ label }) => (
              <button
                key={label}
                className={'chip' + (activeFilter === label ? ' on' : '')}
                onClick={() => setActiveFilter(label)}
              >
                {label}
              </button>
            ))}
          </div>

          {view === 'swipe' ? (
            <div className="swipe-view">
              <div className="card-stack">
                <div className="sw-card">
                  <div className="sw-photo" style={{background: `linear-gradient(145deg, ${topUser.gradient[0]}, ${topUser.gradient[1]})`}}>
                    <div className="sw-emo">{topUser.av}</div>
                    <div className="sw-badge-top">📅 {topUser.score}% таарсан</div>
                    {topUser.online && <div className="sw-online">● Онлайн</div>}
                  </div>
                  <div className="sw-info">
                    <div className="sw-name">
                      {topUser.name}, {topUser.age}<span className="sw-mbti-tag">{topUser.mbti}</span>
                    </div>
                    <div className="sw-meta">
                      {topUser.major} · {topUser.year} · {topUser.commonHours} нийтлэг цаг
                    </div>
                    <div className="sw-tags">
                      {topUser.tags.map(t => <span key={t} className="sw-tag">{t}</span>)}
                    </div>
                  </div>
                </div>
                <div className="sw-acts">
                  <button className="act-btn act-pass" onClick={nextCard}>
                    <div className="act-c">✕</div>
                    <span className="act-lbl">Алгасах</span>
                  </button>
                  <button className="act-btn act-like" onClick={handleLike}>
                    <div className="act-c">🤝</div>
                    <span className="act-lbl">Холбогдох</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="list-view active">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
                <span style={{fontSize:'14px',color:'var(--sub)'}}>{users.length} оюутан</span>
                <select style={{fontSize:'13px',fontWeight:600,color:'var(--ink2)',border:'1px solid var(--line)',borderRadius:'var(--r-full)',padding:'7px 16px',background:'var(--card)',cursor:'pointer'}}>
                  <option>Хуваарийн оноо ↓</option>
                  <option>Онлайн эхэнд</option>
                </select>
              </div>
              <div>
                {users.map(u => (
                  <div key={u.id} className="user-card" onClick={() => navigate('/chat/' + u.id)}>
                    <div className="u-av" style={{background: `linear-gradient(135deg, ${u.gradient[0]}, ${u.gradient[1]})`}}>
                      {u.av}
                      {u.online && <div className="u-dot"></div>}
                    </div>
                    <div className="u-info">
                      <div className="u-namerow">
                        <span className="u-name">{u.name}, {u.age}</span>
                        <span className="u-mbti">{u.mbti}</span>
                      </div>
                      <div className="u-meta">{u.major} · {u.year}</div>
                      <div className="u-tags">
                        {u.tags.slice(0, 3).map(t => <span key={t} className="u-tag">{t}</span>)}
                      </div>
                    </div>
                    <div className="u-right">
                      <div className="score-ring">
                        <span className="sr-n">{u.score}%</span>
                        <span className="sr-l">MATCH</span>
                      </div>
                      <button className="msg-btn" onClick={(e) => { e.stopPropagation(); navigate('/chat/' + u.id); }}>
                        💬 Бичих
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        <aside className="right-col">
          <div className="rp-hd">Сүүлийн холбоосууд</div>
          <div className="match-list">
            {recentMatches.map(m => (
              <div key={m.name} className="mi" onClick={() => navigate('/chat')}>
                <div className="mi-av">
                  {m.av}
                  {m.online && <div className="mi-dot"></div>}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div className="mi-name">{m.name}</div>
                  <div className="mi-pre">{m.preview}</div>
                </div>
                {m.unread ? (
                  <div className="mi-unread">{m.unread}</div>
                ) : (
                  <div className="mi-time">{m.time}</div>
                )}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
