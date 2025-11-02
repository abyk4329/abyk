import { supabase } from '@/lib/supabase/client';
import { translateSupabaseError } from '@/lib/supabase/errors';
import { useState } from 'react';

interface SignupFormProps {
  onSuccess?: () => void;
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('הסיסמאות אינן תואמות');
      return;
    }

    if (formData.password.length < 6) {
      setError('הסיסמה חייבת להכיל לפחות 6 תווים');
      return;
    }

    if (!agreedToTerms) {
      setError('יש לאשר את תנאי השימוש');
      return;
    }

    const email = formData.email.trim();
    if (!email || !email.includes('@')) {
      setError('אנא הזינו כתובת אימייל תקינה.');
      return;
    }

    setLoading(true);

    // TODO: Replace with actual registration API call
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name.trim(),
            phone: formData.phone.trim(),
          },
        },
      });

      if (signUpError) {
        setError(translateSupabaseError(signUpError.message));
        return;
      }

      if (data.user) {
        setMessage(
          data.session
            ? 'ההרשמה הושלמה בהצלחה.'
            : 'שלחנו אליכם מייל לאישור החשבון. אנא אשרו כדי להשלים את ההרשמה.'
        );
      }

      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
      setAgreedToTerms(false);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError('אירעה שגיאה בלתי צפויה. נסו שוב מאוחר יותר.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="auth-brand">AWAKENING BY KSENIA</h1>
        </div>

        {/* Signup Form Card */}
        <form onSubmit={handleSubmit} className="login-card card-stack">
          <div className="login-card-header">
            <h2 className="Subtitle">הרשמה</h2>
            <p className="BodyText">צרו חשבון חדש והתחילו את המסע</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="neu-inset-min text-error text-sm py-3 px-4 rounded-lg">
              {error}
            </div>
          )}

          {message && (
            <div className="neu-inset-min py-3 px-4 rounded-lg auth-message">
              {message}
            </div>
          )}

          {/* Name Input */}
          <div className="login-field">
            <label htmlFor="name" className="BodyText" dir="rtl">
              שם מלא
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="neu-inset-min w-full px-4 py-3 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
              placeholder="שם מלא"
              dir="rtl"
            />
          </div>

          {/* Email Input */}
          <div className="login-field">
            <label htmlFor="email" className="BodyText" dir="rtl">
              אימייל
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="neu-inset-min w-full px-4 py-3 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
              placeholder="your@email.com"
              dir="ltr"
            />
          </div>

          {/* Phone Input */}
          <div className="login-field">
            <label htmlFor="phone" className="BodyText" dir="rtl">
              מספר טלפון
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="neu-inset-min w-full px-4 py-3 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
              placeholder="050-1234567"
              dir="ltr"
            />
          </div>

          {/* Password Input */}
          <div className="login-field">
            <label htmlFor="password" className="BodyText" dir="rtl">
              סיסמה
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="neu-inset-min w-full px-4 py-3 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
              placeholder="לפחות 6 תווים"
              dir="ltr"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="login-field">
            <label htmlFor="confirmPassword" className="BodyText" dir="rtl">
              אימות סיסמה
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="neu-inset-min w-full px-4 py-3 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
              placeholder="הקלידו שוב את הסיסמה"
              dir="ltr"
            />
          </div>

          {/* Terms Checkbox */}
          <div className="auth-checkbox" dir="rtl">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="auth-checkbox-input"
            />
            <label htmlFor="terms" className="BodyText">
              מאשרים את{' '}
              <a href="/terms" className="login-link">
                תנאי השימוש
              </a>{' '}
              ו
              <a href="/privacy" className="login-link">
                מדיניות הפרטיות
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary justify-center ButtonSecondaryText"
          >
            {loading ? 'נרשמים...' : 'הירשמו'}
          </button>

          {/* Login Link */}
          <div className="login-card-footer">
            <p className="login-card-note">
              כבר יש לכם חשבון?{' '}
              <a href="/login" className="login-link">
                התחברו כאן
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
