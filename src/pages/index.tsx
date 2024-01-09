import Image from "next/image";
import { Inter } from "next/font/google";
import VenueSearch from "@/components/VenueSearch";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

	return (
		<main className={`${inter.className}`}>
			<section>
				<div className="h-[20em] bg-gray-100 relative">
					<Image
						src={`https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
						width={10000}
						height={1000}
						priority
						className="absolute object-cover h-full"
						alt={"index"}
					/>
				</div>
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
