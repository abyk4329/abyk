export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 gap-8">
      <h1 className="text-4xl font-bold text-center">Welcome to your new Next.js skeleton</h1>
      
      {/* בדיקת טוקנים של Tailwind v4 */}
      <div className="bg-background text-foreground border border-border rounded-[--radius-lg] p-6 max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">✅ בדיקת טוקנים של Tailwind v4</h2>
        <ul className="space-y-2">
          <li>✓ Next.js 15.5.4</li>
          <li>✓ React 19.2.0</li>
          <li>✓ Tailwind CSS v4.1.14</li>
          <li>✓ ESLint 9.36.0 (Flat Config)</li>
          <li>✓ TypeScript 5.9.3</li>
          <li>✓ pnpm 9.11.0</li>
        </ul>
      </div>

      <p className="text-center opacity-70">
        Start building by editing <code className="bg-muted px-2 py-1 rounded">app/page.tsx</code>
      </p>
    </main>
  );
}
