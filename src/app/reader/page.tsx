"use server"

import { getServerAuthSession } from "@/server/auth"
import { redirect } from "next/navigation"
import ReaderViewport from "./viewport"

export default async function ReaderPage() {
	const session = await getServerAuthSession()
	if (!session) {
		return redirect("/")
	}
	return (
		<div>
			<ReaderViewport session={session} />
		</div>
	)
}
