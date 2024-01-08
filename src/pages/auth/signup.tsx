import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import firebase_app from "@/lib/firebase";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "sonner";

const formSchema = z
	.object({
		name: z.string().min(2).max(50),
		email: z.string().email(),
		password: z.string().min(2),
		confirmPassword: z.string().min(2),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

export default function SignUp() {
	const router = useRouter();
	const { setUser } = useAuthContext();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		createUserWithEmailAndPassword(auth, values.email, values.password)
			.then(async (userCredential) => {
				const user = userCredential.user;

				await addDoc(collection(db, "users"), {
					uid: user.uid,
					name: values.name,
					email: user.email,
					isAdmin: false,
				});

				setUser({
					uid: user.uid,
					name: values.name,
					email: values.email,
					isAdmin: false,
				});

				toast("Account created");

				router.push("/");
			})
			.catch((error) => {
				console.log(error);

				return toast("Something went wrong", {
					description: "Check console for more details.",
				});
			});
	}
	return (
		<div className="px-4 py-5 space-y-5">
			<h1 className="text-3xl font-medium">Sign Up</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="Ali Bin Abu" {...field} />
								</FormControl>
								<FormDescription>This is your public display name.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="alie@email.com" {...field} />
								</FormControl>
								<FormDescription>This is your account email.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								<FormDescription>This is your account password.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Retype Password</FormLabel>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								<FormDescription>This is your account password.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
}
