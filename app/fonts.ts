import localFont from "next/font/local";

export const assistant = localFont({
  // שמות הקבצים נשמרים כפי שהורדו, כולל רווח בשם התיקייה
  src: [
    {
      path: "../public/fonts/Assistant /static/Assistant-ExtraLight.ttf",
      weight: "200",
    },
    {
      path: "../public/fonts/Assistant /static/Assistant-Light.ttf",
      weight: "300",
    },
    {
      path: "../public/fonts/Assistant /static/Assistant-Regular.ttf",
      weight: "400",
    },
    {
      path: "../public/fonts/Assistant /static/Assistant-Medium.ttf",
      weight: "500",
    },
    {
      path: "../public/fonts/Assistant /static/Assistant-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../public/fonts/Assistant /static/Assistant-Bold.ttf",
      weight: "700",
    },
    {
      path: "../public/fonts/Assistant /static/Assistant-ExtraBold.ttf",
      weight: "800",
    },
  ],
  display: "swap",
  variable: "--font-assistant",
});
