import Image from "next/image";
import { Inter } from "next/font/google";
import VenueSearch from "@/components/VenueSearch";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

	return (
		<main className={`${inter.className}`}>
			<section>
				<div className="h-[20em] bg-gray-100"></div>
				<div className="text-center bg-blue-900 text-white py-6">
					<p>A centralized hub for Universiti Malaya students to book venues</p>
				</div>
			</section>
			<section className="py-10 px-4 space-y-4">
				<div className="text-center space-y-1">
					<h2 className="text-blue-900 text-2xl font-bold">Search</h2>
					<p className="text-gray-500">Filter your search or view all options</p>
				</div>
				<div>
					<VenueSearch />
				</div>
			</section>
		</main>
	);
}
