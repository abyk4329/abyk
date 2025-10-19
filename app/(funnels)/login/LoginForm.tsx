"use client";

import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { z } from "zod";

import styles from "./LoginForm.module.css";

const loginSchema = z.object({
  email: z.string().email("אנא הזינו אימייל תקין"),
  password: z.string().min(8, "הסיסמה חייבת להכיל לפחות 8 תווים"),
});

const registerSchema = loginSchema.extend({
  name: z
    .string()
    .trim()
    .min(2, "השם צריך להיות לפחות שני תווים")
    .max(64, "השם ארוך מדי"),
});

type Mode = "login" | "register";

export function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
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

      if (mode === "login") {
        const parsed = loginSchema.safeParse({
          email: formData.get("email"),
          password: formData.get("password"),
        });

        if (!parsed.success) {
          setError(parsed.error.issues[0]?.message ?? "נא להשלים את השדות");
          return;
        }

        const result = await signIn("credentials", {
          redirect: false,
          email: parsed.data.email,
          password: parsed.data.password,
        });

        if (result?.error) {
          setError("האימייל או הסיסמה אינם תואמים");
          return;
        }

        setSuccess("התחברת בהצלחה!");
        router.push("/");
        router.refresh();
        return;
      }

      const parsed = registerSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      });

      if (!parsed.success) {
        setError(parsed.error.issues[0]?.message ?? "נא לבדוק את הפרטים");
        return;
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const json = (await response.json()) as {
        ok: boolean;
        error?: string;
      };

      if (!response.ok || !json.ok) {
        setError(json.error ?? "לא ניתן ליצור משתמש חדש כרגע");
        return;
      }

      setSuccess("מעולה! החשבון נוצר, אפשר להתחבר.");
      setMode("login");
      form.reset();
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.switcher}>
        <button
          type="button"
          className={styles.switchButton}
          data-active={mode === "login"}
          onClick={() => setMode("login")}
          disabled={isPending}
        >
          יש לי חשבון
        </button>
        <button
          type="button"
          className={styles.switchButton}
          data-active={mode === "register"}
          onClick={() => setMode("register")}
          disabled={isPending}
        >
          הרשמה מהירה
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {mode === "register" ? (
          <label className={styles.field}>
            <span className={styles.label}>שם מלא</span>
            <input
              className={styles.input}
              name="name"
              type="text"
              autoComplete="name"
              placeholder="איך נציג אותך?"
              disabled={isPending}
            />
          </label>
        ) : null}

        <label className={styles.field}>
          <span className={styles.label}>כתובת אימייל</span>
          <input
            className={styles.input}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            disabled={isPending}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>סיסמה</span>
          <input
            className={styles.input}
            name="password"
            type="password"
            autoComplete={
              mode === "login" ? "current-password" : "new-password"
            }
            placeholder="••••••••"
            disabled={isPending}
          />
        </label>

        {error ? <p className={styles.error}>{error}</p> : null}
        {success ? <p className={styles.success}>{success}</p> : null}

        <button className={styles.submit} type="submit" disabled={isPending}>
          {isPending ? "מעבד..." : mode === "login" ? "התחברות" : "יצירת חשבון"}
        </button>
      </form>
    </div>
  );
}
