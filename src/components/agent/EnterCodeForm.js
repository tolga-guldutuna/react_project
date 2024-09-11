import React, { useState, useEffect } from 'react';
import { useAuth } from '../../services/AuthService';

function EnterCodeForm() {
    const [code, setCode] = useState('');
    const { verifyCode, reSendCode, error } = useAuth();
    const [timeLeft, setTimeLeft] = useState(60); // 1 dakikalık geri sayım (60 saniye)
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearInterval(timerId);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    const handleSubmit = (e) => {
        e.preventDefault();
        verifyCode(code);
    };

    const handleResend = async () => {
        try {
            await reSendCode();
            setTimeLeft(60); // Geri sayımı sıfırla ve yeniden başlat
            setCanResend(false);
        } catch (err) {
            setError('Resending code failed. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Agent Enter Code:</label>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Submit</button>
            </form>
            <div>
                {canResend ? (
                    <button onClick={handleResend}>Resend Code</button>
                ) : (
                    <p>Resend available in {timeLeft} seconds</p>
                )}
            </div>
        </div>
    );
}

export default EnterCodeForm;
