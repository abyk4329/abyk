import localFont from "next/font/local";

// דוגמה לטעינת פונט מותאם אישית מתיקיית public/fonts
// החלף את שמות הקבצים בהתאם לפונטים שלך

export const customFont = localFont({
    src: [
        {
            path: "../public/fonts/YourFont-Light.woff2",
            weight: "300",
            style: "normal"
        },
        {
            path: "../public/fonts/YourFont-Regular.woff2",
            weight: "400",
            style: "normal"
        },
        {
            path: "../public/fonts/YourFont-Medium.woff2",
            weight: "500",
            style: "normal"
        },
        {
            path: "../public/fonts/YourFont-Bold.woff2",
            weight: "700",
            style: "normal"
        }
    ],
    variable: "--font-custom",
    display: "swap"
});

// דוגמה לשימוש בפונט עברי מ-Google Fonts (אופציה חלופית)
// import { Rubik, Heebo, Assistant } from "next/font/google";
//
// export const hebrewFont = Rubik({
//   subsets: ["hebrew", "latin"],
//   weight: ["300", "400", "500", "700"],
//   variable: "--font-hebrew",
//   display: "swap"
// });
