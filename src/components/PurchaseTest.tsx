import { useState } from 'react';
import { sendWealthCodeEmail } from './EmailService';

interface PurchaseResult {
  success: boolean;
  message: string;
  error?: string;
}

export function PurchaseTest() {
  const [email, setEmail] = useState('test@example.com');
  const [name, setName] = useState('משתמש בדיקה');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PurchaseResult | null>(null);

  const testPurchase = async () => {
    setIsLoading(true);
    setResult(null);

    const mockData = {
      wealthCode: 1234,
      customerName: name,
      customerEmail: email,
      codeStructure: {
        digits: [1, 2, 3, 4],
        allSame: false,
        hasRepeats: false,
        allDifferent: true,
        repeatedDigits: [],
      }
    };

    try {
      const emailResult = await sendWealthCodeEmail(mockData);
      setResult(emailResult);
    } catch (error) {
      setResult({ 
        success: false, 
        message: 'שגיאה לא צפויה',
        error: error instanceof Error ? error.message : 'שגיאה לא ידועה'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">בדיקת מערכת רכישה</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">שם:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="הכנס שם"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">אימייל:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="הכנס אימייל"
          />
        </div>
        
        <button
          onClick={testPurchase}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'שולח...' : 'בדוק רכישה'}
        </button>
        
        {result && (
          <div className={`p-4 rounded-md ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <h3 className="font-bold">תוצאה:</h3>
            <p>{result.message}</p>
            {result.success && (
              <div className="mt-2">
                <p>✅ המייל נשלח בהצלחה!</p>
                <p>🔗 קישור חזרה: <a href={`?page=thank-you&code=1234`} className="text-blue-600 underline">לחץ כאן</a></p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
