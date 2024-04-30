import { type Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"
import { blackA, mauve, violet } from "@radix-ui/colors"
export default {
	content: ["./src/**/*.tsx"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-sans)", ...fontFamily.sans],
			},
			colors: {
				...blackA,
				...mauve,
				...violet,
			},
			transitionProperty: {
				height: "height",
			},
		},
	},
	plugins: [],
} satisfies Config
