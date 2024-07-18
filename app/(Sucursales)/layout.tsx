import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/src/components/common/sucursalescammon/Sidebar";
import { ThemeContext } from "@/src/contexts/ThemeContext";
import Navbar from "@/src/components/common/sucursalescammon/Navbar";

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
            <body className={`${lato.className} bg-zinc-100 dark:bg-slate-900 text-zinc-900 dark:text-white`}>
                <ThemeContext
                    attribute="class" defaultTheme="system" enableSystem
                >
                    <Sidebar />
                    <main className="pl-44 pt-24">
                        <Navbar />
                        <div className="container mx-auto">
                            {children}
                        </div>
                    </main>
                </ThemeContext>
            </body>
        </html>
    );
}