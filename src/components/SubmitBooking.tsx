import React, { useState } from "react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { toast } from "sonner";
import moment from "moment";
import { useAuthContext } from "@/context/AuthContext";
import firebase_app from "@/lib/firebase";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const db = getFirestore(firebase_app);

const formSchema = z.object({
	name: z.string(),
	date: z.string(),
	startTime: z.string(),
	endTime: z.string(),
	usage: z.string().min(2),
});

export default function SubmitBooking(props: { venueId: string }) {
	const router = useRouter();
	const { user } = useAuthContext();
	const { venueId } = props;
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			var x = moment(values.startTime, "HH:mm");
			var y = moment(values.endTime, "HH:mm");
			var duration = moment.duration(y.diff(x));
			const hours = duration.hours();

			if (hours < 0) {
				return toast("End Time must end after Start Time");
			}

			if (hours > 2) {
				return toast("Must be less than 2 hours");
			}

			if (!user) {
				return toast("Please sign in");
			}

			await addDoc(collection(db, "bookings"), {
				name: values.name,
				email: user.email,
				uid: user.uid,
				date: new Date(values.date),
				startTime: values.startTime,
				endTime: values.endTime,
				usage: values.usage,
				venueID: venueId,
			});

			router.push(`/venue/booked`);
		} catch (error) {
			console.log(error);
			toast("Something went wrong. Check console for more details");
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full border rounded-lg p-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input placeholder="Ali bin Abu" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Date</FormLabel>
							<FormControl>
								<Input type="date" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="startTime"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Start Time</FormLabel>
							<FormControl>
								<Input type="time" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="endTime"
					render={({ field }) => (
						<FormItem>
							<FormLabel>End Time</FormLabel>
							<FormControl>
								<Input type="time" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="usage"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Usage</FormLabel>
							<FormControl>
								<Input type="text" placeholder="Purpose of booking" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={form.formState.isLoading}>
					{form.formState.isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
					Submit
				</Button>
			</form>
		</Form>
	);
}
