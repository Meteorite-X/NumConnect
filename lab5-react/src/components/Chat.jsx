import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { users as localUsers } from '../data/member1.js';
import { chatMessages as localChat } from '../data/member2.js';
import { useApi } from '../hooks/useApi.js';
import { api, unwrap } from '../api.js';

export default function Chat() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { data: users = localUsers } = useApi('/api/users', localUsers);

  const activeUser = (users || localUsers).find(u => u.id === userId) || (users || localUsers)[1] || localUsers[1];
  const activeUserId = activeUser?.id || 'enkh';

  const [tab, setTab] = useState('dms');
  const [messages, setMessages] = useState(localChat);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const msgsRef = useRef(null);

  // Backend-аас active user-ийн чат түүх татах
  useEffect(() => {
    let alive = true;
    api.get(`/api/chat/${activeUserId}/messages`)
      .then(res => { if (alive) setMessages(unwrap(res)); })
      .catch(() => { if (alive) setMessages(localChat); /* backend off → fallback */ });
    return () => { alive = false; };
  }, [activeUserId]);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages]);

  const send = async () => {
    const t = input.trim();
    if (!t) return;
    setSending(true);
    const now = new Date();
    const ts = now.getHours() + ':' + String(now.getMinutes()).padStart(2,'0');
    const optimistic = { sender:'Би', av:'😊', time:ts, text:t, me:true };
    setMessages(prev => [...prev, optimistic]);
    setInput('');

    try {
      await api.post(`/api/chat/${activeUserId}/messages`, { text: t });
    } catch (err) {
      console.warn('Backend POST алдаа (UI-д үлдсэн):', err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="sc on">
      <div className="chat-shell">
        <div className="thread-col">
          <div className="tc-head">
            <div className="tc-title">Мессеж</div>
            <div className="tc-search">
              <span className="tc-search-ico">🔍</span>
              <input className="tc-search-inp" placeholder="Хайх..." />
            </div>
          </div>
          <div className="chat-tabs">
            <button className={'chat-tab' + (tab === 'dms' ? ' on' : '')} onClick={() => setTab('dms')}>
              💬 Мессеж
            </button>
            <button className={'chat-tab' + (tab === 'people' ? ' on' : '')} onClick={() => setTab('people')}>
              👥 Бүгд <span className="ct-badge">{users.length}</span>
            </button>
          </div>

          {tab === 'dms' ? (
            <div className="thread-list">
              <div className="tc-cat">▾ ИДЭВХТЭЙ</div>
              {users.filter(u => u.online).slice(0, 3).map(u => (
                <div
                  key={u.id}
                  className={'th-item' + (u.id === activeUser.id ? ' on' : '')}
                  onClick={() => navigate('/chat/' + u.id)}
                >
                  <div className="th-av">
                    {u.av}
                    {u.online && <div className="th-on"></div>}
                  </div>
                  <div className="th-body">
                    <div className="th-row">
                      <div className="th-name">{u.name}</div>
                      <div className="th-time">14:32</div>
                    </div>
                    <div className="th-pre">{u.bio}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="thread-list">
              <div className="tc-cat">▾ БҮГД — {users.length}</div>
              {users.map(u => (
                <div
                  key={u.id}
                  className="th-item"
                  onClick={() => navigate('/chat/' + u.id)}
                >
                  <div className="th-av" style={{background: `linear-gradient(135deg, ${u.gradient[0]}, ${u.gradient[1]})`}}>
                    {u.av}
                    {u.online && <div className="th-on"></div>}
                  </div>
                  <div className="th-body">
                    <div className="th-row">
                      <div className="th-name">{u.name}, {u.age}</div>
                      <div className="ppl-mbti">{u.mbti}</div>
                    </div>
                    <div className="th-pre">{u.major} · {u.year}</div>
                  </div>
                  <div className="ppl-score" style={{color: u.online ? 'var(--accent)' : 'var(--dim)'}}>
                    {u.score}%
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="chat-win">
          <div className="chat-bar">
            <div className="cb-av">{activeUser.av}</div>
            <div>
              <div className="cb-name">{activeUser.name}</div>
              <div className="cb-status" style={{color: activeUser.online ? '#059669' : '#94A3B8'}}>
                {activeUser.online ? '● Онлайн байна' : '⊘ Офлайн'}
              </div>
              <div className="cb-sub">
                {activeUser.major} · {activeUser.year} · {activeUser.score}% таарсан
              </div>
            </div>
            <div className="cb-acts">
              <div className="cb-btn">📅</div>
              <div className="cb-btn">⋯</div>
            </div>
          </div>

          <div className="ct-banner">
            <div style={{fontSize:'16px'}}>📅</div>
            <div className="ct-txt">
              Та хоёр <strong>{activeUser.commonHours} нийтлэг цагтай</strong>.
            </div>
          </div>

          <div className="msgs" ref={msgsRef}>
            <div className="date-sep">ӨНӨӨДӨР</div>
            {messages.map((m, i) => (
              <div key={i} className={'msg-row' + (m.me ? ' me' : '')}>
                <div className="msg-av">{m.av}</div>
                <div className="msg-content">
                  <div className={'msg-sender' + (m.me ? ' me-n' : '')}>
                    {m.sender} <span className="msg-ts">{m.time}</span>
                  </div>
                  <div className="bubble">{m.text}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="chat-inp-row">
            <div className="chat-box">
              <button className="chat-ico">📎</button>
              <input
                className="chat-inp"
                placeholder={activeUser.name + ' руу мессеж...'}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
              />
              <button className="chat-ico">😊</button>
            </div>
            <button className="chat-send" onClick={send}>➤</button>
          </div>
        </div>
      </div>
    </div>
  );
}
