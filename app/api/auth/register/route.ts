import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "השם צריך להיות לפחות שני תווים")
    .max(64, "השם ארוך מדי"),
  email: z.string().email("אנא הזינו אימייל תקין"),
  password: z
    .string()
    .min(8, "הסיסמה חייבת להכיל לפחות 8 תווים")
    .max(72, "הסיסמה ארוכה מדי"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: parsed.error.issues[0]?.message ?? "הנתונים שהוזנו שגויים",
        },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;
    const normalizedEmail = email.toLowerCase();

    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { ok: false, error: "כבר קיים משתמש עם האימייל הזה" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 12);

    await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        hashedPassword,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Register API error", error);
    return NextResponse.json(
      { ok: false, error: "אירעה שגיאה בשרת, נסו שוב מאוחר יותר" },
      { status: 500 }
    );
  }
}
