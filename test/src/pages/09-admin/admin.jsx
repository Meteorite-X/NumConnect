import './admin.css';
import Navbar from '../../shared/Navbar';

const Admin = () => {
  return (
    <>
      <Navbar />

      {/* ADMIN */}
      <div className="admin-pg">

        {/* Дээд хэсэг */}
        <div className="adm-hd">
          <div>
            <div className="adm-label">⚙️ Admin Panel</div>
            <div className="adm-title">Dashboard</div>
            <div className="adm-sub">NumConnect системийн тойм</div>
          </div>
          <div className="adm-date">📅 2025-06-01 · Лхагва</div>
        </div>

        {/* KPI карт */}
        <div className="kpi-row">
          <div className="kpi">
            <div className="kpi-ico ki-a">👥</div>
            <div className="kpi-l">Нийт хэрэглэгч</div>
            <div className="kpi-n kn-a">1,247</div>
            <div className="kpi-ch">↑ +12% энэ долоо хоног</div>
          </div>
          <div className="kpi">
            <div className="kpi-ico ki-b">💬</div>
            <div className="kpi-l">Өдрийн идэвхтэй</div>
            <div className="kpi-n kn-b">342</div>
            <div className="kpi-ch">↑ +8% өчигдөртэй харьцуулахад</div>
          </div>
          <div className="kpi">
            <div className="kpi-ico ki-w">🤝</div>
            <div className="kpi-l">Нийт холболт</div>
            <div className="kpi-n kn-w">3,891</div>
            <div className="kpi-ch">↑ +24% энэ сар</div>
          </div>
          <div className="kpi">
            <div className="kpi-ico ki-g">👑</div>
            <div className="kpi-l">Premium хэрэглэгч</div>
            <div className="kpi-n kn-g">89</div>
            <div className="kpi-ch">↑ +7.1% конверс</div>
          </div>
        </div>

        {/* Үндсэн grid */}
        <div className="adm-grid">

          {/* Зүүн тал */}
          <div>

            {/* Chart */}
            <div className="adm-card" style={{ marginBottom: '18px' }}>
              <div className="adm-ch">
                <div className="adm-ct">📈 DAU — 7 хоног</div>
                <div className="adm-ch-sub">Энэ долоо хоног</div>
              </div>
              <div className="chart-area">
                <div className="cb2" style={{ height: '55%' }}><div className="cb2-val">98</div></div>
                <div className="cb2" style={{ height: '72%' }}><div className="cb2-val">128</div></div>
                <div className="cb2" style={{ height: '48%' }}><div className="cb2-val">86</div></div>
                <div className="cb2" style={{ height: '88%' }}><div className="cb2-val">156</div></div>
                <div className="cb2" style={{ height: '65%' }}><div className="cb2-val">116</div></div>
                <div className="cb2" style={{ height: '95%' }}><div className="cb2-val">169</div></div>
                <div className="cb2" style={{ height: '70%' }}><div className="cb2-val">124</div></div>
              </div>
              <div className="chart-days">
                <div className="cd">Да</div>
                <div className="cd">Мя</div>
                <div className="cd">Лх</div>
                <div className="cd">Пү</div>
                <div className="cd">Ба</div>
                <div className="cd">Бя</div>
                <div className="cd">Ня</div>
              </div>
            </div>

            {/* Хэрэглэгчдийн хүснэгт */}
            <div className="adm-card">
              <div className="adm-ch">
                <div className="adm-ct">👥 Хэрэглэгчид</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input className="adm-inp" placeholder="🔍 Хайх..." />
                  <select className="adm-inp" style={{ cursor: 'pointer' }} defaultValue="Бүгд">
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
                  <tr className="adm-tr">
                    <td className="adm-td">
                      <div className="uc"><div className="ua">👩‍💻</div>
                      <div><div className="un">Номинчимэг</div><div className="ue">20B1NUM0001@num.edu.mn</div></div></div>
                    </td>
                    <td className="adm-td">Программ хангамж</td>
                    <td className="adm-td">3-р курс</td>
                    <td className="adm-td"><span className="badge bg-prem">👑 Premium</span></td>
                    <td className="adm-td"><span className="badge bg-ok">Идэвхтэй</span></td>
                    <td className="adm-td">
                      <button className="adm-act aa-view">Харах</button>
                      <button className="adm-act aa-block">Блок</button>
                    </td>
                  </tr>
                  <tr className="adm-tr">
                    <td className="adm-td">
                      <div className="uc"><div className="ua">🧑‍🔬</div>
                      <div><div className="un">Батмөнх</div><div className="ue">20B1NUM0002@num.edu.mn</div></div></div>
                    </td>
                    <td className="adm-td">Эдийн засаг</td>
                    <td className="adm-td">2-р курс</td>
                    <td className="adm-td"><span className="badge bg-free">Free</span></td>
                    <td className="adm-td"><span className="badge bg-ok">Идэвхтэй</span></td>
                    <td className="adm-td">
                      <button className="adm-act aa-view">Харах</button>
                      <button className="adm-act aa-block">Блок</button>
                    </td>
                  </tr>
                  <tr className="adm-tr">
                    <td className="adm-td">
                      <div className="uc"><div className="ua">👩‍🎨</div>
                      <div><div className="un">Энхтуяа</div><div className="ue">20B1NUM0003@num.edu.mn</div></div></div>
                    </td>
                    <td className="adm-td">Дизайн</td>
                    <td className="adm-td">1-р курс</td>
                    <td className="adm-td"><span className="badge bg-free">Free</span></td>
                    <td className="adm-td"><span className="badge bg-ok">Идэвхтэй</span></td>
                    <td className="adm-td">
                      <button className="adm-act aa-view">Харах</button>
                      <button className="adm-act aa-block">Блок</button>
                    </td>
                  </tr>
                  <tr className="adm-tr">
                    <td className="adm-td">
                      <div className="uc"><div className="ua">🧑‍💼</div>
                      <div><div className="un">Тэмүүлэн</div><div className="ue">20B1NUM0004@num.edu.mn</div></div></div>
                    </td>
                    <td className="adm-td">Бизнес</td>
                    <td className="adm-td">4-р курс</td>
                    <td className="adm-td"><span className="badge bg-prem">👑 Premium</span></td>
                    <td className="adm-td"><span className="badge bg-bad">Тайлагдсан</span></td>
                    <td className="adm-td">
                      <button className="adm-act aa-view">Харах</button>
                      <button className="adm-act aa-block">Блок</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          {/* Баруун тал */}
          <div>

            {/* Гомдлууд */}
            <div className="adm-card" style={{ marginBottom: '18px' }}>
              <div className="adm-ch">
                <div className="adm-ct">🚨 Гомдлууд</div>
                <span className="badge bg-bad">3 нээлттэй</span>
              </div>
              <div className="rep-list">
                <div className="rep-item">
                  <div className="rep-ico">⚠️</div>
                  <div>
                    <div className="rep-t">Спам мессеж</div>
                    <div className="rep-s">Батмөнх → Тэмүүлэн · 2 цагийн өмнө</div>
                  </div>
                  <div className="rep-st"><span className="badge bg-bad">Нээлттэй</span></div>
                </div>
                <div className="rep-item">
                  <div className="rep-ico">🚫</div>
                  <div>
                    <div className="rep-t">Зохисгүй зураг</div>
                    <div className="rep-s">Тэмүүлэн · 5 цагийн өмнө</div>
                  </div>
                  <div className="rep-st"><span className="badge bg-bad">Нээлттэй</span></div>
                </div>
                <div className="rep-item">
                  <div className="rep-ico">✅</div>
                  <div>
                    <div className="rep-t">Хуурамч профайл</div>
                    <div className="rep-s">Өчигдөр · Шийдвэрлэсэн</div>
                  </div>
                  <div className="rep-st"><span className="badge bg-ok">Шийдвэрлэсэн</span></div>
                </div>
              </div>
            </div>

            {/* Үзүүлэлтүүд */}
            <div className="adm-card">
              <div className="adm-ch">
                <div className="adm-ct">📊 Үзүүлэлтүүд</div>
              </div>
              <div className="qs-list">
                <div className="qs-row">
                  <div className="qs-l">Match score</div>
                  <div className="qs-n qs-a">71%</div>
                </div>
                <div className="qs-row">
                  <div className="qs-l">Чат хариу</div>
                  <div className="qs-n qs-b">40%</div>
                </div>
                <div className="qs-row">
                  <div className="qs-l">Premium conv.</div>
                  <div className="qs-n qs-c">7.1%</div>
                </div>
                <div className="qs-row">
                  <div className="qs-l">Үнэлгээ</div>
                  <div className="qs-n qs-d">4.3 ★</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;