"use client";
import Link from "next/link";
import { DescriptionData } from "./DescriptionData";
import Image from "next/image";

export function Description() {
    return (
        <div className="relative px-6 py-20 md:py-36" id="Description">
            <div className="grid max-w-5xl mx-auto md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-5xl font-semibold">
                        <span className="block degradedBlue bg-blueLight">Tu negocio en tus manos</span>
                        su administración en las nuestras <br />
                        
                    </h2>
                    <p className="max-w-md mt-10">
                        Con Admyller  cuenta con varias funciones como lo son 
                    la generación de reportes para recepción y entrega de vehiculos, generación de cotizaciones, 
                    gestor de inventarios y punto de venta ademas de contar con un gestor de empleados y citas.
                    </p>
                    <div className="my-8">
                        <Link href="/subscriptions" className="px-4 py-3 rounded-md bg-blueRadial">Elige tu plan</Link>
                    </div>
                </div>

                <div className="grid items-center py-5 md:p-8 gap-6">
                    {DescriptionData.map(({ id, icon, title, description }) => (
                        <div key={id} className="grid grid-flow-col gap-5 px-4 py-2 rounded-3xl group hover:bg-radialBlack">
                            <Image src={`/assets/${icon}.png`} alt={title} width={40} height={40} />
                            <div>
                                <h4 className="text-primary">{title}</h4>
                                <p className="text-primaryDark">{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}