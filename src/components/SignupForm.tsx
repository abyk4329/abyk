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

    setLoading(true);

    // TODO: Replace with actual registration API call
    try {
      console.log('Signup attempt:', formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError('שגיאה בהרשמה. אנא נסי שוב.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">התעוררות</h1>
          <p className="text-support text-lg">by Ksenia</p>
        </div>

        {/* Signup Form Card */}
        <form
          onSubmit={handleSubmit}
          className="neu-raised-min rounded-xl card-mobile-padding space-y-5"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold mb-2">הרשמה</h2>
            <p className="text-sm text-text/70">
              צרו חשבון חדש והתחילו את המסע
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          {/* Name Input */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-text/80"
              dir="rtl"
            >
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
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text/80"
              dir="rtl"
            >
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
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-text/80"
              dir="rtl"
            >
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
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-text/80"
              dir="rtl"
            >
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
              placeholder="הזן שוב את הסיסמה"
              dir="ltr"
            />
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3" dir="rtl">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-text/30 text-accent focus:ring-accent"
            />
            <label htmlFor="terms" className="text-sm text-text/70">
              אני מסכימה{' '}
              <a
                href="/terms"
                className="text-accent hover:text-text transition-colors"
              >
                לתנאי השימוש
              </a>{' '}
              ו
              <a
                href="/privacy"
                className="text-accent hover:text-text transition-colors"
              >
                מדיניות הפרטיות
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary justify-center ButtonSecondaryText"
            aria-busy={loading ? 'true' : 'false'}
          >
            {loading ? 'נרשמת...' : 'הירשמי'}
          </button>

          {/* Login Link */}
          <div className="text-center pt-4 border-t border-text/10">
            <p className="text-sm text-text/70">
              כבר יש לך חשבון?{' '}
              <a
                href="/login"
                className="font-semibold text-accent hover:text-text transition-colors"
              >
                התחברי כאן
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
