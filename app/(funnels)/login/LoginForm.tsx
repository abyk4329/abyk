'use client';

import { Button } from '@/components/neu';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { useState, useTransition } from 'react';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('אנא הזינו אימייל תקין'),
  password: z.string().min(8, 'הסיסמה חייבת להכיל לפחות 8 תווים'),
});

const registerSchema = loginSchema.extend({
  name: z
    .string()
    .trim()
    .min(2, 'השם צריך להיות לפחות שני תווים')
    .max(64, 'השם ארוך מדי'),
});

type Mode = 'login' | 'register';

export function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      setError(null);
      setSuccess(null);

      if (mode === 'login') {
        const parsed = loginSchema.safeParse({
          email: formData.get('email'),
          password: formData.get('password'),
        });

        if (!parsed.success) {
          setError(parsed.error.issues[0]?.message ?? 'נא להשלים את השדות');
          return;
        }

        const result = await signIn('credentials', {
          redirect: false,
          email: parsed.data.email,
          password: parsed.data.password,
        });

        if (result?.error) {
          setError('האימייל או הסיסמה אינם תואמים');
          return;
        }

        setSuccess('התחברת בהצלחה!');
        router.push('/');
        router.refresh();
        return;
      }

      const parsed = registerSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
      });

      if (!parsed.success) {
        setError(parsed.error.issues[0]?.message ?? 'נא לבדוק את הפרטים');
        return;
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsed.data),
      });

      const json = (await response.json()) as {
        ok: boolean;
        error?: string;
      };

      if (!response.ok || !json.ok) {
        setError(json.error ?? 'לא ניתן ליצור משתמש חדש כרגע');
        return;
      }

      setSuccess('מעולה! החשבון נוצר, אפשר להתחבר.');
      setMode('login');
      form.reset();
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-1 rounded-2xl bg-switch-background p-1 shadow-inner">
        <button
          type="button"
          className={cn(
            'rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 outline-none',
            'hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'disabled:cursor-not-allowed disabled:opacity-60',
            'data-[active=true]:bg-card data-[active=true]:text-foreground data-[active=true]:shadow'
          )}
          data-active={mode === 'login' ? 'true' : 'false'}
          onClick={() => setMode('login')}
          disabled={isPending}
        >
          יש לי חשבון
        </button>
        <button
          type="button"
          className={cn(
            'rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 outline-none',
            'hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'disabled:cursor-not-allowed disabled:opacity-60',
            'data-[active=true]:bg-card data-[active=true]:text-foreground data-[active=true]:shadow'
          )}
          data-active={mode === 'register' ? 'true' : 'false'}
          onClick={() => setMode('register')}
          disabled={isPending}
        >
          הרשמה מהירה
        </button>
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {mode === 'register' ? (
          <label className="flex flex-col gap-2 text-right">
            <span className="text-sm font-medium text-foreground">שם מלא</span>
            <input
              className="w-full rounded-2xl border border-transparent bg-input-background px-4 py-3 text-base text-foreground shadow-inner outline-none transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="איך נציג אותך?"
              disabled={isPending}
            />
          </label>
        ) : null}

        <label className="flex flex-col gap-2 text-right">
          <span className="text-sm font-medium text-foreground">
            כתובת אימייל
          </span>
          <input
            className="w-full rounded-2xl border border-transparent bg-input-background px-4 py-3 text-base text-foreground shadow-inner outline-none transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            disabled={isPending}
          />
        </label>

        <label className="flex flex-col gap-2 text-right">
          <span className="text-sm font-medium text-foreground">סיסמה</span>
          <input
            className="w-full rounded-2xl border border-transparent bg-input-background px-4 py-3 text-base text-foreground shadow-inner outline-none transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60"
            name="password"
            type="password"
            autoComplete={
              mode === 'login' ? 'current-password' : 'new-password'
            }
            placeholder="••••••••"
            disabled={isPending}
          />
        </label>

        {error ? (
          <p
            className="text-center text-sm text-destructive"
            aria-live="polite"
          >
            {error}
          </p>
        ) : null}
        {success ? (
          <p className="text-center text-sm text-foreground" aria-live="polite">
            {success}
          </p>
        ) : null}

        <Button
          type="submit"
          fullWidth
          size="lg"
          disabled={isPending}
          className="mt-2"
        >
          {isPending ? 'מעבד...' : mode === 'login' ? 'התחברות' : 'יצירת חשבון'}
        </Button>
      </form>
    </div>
  );
}
