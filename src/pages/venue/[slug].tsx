import { Button } from "@/components/ui/button";
import { useVenueContext } from "@/context/VenueContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SubmitBooking from "../../components/SubmitBooking";
import { Separator } from "@/components/ui/separator";

const details = [
	{
		icon: (
			<path
				fill="currentColor"
				d="M12 19.35q3.05-2.8 4.525-5.087T18 10.2q0-2.725-1.737-4.462T12 4Q9.475 4 7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35m0 1.975q-.35 0-.7-.125t-.625-.375Q9.05 19.325 7.8 17.9t-2.087-2.762q-.838-1.338-1.275-2.575T4 10.2q0-3.75 2.413-5.975T12 2q3.175 0 5.588 2.225T20 10.2q0 1.125-.437 2.363t-1.275 2.575Q17.45 16.475 16.2 17.9t-2.875 2.925q-.275.25-.625.375t-.7.125M12 12q.825 0 1.413-.587T14 10q0-.825-.587-1.412T12 8q-.825 0-1.412.588T10 10q0 .825.588 1.413T12 12"></path>
		),
		detail: `(The Cube Room) Level 2, Block B Faculty of Computer Science & Information Technology (The Cube Room) Level 2, Block B Faculty of Computer Science & Information Technology`,
		alternateDetail: ` University Malaya Wilayah Persekutuan, Kolej Kediaman Kinabalu, Wilayah Persekutuan`,
	},
	{
		icon: (
			<path
				fill="currentColor"
				d="M12 19.35q3.05-2.8 4.525-5.087T18 10.2q0-2.725-1.737-4.462T12 4Q9.475 4 7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35m0 1.975q-.35 0-.7-.125t-.625-.375Q9.05 19.325 7.8 17.9t-2.087-2.762q-.838-1.338-1.275-2.575T4 10.2q0-3.75 2.413-5.975T12 2q3.175 0 5.588 2.225T20 10.2q0 1.125-.437 2.363t-1.275 2.575Q17.45 16.475 16.2 17.9t-2.875 2.925q-.275.25-.625.375t-.7.125M12 12q.825 0 1.413-.587T14 10q0-.825-.587-1.412T12 8q-.825 0-1.412.588T10 10q0 .825.588 1.413T12 12"></path>
		),
		detail: `Category : Discussion`,
		alternateDetail: `Category : Multi-purpose`,
	},
	{
		icon: (
			<path
				fill="currentColor"
				d="M12 19.35q3.05-2.8 4.525-5.087T18 10.2q0-2.725-1.737-4.462T12 4Q9.475 4 7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35m0 1.975q-.35 0-.7-.125t-.625-.375Q9.05 19.325 7.8 17.9t-2.087-2.762q-.838-1.338-1.275-2.575T4 10.2q0-3.75 2.413-5.975T12 2q3.175 0 5.588 2.225T20 10.2q0 1.125-.437 2.363t-1.275 2.575Q17.45 16.475 16.2 17.9t-2.875 2.925q-.275.25-.625.375t-.7.125M12 12q.825 0 1.413-.587T14 10q0-.825-.587-1.412T12 8q-.825 0-1.412.588T10 10q0 .825.588 1.413T12 12"></path>
		),
		detail: `Max. Capacity : 10 person`,
		alternateDetail: `Capacity : 20-45 person`,
	},
	{
		icon: (
			<path
				fill="currentColor"
				d="M12 19.35q3.05-2.8 4.525-5.087T18 10.2q0-2.725-1.737-4.462T12 4Q9.475 4 7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35m0 1.975q-.35 0-.7-.125t-.625-.375Q9.05 19.325 7.8 17.9t-2.087-2.762q-.838-1.338-1.275-2.575T4 10.2q0-3.75 2.413-5.975T12 2q3.175 0 5.588 2.225T20 10.2q0 1.125-.437 2.363t-1.275 2.575Q17.45 16.475 16.2 17.9t-2.875 2.925q-.275.25-.625.375t-.7.125M12 12q.825 0 1.413-.587T14 10q0-.825-.587-1.412T12 8q-.825 0-1.412.588T10 10q0 .825.588 1.413T12 12"></path>
		),
		detail: `Facilities : Sofas, discussion rooms & pantry`,
		alternateDetail: `Facilities : Open area, multiple facilities is available (need to contact first).`,
	},
];

export default function Index() {
	const router = useRouter();
	const venueId: string = router.query.slug as string;
	const { venues } = useVenueContext();
	const [venueExists, setVenueExists] = useState<Venues>();

	useEffect(() => {
		const foundVenue = venues?.find((venue) => venue.id === venueId);

		setVenueExists(foundVenue);
		console.log("s");
	}, [venueId, venues]);

	if (!venueExists) {
		return (
			<div className="p-4">
				<div className="border rounded-lg p-4 text-center space-y-4">
					<h1 className="text-3xl">Venue not found</h1>
					<Button asChild>
						<Link href={"/"}>Go back to homepage</Link>
					</Button>
				</div>
			</div>
		);
  }

  return (
		<div>
			{/* venue detials  */}
			<section className="flex flex-col md:flex-row items-center gap-4 px-4 py-10">
				<div className="h-[15em] aspect-video border relative">
					<Image src={venueExists.image} alt="image" width={1000} height={1000} className="absolute object-cover h-full" />
				</div>
				<div>
					<h2 className="pb-4 text-2xl font-bold text-blue-900">{venueExists.name}</h2>
					<div className="flex flex-col gap-2">
						{details.map((value, index) => (
							<div key={index} className="flex flex-row items-center gap-2 text-sm text-gray-500">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-[1.5rem] aspect-square" viewBox="0 0 24 24">
									{value.icon}
								</svg>
								<p className="w-full">{1 <= 4 ? value.detail : value.alternateDetail}</p>
							</div>
						))}
					</div>
				</div>
			</section>
			<Separator />
			<section className="px-4 py-20">
				<h2 className="text-xl font-medium text-blue-900">Booking</h2>
				<p className="text-sm">Only for FSKTM Students, Limit to maximum 2 hours per booking for each group of students</p>
				<div className="flex flex-row justify-between gap-4 py-10">
					<SubmitBooking venueId={venueId} />
					{/* <div className="w-1/2 border aspect-video"></div> */}
				</div>
			</section>
		</div>
	);
}
