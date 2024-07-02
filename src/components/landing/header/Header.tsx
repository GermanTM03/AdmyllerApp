/* Componente del lado del cliente */
"use client";
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";
import { HeaderData } from "./HeaderData"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export function Header() {
    const [openMobileMenu, setOpenMobileMenu] = useState(false)
    return (
        <nav className="sticky inset-0 w-full bg-slate-950 z-10">
            <div className="flex flex-wrap items-center justify-between p-4 container mx-auto md:py-6 mb-14" id="Header">
                <Link href="/" className="flex items-center">
                    <Image src="/assets/LogoAdmyller.png" width="130" height="35" alt="Logo Admyller" />
                </Link>
                {/*Solo afecta a vista moviles,el componente genera un menu hamburguesa  */}
                <Bars3BottomRightIcon className="block text-3xl md:hidden cursor-pointer w-4" onClick={() => setOpenMobileMenu(!openMobileMenu)} />
                <div className={`${openMobileMenu ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
                    <div className="flex flex-col p-4 mt-4 md:p-0 md:flex-row md:space-x-8 md:mt-0 md:border-0">
                        {HeaderData.map(({ id, name, idLink }) => (
                            <div key={id} className="px-4 transition-all duration-500 ease-in-out">
                                <Link href={idLink} className="text-lg hover:text-secondary">{name}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    )
}