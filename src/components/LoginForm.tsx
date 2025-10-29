import { useState } from 'react';

interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // TODO: Replace with actual authentication API call
    try {
      // Placeholder for authentication logic
      console.log('Login attempt:', { email, password });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For now, just show success
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError('שגיאה בהתחברות. אנא נסי שוב.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-bold mb-2"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            התעוררות
          </h1>
          <p className="text-support text-lg">by Ksenia</p>
        </div>

        {/* Login Form Card */}
        <form
          onSubmit={handleSubmit}
          className="neu-raised-min rounded-xl card-mobile-padding space-y-6"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold mb-2">התחברות</h2>
            <p className="text-sm text-text/70">התחברו לאזור האישי</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text/80"
              dir="rtl"
            >
              אימייל או מספר טלפון
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="neu-inset-min w-full px-4 py-3 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
              placeholder="your@email.com"
              dir="ltr"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text/80"
              dir="rtl"
            >
              סיסמה
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="neu-inset-min w-full px-4 py-3 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
              placeholder="••••••••"
              dir="ltr"
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-center">
            <a
              href="/forgot-password"
              className="text-sm text-accent hover:text-text transition-colors"
            >
              שכחת סיסמה?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary justify-center ButtonSecondaryText"
            aria-busy={loading ? 'true' : 'false'}
          >
            {loading ? 'מתחבר...' : 'התחבר'}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-text/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-surface text-text/70">או</span>
            </div>
          </div>

          {/* Social Login Placeholder */}
          <button
            type="button"
            className="btn btn-secondary justify-center ButtonSecondaryText"
            onClick={() => alert('התחברות עם Facebook תהיה זמינה בקרוב')}
          >
            התחבר עם Facebook
          </button>

          {/* Sign Up Link */}
          <div className="text-center pt-4 border-t border-text/10">
            <p className="text-sm text-text/70">
              עדיין אין לך חשבון?{' '}
              <a
                href="/signup"
                className="font-semibold text-accent hover:text-text transition-colors"
              >
                הירשמי כאן
              </a>
            </p>
          </div>
        </form>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-text/70 hover:text-text transition-colors"
          >
            ← חזרה לדף הבית
          </a>
        </div>
      </div>
    </div>
  );
}
