/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
const tailwind_classes = require('./src/assets/styles/tailwind-base.json');

export default {
	content: [
		'./public/index.html',
		'./src/**/*.{js,ts,vue}',
	],
	theme: {
		extend: {
			colors: {
				...tailwind_classes,
				transparent: 'transparent',
				current: 'currentColor',
			},
			fontFamily: {
				sans: ['HelveticaNow']
			},
			boxShadow: {
				'DEFAULT': 'var(--elevation-1)',
				'md': 'var(--elevation-2)',
				'lg': 'var(--elevation-3)',
				'xl': 'var(--elevation-4)',
				'2xl': 'var(--elevation-5)',
			}
		},
	},
	darkMode: "class",
	plugins: [
		function ({ addBase, addComponents }) {
			addBase({
				".el-button": {
					"background-color": "var(--el-button-bg-color,var(--el-color-white))"
				}
			});
			addBase({
				':root': {
					"--black-5": tailwind_classes["black"]["5"],
					"--black-10": tailwind_classes["black"]["10"],
					"--black-20": tailwind_classes["black"]["20"],
					"--black-30": tailwind_classes["black"]["30"],
					"--black-40": tailwind_classes["black"]["40"],
					"--black-50": tailwind_classes["black"]["50"],
					"--black-60": tailwind_classes["black"]["60"],
					"--black-70": tailwind_classes["black"]["70"],
					"--black-80": tailwind_classes["black"]["80"],
					"--black-90": tailwind_classes["black"]["90"],
					"--black-100": tailwind_classes["black"]["100"],
					"--black-200": tailwind_classes["black"]["200"],
					"--black-300": tailwind_classes["black"]["300"],
					"--black-400": tailwind_classes["black"]["400"],
					"--white-5": tailwind_classes["white"]["5"],
					"--white-10": tailwind_classes["white"]["10"],
					"--white-20": tailwind_classes["white"]["20"],
					"--white-30": tailwind_classes["white"]["30"],
					"--white-40": tailwind_classes["white"]["40"],
					"--white-50": tailwind_classes["white"]["50"],
					"--white-60": tailwind_classes["white"]["60"],
					"--white-70": tailwind_classes["white"]["70"],
					"--white-80": tailwind_classes["white"]["80"],
					"--white-90": tailwind_classes["white"]["90"],
					"--white-100": tailwind_classes["white"]["100"],
					"--white-200": tailwind_classes["white"]["200"],
					"--gray-50": tailwind_classes["gray"]["50"],
					"--gray-100": tailwind_classes["gray"]["100"],
					"--gray-200": tailwind_classes["gray"]["200"],
					"--gray-300": tailwind_classes["gray"]["300"],
					"--gray-400": tailwind_classes["gray"]["400"],
					"--gray-500": tailwind_classes["gray"]["500"],
					"--gray-600": tailwind_classes["gray"]["600"],
					"--gray-700": tailwind_classes["gray"]["700"],
					"--gray-800": tailwind_classes["gray"]["800"],
					"--gray-900": tailwind_classes["gray"]["900"],
					"--gray-950": tailwind_classes["gray"]["950"],
					"--gray-975": tailwind_classes["gray"]["975"],
					"--gray-1000": tailwind_classes["gray"]["1000"],
					"--night-50": tailwind_classes["night"]["50"],
					"--night-100": tailwind_classes["night"]["100"],
					"--night-200": tailwind_classes["night"]["200"],
					"--night-300": tailwind_classes["night"]["300"],
					"--night-400": tailwind_classes["night"]["400"],
					"--night-500": tailwind_classes["night"]["500"],
					"--night-600": tailwind_classes["night"]["600"],
					"--night-700": tailwind_classes["night"]["700"],
					"--night-800": tailwind_classes["night"]["800"],
					"--night-900": tailwind_classes["night"]["900"],
					"--night-950": tailwind_classes["night"]["950"],
					"--sky-50": tailwind_classes["sky"]["50"],
					"--sky-100": tailwind_classes["sky"]["100"],
					"--sky-200": tailwind_classes["sky"]["200"],
					"--sky-300": tailwind_classes["sky"]["300"],
					"--sky-400": tailwind_classes["sky"]["400"],
					"--sky-500": tailwind_classes["sky"]["500"],
					"--sky-600": tailwind_classes["sky"]["600"],
					"--sky-700": tailwind_classes["sky"]["700"],
					"--sky-800": tailwind_classes["sky"]["800"],
					"--sky-900": tailwind_classes["sky"]["900"],
					"--sky-950": tailwind_classes["sky"]["950"],
					"--sea-50": tailwind_classes["sea"]["50"],
					"--sea-100": tailwind_classes["sea"]["100"],
					"--sea-200": tailwind_classes["sea"]["200"],
					"--sea-300": tailwind_classes["sea"]["300"],
					"--sea-400": tailwind_classes["sea"]["400"],
					"--sea-500": tailwind_classes["sea"]["500"],
					"--sea-600": tailwind_classes["sea"]["600"],
					"--sea-700": tailwind_classes["sea"]["700"],
					"--sea-800": tailwind_classes["sea"]["800"],
					"--sea-900": tailwind_classes["sea"]["900"],
					"--sea-950": tailwind_classes["sea"]["950"],
					"--blue-50": tailwind_classes["blue"]["50"],
					"--blue-100": tailwind_classes["blue"]["100"],
					"--blue-200": tailwind_classes["blue"]["200"],
					"--blue-300": tailwind_classes["blue"]["300"],
					"--blue-400": tailwind_classes["blue"]["400"],
					"--blue-500": tailwind_classes["blue"]["500"],
					"--blue-600": tailwind_classes["blue"]["600"],
					"--blue-700": tailwind_classes["blue"]["700"],
					"--blue-800": tailwind_classes["blue"]["800"],
					"--blue-900": tailwind_classes["blue"]["900"],
					"--blue-950": tailwind_classes["blue"]["950"],
					"--teal-50": tailwind_classes["teal"]["50"],
					"--teal-100": tailwind_classes["teal"]["100"],
					"--teal-200": tailwind_classes["teal"]["200"],
					"--teal-300": tailwind_classes["teal"]["300"],
					"--teal-400": tailwind_classes["teal"]["400"],
					"--teal-500": tailwind_classes["teal"]["500"],
					"--teal-600": tailwind_classes["teal"]["600"],
					"--teal-700": tailwind_classes["teal"]["700"],
					"--teal-800": tailwind_classes["teal"]["800"],
					"--teal-900": tailwind_classes["teal"]["900"],
					"--teal-950": tailwind_classes["teal"]["950"],
					"--green-50": tailwind_classes["green"]["50"],
					"--green-100": tailwind_classes["green"]["100"],
					"--green-200": tailwind_classes["green"]["200"],
					"--green-300": tailwind_classes["green"]["300"],
					"--green-400": tailwind_classes["green"]["400"],
					"--green-500": tailwind_classes["green"]["500"],
					"--green-600": tailwind_classes["green"]["600"],
					"--green-700": tailwind_classes["green"]["700"],
					"--green-800": tailwind_classes["green"]["800"],
					"--green-900": tailwind_classes["green"]["900"],
					"--green-950": tailwind_classes["green"]["950"],
					"--yellow-50": tailwind_classes["yellow"]["50"],
					"--yellow-100": tailwind_classes["yellow"]["100"],
					"--yellow-200": tailwind_classes["yellow"]["200"],
					"--yellow-300": tailwind_classes["yellow"]["300"],
					"--yellow-400": tailwind_classes["yellow"]["400"],
					"--yellow-500": tailwind_classes["yellow"]["500"],
					"--yellow-600": tailwind_classes["yellow"]["600"],
					"--yellow-700": tailwind_classes["yellow"]["700"],
					"--yellow-800": tailwind_classes["yellow"]["800"],
					"--yellow-900": tailwind_classes["yellow"]["900"],
					"--yellow-950": tailwind_classes["yellow"]["950"],
					"--orange-50": tailwind_classes["orange"]["50"],
					"--orange-100": tailwind_classes["orange"]["100"],
					"--orange-200": tailwind_classes["orange"]["200"],
					"--orange-300": tailwind_classes["orange"]["300"],
					"--orange-400": tailwind_classes["orange"]["400"],
					"--orange-500": tailwind_classes["orange"]["500"],
					"--orange-600": tailwind_classes["orange"]["600"],
					"--orange-700": tailwind_classes["orange"]["700"],
					"--orange-800": tailwind_classes["orange"]["800"],
					"--orange-900": tailwind_classes["orange"]["900"],
					"--orange-950": tailwind_classes["orange"]["950"],
					"--red-50": tailwind_classes["red"]["50"],
					"--red-100": tailwind_classes["red"]["100"],
					"--red-200": tailwind_classes["red"]["200"],
					"--red-300": tailwind_classes["red"]["300"],
					"--red-400": tailwind_classes["red"]["400"],
					"--red-500": tailwind_classes["red"]["500"],
					"--red-600": tailwind_classes["red"]["600"],
					"--red-700": tailwind_classes["red"]["700"],
					"--red-800": tailwind_classes["red"]["800"],
					"--red-900": tailwind_classes["red"]["900"],
					"--red-950": tailwind_classes["red"]["950"],
					"--rose-50": tailwind_classes["rose"]["50"],
					"--rose-100": tailwind_classes["rose"]["100"],
					"--rose-200": tailwind_classes["rose"]["200"],
					"--rose-300": tailwind_classes["rose"]["300"],
					"--rose-400": tailwind_classes["rose"]["400"],
					"--rose-500": tailwind_classes["rose"]["500"],
					"--rose-600": tailwind_classes["rose"]["600"],
					"--rose-700": tailwind_classes["rose"]["700"],
					"--rose-800": tailwind_classes["rose"]["800"],
					"--rose-900": tailwind_classes["rose"]["900"],
					"--rose-950": tailwind_classes["rose"]["950"],
					"--pink-50": tailwind_classes["pink"]["50"],
					"--pink-100": tailwind_classes["pink"]["100"],
					"--pink-200": tailwind_classes["pink"]["200"],
					"--pink-300": tailwind_classes["pink"]["300"],
					"--pink-400": tailwind_classes["pink"]["400"],
					"--pink-500": tailwind_classes["pink"]["500"],
					"--pink-600": tailwind_classes["pink"]["600"],
					"--pink-700": tailwind_classes["pink"]["700"],
					"--pink-800": tailwind_classes["pink"]["800"],
					"--pink-900": tailwind_classes["pink"]["900"],
					"--pink-950": tailwind_classes["pink"]["950"],
					"--purple-50": tailwind_classes["purple"]["50"],
					"--purple-100": tailwind_classes["purple"]["100"],
					"--purple-200": tailwind_classes["purple"]["200"],
					"--purple-300": tailwind_classes["purple"]["300"],
					"--purple-400": tailwind_classes["purple"]["400"],
					"--purple-500": tailwind_classes["purple"]["500"],
					"--purple-600": tailwind_classes["purple"]["600"],
					"--purple-700": tailwind_classes["purple"]["700"],
					"--purple-800": tailwind_classes["purple"]["800"],
					"--purple-900": tailwind_classes["purple"]["900"],
					"--purple-950": tailwind_classes["purple"]["950"],
					"--neo-purple-50": tailwind_classes["neo-purple"]["50"],
					"--neo-purple-100": tailwind_classes["neo-purple"]["100"],
					"--neo-purple-200": tailwind_classes["neo-purple"]["200"],
					"--neo-purple-300": tailwind_classes["neo-purple"]["300"],
					"--neo-purple-400": tailwind_classes["neo-purple"]["400"],
					"--neo-purple-500": tailwind_classes["neo-purple"]["500"],
					"--neo-purple-600": tailwind_classes["neo-purple"]["600"],
					"--neo-purple-700": tailwind_classes["neo-purple"]["700"],
					"--neo-purple-800": tailwind_classes["neo-purple"]["800"],
					"--neo-purple-900": tailwind_classes["neo-purple"]["900"],
					"--neo-purple-950": tailwind_classes["neo-purple"]["950"],
					"--neo-purple-975": tailwind_classes["neo-purple"]["975"],
					"--neo-purple-1000": tailwind_classes["neo-purple"]["1000"],
				},
			});
		},
	],
};
