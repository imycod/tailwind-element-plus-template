import forms from "@tailwindcss/forms";

const hexReg = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i

/**
 * Convert hex color to rgb
 * @param hex
 * @returns {{r: number, b: number, g: number}|null}
 */
function hexToRgb(hex) {
	const result = hexReg.exec(hex)
	return result ? [
		parseInt(result[1], 16),
		parseInt(result[2], 16),
		parseInt(result[3], 16)
	] : null
}

const colors = {
	white: {
		DEFAULT: "#fff",
		300: "#F2F2F7", // menu
		400: "#F9F9F9",
	},
	black: {
		DEFAULT: '#000',
		50: "#333847", // fill blank
		100: "#2B2F3B",
		200: "#23262F", // block card
		300: "#21232B", // menu bar
		400: "#1B1C23", // bg
		500: "#121217",
	},
	gray: {
		50: "#F9FAFB",
		100: "#F3F4F6",
		200: "#E5E7EB",
		300: "#BFC4CD",
		400: "#9CA3AF",
		500: "#6B7280",
		600: "#4B5563",
		700: "#374151",
		800: "#1F2937",
		900: "#111827",
		950: "#030712",
	},
	violet: {
		50: "#F1EEFF",
		100: "#E6E1FF",
		200: "#D2CBFF",
		300: "#B7ACFF",
		400: "#9C8CFF",
		500: "#8470FF",
		600: "#755FF8",
		700: "#5D47DE",
		800: "#4634B1",
		900: "#2F227C",
		950: "#1C1357",
	},
	sky: {
		50: "#E3F3FF",
		100: "#D1ECFF",
		200: "#B6E1FF",
		300: "#A0D7FF",
		400: "#7BC8FF",
		500: "#67BFFF",
		600: "#56B1F3",
		700: "#3193DA",
		800: "#1C71AE",
		900: "#124D79",
		950: "#0B324F",
	},
};

export default {
	// corePlugins: {
	//   preflight: false
	// },
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				...colors,
				secondary: 'var(--item-secondary-color)',
			},
			fontFamily: {
				inter: ["Inter", "sans-serif"],
			},
			fontSize: {
				xs: ["0.75rem", {lineHeight: "1.5"}],
				sm: ["0.875rem", {lineHeight: "1.5715"}],
				base: ["1rem", {lineHeight: "1.5", letterSpacing: "-0.01em"}],
				lg: ["1.125rem", {lineHeight: "1.5", letterSpacing: "-0.01em"}],
				xl: ["1.25rem", {lineHeight: "1.5", letterSpacing: "-0.01em"}],
				"2xl": ["1.5rem", {lineHeight: "1.33", letterSpacing: "-0.01em"}],
				"3xl": ["1.88rem", {lineHeight: "1.33", letterSpacing: "-0.01em"}],
				"4xl": ["2.25rem", {lineHeight: "1.25", letterSpacing: "-0.02em"}],
				"5xl": ["3rem", {lineHeight: "1.25", letterSpacing: "-0.02em"}],
				"6xl": ["3.75rem", {lineHeight: "1.2", letterSpacing: "-0.02em"}],
			},
			screens: {
				...require('tailwindcss/defaultTheme').screens,
				xs: "480px",
				sm: "640px",
				md: "768px",
				lg: "1024px",

				/**
				 *     'phone': '480px',     // 定义一个名为 'phone' 的断点
				 *       'tablet': '768px',    // 定义一个名为 'tablet' 的断点
				 *       'laptop': '1024px',   // 定义一个名为 'laptop' 的断点
				 *       'desktop': '1280px',  // 定义一个名为 'desktop' 的断点
				 *       'wide': '1600px',     // 定义一个名为 'wide' 的断点
				 */
			},
			borderWidth: {
				3: "3px",
			},
			minWidth: {
				36: "9rem",
				44: "11rem",
				56: "14rem",
				60: "15rem",
				72: "18rem",
				80: "20rem",
			},
			maxWidth: {
				"8xl": "88rem",
				"9xl": "96rem",
			},
			zIndex: {
				60: "60",
			},
		},
	},
	plugins: [
		forms,
		function ({addBase, addUtilities, config}) {
			const darkMaskColor = hexToRgb(colors.black["500"]);
			addBase({
				":root": {
					// "--item-fill-color-blank": colors.violet["800"],
					"--item-menu-bg-color": `${colors.white[300]} !important`,
					"--item-secondary-color": `${colors.white[300]} !important`,
					"--item-menu-text-color": `${colors.gray[500]}`,
					'--item-menu-hover-bg-color': 'rgba(22,120,255,0.2) !important',
					"--item-fill-color-light": `${colors.gray[100]}`,
					'--item-table-border-color': '',
					'--item-border-color-lighter': '',
					'--item-table-tr-bg-color': colors.white
				},
				":root.dark": {
					'--item-bg-color-overlay': colors.black[400],
					"--item-bg-color": colors.black[400], // overlay
					"--item-text-color-regular": colors.white['DEFAULT'], // dialog > text
					"--item-menu-bg-color": `${colors.black[300]} !important`,
					"--item-secondary-color": `${colors.black[300]} !important`,
					'--item-border-color': colors.black[50],
					'--item-text-color-primary': colors.white['DEFAULT'],
					'--item-menu-active-color': colors.white['DEFAULT'],
					'--item-menu-hover-text-color': colors.white['DEFAULT'],
					'--item-menu-hover-bg-color': 'rgba(255,255,255,0.1) !important',
					"--item-input-text-color": colors.white['DEFAULT'],
					"--item-fill-color-blank": colors.black[50],
					"--item-fill-color-light": colors.black[300],
					'--item-table-border-color': colors.black[50],
					'--item-border-color-lighter': colors.black[50],
					'--item-mask-color': `rgba(${darkMaskColor[0]},${darkMaskColor[1]},${darkMaskColor[2]},0.9)`, // https://gist.github.com/danmatthews/f6ea70c3a1ef6348b38a5bd79ac1f6dd
					// "--item-menu-active-color":"#fff",
					// "--item-input-bg-color":'',
				},
			});
		},
	],
};
