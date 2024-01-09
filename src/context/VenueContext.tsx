import React, { FC, ReactNode, useEffect, useState } from "react";
import firebase_app from "@/lib/firebase";
import { collection, getDocs, getFirestore, query, where, QuerySnapshot, DocumentData, onSnapshot } from "firebase/firestore";

const db = getFirestore(firebase_app);

interface VenueContextProps {
	venues: Venues[] | null;
	setVenues: React.Dispatch<React.SetStateAction<Venues[] | null>>;
}

const defaultVenueContextValue: VenueContextProps = {
	venues: null,
	setVenues: () => {},
};

export const VenueContext = React.createContext<VenueContextProps>(defaultVenueContextValue);

export const useVenueContext = () => React.useContext(VenueContext);

export const VenueContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [venues, setVenues] = useState<Venues[] | null>(null);

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
