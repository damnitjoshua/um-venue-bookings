import React, { FC, ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/lib/firebase";
import { User } from "@/types/auth";
import { collection, getDocs, getFirestore, query, where, QuerySnapshot, DocumentData, onSnapshot } from "firebase/firestore";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

interface VenueContextProps {
	venues: Venues[] | null;
	setVenues: React.Dispatch<React.SetStateAction<Venues[] | null>>;
}

const defaultAuthContextValue: VenueContextProps = {
	venues: null,
	setVenues: () => {},
};

export const VenueContext = React.createContext<VenueContextProps>(defaultAuthContextValue);

export const useVenueContext = () => React.useContext(VenueContext);

export const VenueContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [venues, setVenues] = useState<Venues[] | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const venuesRef = collection(db, "venues");
		const q = query(venuesRef);

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const venuesArr: Venues[] = [];
			querySnapshot.forEach((doc) => {
				const data: Venues = doc.data() as Venues;
				data.id = doc.id;
				data.link = `/venue/${doc.id}`;

				venuesArr.push(data);
			});

			setVenues(venuesArr);
		});

		return () => unsubscribe();
	}, []);

	return <VenueContext.Provider value={{ venues, setVenues }}>{children}</VenueContext.Provider>;
};
