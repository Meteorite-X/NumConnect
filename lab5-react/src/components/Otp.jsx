import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Otp() {
  const navigate = useNavigate();
  const [code, setCode] = useState(['4','2','7','','','']);
  const inputs = useRef([]);

  const updateDigit = (i, v) => {
    if (v.length > 1) v = v.slice(-1);
    const next = [...code];
    next[i] = v;
    setCode(next);
    if (v && i < 5) inputs.current[i+1]?.focus();
  };

  const onKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) inputs.current[i-1]?.focus();
  };

  return (
    <div className="sc on">
      <div className="otp-wrap">
        <div className="otp-card">
          <div className="otp-icon">📨</div>
          <div className="otp-title">Код оруулна уу</div>
          <div className="otp-sub">
            <strong>20B1NUM0042@num.edu.mn</strong> руу 6 оронтой код илгээлээ
          </div>
          <div className="otp-inputs">
            {code.map((v, i) => (
              <input
                key={i}
                ref={el => inputs.current[i] = el}
                className={'otp-inp' + (v ? ' filled' : '')}
                maxLength={1}
                value={v}
                placeholder="·"
                onChange={e => updateDigit(i, e.target.value)}
                onKeyDown={e => onKeyDown(i, e)}
              />
            ))}
          </div>
          <div className="otp-timer">Хүчинтэй: <span>04:22</span></div>
          <button className="btn btn-p btn-full" onClick={() => navigate('/setup')}>
            Баталгаажуулах →
          </button>
          <div style={{marginTop:'20px',fontSize:'14px',color:'var(--sub)'}}>
            Код ирсэнгүй? <span className="otp-resend">Дахин илгээх</span>
          </div>
        </div>
      </div>
    </div>
  );
}
