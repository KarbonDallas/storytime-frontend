import { Root } from "@radix-ui/react-label"
import type { PropsWithChildren } from "react"

type PromptLabelProps = {
	value: string
	onChange: (prompt: string) => void
} & PropsWithChildren

export default function PromptLabel(props: PromptLabelProps) {
	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.onChange(e.target.value)
	}
	return (
		<div className="m-6 flex flex-wrap items-center gap-[15px] px-6">
			<Root className="leading-1 text-sm font-bold" htmlFor="promptInput">
				Prompt &gt;
			</Root>
			<input
				className="selection:color-white inline-flex h-[35px] w-[420px] appearance-none items-center justify-center rounded-[4px] bg-blackA2 px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 focus:shadow-[0_0_0_2px_black]"
				type="text"
				id="promptInput"
				onChange={changeHandler}
				value={props.value}
			/>
		</div>
	)
}
