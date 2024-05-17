/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            animation: {
                "spin-slow": "spin 3s ease-in-out infinite",
                "spin-medium": "spin 1.5s ease-in-out infinite",
                "spin-fast": "spin 0.75s ease-in-out infinite",
                "spin-reverse": "spin-reverse 3s ease-in-out infinite",
                "spin-reverse-in": "spin-reverse 3s ease-in-out infinite",
                "spin-reverse-out": "spin-reverse 3s ease-out infinite",
            },
            keyframes: {
                "spin-reverse": {
                    from: {
                        transform: "rotate(360deg)",
                    },
                    to: {
                        transform: "rotate(0deg)",
                    },
                },
            },
        },
    },
    plugins: [require("daisyui")],
};
