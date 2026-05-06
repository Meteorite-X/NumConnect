import './otp.css';
import Navbar from '../../shared/Navbar';

const Otp = () => {
  return (
    <>
      {/* Дээд цэс */}
      <Navbar />

      {/* OTP */}
      <div className="otp-wrap">
        <div className="otp-card">

          {/* Дүрс */}
          <div className="otp-icon">📨</div>

          {/* Гарчиг */}
          <div className="otp-title">Код оруулна уу</div>
          <div className="otp-sub">
            <strong>20B1NUM0042@num.edu.mn</strong> руу<br />
            6 оронтой код илгээлээ
          </div>

          {/* OTP оролтууд */}
          <div className="otp-inputs">
            {/* React дээр maxlength нь maxLength болж өөрчлөгдөнө, input заавал хаагдана */}
            <input className="otp-inp filled" maxLength="1" defaultValue="4" />
            <input className="otp-inp filled" maxLength="1" defaultValue="2" />
            <input className="otp-inp filled" maxLength="1" defaultValue="7" />
            <input className="otp-inp" maxLength="1" placeholder="·" />
            <input className="otp-inp" maxLength="1" placeholder="·" />
            <input className="otp-inp" maxLength="1" placeholder="·" />
          </div>

          {/* Таймер */}
          <div className="otp-timer">Хүчинтэй: <span>04:22</span></div>

          {/* Товч */}
          <button className="btn btn-p btn-full">Баталгаажуулах →</button>

          {/* Дахин илгээх */}
          <div className="otp-resend-row">
            Код ирсэнгүй? <span className="otp-resend">Дахин илгээх</span>
          </div>

        </div>
      </div>
    </>
  );
};

export default Otp;