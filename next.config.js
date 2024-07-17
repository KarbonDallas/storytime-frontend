/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js")

/** @type {import("next").NextConfig} */
const config = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.livepeer.cloud",
				port: "",
				pathname: "/stream/**",
			},
			{
				protocol: "https",
				hostname: "**.xode.app",
				port: "",
				pathname: "/livepeer-cloud-ai-images/**",
			},
		],
	},
}

export default config
