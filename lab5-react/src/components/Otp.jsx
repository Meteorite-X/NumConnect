import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';

export default function Otp() {
  const navigate = useNavigate();
  const [code, setCode] = useState(['4','2','7','','','']);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const inputs = useRef([]);

  let storedEmail = '20B1NUM0042@num.edu.mn';
  try { storedEmail = sessionStorage.getItem('nc-email') || storedEmail; } catch {}

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

  const verify = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await api.post('/api/auth/verify', { email: storedEmail, code: code.join('') });
      navigate('/setup');
    } catch (err) {
      if (err.status === 400) {
        setError(err.message);
      } else {
        console.warn('Verify API алдаа:', err.message);
        navigate('/setup');     // backend off — UI үргэлжилнэ (демо)
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sc on">
      <div className="otp-wrap">
        <div className="otp-card">
          <div className="otp-icon">📨</div>
          <div className="otp-title">Код оруулна уу</div>
          <div className="otp-sub">
            <strong>{storedEmail}</strong> руу 6 оронтой код илгээлээ
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
          {error && <div style={{fontSize:'12px',color:'var(--err)',marginTop:'10px'}}>⚠ {error}</div>}
          <div className="otp-timer">Хүчинтэй: <span>04:22</span></div>
          <button className="btn btn-p btn-full" onClick={verify} disabled={submitting}>
            {submitting ? 'Шалгаж байна...' : 'Баталгаажуулах →'}
          </button>
          <div style={{marginTop:'20px',fontSize:'14px',color:'var(--sub)'}}>
            Код ирсэнгүй? <span className="otp-resend">Дахин илгээх</span>
          </div>
        </div>
      </div>
    </div>
  );
}
