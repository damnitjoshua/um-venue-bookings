import { User } from "@/types/auth";
import React from "react";

export default function StudentDash(props: { user: User }) {
	const { user } = props;
	return (
		<div className="px-4 py-4">
			<section className="border rounded-lg p-4">
				<p className="text-2xl">
					Welcome, <b>{user.name}</b>
				</p>
				<p>{user.email}</p>
			</section>
		</div>
	);
}
