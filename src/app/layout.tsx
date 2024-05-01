import "@/styles/globals.css"
import "@radix-ui/themes/styles.css"
import { Theme } from "@radix-ui/themes"
import { Exo } from "next/font/google"

const exo = Exo({
	subsets: ["latin"],
	variable: "--font-sans",
})

export const metadata = {
	title: "Storytime with Akasha",
	description: "An interactive transmedia storytelling experience",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={`font-sans ${exo.variable}`}>
				<Theme
					accentColor="lime"
					grayColor="olive"
					scaling="110%"
					appearance="dark"
				>
					<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-rose-400 to-purple-700 text-white">
						{children}
					</main>
				</Theme>
			</body>
		</html>
	)
}
