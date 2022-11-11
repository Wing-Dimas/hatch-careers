const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Nunito", ...defaultTheme.fontFamily.sans],
            },
        },
        colors: {
            yellow: "#ffc107",
            green: "#28a745",
            blue1: "#042887",
            blue2: "#17a2b8",
            blue3: " #001F3F",
            red: "#dc3545",
            gray: "#dedede",
        },
    },

    plugins: [require("@tailwindcss/forms")],
};
