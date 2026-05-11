import { Link } from 'react-router-dom';
import { stats as localStats, features as localFeatures } from '../data/member3.js';
import { useApi } from '../hooks/useApi.js';

export default function Landing() {
  const { data: stats }    = useApi('/api/stats',    localStats);
  const { data: features } = useApi('/api/features', localFeatures);

  return (
    <div className="sc on">
      <div className="land">
        <nav className="land-nav">
          <div className="land-logo">
            Num<span>Connect</span> <span className="logo-badge">МУИС</span>
          </div>
          <div className="land-links">
            <span className="land-link">Онцлог</span>
            <span className="land-link">Хэрхэн ажилладаг</span>
            <span className="land-link">Premium</span>
            <Link to="/login" className="btn btn-p" style={{padding:'10px 24px',fontSize:'13px'}}>
              Нэвтрэх →
            </Link>
          </div>
        </nav>

        <div className="land-hero">
          <div className="land-eyebrow">
            <span className="eyebrow-dot"></span>МУИС оюутнуудад зориулсан
          </div>
          <h1 className="land-h1">
            Хуваарьдаа<br /><em>таарсан</em><br />найзаа ол
          </h1>
          <p className="land-p">
            Outlook цахим шуудангаараа нэвтэрч, хичээлийн хуваарьдаа тохирсон оюутнуудтай холбогд.
          </p>
          <div className="land-btns">
            <Link to="/login" className="btn btn-p">Үнэгүй эхлэх →</Link>
            <button className="btn btn-s">Хэрхэн ажилладаг вэ</button>
          </div>

          <div className="phone-wrap">
            <div className="phone phone1">
              <div className="ph-notch"></div>
              <div className="ph-card ph-c3">
                <div className="ph-emo">🧑‍🔬</div>
                <div className="ph-name">Батмөнх</div>
                <div className="ph-sub">Эдийн засаг · 2-р курс</div>
                <div className="ph-tag">📅 72% таарсан</div>
              </div>
            </div>
            <div className="phone phone2">
              <div className="ph-notch"></div>
              <div className="ph-card ph-c1">
                <div className="ph-emo">👩‍💻</div>
                <div className="ph-name">Номинчимэг</div>
                <div className="ph-sub">Программ хангамж · 3-р курс</div>
                <div className="ph-tag">🤝 87% таарсан</div>
              </div>
            </div>
            <div className="phone phone3">
              <div className="ph-notch"></div>
              <div className="ph-card ph-c2">
                <div className="ph-emo">👩‍🎨</div>
                <div className="ph-name">Энхтуяа</div>
                <div className="ph-sub">Дизайн · 1-р курс</div>
                <div className="ph-tag">⭐ 79% таарсан</div>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-row">
          {stats.map(({ value, label }) => (
            <div key={label} className="stat-item">
              <span className="stat-n">{value}</span>
              <span className="stat-l">{label}</span>
            </div>
          ))}
        </div>

        <div className="feat-section">
          <div className="feat-hd">Яагаад NumConnect вэ?</div>
          <div className="feat-sub">Зүгээр л танилцах биш — зорилготой хамтрагч ол</div>
          <div className="feat-grid">
            {features.map(({ icon, iconClass, title, desc }) => (
              <div key={title} className="feat-card">
                <div className={'feat-ico ' + iconClass}>{icon}</div>
                <div className="feat-t">{title}</div>
                <div className="feat-p">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
