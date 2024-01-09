import React, { FC, ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/lib/firebase";
import { collection, getDocs, getFirestore, query, where, QuerySnapshot, DocumentData, onSnapshot } from "firebase/firestore";

const db = getFirestore(firebase_app);

interface BookingContextProps {
	bookings: Bookings[] | null;
	setBookings: React.Dispatch<React.SetStateAction<Bookings[] | null>>;
}

const defaultBookingContextValue: BookingContextProps = {
	bookings: null,
	setBookings: () => {},
};

export const BookingContext = React.createContext<BookingContextProps>(defaultBookingContextValue);

export const useBookingContext = () => React.useContext(BookingContext);

export const BookingContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [bookings, setBookings] = useState<Bookings[] | null>(null);

	useEffect(() => {
		const bookingsRef = collection(db, "bookings");
		const q = query(bookingsRef);

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const venuesArr: Bookings[] = [];
			querySnapshot.forEach((doc) => {
				const data: Bookings = doc.data() as Bookings;
				data.id = doc.id;

				venuesArr.push(data);
			});

			setBookings(venuesArr);
		});

		return () => unsubscribe();
	}, []);

	return <BookingContext.Provider value={{ bookings, setBookings }}>{children}</BookingContext.Provider>;
};
