//app.tsx
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ContextProvider } from "@/context/context";

const clientId = process.env.NEXT_PUBLIC_VITE_GOOGLE_ID as string;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
       <GoogleOAuthProvider clientId={clientId}>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <Component {...pageProps} />
        </NextThemesProvider>
      </NextUIProvider>
    </GoogleOAuthProvider>
    </ContextProvider>
  );
}
