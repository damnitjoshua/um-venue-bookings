import { Button } from "@/components/ui/button";
import firebase_app from "@/lib/firebase";
import { User } from "@/types/auth";
import { DocumentData, QuerySnapshot, collection, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const db = getFirestore(firebase_app);

export default function AdminDash(props: { user: User }) {
	const { user } = props;
	const [bookings, setBookings] = useState<Bookings[]>();
	const [approvedBookings, setApprovedBookings] = useState<Bookings[]>();

	useEffect(() => {
		const bookingsRef = collection(db, "bookings");
		const q = query(bookingsRef);

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const bookingArr: Bookings[] = [];
			const approvedBookingArr: Bookings[] = [];
			querySnapshot.forEach((doc) => {
				const data: Bookings = doc.data() as Bookings;
				data.id = doc.id;

				if (data.isApproved) {
					approvedBookingArr.push(data);
				} else {
					bookingArr.push(data);
				}
			});

			setBookings(bookingArr);
			setApprovedBookings(approvedBookingArr);
		});

		return () => unsubscribe();
	}, []);

	return (
		<div className="px-4 py-4 space-y-4">
			<section className="border rounded-lg p-4">
				<p className="text-2xl">
					Welcome, <b>{user.name}</b>
				</p>
				<p>{user.email}</p>
			</section>
			<section className="space-y-2">
				<h1 className="text-xl font-medium">Pending Bookings</h1>
				<div className="divide-y-2 border rounded-lg px-2">
					{bookings && bookings.length != 0 ? (
						bookings.map((value: Bookings, index: number) => (
							<div key={index} className="flex flex-row justify-between items-center py-2">
								<div>
									<p>{value.venueID}</p>
									<p className="text-sm text-gray-500">Booked by: {value.name}</p>
									<p className="text-sm text-gray-500">Reason: {value.usage}</p>
								</div>
								<div className="space-x-2">
									<Button>Approve</Button>
									<Button variant={"destructive"}>Reject</Button>
								</div>
							</div>
						))
					) : (
						<div className="py-2 text-center">None</div>
					)}
				</div>
				<h1 className="text-xl font-medium pt-2">Approved Bookings</h1>
				<div className="divide-y-2 border rounded-lg px-2">
					{approvedBookings && approvedBookings.length != 0 ? (
						approvedBookings.map((value: Bookings, index: number) => (
							<div key={index} className="flex flex-row justify-between items-center py-2">
								<div>
									<p>{value.venueID}</p>
									<p className="text-sm text-gray-500">Booked by: {value.name}</p>
									<p className="text-sm text-gray-500">Reason: {value.usage}</p>
								</div>
								<div className="space-x-2">
									<Button>Approve</Button>
									<Button variant={"destructive"}>Reject</Button>
								</div>
							</div>
						))
					) : (
						<div className="py-2 text-center">None</div>
					)}
				</div>
			</section>
		</div>
	);
}
