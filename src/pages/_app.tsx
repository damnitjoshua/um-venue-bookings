import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainHeader from "@/components/MainHeader";
import { AuthContextProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { VenueContextProvider } from "@/context/VenueContext";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<AuthContextProvider>
			<VenueContextProvider>
				<MainHeader />
				<Toaster />
				<Component {...pageProps} />
			</VenueContextProvider>
		</AuthContextProvider>
	);
}
