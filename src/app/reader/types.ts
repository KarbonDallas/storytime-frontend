export interface ServerMessage {
	type: "state" | "text" | "audio" | "image" | "error"
	payload:
		| StatePayload
		| TextPayload
		| AudioPayload
		| ImagePayload
		| ErrorPayload
}
export interface StatePayload {
	streaming_audio: boolean
	streaming_text: boolean
	waiting_for_images: boolean
}
export interface TextPayload {
	delta: string
}
export interface AudioPayload {
	chunk: string
}
export interface ImagePayload {
	urls: string[]
}
export interface ErrorPayload {
	error: string
}
