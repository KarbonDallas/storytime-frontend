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
	urls: Array<string>
}
export interface ErrorPayload {
	error: string
}

export const storyGenres = {
	magic: "Magical Wizardry",
	scifi: "Science Fiction",
	swords: "Sword & Sorcery",
	romance: "Romance Novel",
	drama: "Classic Drama",
	apocalypse: "Apocalypse Now",
	hollywood: "Hollywood Action",
	singularity: "The Singularity",
}
