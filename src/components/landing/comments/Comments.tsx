"use client"
import { Slide } from "./Slide"

export function Comments() {
    return (
        <div className="relative p-6 md:py-60" id="Comments">

            <div className="grid max-w-5xl gap-8 mx-auto my-6 md:grid-cols-2">

                <h2 className="text-5xl mb-5 font-semibold">
                    ¿Qué opinan los clientes de nosotros?
                </h2>
                <div className="self-center">
                    <p className="text-primaryDark">Todo lo que necesitas para administrar tu negocio y hacerlo crecer al alcance de tus manos.</p>
                </div>

            </div>

            <Slide />
        </div>
    )
}