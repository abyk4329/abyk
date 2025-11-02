import { supabase } from '@/lib/supabase/client';
import { translateSupabaseError } from '@/lib/supabase/errors';
import { useState } from 'react';

interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    // TODO: Replace with actual authentication API call
    try {
      const normalizedEmail = email.trim();

      if (!normalizedEmail) {
        setError('אנא הזינו כתובת אימייל.');
        return;
      }

      if (!normalizedEmail.includes('@')) {
        setError('כרגע ההתחברות זמינה באמצעות אימייל בלבד.');
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (signInError) {
        setError(translateSupabaseError(signInError.message));
        return;
      }

      setMessage('התחברות הושלמה בהצלחה! מעביר אותך לאזור האישי...');
      
      // Redirect to dashboard after successful login
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError('שגיאה בהתחברות. אנא נסו שוב.');
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

        {/* Login Form Card */}
        <form onSubmit={handleSubmit} className="login-card card-stack">
          <div className="login-card-header">
            <h2 className="Title">התחברות לאזור האישי</h2>
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

          {/* Email Input */}
          <div className="login-field">
            <label htmlFor="email" className="BodyText" dir="rtl">
              אימייל או מספר טלפון
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="neu-inset-min w-full px-4 py-3 rounded-lg text-base focus:outline-none focus-visible:outline-none focus:ring-0 transition-all"
              placeholder="your@email.com"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="neu-inset-min w-full px-4 py-3 rounded-lg text-base focus:outline-none focus-visible:outline-none focus:ring-0 transition-all"
              placeholder="••••••••"
              dir="ltr"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary justify-center ButtonSecondaryText"
          >
            {loading ? 'מתחברים...' : 'כניסה'}
          </button>

          {/* Sign Up Link */}
          <div className="login-card-footer">
            <p className="login-card-note">
              שכחתם סיסמה?{' '}
              <a href="/forgot-password" className="login-link">
                שחזור סיסמה
              </a>
            </p>
            <p className="login-card-note">
              עדיין אין לכם חשבון?{' '}
              <a href="/signup" className="login-link">
                הירשמו כאן
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
