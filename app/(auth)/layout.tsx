import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "@/app/globals.css";
import { ThemeContext } from "@/src/contexts/ThemeContext";

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
                <ThemeContext>
                    <main className="">
                        {children}
                    </main>
                </ThemeContext>
            </body>
        </html>
    );
}