import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 w-full ">
            <div className="text-center">
                <div className="inline-flex rounded-full bg-red-100 p-4">
                    <div className="rounded-full stroke-red-600 bg-red-200 p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-16 h-16">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                        </svg>

                    </div>
                </div>
                <h1 className="mt-5 text-[36px] font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong lg:text-[50px]">¡Estamos perdidos!</h1>
                <p className="text-tremor-content dark:text-dark-tremor-content mt-5 lg:text-lg">
                    ¡No pudimos encontrar la página que estas buscando! 😬 <br />
                    Revisa si has escrito correctamente el nombre o si el contenido que buscas ha expirado<br />
                    no dudes en ponerte en contacto con nosotros. ¡Gracias! 👍
                </p>
                <Link href={'/'} >
                    <button className='mt-3' >regresar al inicio</button>
                </Link>
            </div>
        </div>
    )
}

export default NotFound