"use client"

import "@radix-ui/themes/styles.css"

import { type ChangeEvent, useState } from "react"
import { Button, Callout } from "@radix-ui/themes"
import { signIn } from "next-auth/react"
import { CircleX } from "lucide-react"

export default function HomePage() {
	const [usePassword, setUsePassword] = useState(false)
	const [password, setPassword] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	}
	const onClick = async () => {
		if (!password) {
			return
		}
		try {
			console.log(`Signing in with password: ${password}`)
			const request = await signIn("credentials", {
				password,
				redirect: false,
			})
			if (request?.error) {
				setErrorMessage(
					request.error === "CredentialsSignin"
						? "You have entered an invalid code."
						: "An unknown error has occurred.",
				)
				setTimeout(() => {
					setErrorMessage("")
				}, 5000)
			}
			if (request?.ok) {
				window.location.href = "/reader"
			}
		} catch (e) {
			console.log(e)
		}
	}
	return (
		<div className="container flex flex-col items-center justify-center gap-6 px-4 py-16 text-center lg:gap-12 ">
			<h1 className="text-5xl font-bold tracking-wide text-white sm:text-[5rem]">
				Storytime with Akasha
			</h1>
			<h2 className="flex px-12 text-2xl font-medium text-white lg:text-4xl">
				Interactive AI-powered transmedia storytelling demo
			</h2>
			<div className="flex justify-center gap-2">
				<Button
					size="3"
					onClick={() =>
						signIn("discord", { callbackUrl: "/reader" })
					}
				>
					Sign in with Discord
				</Button>
				<Button size="3" onClick={() => setUsePassword(!usePassword)}>
					Sign in with a code
				</Button>
			</div>
			<div className="h-[300px] w-screen">
				<div
					className={
						usePassword ? "grid justify-center gap-2" : "hidden"
					}
				>
					<input
						className="selection:color-white mt-1 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] bg-blackA2 px-[10px] text-center text-[15px] leading-none text-white shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 focus:shadow-[0_0_0_2px_black]"
						type="password"
						id="password"
						onChange={onChange}
						value={password}
					/>
					<Button size="3" onClick={onClick}>
						Sign in
					</Button>
					<div className="container min-w-[390px]">
						<div
							className={
								errorMessage ? "flex justify-center" : "hidden"
							}
						>
							<Callout.Root
								size="1"
								color="amber"
								className="flex w-max text-center"
							>
								<Callout.Icon>
									<CircleX />
								</Callout.Icon>
								<Callout.Text>{errorMessage}</Callout.Text>
							</Callout.Root>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
