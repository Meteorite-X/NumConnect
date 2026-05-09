import { kpis, reports, dauChart } from '../data/member3.js';
import { users } from '../data/member1.js';

export default function Admin() {
  return (
    <div className="sc on">
      <div className="admin-pg">
        <div className="adm-hd">
          <div>
            <div style={{fontSize:'11px',fontWeight:800,color:'var(--accent)',letterSpacing:'1px',textTransform:'uppercase',marginBottom:'6px'}}>
              ⚙️ Admin Panel
            </div>
            <div className="adm-title">Dashboard</div>
            <div className="adm-sub">NumConnect системийн тойм</div>
          </div>
          <div className="adm-date">📅 2025-06-01 · Лхагва</div>
        </div>

        <div className="kpi-row">
          {kpis.map(k => (
            <div key={k.label} className="kpi">
              <div className={'kpi-ico ' + k.iconClass}>{k.icon}</div>
              <div className={'kpi-n ' + k.valueClass}>{k.value}</div>
              <div className="kpi-l">{k.label}</div>
              <div className={'kpi-ch' + (k.negative ? ' neg' : '')}>{k.change}</div>
            </div>
          ))}
        </div>

        <div className="adm-grid">
          <div>
            <div className="adm-card" style={{marginBottom:'18px'}}>
              <div className="adm-ch">
                <div className="adm-ct">📈 DAU — 7 хоног</div>
                <div style={{fontSize:'12px',color:'var(--sub)',fontWeight:600}}>Энэ долоо хоног</div>
              </div>
              <div className="chart-area">
                {dauChart.map(d => (
                  <div key={d.day} className="cb2" style={{height: d.height + '%'}}>
                    <div className="cb2-val">{d.value}</div>
                  </div>
                ))}
              </div>
              <div className="chart-days">
                {dauChart.map(d => <div key={d.day} className="cd">{d.day}</div>)}
              </div>
            </div>

            <div className="adm-card">
              <div className="adm-ch">
                <div className="adm-ct">👥 Хэрэглэгчид</div>
                <div style={{display:'flex',gap:'8px'}}>
                  <input className="inp" style={{padding:'7px 12px',width:'140px'}} placeholder="🔍 Хайх..." />
                  <select className="inp" style={{padding:'7px 12px',cursor:'pointer'}}>
                    <option>Бүгд</option>
                    <option>Premium</option>
                    <option>Free</option>
                  </select>
                </div>
              </div>
              <table className="adm-table">
                <thead>
                  <tr>
                    <th className="adm-th">Хэрэглэгч</th>
                    <th className="adm-th">Мэргэжил</th>
                    <th className="adm-th">Курс</th>
                    <th className="adm-th">Төрөл</th>
                    <th className="adm-th">Статус</th>
                    <th className="adm-th">Үйлдэл</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="adm-tr">
                      <td className="adm-td">
                        <div className="uc">
                          <div className="ua">{u.av}</div>
                          <div>
                            <div className="un">{u.name}</div>
                            <div className="ue">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="adm-td">{u.major}</td>
                      <td className="adm-td">{u.year}</td>
                      <td className="adm-td">
                        <span className={'badge ' + (u.plan === 'premium' ? 'bg-prem' : 'bg-free')}>
                          {u.plan === 'premium' ? '👑 Premium' : 'Free'}
                        </span>
                      </td>
                      <td className="adm-td">
                        <span className={'badge ' + (u.status === 'active' ? 'bg-ok' : 'bg-bad')}>
                          {u.status === 'active' ? '✓ Идэвхтэй' : '⚠ Тэмдэглэгдсэн'}
                        </span>
                      </td>
                      <td className="adm-td">
                        <button className="adm-act aa-view">Харах</button>
                        <button className="adm-act aa-block">Block</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div className="adm-card" style={{marginBottom:'18px'}}>
              <div className="adm-ch">
                <div className="adm-ct">🚨 Гомдлууд</div>
                <span className="badge bg-bad">{reports.filter(r => r.status === 'open').length} нээлттэй</span>
              </div>
              <div className="rep-list">
                {reports.map((r, i) => (
                  <div key={i} className="rep-item">
                    <div className="rep-ico">{r.icon}</div>
                    <div>
                      <div className="rep-t">{r.title}</div>
                      <div className="rep-s">{r.detail}</div>
                    </div>
                    <span className={'badge rep-st ' + (r.status === 'open' ? 'bg-bad' : 'bg-ok')}>
                      {r.status === 'open' ? 'Нээлттэй' : 'Шийдэгдсэн'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="adm-card">
              <div className="adm-ch">
                <div className="adm-ct">📊 Үзүүлэлтүүд</div>
              </div>
              <div className="qs-list">
                <div className="qs-row"><div className="qs-l">Match score</div><div className="qs-n qs-a">71%</div></div>
                <div className="qs-row"><div className="qs-l">Чат хариу</div><div className="qs-n qs-b">40%</div></div>
                <div className="qs-row"><div className="qs-l">Premium conv.</div><div className="qs-n qs-c">7.1%</div></div>
                <div className="qs-row"><div className="qs-l">Үнэлгээ</div><div className="qs-n qs-d">4.3 ★</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
