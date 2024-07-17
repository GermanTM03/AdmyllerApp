import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "@/app/globals.css";
import { ThemeContext } from "@/src/contexts/ThemeContext";
import { GoogleOAuthProvider } from '@react-oauth/google';

const lato = Lato({ weight: ['400', '700', '900'], subsets: ['latin'] });

export const metadata: Metadata = {
    title: "Admyller | Login",
    description: "Intelligent management for efficient workshops",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${lato.className} bg-zinc-100 dark:bg-slate-900 text-zinc-900 dark:text-white`}>
                <GoogleOAuthProvider clientId="226225771473-qgm8oqm7tauklvlllg1drn73tnods9nf.apps.googleusercontent.com">
                    <ThemeContext>
                        <main className="">
                            {children}
                        </main>
                    </ThemeContext>
                </GoogleOAuthProvider>
            </body>
        </html>
    );
}
