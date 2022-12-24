/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            'custom-yellow': '#FEC532',
            'custom-light-gray': '#F9F8F7',
            'custom-white': '#FFFFFF',
        },

    },
    plugins: [],
}
