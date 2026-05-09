import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = (e) => { e.preventDefault(); navigate('/otp'); };

  return (
    <div className="sc on">
      <div className="login-wrap">
        <div className="login-card">
          <div className="login-top">
            <div className="login-logo">Num<span>Connect</span></div>
            <div className="login-tag">МУИС оюутнуудын платформ</div>
          </div>
          <form className="login-body" onSubmit={handleSubmit}>
            <div style={{fontFamily:'var(--fd)',fontSize:'24px',fontWeight:800,letterSpacing:'-0.5px',marginBottom:'6px'}}>
              Нэвтрэх
            </div>
            <div style={{fontSize:'14px',color:'var(--sub)',marginBottom:'28px'}}>
              Outlook цахим шуудангаараа нэвтэрнэ үү
            </div>
            <div className="fg">
              <label className="lbl">Цахим шуудан</label>
              <input className="inp" type="email" defaultValue="20B1NUM0042@num.edu.mn" />
              <div style={{fontSize:'12px',color:'var(--dim)',marginTop:'6px'}}>
                @num.edu.mn хаяг шаардлагатай
              </div>
            </div>
            <button type="submit" className="btn btn-p btn-full">OTP код авах →</button>
            <div className="or-row">эсвэл</div>
            <button type="button" className="btn btn-s btn-full">🏫 Outlook OAuth-аар нэвтрэх</button>
          </form>
          <div className="login-footer">
            Анх удаа уу? Профайл автоматаар үүснэ.{' '}
            <span style={{color:'var(--accent)',cursor:'pointer',fontWeight:600}}>Үйлчилгээний нөхцөл</span>
          </div>
        </div>
      </div>
    </div>
  );
}
