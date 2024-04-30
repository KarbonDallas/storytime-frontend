/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
	plugins: ["prettier-plugin-tailwindcss"],
	arrowParens: "always",
	printWidth: 80,
	singleQuote: false,
	semi: false,
	trailingComma: "all",
	tabWidth: 4,
	useTabs: true,
}

export default config
