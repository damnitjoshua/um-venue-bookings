import { Firestore, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { Account, AuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import firebase_app from "@/lib/firebase";
import { User } from "@/types/auth";

const db = getFirestore(firebase_app);

export const authOptions = (req: NextApiRequest, _res: NextApiResponse) => {
	return {
		// Configure one or more authentication providers
		providers: [
			CredentialsProvider({
				// The name to display on the sign in form (e.g. "Sign in with...")
				name: "Credentials",
				// `credentials` is used to generate a form on the sign in page.
				// You can specify which fields should be submitted, by adding keys to the `credentials` object.
				// e.g. domain, username, password, 2FA token, etc.
				// You can pass any HTML attribute to the <input> tag through the object.
				credentials: {
					email: { label: "Email", type: "email", placeholder: "email" },
					password: { label: "Password", type: "password" },
				},
				async authorize(credentials, req) {
					// Add logic here to look up the user from the credentials supplied
					const usersRef = collection(db, "users");
					// Create a query against the collection.
					const q = query(usersRef, where("email", "==", credentials?.email));
					const querySnapshot = await getDocs(q);
					const users: any[] = [];
					querySnapshot.forEach((doc) => {
						users.push(doc.data());
					});
          

					const user = users[0];

					if (user) {
						// Any object returned will be saved in `user` property of the JWT
						return user;
					} else {
						// If you return null then an error will be displayed advising the user to check their details.
						return null;

						// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
					}
				},
			}),
			// ...add more providers here
		],
		callbacks: {
			async jwt({ token, account }: { token: JWT; account: Account }) {
				// Persist the OAuth access_token to the token right after signin
				if (account) {
					token.accessToken = account.access_token;
        }

				console.log("jwt token", token);
				console.log("jwt account", account);

				return token;
			},
			async session({ session, token }: { session: Session; token: JWT }) {
				// Send properties to the client, like an access_token from a provider.
				// session.accessToken = token.accessToken;

				if (!session) {
					throw {
						message: "Session does not exists",
						status: 500,
					};
				}

				console.log("sess", session);
				console.log("token", token);

				session.userDetails = {
					uid: session.user.uid,
					name: session.user.name,
					email: session.user.email,
					isAdmin: session.user.isAdmin,
				};

				return session;
			},
		},
		// pages: {
		// 	signIn: "/auth/signin",
		// },
	};
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	return (await NextAuth(req, res, authOptions(req, res) as AuthOptions)) as typeof NextAuth;
}
function FirestoreAdapter(db: Firestore) {
	throw new Error("Function not implemented.");
}
