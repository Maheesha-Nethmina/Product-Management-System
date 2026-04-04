import type { Config } from "tailwindcss";

const config: Config = {
    // This enables dark mode support using the 'dark' class you implemented 
    darkMode: "class",
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        // If you have a 'src' folder, ensure it is included here
    ],
    theme: {
        extend: {
            // You can add custom animations for your toast notifications here [cite: 33]
            keyframes: {
                "fade-in-up": {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
            animation: {
                "fade-in-up": "fade-in-up 0.3s ease-out",
            },
        },
    },
    plugins: [],
};
export default config;