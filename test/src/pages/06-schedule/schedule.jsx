import { useState } from 'react';
import './schedule.css';
import Navbar from '../../shared/Navbar';

const Schedule = () => {
  // Хуваарь тэмдэглэх горим (free, busy, clear)
  const [mode, setMode] = useState('free');

  // 08:00-аас 20:00 хүртэлх цагуудыг үүсгэх
  const hours = Array.from({ length: 13 }, (_, i) => i + 8);

  return (
    <>
      <Navbar />

      {/* SCHEDULE */}
      <div className="sched-sticky">
        <button className="sched-back">← Буцах</button>
        <span className="sched-title">Хуваарь тохируулах</span>
        <div className="mode-group">
          <button 
            className={`sm-btn ${mode === 'free' ? 'on' : ''}`} 
            onClick={() => setMode('free')}
          >
            🟢 Чөлөөт
          </button>
          <button 
            className={`sm-btn ${mode === 'busy' ? 'on' : ''}`} 
            onClick={() => setMode('busy')}
          >
            🟠 Хичээл
          </button>
          <button 
            className={`sm-btn ${mode === 'clear' ? 'on' : ''}`} 
            onClick={() => setMode('clear')}
          >
            ✕ Арилгах
          </button>
        </div>
      </div>

      <div className="sched-page">

        {/* Гарчиг */}
        <div style={{ marginBottom: '18px' }}>
          <div className="sched-h">Долоо хоногийн хуваарь</div>
          <div className="sched-sub">Горим сонгоод нүдийг чирж тэмдэглэ</div>
        </div>

        {/* Тайлбар */}
        <div className="sched-hint">
          <div className="sh-item"><div className="sh-sw sh-f"></div>Чөлөөт</div>
          <div className="sh-div"></div>
          <div className="sh-item"><div className="sh-sw sh-b"></div>Хичээлтэй</div>
          <div className="sh-div"></div>
          <div className="sh-item"><div className="sh-sw sh-e"></div>Хоосон</div>
        </div>

        {/* Grid */}
        <div className="sched-wrap">
          <div className="sg-head">
            <div className="sg-corner"></div>
            <div className="sg-day today">ДА</div>
            <div className="sg-day">МЯ</div>
            <div className="sg-day">ЛХ</div>
            <div className="sg-day">ПҮ</div>
            <div className="sg-day">БА</div>
            <div className="sg-day">БЯ</div>
            <div className="sg-day">НЯ</div>
          </div>
          
          <div className="sg-body" id="sg-body">
            {/* Цагийн хуваарийг автоматаар зурах */}
            {hours.map((hour) => (
              <div className="sg-row" key={hour}>
                <div className="sg-time">{hour}:00</div>
                <div className="sg-cell"></div>
                <div className="sg-cell"></div>
                <div className="sg-cell"></div>
                <div className="sg-cell"></div>
                <div className="sg-cell"></div>
                <div className="sg-cell"></div>
                <div className="sg-cell"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Статистик */}
        <div className="sched-stats">
          <div className="ss-card">
            <div className="ss-n cyan" id="cnt-free">0</div>
            <div className="ss-l">Чөлөөт цаг</div>
          </div>
          <div className="ss-card">
            <div className="ss-n sky" id="cnt-busy">0</div>
            <div className="ss-l">Хичээлтэй</div>
          </div>
          <div className="ss-card">
            <div className="ss-n mint">87%</div>
            <div className="ss-l">Match score</div>
          </div>
        </div>

        {/* Товчнууд */}
        <div className="sched-btns">
          <button className="btn btn-p btn-full">✓ Хадгалах</button>
          <button className="btn btn-s">🔄 Арилгах</button>
        </div>

      </div>
    </>
  );
};

export default Schedule;