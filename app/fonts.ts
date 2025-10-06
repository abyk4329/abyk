import { Assistant } from "next/font/google";

export const assistant = Assistant({
    subsets: ["latin", "latin-ext", "hebrew"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    display: "swap",
    variable: "--font-assistant",
});
