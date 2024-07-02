import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "@/app/globals.css";
import { Header } from "@/src/components/landing/header/Header";
import { Footer } from "@/src/components/landing/footer/Footer";

const lato = Lato({ weight: ['400'], subsets: ['latin'] });

export const metadata: Metadata = {
    title: "Admyller",
    description: "Intelligent management for efficient workshops",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${lato.className} bg-slate-950 text-white`}>
                <main className="">
                    <Header />
                    {children}
                    <Footer />
                </main>
            </body>
        </html>
    );
}