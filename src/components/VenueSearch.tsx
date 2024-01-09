import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useVenueContext } from "@/context/VenueContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";

const formSchema = z.object({
	name: z.string().optional(),
	category: z.string().optional(),
});

export default function VenueSearch() {
	const { venues } = useVenueContext();
	const [searchResults, setSearchResults] = useState<Venues[] | null>(venues ?? []);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const venuesArr = venues ?? [];

		const filteredVenues = venuesArr.filter((venue) => {
			let nameMatch: boolean = true,
				categoryMatch: boolean = true;

			if (values.name) {
				nameMatch = venue.name.toLowerCase().includes(values.name.toLowerCase());
			}

			if (values.category && values.category != "all") {
				categoryMatch = values.category ? venue.category === values.category : true;
			}

			return nameMatch && categoryMatch;
		});

		setSearchResults(filteredVenues);
  }
  
  useEffect(() => {
    setSearchResults(venues);
  }, [venues]);
  

	return (
		<div className="space-y-4">
			<section>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row gap-4 items-center">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormControl>
										<Input placeholder="Search venue by name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem className="w-[20em]">
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Category" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="faculty">Faculty</SelectItem>
											<SelectItem value="college">College</SelectItem>
											<SelectItem value="all">All</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Search</Button>
					</form>
				</Form>
			</section>
			<section className="grid grid-cols-4 gap-4">
				{searchResults && searchResults?.length != 0 ? (
					searchResults.map((value: Venues, index: number) => (
						<Link key={index} href={value.link!}>
							<div className="h-[15em] border-2 border-black hover:border-blue-500 flex flex-col items-center justify-center font-semibold text-xl p-4 text-center relative rounded-lg overflow-clip">
								<Image
									src={value.image}
									width={1000}
									height={1000}
									priority
									className="absolute object-cover h-full"
									alt={"index"}
								/>
								<div className="absolute z-10 w-full h-full bg-black bg-opacity-60"></div>
								<p className="z-20 text-white">{value.name}</p>
							</div>
						</Link>
					))
				) : (
					<div className="border rounded-lg p-4 col-span-4 text-center">Empty</div>
				)}
			</section>
		</div>
	);
}
