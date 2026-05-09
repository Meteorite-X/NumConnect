import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { schedulePattern, scheduleHours, scheduleDays } from '../data/member3.js';

export default function Schedule() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('free');
  const [grid, setGrid] = useState(() => schedulePattern.map(row => [...row]));
  const [dragging, setDragging] = useState(false);

  const apply = (i, j) => {
    setGrid(prev => {
      const next = prev.map(r => [...r]);
      next[i][j] = mode === 'clear' ? '' : mode === 'free' ? 'f' : 'b';
      return next;
    });
  };

  const stats = useMemo(() => {
    let f = 0, b = 0;
    grid.forEach(row => row.forEach(c => { if (c === 'f') f++; else if (c === 'b') b++; }));
    return { f, b };
  }, [grid]);

  const clearAll = () => setGrid(schedulePattern.map(row => row.map(() => '')));

  return (
    <div className="sc on" onMouseUp={() => setDragging(false)}>
      <div className="sched-sticky">
        <button onClick={() => navigate('/discover')} style={{padding:'8px 18px',borderRadius:'var(--r-full)',border:'1px solid var(--line)',background:'var(--card)',fontSize:'13px',fontWeight:600,color:'var(--sub)',cursor:'pointer'}}>
          ← Буцах
        </button>
        <span style={{fontFamily:'var(--fd)',fontSize:'18px',fontWeight:800,color:'var(--ink)'}}>
          Хуваарь тохируулах
        </span>
        <div className="mode-group" style={{marginLeft:'auto'}}>
          <button className={'sm-btn' + (mode === 'free' ? ' on' : '')} onClick={() => setMode('free')}>
            🟢 Чөлөөт
          </button>
          <button className={'sm-btn' + (mode === 'busy' ? ' on' : '')} onClick={() => setMode('busy')}>
            🟠 Хичээл
          </button>
          <button className={'sm-btn' + (mode === 'clear' ? ' on' : '')} onClick={() => setMode('clear')}>
            ✕ Арилгах
          </button>
        </div>
      </div>

      <div className="sched-page">
        <div style={{marginBottom:'18px'}}>
          <div className="sched-h">Долоо хоногийн хуваарь</div>
          <div className="sched-sub">Горим сонгоод нүдийг чирж тэмдэглэ</div>
        </div>

        <div className="sched-hint">
          <div className="sh-item"><div className="sh-sw sh-f"></div>Чөлөөт</div>
          <div className="sh-div"></div>
          <div className="sh-item"><div className="sh-sw sh-b"></div>Хичээлтэй</div>
          <div className="sh-div"></div>
          <div className="sh-item"><div className="sh-sw sh-e"></div>Хоосон</div>
        </div>

        <div className="sched-wrap">
          <div className="sg-head">
            <div className="sg-corner"></div>
            {scheduleDays.map((d, i) => (
              <div key={d} className={'sg-day' + (i === 0 ? ' today' : '')}>{d}</div>
            ))}
          </div>
          <div className="sg-body">
            {scheduleHours.map((h, i) => (
              <div key={h} className="sg-row">
                <div className="sg-time">{h}:00</div>
                {scheduleDays.map((_, j) => (
                  <div
                    key={j}
                    className={'sg-cell' + (grid[i][j] ? ' ' + grid[i][j] : '')}
                    onMouseDown={() => { setDragging(true); apply(i, j); }}
                    onMouseEnter={() => { if (dragging) apply(i, j); }}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="sched-stats">
          <div className="ss-card">
            <div className="ss-n cyan">{stats.f}</div>
            <div className="ss-l">Чөлөөт цаг</div>
          </div>
          <div className="ss-card">
            <div className="ss-n sky">{stats.b}</div>
            <div className="ss-l">Хичээлтэй</div>
          </div>
          <div className="ss-card">
            <div className="ss-n mint">87%</div>
            <div className="ss-l">Match score</div>
          </div>
        </div>

        <div style={{display:'flex',gap:'12px',marginTop:'20px'}}>
          <button className="btn btn-p btn-full" onClick={() => navigate('/discover')}>
            ✓ Хадгалах
          </button>
          <button className="btn btn-s" onClick={clearAll}>🔄 Арилгах</button>
        </div>
      </div>
    </div>
  );
}
