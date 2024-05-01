import Image from "next/image"

import type { PropsWithChildren } from "react"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

type ImageViewerProps = {
	images: string[]
} & PropsWithChildren

const ImageCarousel = (urls: string[]) => {
	return (
		<Carousel className="w-full max-w-xs">
			<CarouselContent>
				{urls.map((url, index) => (
					<CarouselItem key={index}>
						<div>
							<Card className="rounded-none">
								<CardContent className="flex aspect-square items-center justify-center p-0">
									<Image
										src={url}
										alt={`Image ${index}`}
										width={500}
										height={500}
									/>
								</CardContent>
							</Card>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	)
}
export default function ImageViewer(props: ImageViewerProps) {
	if (props.images.length === 0) {
		return ImageCarousel([])
	}
	return ImageCarousel(props.images)
}
