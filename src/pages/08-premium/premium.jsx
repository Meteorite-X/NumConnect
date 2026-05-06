import './premium.css';
import Navbar from '../../shared/Navbar';

const Premium = () => {
  return (
    <>
      <Navbar />

      {/* PREMIUM */}
      <div className="prem-page">

        {/* Badge */}
        <div className="prem-badge">🚀 NumConnect Багцууд</div>

        {/* Гарчиг */}
        <div className="prem-h">
          Илүү ихийг<br />
          <em>холбогдож</em> нээ
        </div>
        <div className="prem-sub">
          Бүлгийн суралцлага, хэн таныг харсныг мэдэх,
          Discover-д тэргүүлэх — бүгд энд.
        </div>

        {/* Үнийн grid */}
        <div className="price-grid">

          {/* Үнэгүй */}
          <div className="pc">
            <div className="pc-plan">Үнэгүй</div>
            <div className="pc-amt">₮0</div>
            <div className="pc-per">үүрд үнэгүй</div>
            <ul className="pc-feat">
              <li><span className="pf-yes">✓</span>Долоо хоногт 10 холболт</li>
              <li><span className="pf-yes">✓</span>1:1 чат</li>
              <li><span className="pf-yes">✓</span>Хуваарь тохируулах</li>
              <li><span className="pf-yes">✓</span># general суваг</li>
              <li><span className="pf-no">✗</span><span>Бүлгийн чат</span></li>
              <li><span className="pf-no">✗</span><span>Хэн үзсэнийг харах</span></li>
            </ul>
            <button className="btn btn-s btn-full" style={{ opacity: 0.6, cursor: 'default' }}>Одоогийн багц</button>
          </div>

          {/* Pro */}
          <div className="pc best">
            <div className="pc-pop">🔥 ОЮУТНУУДЫН СОНГОЛТ</div>
            <div className="pc-plan" style={{ color: 'var(--accent)' }}>Pro</div>
            <div className="pc-amt" style={{ color: 'var(--accent)' }}>₮4,900</div>
            <div className="pc-per">
              / сар ·
              <span className="pc-coffee"> Кофены үнэ ☕</span>
            </div>
            <ul className="pc-feat">
              <li><span className="pf-yes">✓</span>Хязгааргүй холболт</li>
              <li><span className="pf-yes">✓</span>Бүлгийн чат (5 хүртэл)</li>
              <li><span className="pf-yes">✓</span>Хэн профайл үзсэнийг харах</li>
              <li><span className="pf-yes">✓</span>Мессеж уншсан эсэх (✓✓)</li>
              <li><span className="pf-yes">✓</span>Discover-д эхэнд харагдах</li>
              <li><span className="pf-no">✗</span><span>Эвент үүсгэх</span></li>
            </ul>
            <button className="btn btn-p btn-full">Pro болох →</button>
          </div>

          {/* Pro+ */}
          <div className="pc">
            <div className="pc-plan">Pro+</div>
            <div className="pc-amt">₮8,900</div>
            <div className="pc-per">/ сар · бүх боломж</div>
            <ul className="pc-feat">
              <li><span className="pf-yes">✓</span>Pro-ийн бүх боломж</li>
              <li><span className="pf-yes">✓</span>Хязгааргүй бүлгийн чат</li>
              <li><span className="pf-yes">✓</span>Уулзалт/эвент зохион байгуулах</li>
              <li><span className="pf-yes">✓</span>Хуваарийн дэлгэрэнгүй шинжилгээ</li>
              <li><span className="pf-yes">✓</span>Нэмэлт профайл тохиргоо</li>
              <li><span className="pf-yes">✓</span>Pro+ badge ✦</li>
            </ul>
            <button className="btn btn-s btn-full">Pro+ сонгох →</button>
          </div>

        </div>

        {/* Тайлбар */}
        <div className="prem-note">
          🔒 QPay · Хэдийд ч цуцлах боломжтой · Эхний 7 хоног үнэгүй
        </div>

      </div>
    </>
  );
};

export default Premium;