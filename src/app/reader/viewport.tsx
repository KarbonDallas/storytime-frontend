"use client"

import type { DefaultSession } from "next-auth"
import type { PropsWithChildren } from "react"
import React, { useState, useEffect } from "react"
import useWebSocket, { ReadyState } from "react-use-websocket"
import type { storyGenres } from "@/app/components/toolbar/story-genre"
import ReaderToolbar from "@/app/components/toolbar/toolbar"
import PromptInput from "@/app/components/prompt/input"
import { Badge, Spinner } from "@radix-ui/themes"

const WEBSOCK_URL = process.env.NEXT_PUBLIC_WEBSOCK_URL ?? "ws://localhost:3001"
import type {
	ServerMessage,
	StatePayload,
	TextPayload,
	AudioPayload,
	ImagePayload,
	ErrorPayload,
} from "@/app/reader/types"

type ReaderViewportProps = {
	session: DefaultSession
} & PropsWithChildren

const defaultPrompts = {
	magic: "%user% was a wizard who lived in a magical forest.",
	scifi: "In a galaxy far, far away, %user% is a space explorer.",
	swords: "Knight %user% is on a quest to save the kingdom.",
	romance: "%user% falls in love with a mysterious stranger.",
	drama: "In a small town, %user% uncovers a dark secret.",
	apocalypse: "The world has ended, this is how %user% died.",
	hollywood: "The world of fame and fortune awaits %user%.",
	singularity: "Will %user% decide to merge with the infinite AI?",
}
export default function ReaderViewport(props: ReaderViewportProps) {
	const user = props.session?.user?.name ?? "Unknown User"
	const defaultPrompt = `${user} was a wizard who lived in a magical forest.`
	const [prompt, setPrompt] = useState(defaultPrompt)
	const [isStreaming, setIsStreaming] = useState(false)
	const [userHasTyped, setUserHasTyped] = useState(false)
	const [story, setStory] = useState("")
	const { sendJsonMessage, lastMessage, readyState } = useWebSocket(
		WEBSOCK_URL,
		{
			onOpen: () => console.log("Connection opened"),
			onClose: () => console.log("Connection closed"),
			shouldReconnect: (_closeEvent) => true,
		},
	)
	const connectionStatus = {
		[ReadyState.CONNECTING]: "connecting...",
		[ReadyState.OPEN]: "connected",
		[ReadyState.CLOSING]: "closing",
		[ReadyState.CLOSED]: "closed",
		[ReadyState.UNINSTANTIATED]: "uninitialized...",
	}[readyState]
	const onGenreChange = (genre: string) => {
		if (userHasTyped) return
		setPrompt(
			defaultPrompts[genre as keyof typeof storyGenres].replace(
				"%user%",
				user,
			),
		)
	}
	const onGenreSelect = (genre: string) => {
		console.log(`Story selected: ${genre}`)
		if (isStreaming) return
		setStory("")
		setIsStreaming(true)
		sendJsonMessage({ type: "request", payload: { genre, prompt } })
	}
	const onPromptUpdate = (value: string) => {
		setUserHasTyped(true)
		setPrompt(value)
	}
	const badgeColor = () => {
		return readyState === ReadyState.OPEN
			? "lime"
			: readyState === ReadyState.CLOSED
				? "red"
				: "orange"
	}
	useEffect(() => {
		if (lastMessage !== null) {
			if (typeof lastMessage.data !== "string") return
			const data = JSON.parse(lastMessage.data) as ServerMessage
			console.log(data)
			if (data.type === "text") {
				const payload = data.payload as TextPayload
				setStory((prev) => prev + payload.delta)
			}
			if (data.type === "state") {
				const payload = data.payload as StatePayload
				const maybeStreaming =
					payload.streaming_text === true ||
					payload.streaming_audio === true
				setIsStreaming(maybeStreaming)
			}
		}
	}, [lastMessage])

	return (
		<div className="flex h-max flex-col items-center">
			<ReaderToolbar
				disabled={isStreaming}
				onGenreChange={onGenreChange}
				onGenreSelect={onGenreSelect}
			/>
			<div className="flex p-2">
				<Badge color={badgeColor()}>
					SOCKET_STATUS: {connectionStatus}
				</Badge>
			</div>
			<div className={isStreaming ? "opacity-80" : "opacity-0"}>
				<Spinner size="3" className="mt-3" />
			</div>
			<PromptInput onChange={onPromptUpdate} defaultPrompt={prompt} />
			<div className="w-max justify-center">
				<div className="w-[500px] whitespace-pre-wrap px-12 pb-44 pt-2 text-justify font-medium">
					{story}
				</div>
			</div>
		</div>
	)
}
