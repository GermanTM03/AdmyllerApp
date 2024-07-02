/* Componente del lado del cliente */
"use client";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
    return (
        <div className="relative p-5 md:py-1 " id = "Hero"> 
            <div className="grid max-w-5xl mx-auto md:grid-cols-2 gap-8">
                <div>
                    <h1 className="text-5xl font-semibold">
                        La nueva aplicación 
                        <span className="block degradedBlue bg-blueLight">
                           Para talleres y refaccionarias
                        </span>
                        ¡Lleva tu negocio a la era digital!
                    </h1>
                    <div className="max-w-md mt-9 space-y-2">
                        <p>¿Necesitas generar reportes y cotizaciones?</p>
                        <p>¿Necesitas un gestor de inventario y punto de venta?</p>
                        <p>¿Quieres optimizar tu negocio para agilizar tareas y procesos ahorrando tiempo y costos? </p>
                        <h4>Si es así, prueba Admyller la solución a tus problemas</h4>
                    </div>
                    <div className="my-8">
                        <Link href="/subscriptions" className="px-4 py-3 rounded-md bg-blueRadial">Empieza ahora</Link>
                    </div>
                </div>
                <div className="flex items-center justify-center rounded-md">
                    <Image src="/assets/Hero.png" alt="Card" width={450} height={450} className="h-auto w-72 md:w-full rounded-md" />
                </div>
            </div>
        </div>
    );
}