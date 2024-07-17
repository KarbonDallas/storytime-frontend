"use client"

import type { DefaultSession } from "next-auth"
import type { PropsWithChildren } from "react"
import React, { useState, useEffect } from "react"
import useWebSocket, { ReadyState } from "react-use-websocket"
import { storyGenres } from "@/app/reader/types"
import ReaderToolbar from "@/app/components/toolbar/toolbar"
import PromptInput from "@/app/components/prompt-input"
import ImageViewer from "@/app/components/image-viewer"
import { Badge, Callout, Spinner } from "@radix-ui/themes"
import type {
	ServerMessage,
	StatePayload,
	TextPayload,
	AudioPayload,
	ImagePayload,
	ErrorPayload,
} from "@/app/reader/types"
import { Frown } from "lucide-react"

const WEBSOCK_URL = process.env.NEXT_PUBLIC_WEBSOCK_URL ?? "ws://localhost:3001"
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
const defaultImages = {
	urls: [],
}
const genreList = storyGenres
export default function ReaderViewport(props: ReaderViewportProps) {
	// TODO: State management could use some refactoring
	const user = props.session?.user?.name ?? "Anonymous"
	const defaultPrompt = `${user} was a wizard who lived in a magical forest.`
	const [story, setStory] = useState("")
	const [genre, setGenre] = useState("magic")
	const [images, setImages] = useState<ImagePayload>(defaultImages)
	const [prompt, setPrompt] = useState(defaultPrompt)
	const [isStreaming, setIsStreaming] = useState(false)
	const [userHasTyped, setUserHasTyped] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const [showCarousel, setShowCarousel] = useState(false)
	const [connectionEstablished, setConnectionEstablished] = useState(false)
	const { sendJsonMessage, lastMessage, readyState } = useWebSocket(
		WEBSOCK_URL,
		{
			onOpen: () => {
				console.log("Connection opened")
				setConnectionEstablished(true)
			},
			onClose: () => {
				console.log("Connection closed")
			},
			onError: () => {
				if (connectionEstablished) {
					setConnectionEstablished(false)
					setIsStreaming(false)
					setErrorMessage("Disconnected from story machine.")
					clearError()
				}
			},
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
	const clearError = () => {
		setTimeout(() => {
			setErrorMessage("")
		}, 5000)
	}
	const onGenreChange = (genre: string) => {
		setGenre(genre)
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
		setImages(defaultImages)
		setShowCarousel(false)
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
			if (data.type === "text") {
				const payload = data.payload as TextPayload
				setStory((prev) => prev + payload.delta)
				// if (!showCarousel) setShowCarousel(true)
			}
			if (data.type === "state") {
				const payload = data.payload as StatePayload
			}
			if (data.type === "image") {
				const payload = data.payload as ImagePayload
				if (payload.urls.length > 0) {
					setShowCarousel(true)
				}
				setImages(payload)
				setIsStreaming(false)
			}
			if (data.type === "error") {
				const payload = data.payload as ErrorPayload
				setIsStreaming(false)
				setPrompt(defaultPrompt)
				setUserHasTyped(false)
				setErrorMessage(payload.error ?? "An unknown error occurred.")
				clearError()
			}
		}
	}, [lastMessage, defaultPrompt])

	return (
		<div className="flex h-max flex-col items-center">
			<ReaderToolbar
				disabled={isStreaming}
				onGenreChange={onGenreChange}
				onGenreSelect={onGenreSelect}
			/>
			<div className="my-2 flex w-max grid-cols-[1fr_1fr] items-center justify-center gap-2 text-center sm:w-screen">
				<div className="flex w-48">
					<Badge color={badgeColor()}>
						SOCKET: {connectionStatus}
					</Badge>
				</div>
				<div className="flex w-48">
					<Badge color="teal" className="sm:opacity-0">
						GENRE: {genreList[genre as keyof typeof genreList]}
					</Badge>
				</div>
			</div>
			<div className={errorMessage ? "opacity-90" : "opacity-0"}>
				<Callout.Root size="1" color="orange">
					<Callout.Icon>
						<Frown />
					</Callout.Icon>
					<Callout.Text>{errorMessage}</Callout.Text>
				</Callout.Root>
			</div>
			<PromptInput onChange={onPromptUpdate} value={prompt} />
			<div className="w-max items-center justify-center">
				<div className="w-[500px] whitespace-pre-wrap px-12 pb-20 pt-4 text-justify font-medium">
					{story}
				</div>

				<div
					className={`flex h-[320px] items-center justify-center pb-20 ${showCarousel ? "block" : "hidden"}`}
				>
					<ImageViewer images={images.urls} />
				</div>
			</div>
			<div
				className={`grid items-center justify-center pb-20 ${isStreaming ? "opacity-90" : "opacity-0"}`}
			>
				<Spinner size="3" className="mt-3" />
			</div>
		</div>
	)
}
