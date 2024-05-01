"use client"

import { type PropsWithChildren, useState } from "react"
import { Root, ToggleGroup, Separator, Link } from "@radix-ui/react-toolbar"
import { Button } from "@radix-ui/themes"

import { StoryGenreButton } from "./story-genre"
import { storyGenres } from "@/app/reader/types"
type ReaderToolbarProps = {
	disabled?: boolean
	onGenreSelect: (genre: string) => void
	onGenreChange: (genre: string) => void
} & PropsWithChildren

export default function ReaderToolbar(props: ReaderToolbarProps) {
	const [genre, setGenre] = useState("magic")
	const changeHandler = (e: React.MouseEvent) => {
		setGenre(e.currentTarget.id)
		props.onGenreChange(e.currentTarget.id)
	}
	const selectHandler = () => {
		props.onGenreSelect(genre)
	}
	return (
		<Root
			className="mt-4 flex min-w-max rounded-md bg-white p-[10px] shadow-[0_2px_10px] shadow-blackA4"
			aria-label="Formatting options"
		>
			<ToggleGroup
				type="single"
				defaultValue="magic"
				aria-label="Story Genre Selector"
				className="flex gap-0 sm:gap-2 lg:gap-3"
			>
				{Object.keys(storyGenres).map((genre) => (
					<StoryGenreButton
						disabled={props.disabled}
						onClick={changeHandler}
						id={genre}
						key={genre}
					/>
				))}
			</ToggleGroup>
			<Separator className="mx-[10px] w-[1px] bg-mauve6" />
			<Link
				className="ml-0.5 mr-3 mt-0.5 hidden h-[32px] w-[120px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-transparent bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:cursor-pointer hover:bg-transparent hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 sm:inline-flex"
				href="#"
			>
				{storyGenres[genre as keyof typeof storyGenres]}
			</Link>
			<Separator className="mx-[10px] hidden w-[1px] bg-mauve6 sm:inline-flex" />
			<Button className="ml-auto" onClick={selectHandler}>
				Story Time
			</Button>
		</Root>
	)
}
