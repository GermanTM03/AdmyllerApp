import Image from "next/image";
import { FooterData, } from "./FooterData";
import Link from "next/link";


export function Footer() {
    return (
        <div className="container p-4 mx-auto mt-5 md:-mt-20" id="Footer">
            <div className="justify-between md:flex">
                <div>
                    <Image src="/assets/LogoAdmyller.png" width={200} height={40} alt="Logo Bank" />
                    <p className="mt-5 text-primaryDark max-w-[250px]">Una nueva forma de administrar tu negocio</p>
                </div>
                {FooterData.map(({ id, title, links }) => (
                    <div key={id}>
                        <h4 className="mt-10 text-lg md:mt-2">{title}</h4>
                        {links.map(({ id, name, link }) => (
                            <Link key={id} href={link} className="block mt-4 text-primaryDark hover:text-white">
                                {name}
                            </Link>
                        ))}
                    </div>
                ))}
            </div>

            <div className="border-[#3F3E45] border-[1px] my-7" />

            <div className="items-center justify-between md:flex">
                <div className="my-3">

                    © 2024 Admyller. Todos los derechos reservados.

                </div>

            </div>

        </div>
    )
} 