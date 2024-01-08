import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainHeader from "@/components/MainHeader";
import { AuthContextProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<AuthContextProvider>
			<MainHeader />
			<Toaster />
			<Component {...pageProps} />
		</AuthContextProvider>
	);
}
