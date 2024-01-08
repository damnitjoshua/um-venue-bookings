import React, { FC, ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/lib/firebase";
import { User } from "@/types/auth";
import { collection, getDocs, getFirestore, query, where, QuerySnapshot, DocumentData } from "firebase/firestore";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

interface AuthContextProps {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const defaultAuthContextValue: AuthContextProps = {
	user: null,
	setUser: () => {},
};

export const AuthContext = React.createContext<AuthContextProps>(defaultAuthContextValue);

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(
			auth,
			async (authUser) => {
				if (authUser) {
					const usersRef = collection(db, "users");
					const q = query(usersRef, where("email", "==", authUser.email));
					const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
					const users: any[] = [];
					querySnapshot.forEach((doc) => {
						users.push(doc.data());
					});

					const accountDetails: User = users[0];
					setUser(accountDetails);
				} else {
					setUser(null);
				}
				setLoading(false);
			},
			(error) => {
				console.error("Auth state error:", error);
				setLoading(false);
			}
		);

		return () => unsubscribe();
	}, []);

	return <AuthContext.Provider value={{ user, setUser }}>{loading ? <div>Loading...</div> : children}</AuthContext.Provider>;
};
