import Link from "next/link";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "sonner";
import { useRouter } from "next/router";

const auth = getAuth();

type navLinkType = {
	title: string;
	link: string;
};

const navLinks: navLinkType[] = [];

export default function MainHeader() {
	const { user } = useAuthContext();
	const router = useRouter();

	async function onSignOut() {
		signOut(auth).catch((error) => {
			console.log(error);
			toast("Something went wrong", {
				description: "Check console for more details.",
			});
		});

		toast("Signed Out");
		router.push("/");
	}

	return (
		<header className="py-4 border-b flex flex-row items-center justify-between gap-2 px-4">
			<Link href="/" className="hover:underline font-bold">
				UM Venue Bookings
			</Link>
			<nav className="space-x-4">
				{user && (
					<Link href="/profile" className="hover:underline">
						Profile
					</Link>
				)}
				{user && (
					<button onClick={() => onSignOut()} className="hover:underline">
						Sign Out
					</button>
				)}
				{!user && (
					<Link href="/auth/signin" className="hover:underline">
						Sign In
					</Link>
				)}
				{navLinks.map((value: navLinkType, index: number) => (
					<Link key={index} href={value.link} className="hover:underline">
						{value.title}
					</Link>
				))}
			</nav>
		</header>
	);
}
