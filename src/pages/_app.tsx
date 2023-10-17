import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "tucmc-auth";
import Navbar from "@/components/navbar/navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <AuthProvider TOKEN="tYjFVdtj_5jlF8GhpZ3QF49moVTNXRM6TzB4axMNADs=">
        <Navbar />
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  );
}
