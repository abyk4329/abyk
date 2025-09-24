import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { } from "lucide-react";
import { useState } from "react";
import { Footer } from "./Footer";
import Header from "./Header";
import { WealthCodeSalesPage } from "./WealthCodeSalesPage";

interface WealthCodeCalculatorProps {
  onBack: () => void;
  onShowThankYou?: (
    wealthCode: number,
    codeStructure: any,
  ) => void;
  onShowTerms?: () => void;
  onShowPrivacy?: () => void;
  onShowTermsAndPrivacy?: () => void;
}

export function WealthCodeCalculator({
  onBack,
  onShowThankYou,
  onShowTerms,
  onShowPrivacy,
  onShowTermsAndPrivacy,
}: WealthCodeCalculatorProps) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [showSalesPage, setShowSalesPage] = useState(false);
  const [result, setResult] = useState<{
    wealthCode: number;
    fullData: any;
    codeStructure: {
      digits: number[];
      digitCounts: Record<number, number>;
      repeatedDigits: { digit: number; count: number }[];
      allSame: boolean;
      allDifferent: boolean;
      hasRepeats: boolean;
      type: "master" | "diverse" | "focused" | "balanced";
    };
  } | null>(null);

  const isValidDate = (
    day: string,
    month: string,
    year: string,
  ) => {
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    if (!dayNum || !monthNum || !yearNum) return false;
    if (dayNum < 1 || dayNum > 31) return false;
    if (monthNum < 1 || monthNum > 12) return false;
    if (yearNum < 1900 || yearNum > new Date().getFullYear())
      return false;

    // Check if date is valid
    const date = new Date(yearNum, monthNum - 1, dayNum);
    return (
      date.getDate() === dayNum &&
      date.getMonth() === monthNum - 1 &&
      date.getFullYear() === yearNum
    );
  };

  const calculateWealthCode = () => {
    if (!isValidDate(day, month, year)) return;

    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    // Helper function to reduce number to single digit
    const reduceToSingleDigit = (num: number): number => {
      while (num > 9) {
        const digits = num.toString().split("").map(Number);
        num = digits.reduce((sum, digit) => sum + digit, 0);
      }
      return num;
    };

    // Calculate each digit of the wealth code
    // 1st digit: sum of day digits
    const daySum = dayNum
      .toString()
      .split("")
      .map(Number)
      .reduce((sum, digit) => sum + digit, 0);
    const firstDigit = reduceToSingleDigit(daySum);

    // 2nd digit: sum of month digits
    const monthSum = monthNum
      .toString()
      .split("")
      .map(Number)
      .reduce((sum, digit) => sum + digit, 0);
    const secondDigit = reduceToSingleDigit(monthSum);

    // 3rd digit: sum of year digits
    const yearSum = yearNum
      .toString()
      .split("")
      .map(Number)
      .reduce((sum, digit) => sum + digit, 0);
    const thirdDigit = reduceToSingleDigit(yearSum);

    // 4th digit: sum of the three previous digits
    const fourthDigitSum =
      firstDigit + secondDigit + thirdDigit;
    const fourthDigit = reduceToSingleDigit(fourthDigitSum);

    // Combine into 4-digit code
    const wealthCodeString = `${firstDigit}${secondDigit}${thirdDigit}${fourthDigit}`;
    const wealthCode = parseInt(wealthCodeString);

    // Analyze code structure
    const codeStructure = analyzeCodeStructure(wealthCode);

    // For now, show data for the first digit (main character)
    const fullData = getFullWealthCodeData(firstDigit);

    setResult({
      wealthCode,
      fullData,
      codeStructure,
    });

    // Show sales page after calculation
    setShowSalesPage(true);

    // Don't automatically show thank you - let the sales page handle it
    // if (onShowThankYou) {
    //   onShowThankYou(wealthCode, codeStructure);
    // }
  };

  const analyzeCodeStructure = (code: number) => {
    const digits = code.toString().split("").map(Number);
    const digitCounts = digits.reduce(
      (acc, digit) => {
        acc[digit] = (acc[digit] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>,
    );

    const repeatedDigits = Object.entries(digitCounts)
      .filter(([_, count]) => count > 1)
      .map(([digit, count]) => ({
        digit: parseInt(digit),
        count,
      }));

    const allSame = new Set(digits).size === 1;
    const allDifferent = new Set(digits).size === 4;
    const hasRepeats = repeatedDigits.length > 0;

    return {
      digits,
      digitCounts,
      repeatedDigits,
      allSame,
      allDifferent,
      hasRepeats,
      type: (allSame
        ? "master"
        : allDifferent
          ? "diverse"
          : hasRepeats
            ? "focused"
            : "balanced") as "master" | "diverse" | "focused" | "balanced",
    };
  };

  const getFullWealthCodeData = (code: number) => {
    const dataMap: { [key: number]: any } = {
      1: {
        title: "המנהיג/ה",
        essence:
          "אנרגיה של התחלה, יוזמה והובלה. זוהי נקודת הפתיחה, הצעד הראשון, היכולת לעמוד לבד גם כשאין שביל מסומן. מי שנושא אתenganergiya ה־״1״ נועד לפרוץ דרך, לקבל החלטות ולתפוס מקום ברור בעולם.\nהמהות הפנימית של ה־״1״ היא עצמאות – לא מתוך ניתוק, אלא מתוך חיבור לכוח הרצון, ליכולת פנימית לומר: ״אני הולך ראשון, אני מראה את הדרך, ואני לוקח אחריות על מה שיקרה.״",
        gifts: [
          "מנהיגות טבעית – אנשים נמשכים אחריך גם בלי מאמץ. יש לך נוכחות שמשרה ביטחון.",
          "אומץ לפרוץ קדימה – לא מחכה שהכול יהיה מושלם, אלא יודע לזהות מתי צריך להתחיל.",
          "יכולת קבלת החלטות – ראייה חדה ומהירה של ״מה נכון עכשיו״.",
          "כוח יזמי – חיבור טבעי לעולם העסקי, לחדשנות, לסטארט־אפים ולכל מה שדורש יצירה של משהו חדש.",
          "כוח פנימי לעמוד לבד – לא תלוי בדעת הקהל או באישור חיצוני כדי לפעול.",
        ],
        challenges: [
          "פחד מאחריות – ההרגשה ש״אם אוביל, הכול ייפול עליי״. זה גורם להישאר מאחור, גם כשהלב רוצה קדימה.",
          "שליטת יתר – נטייה לחשוב שרק אם אני עושה הכול לבד זה יעבוד. זה מייצר עומס ושחיקה ומגביל את הצמיחה.",
          "הישארות באזור הנוחות – דחיית החלטות (״עוד לא הזמן״) עד שהשנים עוברות בלי קפיצה אמיתית.",
          "פחד מכישלון פומבי – הימנעות מלקחת צעד ראשון, כי ״כולם יראו אם אפסיד״.",
        ],
        imbalanceSigns: [
          "פרויקטים שלא יוצאים לדרך.",
          "ביקורת יתר על מנהיגים אחרים.",
          "קנאה סמויה באנשים שלוקחים סיכונים.",
          "עומס מתמשך ועייפות בגלל עודף שליטה.",
        ],
        growthAreas: [
          "לצאת מאזור הנוחות – לזהות מתי ה״בטוח״ כבר הפך למלכודת שמונעת צמיחה.",
          "לקבל החלטות בזמן – לא לחכות ל־100% ודאות. גם החלטה חלקית מניעה את החיים קדימה.",
          "לשחרר שליטה ולבנות צוות – להבין שכוח אמיתי הוא לדעת להוביל אחרים, לא לעשות הכול לבד.",
          "לטפח אומץ יציב ומתמשך – לא רק פרצי השראה חד־פעמיים, אלא התמדה של מנהיגות יומיומית.",
          "להתיידד עם בדידות – להרגיש בנוח גם לבד, מתוך ידיעה שה מחזק את היכולת להנהיג.",
        ],
        careerPaths: [
          'ניהול בכיר וменכ"לות',
          "יזמות עסקית וחדשנות טכנולוגית",
          "הובלת פרויקטים וצוותים גדולים",
          "פוליטיקה ותפקידי ציבור",
          "ספורט תחרותי",
          "הפקה וניהול אירועים",
        ],
        dailyPractice:
          'היום, בחר/י משימה אחת מהלו"ז שלך והעבר/י אותה לאדם אחר. תרגל/י אמון והאצלת סמכויות. זה יאפשר לך להתמקד בהובלה האמיתית – לא בעשייה הקטנה, אלא בכיוון הגדול.',
        bottomLine:
          "הספרה 1 באה להזכיר לך שאתה כאן כדי להוביל, לא להמתין. ברגע שאתה בוחר לצאת מאזור הנוחות, לקבל החלטות גם בלי ודאות מלאה, ולשחרר שליטה לאחרים – אתה נכנס למקום האמיתי שלך: מנהיג שמסמן דרך. ככל שתפסיק לפחד מכישלון ותיקח אחריות מלאה, כך גם ההצלחה, ההשפעה והשפע יזרום אליך בצורה טבעית.",
      },
      2: {
        title: "הדובר/ת",
        essence:
          "ספרה 2 היא אנרגיה של תקשורת, יחסים והרמוניה. היא נועדה Bringing גשר בין עולמות – בין אנשים, בין רעיונות ובין הלב למציאות. ה־״2״ יודע לנוע דרך המילה: דיבור, הקשבה, כתיבה או שירה.\nבמהותה הפנימית, הספרה 2 מסמלת קול פנימי שמבקש להישמע. היא נולדה Bringing אמת אל השטח – לא בצעקה כוחנית, אלא בקול רך, ברור ומשפיע.",
        gifts: [
          "כישרון קולי יוצא דופן – נאום, שירה, פודקאסטים, שידור או הדרכה.",
          "יכולת רגשית עמוקה – אמפתיה, הקשבה, ויכולת להבין את האחר.",
          "גישור והרמוניה – נטייה טבעית Bringing שלום בין צדדים שונים.",
          "השפעה דרך מילים – השראה שמניעה אנשים לפעולה.",
          "נוכחות רכה אך בטוחה – הסביבה מרגישה בטוחה להיפתח מולך.",
        ],
        challenges: [
          "קול כלוא – לדעת את האמת, אך לא אומרים אותה. מצטבר ככעס כבוש או רכילות.",
          "ריצוי יתר – ויתור על עצמך כדי לשמור על שלום חיצוני.",
          "פחד במה – לא בגלל חוסר כישרון, אלא מתוך חשש מחשיפה מלאה.",
          "היעדר שורש פנימי – קשר רופף עם דמות נשית משמעותית (במיוחד האם) מחליש את הביטחון ומקשה על הקול לצאת.",
        ],
        imbalanceSigns: [
          "כאבי גרון או צרידות חוזרים.",
          "התפרצויות אחרי שתיקה ארוכה.",
          "רכילות או שיחות שליליות במקום ביטוי אותנטי.",
          "תלות בדעת קהל במקום בעוגן פנימי.",
        ],
        growthAreas: [
          "להעדיף יושר פנימי על פני נימוס חיצוני – לומר אמת גם כשהיא לא ״נוחה״ וללמוד להציב גבולות.",
          "לבנות את שריר אמירת האמת – לתגל הבעת דעה בקול רך אך ברור.",
          "לצאת בהדרגה אל הבמה – להתחיל בקבוצות קטנות ולהתרחב.",
          "לטפח קשר בריא עם דמות נשית/אמא – זה מעניק ביטחון פנימי, תחושת שורש ועוצמה קולית אמיתית.",
          "לראות בקול שלך מתנה לעולם – להבין שזה לא רק שלך, אלא כלי להשפעה ולשפע.",
        ],
        careerPaths: [
          "הוראה והכשרה",
          "הנחיית קבוצות וסדנאות",
          "דיפלומטיה וגישור",
          "ייעוץ זוגי ומשפחתי",
          'דוברות, יח"צ והנחייה',
          "שידור, פודקאסטים ושירה",
        ],
        dailyPractice:
          "כתוב/כתבי היום מסר אישי קצר ושתף/י אותו עם מישהו – בקול רם או בווידאו קצר. אל תנסה/י לייפות – פשוט דבר/י אמת.",
        bottomLine:
          "הספרה 2 מזכירה לך שהקול שלך הוא המתנה שלך. כשהוא כלוא – גם השפע כלוא. ככל שתתחזק מבפנים, תטפח את הקשר עם שורשיך (ובמיוחד עם דמות נשית/אמא), ותבחר להביע אמת גם אם היא לא מושלמת – תוכל ליצור קשרים אמיתיים, להשפיע, ולמשוך אליך הצלחה.",
      },
      3: {
        title: "היוצר/ת",
        essence:
          "ספרה 3 מייצגת יצירתיות, שמחת חיים וביטוי אישי. היא מביאה צבע, משחק ואנרגיה שמרימה את כל מי ש סביב. אנשים עם הספרה הזו נולדו כדי לבטא את עצמם – דרך אמנות, דיבור, תנועה, כתיבה או כל צורה אחרת של יצירה.\nהמהות הפנימית של ה־״3״ היא היכולת להכניס יופי ואור לעולם, להפוך רגע פשוט לחוויה מיוחדת, ולהזכיר לאנשים סביבם מהי קלילות ושמחה.\nכש־״3״ לא יוצר או מבטא את עצמו – הוא מרגיש ריקנות, חוסר משמעות ולעיתים תסכול עמוק.",
        gifts: [
          "כריזמה טבעית – אנשים נמשכים לנוכחות שלך ולשמחת החיים שאתה מביא.",
          "יצירתיות גבוהה – רעיונות, פתרונות מקוריים ויכולת להפוך אותם למשהו יפהפה.",
          "ביטוי אישי – דרך מילים, אמנות, תנועה או משחק – אתה יודע לרגש ולגעת.",
          "שמחת חיים – היכולת להפוך מצבים כבדים לקלים יותר.",
          "חוש אסתטי מפותח – רואה יופי בפרטים הקטנים ובונה מהם חוויה.",
        ],
        challenges: [
          "חיים בקיצוניות – או רק קריירה ונמוגים בבית, או רק בית ונמוגים בעצמיות. הקושי לשלב בין שניהם.",
          "פחד מקשר מחייב או הורות – התחושה שזה יגביל את היצירתיות או ״ייקח חופש״.",
          "תלות רגשית/כלכלית – 필요 מתמיד באישור או תמיכה מהסביבה כדי להרגיש ראוי.",
          "חוסר איזון בין נתינה לעצמי – להתרכז במחיאות כפיים מבחוץ במקום בחיבור פנימי.",
        ],
        imbalanceSigns: [
          "פרויקטים יצירתיים יפים שלא נסגרים.",
          "תחושת ריקנות אחרי הופעה, פוסט או ��רסום.",
          "קניות מפצות במקום יצירה.",
          "תחושת ״אני לא מספיק״ כשאין חיזוקים מבחוץ.",
        ],
        growthAreas: [
          "איזון בין בית לעבודה – למצוא מקו שבו גם המשפחה וגם הקריירה מקבלים מקום.",
          "יצירה גם בלי אישור חיצוני – ליצור בשביל עצמך, לא רק בשביל מחיאות כפיים.",
          "עצמאות רגשית וכלכלית – להאמין בעצמך גם בלי תלות באחרים.",
          "לטפח יופי גם בתהליך, לא רק בתוצאה – ליהנות מהדרך, לא רק מהפרסום.",
          "חיבור לחיים פשוטים – למצוא השראה גם בחיי היומיום, לא רק ברגעי שיא.",
        ],
        careerPaths: [
          "אמנות, משחק, מחול ומוזיקה",
          "עיצוב אופנה, עיצוב גרפי ועיצוב מוצר",
          "בלוגינג, תוכן ויזואלי, קריאטיב פרסומי",
          "הנחייה מול קהל",
          "עבודה עם נשים או קהילות יצירתיות",
        ],
        dailyPractice:
          "הקדש/י חצי שעה ליצירה חופשית – כתיבה, ציור, צילום או ריקוד – בלי לחשוב אם זה ״מושלם״. זכור/זכרי: הערך שלך לא נמדד במחיאות כפיים, אלא בחיבור שלך לעצמך.",
        bottomLine:
          "הספרה 3 מזכירה לך שאתה כאן כדי ליצור ולשמח. כשאתה מבטא את עצמך באמת – גם אם זה פשוט ולא מושלם – אתה לא רק מרגיש חי, אלא גם נותן השראה לאחרים להיות אותנטיים בעצמם.",
      },
      4: {
        title: "הבונה/ת",
        essence:
          "ספרה 4 היא אנרגיה של יסוד, משמעת, התמדה ומבנה. היא מייצגת את הקרקע המוצקה שעליה אפשר להניח יסודות חזקים. מי שנושא את ה־״4״ נועד לקחת חלומות ולבנות מהם תשתית ממשית – מערכת שעובדת לאורך זמן.\nה־״4״ הוא לא ״חולם באוויר״, אלא אדריכל של מציאות: כזה שיודע להפוך רעיונות מופשטים למסלולים ברורים, לשגרה ולפעולות שניתן לסמוך עליהן.",
        gifts: [
          "משמעת ועקביות – יכולת להחזיק תהליך לאורך זמן.",
          "חוסן פיזי ונפשי – עמידות שמאפשרת יציבות.",
          "כוח עבודה – מסוגלות להשקיע בעשייה יומיומית ולסיים דברים עד הסוף.",
          "בניית תשתיות – מביאים סדר ותכנון גם למקומות כאוטיים.",
          "חיבורToWorld הפיזי – מצטיינים בעבודה עם חומר, מבנים, ספורט או וצרים מוחשיים.",
        ],
        challenges: [
          "כאוס וחוסר סדר – חדר מבולגן, קבצים מפוזרים, משימות לא סגורות → משתק את הזרימה.",
          "חיפוש קיצורי דרך – נטייה ל״כסף מהיר״ שמוביל לאכזבות.",
          "דחיינות מנוונת – לדעת בדיוק מה צריך לעשות – אך לא עושים.",
          "נתק מהמוחשיות – עיסוק ברעיונות בלי מימוש פיזי → יוצר תסכול.",
        ],
        imbalanceSigns: [
          "שינה לא סדירה, דחיית התעוררות (סנוז) חוזרת.",
          "גלילה אינסופית במקום עשייה.",
          "התחלה של פרויקטים בלי סיום.",
          "בלגן מתמשך בבית, בכסף או בעבודה.",
          "תחושת ״אני לא מתקדם לשום מקום״.",
        ],
        growthAreas: [
          'לאמץ ספורט יומיומי – פעילות גופנית כחלק קבוע מהלו"ז, כדי להצית אנרגיה ומשמעת.',
          "לקבוע סדר יום יציב – שעות קימה ושינה עקביות, חלונות עבודה ברורים.",
          "לעבוד עם מוצר מוחشي – עסק פיזי, מוצר שאפשר לגעת בו, בנייה או אדמה. ה־״4״ חייב להרגיש עשייה ״בידיים״ כדי שהשפע יזרום.",
          "ליצור טקסי סדר קטנים – שולחן נקי, תיקיות מסודרות, רשימת ״3 חשובים ליום״.",
          "לראות בסבלנות נכס – להבין שהצלחה נבנית צעד־צעד, לא בבת אחת.",
        ],
        careerPaths: [
          'בנייה, נדל"ן ותשתיות',
          "הנדסה, ייצור ותעשייה",
          "ספורט תחרותי או אימון כושר",
          "חקלאות ועבודה עם אדמה",
          "ניהול פרויקטים יציבים וארוכי טווח",
          "עסקים פיזיים ומוצרים מוחשיים",
          "פיננסים סולידיים ולוגיסטיקה",
        ],
        dailyPractice:
          "בחר/י משימה פיזית מוחשית אחת – לסדר, לארגן או לבנות משהו קטן. התחושה המוחשית של סגירת לופ תدلיקTRGLך אנרגיה מחודש�� לעוד צעדים.",
        bottomLine:
          "ספרה 4 מזכירה לך שהצלחה אמיתית נבנית מלבנים קטנות של סדר, התמדה ומוחשיות. ככל שתציב סדר, תתמקד בעשייה שניתן לגעת בה ותסגור לופים עד הסוף – כך תבנה יסודות יציבים שמחזיקים גם כסף וגם ביטחון לאורך זמן.",
      },
      5: {
        title: "החוקר/ת",
        essence:
          "ספרה 5 מייצגת אנרגיה של ידע, חכמה וסקרנות מתמדת. היא נועדה לגלות, לחקור ולשאול שאלות שמעבר למה שנראה לעין. ה־״5″ הוא תלמיד נצחי שתמיד מחפש להבין לעומק, אך בו־בזמן הוא גם מורה טבעי, עם יכולת נדירה לפשט מורכבויות ולהעביר אותן בצורה בהירה לאחרים.\nמי שנושא אתenganergiya ה־״5″ חי בעולם של רעיונות, למידה ותובנות. הוא אוהב להעמיק בספרים, קורסים ושיחות אינטלקטואליות, ובו זמנית נהנה לחלוק את הידע הזה עם אחרים.",
        gifts: [
          "סקרנות אינסופית – תשוקה ללמוד ולהתנסות בתחומים חדשים.",
          "למידה מהירה – קליטה חדה של מידע חדש.",
          "חשיבה אנליטי – יכולת לנתח מצבים לעומק.",
          "יכולת הוראה – להסביר לאחרים דברים מסובכים בפשטות.",
          "ראייה רחבה – שילוב של עומק עם פרספקטיבה כוללת.",
          "חיבור טבעי לעולם המחקר, הפילוסופיה והרעיונות.",
        ],
        challenges: [
          "פיזור יתר – התעניינות בהרבה תחומים במקביל מבלי להעמיק מספיק באחד מהם.",
          "תסמונת המתחזה – התחושה ש״עדיין לא למדתי מספיק״ ולכן דוחים עשייה או הוראה.",
          "גאווה אינטלקטואלית – נטייה להרגיש שאני יודע יותר מכולם ולבטא זאת כלפי חוץ, תחושה של עליונות שמסוגלת לעצור כל למידה חדשה.",
          "נעילה על מה שכבר ידוע – קושי להיפתח לדעות חדשות או לשיטות שונות.",
        ],
        imbalanceSigns: [
          "אוסף ספרים, קורסים או תעודות – אך ללא יישום מעשי.",
          "פרפקציוניזם שמעכב התחלה של פרויקטים.",
          "תגובות מ zalzalous או מתנשאות בשיחות.",
          "תחושת קיפאון, رغم ידע רב שנצבר.",
        ],
        growthAreas: [
          "לבחור תחום ליבה מרכזי ולהתמסר אליו לתקופה.",
          "ללמד אחרים – להפוך את הלמידה לכלי הוראה.",
          "לתרגל ענווה מקצועית – לזכור שתמיד יש עוד מה ללמוד.",
          "להיפתח לרעיונות חדשים גם ממקורות מפתיעים.",
          "לתרגם ידע לפרקטיקה – ליצור ממנו תוצרים ממשיים או ערך ברור לאחרים.",
        ],
        careerPaths: [
          "מחקר ופיתוח",
          "הוראה והדרכה",
          "פסיכולוגיה וייעוץ",
          "כתיבה מקצועית",
          "אסטרטגיה עסקית",
          "דאטה ואנליטיקה",
          "חדשנות וחינוך",
        ],
        dailyPractice:
          "קח/י נושא שלמדת לאחרונה והסבר/י אותו למישהו בצורה פשוטה, בלי צורך להוכיח עליונות – אלא מתוך רצון אמיתי לחלוק ידע.",
        bottomLine:
          "סרה 5 מזכירה לך שהחכמה האמיתית נוצרת כשאתה גם לומד וגם מלמד. כשהידע שלך מתורגם לעשייה ומשותף בענווה – הוא הופך למפתח אמיתי לצמיחה ולהשפעה.",
      },
      6: {
        title: "האמן/ית",
        essence:
          "ספרה 6 היא אנרגיה של יופי, אהבה והרמוניה – פנימית וחיצונית. היא מביאה איתה רגישות אסתטי נדירה, נטייה לראות את העולם דרך יופי וצורה, וחיבור טבעי לאמנות, ליחסים ולבית.\nה־״6″ נולד Bringing ריפוי דרך יופי, יצירה וזוגיות בריאה. יש בו יכולת לגעת בלב של אנשים דרך מראה, קול, תנועה או מגע – ולהפוך סביבה פשוטה למרחב נעים ומרפא.",
        gifts: [
          "חוש אסתטי מפותח – ראייה ייחודית ליופי בכל תחם.",
          "רגישות אמנותית – חיבור לאמנות, עיצוב, תנועה ומוזיקה.",
          "יכולת לרפא דרך יופי – השראה שמרגיעה ומאזנת אחרים.",
          "אהבה להרמוניה – חתירה ליחסים נעימים ושיתוף פעולה.",
          "נטייה לטיפוח עצמי וסביבתי – יצירת אווירה יפה ומזמינה.",
        ],
        challenges: [
          "ביקורתיות כלפי הגוף – מבט נוקשה במראה שמחליש גם את הביטוי היצירתי.",
          "חיים למען אחרים – שמירה על ״מראה מושלם״ מבחוץ תוך ה��נחה פנימית.",
          "חסר ערך עצמי שקט – חוויה של ״מה אני כבר מביא/ה?״ שמקטינה מתנות נדירות.",
          "פיזור ביחסים ובמיניות – קושי לשמור על מחויבות, ריבוי פרטנרים או:bgידות. זהו סימן ברור לחוסר איזון שמערער את כל תחומי החיים.",
        ],
        imbalanceSigns: [
          "הסתרה מאחורי אסתטיקה מושלמת ללא עומק פנימי.",
          "עייפות רגשית מתמשכת.",
          "אידיאליזציה של קשרים זוגיים או פחד מקרבה אמיתית.",
          "חוסר נאמנות או פיזור בפרטנרים.",
        ],
        growthAreas: [
          "טיפוח זוגיות בריאה – בניית קשר עם גבולות ברורים, אמון וחמלה.",
          "פיוס עם הגוף – תנועה עדינה, נשימה, ריקוד ועבודה עם הגוף.",
          "חיבור למיניות בריאה – עבודה דרך נטרה, מודעות לגוף ולקרבה.",
          "רשות ליצירה גולמית – ליצור גם בלי לחשוב על שלמות.",
          "להכניס יופי-backend הקלעים – לא רק בתוצאה, אלא גם בתהליך העבודה.",
        ],
        careerPaths: [
          "עיצוב פנים, אופנה ונוף",
          "צילום וסטיילינג",
          "מוזיקה ואמנויות הבמה",
          "תרפיה באמנות או במחול",
          "טיפול זוגי ומשפחתי",
          "מיתוג חזותי וקריאטיב",
        ],
        dailyPractice:
          "צור/צרי משהו קטן ויפה היום – ציור, תמונה, סידור פינה בבית – לא כדי להרשים אחרים, אלא כדי להזכיר לעצמך את היופי שאתה מביא.",
        bottomLine:
          "ספרה 6 נולדה Bringing יופי, הרמוניה וריפוי לעולם. כשהיא אוהבת את עצמה, מטפחת זוגיות בריאה ומבטאת את היופי שלה בצורה אותנטית – היא הופכת ממקור של השראה ושל שפע עבור עצמה ועבור הסביבה.",
      },
      7: {
        title: "הלוחם/ת",
        essence:
          "ספרה 7 מייצגת עומק, צדק, משעת ועוצמה פנימית. היא אנרגיה של אדם שמוכן להילחם על האמת שלו, לא מתפשר בקלות, ומביא איתו יכולת עמידה יוצאת דופן. אנשים עם ספרה זו נולדו עם צורך פנימי להיות נאמנים לעקרונות שלהם, לחפש משמעות ולפעול מתוך תחושת שליחות.\nה־״7″ יודע לראות את התמונה הגדולה ולתכנן לטווח ארוך, אבל כשהוא לא באיזון הוא עלול להפוך לקשוח, כוחני או חסר סבלנות – מה שמרחיק אנשים ויוצר מאבקים מיותרים.",
        gifts: [
          "נחישות גבוהה – כוח לעמוד מול קשיים ולא לוותר.",
          "עוצמה פנימית נדירה – גם בזמנים קשים, יש בך עמוד שדרה יציב.",
          "חוש צדק חזק – רגישות לכל עוול, חיבור לערכים מוסריים.",
          "יכולת אסטרטגית – רואה מהלכים קדימה ויודע לבנות תוכנית פעולה.",
          "מנהיגות טבעית במצבים מורכבים – אנשים סומכים עליך כמי שמחזיק עקרונות ולא מתכופף.",
        ],
        challenges: [
          "קשיחות מוגזמת – לראות את העולם בשחור־לבן (״או הכול או כלום״).",
          "חוסר סבלנות לתהליך – לרצות תוצאות מיידיות בלי לתת לדברים להבשיל.",
          "כוחניות – בחירה להפעיל כוח במקום תחכום.",
          "קושי להיעזר באחרים – תחושה ש״אם אני אבקש עזרה – אני חלש״.",
        ],
        imbalanceSigns: [
          "כניסה לעימותים מיותרים.",
          "התרחקות מאנשים טובים בגלל ״עקרון״.",
          "עייפות מתמשכת – ״עייפות לוחם״.",
          "חוסר יכולת לעצור ולהקשיב לפני פעולה.",
        ],
        growthAreas: [
          "להשתמש בעדינות אסטרטגית – לא כל מאבק צריך כוח חזיתי, לפעמים עדיף לעקוף.",
          "לטפח סבלנות לתהליך – להבין שדברים גדולים לוקחים זמן.",
          "לאסוף מידע לפני פעוה  לצור, להתבונן, לא למהר להגיב.",
          "להיעזר באחרים – לראות בעזרה שיתוף פעולה חכם, לאicol.",
          "הכניס רכות לחיים – למצוא תחומי עניין שמאזנים את הקasioות (אמנות, מוזיקה, טבע).",
        ],
        careerPaths: [
          "משפטים ורגולציה",
          "צבא וביטחון",
          "מדיניות וממשל",
          "ניהול סיכונים וציות",
          "סחר uluslararası ומשא ומתן",
          "ייעוץ אסטרטגי ותכנון ארוך טווח",
        ],
        dailyPractice:
          "בפעם הבאה שאתה עומד להגיב בכוח או בכעס – עצור/י לרגע, קח/י נשימה, ושאל/י את עצמך: ״מה הדרך החכמה יותר? איפה אני יכול לעקוף במקום להילחם חזיתית?״",
        bottomLine:
          "הספרה 7 נועדה להראות שהכוח האמיתי שלך לא נמצא במלחמה – אלא באסטרטגיה, בחכמה וביכולת לדעת מתי להשתמש בעוצמה ומתי ברוך. כשאתה בוחר בשילוב הזה, אתה לא רק לוחם – אתה מנהיג עם חזון אמיתי.",
      },
      8: {
        title: "הסוחר/ת",
        essence:
          "ספרה 8 מביאה אנרגיה של שפע, ערך והשפעה כלכלית. היא יודעת לזהות הזדמנויות, להבין איפה יש ערך ולבנות מערכות שמייצרות ווח לאורך זמן. אנשים עם ספרה זו נולדו עם חוש עסקי טבעי – יכולת לראות עסקאות, לחבר אנשים וליצור מנגנונים שמכניסים כסף.\nכשה־״8″ באיזון, הוא מנהל משא ומתן בחכמה, משדר נדיבות ובונה מערכות שמפרות את כולם. כשהוא לא באיזון, הוא עלול ליפול לחוסר אמון, קמצנות או אובססיה לצדק, מה שחוסם את זרימת השפע.",
        gifts: [
          "כישרון מכירה והשפעה – לדעת לקרוא אנשים ולהבין מה מניע אותם.",
          "ראייה עסקית חדה – יכולת לזהות הזדמנויות כלכליות ולמנף אותן.",
          "ניהול מערכות מורכבות – בניית עסקים, השקעות ופרויקטים גדולים.",
          "מנהיגות עסקית – אחרים סומכים עליך כמי שמבין איך לייצר ערך ורווח.",
          "יכולת להפוך רעיון לרווח – לקחת משהו תיאורטי ולהפוך אותו למעשי ומכניס.",
        ],
        challenges: [
          "חוסר אמון כרוני – קושי לשתף פעולה עם אחרים, פחד שינצלו אותך.",
          "קמצנות עטופה בזהירות – פחד להוציא כסף שעוצר את זרימת השפע.",
          "עיסוק מוגזם בעוולות – חוויות קיפוח או צדק שלא נפתרו שואבות אנרגיה.",
          "שליטה עודפת – קושי לתת למערכות או לאנשים לפעול בעצמאות.",
        ],
        imbalanceSigns: [
          "קיפאון תזרימי رغم כישרון עסקי.",
          "מערכות יחסים עסקיות קצרות שנקטעות מהר.",
          "מרירות סביב כסף, חובות או הלוואות.",
          "תחושת ״אני חייב להחזיק הכול בידיים שלי״.",
        ],
        growthAreas: [
          "נדיבות כבסיס עסקי – להבין שכסף זורם למקום שיש בו נתינה.",
          "אמון חכם – לשלב בין בדיקות יסודיות לבין לב פתוח.",
          "שחרור שליטה – לתת למערכות ולצוותים לפעול בעצמאות.",
          "להפסיק להעלות שוב ושוב עוולות ישנות – להפנות אנרגיה לבנייה חדשה במקום לעבר.",
          "לאפשר זרימה – לראות בכסף אנרגיה שנכנסת ויוצאת, לא משהו שצריך להיאחז בו.",
        ],
        careerPaths: [
          "מכירות ושיווק",
          "יזמות עסקית והשקעות",
          'needle"ן וניהול נכסים',
          "ניהול כספים וחברות אחזקה",
          "הפקה וניהול פרויקטים מסחריים",
          "תחומי ייעוץ ועסקאות uluslararasıות",
        ],
        dailyPractice:
          "השקיע/י היום סכום קטן במשהו שעושה לך טוב (חפץ, חוויה או מתנה לאחר). שים/י לב איך נדיבות קטנה מחזירה אליך תחושת שפע פנימית – ומשם גם זרימה חיצונית.",
        bottomLine:
          "הספרה 8 נועדה להזכיר לך שכסף הוא לא רק מספרים – הוא אנרגיה של אמון ונדיבות. ככל שתפסיק להחזיק בו מתוך פחד ותבחר להשתמש בו בחכמה וברוחב לב, כך הוא יחזור אליך פי כמה.",
      },
      9: {
        title: "המרפא/ה",
        essence:
          "ספרה 9 מגלמת אנרגיה של ריפוי, חמלה וחכמה עתיקה. היא נושאת ראייה רחבה על החיים ויכולת נדירה להבין את הלב שמאחוי כל סיפור.\nמי שנושא את ה־״9″ מגיע לעולם עם מתנה של רגישות, עומק וחיבור לרוחניות. נוכחותו מעניקה מרחב מרפא, גם בלי מילים.\nה־״9″ נועד להעניק משמעות, לגעת באנשים ברמה עמוקה ולחבר בין עולמות של חומר ורוח.",
        gifts: [
          "חמלה עמוקה – יכולת לראות ולהבין כאב של אחרים.",
          "חכמה עתיקה – תחושת ידע פנימי שנמצא שם עוד לפני הלמידה.",
          "כישרון טיפולי – נוכחות שמרפאת דרך מגע, מילה או הקשבה.",
          "חיבור לעולם הרוח – תפיסה אינטואיטיבית, תחושת שליחות.",
          "ראיית עומק – יכולת לחדור מבעד למסכות ולראות את האמת.",
        ],
        challenges: [
          "פחד מחשיפה – נטייה להישאר ״מאחורי הקלעים״ מחשש לביקורת או שיפוט.",
          "סגפנות רגשית – נתינה אינסופית לאחרים תוך הזנחת הצרכים האישיים.",
          "פחד מאובדן חומרי – החזקה בכסף וחסכנות יתר, שמקשה על זרימה.",
          "בלבול סביב תמחור ריפוי – קושי לשים ערך כספי ברור לעבודה טיפולית, חוויה ש״אי אפשר לתhtar נתינה״.",
        ],
        imbalanceSigns: [
          "אמירות חוזרות כמו ״אני עוד לא מוכן/ה לצאת החוצה״.",
          "עייפות אמפתית,uschika רגשית.",
          "קושי להציב גבולות במערכות יחסים.",
          "בלבול מתמשך סביב מחירים, תמחור או קבלת כסף עבור שירות.",
        ],
        growthAreas: [
          "לאפשר לעצמי להיראות – לצאת לאור, גם אם בהתחלה זה קטן ומצומצם.",
          "להציב גבולות ברורים לנתינה – להבין שריפוי לא בא על חשבון עצמך.",
          "שילוב בין רוח לחומר – להחזיק עסק או מסגרת ברורה לריפוי.",
          "תמחור מתכבד – ללמוד לשים ערך כספי ברור לעבודה טיפולית, כי שירות עמוק ראוי לשגשוג גם בחומר.",
          "לטפח איזון בין נתינה לעצמי לבין נתינה לאחרים – לדאוג שהכוחות לא יתדלדלו.",
        ],
        careerPaths: [
          "פסיכותרפיה",
          "קואצ'ינג",
          "רפואה או סיעוד",
          "רפואות משלימות",
          "הדרכה רוחנית",
          "מדיטציה ויוגה",
          "כתיבה טיפולית וסדנאות עומק",
        ],
        dailyPractice:
          "כתוב/כתבי הצעה טיפולית או מסר רוחני קצר, קבע/י מחיר ברור – גם אם זה מרגיש לא נוח – ושתף/י אותו החוצה.",
        bottomLine:
          "ספרה 9 נועדה Bringing ריפוי וחמלה לעולם. כשהיא לומדת לשלב בין נתינה לרוח לבין מבנה ותמחור ברור – היא מצליחה גם לרפא אחרים וגם לשגשג בעצמה.",
      },
    };
    return dataMap[code] || null;
  };

  return (
    <>
      {showSalesPage && result ? (
        <WealthCodeSalesPage
          wealthCode={result.wealthCode}
          codeStructure={result.codeStructure}
          fullData={result.fullData}
          onBack={() => setShowSalesPage(false)}
          onShowThankYou={onShowThankYou}
          onCalculateNew={() => {
            setDay("");
            setMonth("");
            setYear("");
            setResult(null);
            setShowSalesPage(false);
          }}
        />
      ) : (
        <div className="min-h-screen relative" lang="he">
          {/* Overlays over global body background */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent via-50% to-rose-100/25 sm:bg-gradient-to-b sm:from-orange-50/20 sm:via-transparent sm:to-rose-50/20"></div>
            <div className="absolute inset-0 backdrop-saturate-110 backdrop-contrast-102 backdrop-brightness-102"></div>
          </div>

          {/* Main Content Container */}
          <div className="relative z-10 min-h-screen flex flex-col">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-1 sm:px-6 sm:py-8 px-[24px] py-[43px]">
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Input Card */}
                <div className="flex items-center justify-center min-h-[60vh] mt-[-91px] mr-[0px] mb-[0px] ml-[0px]">
                  <Card className="backdrop-blur-xl border shadow-2xl max-w-2xl w-full bg-[rgba(254,254,254,0.12)] border-[rgba(135,103,79,0.2)] sm:p-12 px-[32px] py-[61px] mt-[-15px] mr-[0px] mb-[-65px] ml-[0px]">
                    <div
                      className="text-center space-y-6 font-['Assistant']"
                      dir="rtl"
                    >
                      <div className="text-center mb-6">
                        <h1 className="font-normal drop-shadow-lg tracking-wide text-center text-[rgba(254,254,254,1)] font-['Assistant'] text-[32px] pt-[-14px] pr-[0px] pb-[0px] pl-[0px] mt-[-40px] mr-[0px] mb-[0px] ml-[0px]">
                          מחשבון קוד העושר
                        </h1>
                        <p className="text-[rgba(149,112,82,1)] font-light mb-6 leading-relaxed drop-shadow-md font-['Assistant'] tracking-wide text-center">
                          הכניסו את תאריך הלידה שלכם לחישוב הקוד
                        </p>
                      </div>

                      <div className="space-y-3">
                        {/* Date Input Section */}
                        <div className="space-y-3">
                          <div className="text-center"></div>
                          <div
                            className="flex items-center justify-center gap-3 max-w-sm mx-auto bg-[rgba(0,0,0,0)]"
                            dir="ltr"
                          >
                            <div className="flex flex-col items-center space-y-1">
                              <label className="text-[rgba(254,254,254,1)] font-['Assistant'] mb-2 block font-bold">
                                יום
                              </label>
                              <Input
                                type="text"
                                value={day}
                                onChange={(e) => {
                                  const value =
                                    e.target.value.replace(
                                      /\D/g,
                                      "",
                                    );
                                  if (value.length <= 2)
                                    setDay(value);
                                }}
                                placeholder=""
                                maxLength={2}
                                className="w-16 h-12 text-center px-2 py-2 font-semibold border backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md font-['Assistant'] tracking-wide text-lg bg-[rgba(254,254,254,0.2)] text-[rgba(149,112,82,1)] border-[rgba(135,103,79,0.3)] placeholder-[rgba(149,112,82,0.6)] text-[16px]"
                              />
                            </div>
                            <span className="text-[rgba(149,112,82,0.6)] text-xl font-bold mt-[30px] mr-[0px] mb-[0px] ml-[0px]">
                              /
                            </span>
                            <div className="flex flex-col items-center space-y-1">
                              <label className="text-[rgba(254,254,254,1)] font-['Assistant'] mb-2 block font-bold">
                                חודש
                              </label>
                              <Input
                                type="text"
                                value={month}
                                onChange={(e) => {
                                  const value =
                                    e.target.value.replace(
                                      /\D/g,
                                      "",
                                    );
                                  if (value.length <= 2)
                                    setMonth(value);
                                }}
                                placeholder=""
                                maxLength={2}
                                className="w-16 h-12 text-center px-2 py-2 hover:bg-white/30 font-semibold border backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md font-['Assistant'] tracking-wide text-lg bg-[rgba(254,254,254,0.2)] text-[rgba(149,112,82,1)] border-[rgba(135,103,79,0.3)] placeholder-[rgba(149,112,82,0.6)] text-[16px]"
                              />
                            </div>
                            <span className="text-[rgba(149,112,82,0.6)] text-xl font-bold mt-[30px] mr-[0px] mb-[0px] ml-[0px]">
                              /
                            </span>
                            <div className="flex flex-col items-center space-y-1">
                              <label className="text-[rgba(254,254,254,1)] font-['Assistant'] mb-2 block font-bold">
                                שנה
                              </label>
                              <Input
                                type="text"
                                value={year}
                                onChange={(e) => {
                                  const value =
                                    e.target.value.replace(
                                      /\D/g,
                                      "",
                                    );
                                  if (value.length <= 4)
                                    setYear(value);
                                }}
                                placeholder=""
                                maxLength={4}
                                className="w-20 h-12 text-center px-2 py-2 hover:bg-white/30 font-semibold border backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md font-['Assistant'] tracking-wide text-lg bg-[rgba(254,254,254,0.2)] text-[rgba(149,112,82,1)] border-[rgba(135,103,79,0.3)] placeholder-[rgba(149,112,82,0.6)] text-[16px]"
                              />
                            </div>
                          </div>

                          {/* Date Display */}
                          {(day || month || year) && (
                            <div className="text-center">
                              <p
                                className="font-semibold text-lg tracking-wide font-['Assistant']"
                                style={{ color: "#473B31" }}
                              >
                                {day && month && year
                                  ? `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`
                                  : "מלאו את כל השדות"}
                              </p>
                              {!isValidDate(day, month, year) &&
                                day &&
                                month &&
                                year && (
                                  <p className="text-[rgba(207,122,122,1)] font-semibold text-sm mt-1 font-['Assistant']">
                                    תאריך לא תקין
                                  </p>
                                )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-center gap-3 bg-[rgba(0,0,0,0)]">
                          <Button
                            size="default"
                            onClick={calculateWealthCode}
                            disabled={
                              !isValidDate(day, month, year)
                            }
                            className="w-full font-normal backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl text-base px-6 py-3 font-['Assistant'] tracking-wide bg-[rgba(149,112,82,0.4)] hover:bg-[rgba(149,112,82,0.6)] border-none text-[rgba(254,254,254,1)] disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            אני רוצה לגלות את הקוד
                          </Button>

                          {(day || month || year) && (
                            <Button
                              onClick={() => {
                                setDay("");
                                setMonth("");
                                setYear("");
                              }}
                              variant="outline"
                              size="sm"
                              className="px-4 py-2 hover:bg-white/30 font-semibold border backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl font-['Assistant'] tracking-wide bg-[rgba(254,254,254,0.2)] text-[rgba(71,59,49,1)] border-[rgba(135,103,79,0.3)]"
                            >
                              איפוס
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </main>

            {/* Logo - Small, above footer */}
            <div className="flex justify-center pr-[0px] pb-[60px] pl-[0px] mx-[0px] mt-[0px] mr-[0px] mb-[8px] ml-[0px] pt-[3px]">
              <img
                src={logoImage.src}
                alt="AWAKENING"
                className="h-40 sm:h-48 w-auto opacity-90 drop-shadow-lg m-[0px]"
              />
            </div>

            {/* Footer */}
            <Footer
              onShowTerms={onShowTerms}
              onShowPrivacy={onShowPrivacy}
              onShowTermsAndPrivacy={onShowTermsAndPrivacy}
            />
          </div>
        </div>
      )}
    </>
  );
}