import { useAuthContext } from "@/context/AuthContext";
import React from "react";
import AdminDash from "./AdminDash";
import StudentDash from "./StudentDash";

export default function Index() {
	const { user } = useAuthContext();

	if (!user) {
		return <div>No User</div>;
	}

	if (user.isAdmin) {
		return <AdminDash user={user} />;
	}

	return <StudentDash user={user} />;
}
