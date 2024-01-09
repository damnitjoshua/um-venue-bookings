import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainHeader from "@/components/MainHeader";
import { AuthContextProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { VenueContextProvider } from "@/context/VenueContext";
import { BookingContextProvider } from "@/context/BookingContext";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<AuthContextProvider>
			<VenueContextProvider>
				<BookingContextProvider>
					<MainHeader />
					<Toaster />
					<Component {...pageProps} />
				</BookingContextProvider>
			</VenueContextProvider>
		</AuthContextProvider>
	);
}
