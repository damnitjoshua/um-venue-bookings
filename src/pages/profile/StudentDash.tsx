import { Button } from "@/components/ui/button";
import { useBookingContext } from "@/context/BookingContext";
import { useVenueContext } from "@/context/VenueContext";
import { User } from "@/types/auth";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


export default function StudentDash(props: { user: User }) {
	const { user } = props;
	const { bookings } = useBookingContext();
	const { venues } = useVenueContext();
	const [userBookings, setUserBookings] = useState<Bookings[]>([]);

	useEffect(() => {
		const userBookingsArr = bookings?.filter((booking) => booking.uid === user.uid);

		setUserBookings(userBookingsArr ?? []);
	}, [user, bookings]);

	return (
		<div className="px-4 py-4 space-y-2">
			<section className="border rounded-lg p-4">
				<p className="text-2xl">
					Welcome, <b>{user.name}</b>
				</p>
				<p>{user.email}</p>
			</section>
			<section>
				<div className="max-w-full border rounded-lg overflow-clip">
					<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
						{/* <caption className="p-8 text-lg font-semibold text-left rtl:text-right text-gray-900 dark:text-white">
							Booking Status
							<p className="mt-4 text-sm font-normal text-gray-500 dark:text-gray-400">
								This list shows your current and past booking status and information.
							</p>
						</caption> */}
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="px-6 py-3">
									No.
								</th>
								<th scope="col" className="px-6 py-3">
									Date
								</th>
								<th scope="col" className="px-6 py-3">
									Venue name
								</th>
								<th scope="col" className="px-6 py-3">
									Start Time (in Hours)
								</th>
								<th scope="col" className="px-6 py-3">
									End Time (in Hours)
								</th>
								<th scope="col" className="px-6 py-3">
									Guest Name
								</th>
								<th scope="col" className="px-6 py-3">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{userBookings.map((booking, index) => (
								<tr key={index}>
									<td className="px-6 py-4 whitespace-nowrap">{index + 1}.</td>
									<td className="px-6 py-4 whitespace-nowrap">{moment((booking.date as any).toDate()).format("YYYY-MM-DD")}</td>
									<td className="px-6 py-4 whitespace-nowrap">{venues!.find((venue) => venue.id === booking.venueID)?.name}</td>
									<td className="px-6 py-4 whitespace-nowrap">{booking.startTime}</td>
									<td className="px-6 py-4 whitespace-nowrap">{booking.endTime}</td>
									{/* Add your logic to determine and display the status */}
									<td className="px-6 py-4 whitespace-nowrap">{booking.name}</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<Dialog>
											<DialogTrigger>Check Booking Info</DialogTrigger>
											<DialogContent>
												<DialogHeader>
													<DialogTitle>Booking Info</DialogTitle>
													<DialogDescription>{booking.usage}</DialogDescription>
												</DialogHeader>
											</DialogContent>
										</Dialog>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</div>
	);
}
