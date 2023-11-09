/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			main: '#232946',
			secondary: '#d4d8f0',
			white: '#fffffe',
			pink: '#eebbc3',
			bluegray: '#b8c1ec'
		},
		extend: {},
	},
	plugins: [
		function({ addComponents, theme }) {
			addComponents({
				'.marker-effect': {
					position: 'absolute',
					// content: '',
					height: '70px',
					zIndex: -1,
					transform: 'rotate(-7deg)',
					width: '280px',
					margin: '0 -0.4em',
					padding: '0.1em 0.4em',
					borderRadius: '0.8em 0.3em',
					background: 'transparent',
					backgroundImage: `linear-gradient(to right,
						rgba(238,187,200,0.1),
						rgba(238,187,200,0.7) 4%,
						rgba(238,187,200,0.3)
					)`,
					boxDecorationBreak: 'clone'
				},
				'.marker-effect-skills': {
					position: 'absolute',
					// content: '',
					height: '70px',
					zIndex: -1,
					transform: 'rotate(-7deg)',
					width: '185px',
					margin: '0 -0.4em',
					padding: '0.1em 0.4em',
					borderRadius: '0.8em 0.3em',
					background: 'transparent',
					backgroundImage: `linear-gradient(to right,
						rgba(255,255,254,0.1),
						rgba(255,255,254,0.7) 4%,
						rgba(255,255,254,0.3)
					)`,
					boxDecorationBreak: 'clone'
				},
				'.marker-effect-contact': {
					position: 'absolute',
					// content: '',
					height: '70px',
					zIndex: -1,
					transform: 'rotate(-4deg)',
					width: '410px',
					margin: '0 -0.4em',
					padding: '0.1em 0.4em',
					borderRadius: '0.8em 0.3em',
					background: 'transparent',
					backgroundImage: `linear-gradient(to right,
						rgba(212,216,240,0.1),
						rgba(212,216,240,0.7) 4%,
						rgba(212,216,240,0.3)
					)`,
					boxDecorationBreak: 'clone'
				},
			})
		}
	],
}
