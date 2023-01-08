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
            'custom-gray': '#8B8B8B',
            'custom-dark-gray': '#2F2A3D',
            'custom-blue': '#45AAE3',
            'custom-red': '#ee0303'
        },

    },
    plugins: [],
}
