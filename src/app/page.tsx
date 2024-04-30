"use client"

import "@radix-ui/themes/styles.css"
import { Button } from "@radix-ui/themes"
import { signIn } from "next-auth/react"

export default function HomePage() {
	return (
		<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
			<h1 className="text-5xl font-bold tracking-tight text-white sm:text-[5rem]">
				Storytime with Akasha
			</h1>
			<h2 className="text-3xl font-medium text-white">
				Interactive transmedia storytelling demo with AI
			</h2>
			<div className="flex justify-center">
				<Button
					size="3"
					onClick={() =>
						signIn("discord", { callbackUrl: "/reader" })
					}
				>
					Sign in with Discord
				</Button>
			</div>
		</div>
	)
}
