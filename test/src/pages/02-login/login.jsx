import './login.css';
import Navbar from '../../shared/Navbar';

const Login = () => {
  return (
    <>
      {/* Дээд цэсийг шууд дуудаж оруулна */}
      <Navbar />

      {/* LOGIN */}
      <div className="login-wrap">
        <div className="login-card">

          {/* Дээд хэсэг */}
          <div className="login-top">
            <div className="login-logo">Num<span>Connect</span></div>
            <div className="login-tag">МУИС оюутнуудын платформ</div>
          </div>

          {/* Үндсэн хэсэг */}
          <div className="login-body">
            <div className="login-title">Нэвтрэх</div>
            <div className="login-sub">Outlook цахим шуудангаараа нэвтэрнэ үү</div>

            {/* Email */}
            <div className="fg">
              <label className="lbl">Цахим шуудан</label>
              {/* React дээр input-ийг заавал хаах ёстой бөгөөд анхны утгыг defaultValue-аар өгнө */}
              <input 
                className="inp" 
                type="email" 
                placeholder="20B1NUM0042@num.edu.mn" 
                defaultValue="20B1NUM0042@num.edu.mn" 
              />
              <div className="inp-hint">@num.edu.mn хаяг шаардлагатай</div>
            </div>

            {/* Товчнууд */}
            <button className="btn btn-p btn-full">OTP код авах →</button>

            <div className="or-row">эсвэл</div>

            <button className="btn btn-s btn-full">🏫 Outlook OAuth-аар нэвтрэх</button>
          </div>

          {/* Доод хэсэг */}
          <div className="login-footer">
            Анх удаа уу? Профайл автоматаар үүснэ.
            <br />
            <span className="login-terms">Үйлчилгээний нөхцөл</span>
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;