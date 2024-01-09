import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import firebase_app from "@/lib/firebase";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(2),
});

const auth = getAuth(firebase_app);

export default function SignIn() {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		await signInWithEmailAndPassword(auth, values.email, values.password)
			.then(() => {
				toast("Signed In");

				router.push("/");
			})
			.catch((error) => {
				console.log(error);
				toast("Something went wrong", {
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
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="alie@email.com" {...field} />
								</FormControl>
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
									<Input type="password" placeholder="Password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="space-x-2">
						<Button type="submit" disabled={form.formState.isLoading}>
							{form.formState.isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
							Submit
						</Button>
						<Button variant="outline" asChild>
							<Link href="/auth/signup">Go To Sign Up</Link>
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
