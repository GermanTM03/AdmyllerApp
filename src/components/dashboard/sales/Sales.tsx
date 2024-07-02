"use client"
import Modal from '../../common/Modal'
import { Button } from '@tremor/react'
import React, { useState } from 'react'
import Link from "next/link";
import { ClipboardDocumentListIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid'
export function Sales() {
    const [modal, setModal] = useState(false);
   

    return (
        <div className="text-3xl font-bold">
           <h1>Ventas</h1>
           <Button 
                    icon={ClipboardDocumentListIcon} 
                    className='bg-blue-900 text-white border border-blue-900 rounded-md' 
                    onClick={() => setModal(true)}> Crear cotización
            </Button>
            <Link href="/manageSales">
            
                <Button 
                    icon={CurrencyDollarIcon} 
                    className='bg-blue-900 text-white border border-blue-900 rounded-md flex items-center'>
                    Gestionar ventas
                </Button>
           
        </Link>
           <Modal open={modal} setOpen={setModal}>
                <div className="p-4">
                    <h1 className="text-3xl font-bold text-black absolute top-2 left-2">Crear cotización</h1>
                    <div className="text-center mt-10">
                        <h2 className="text-2xl font-semibold text-black">Producto</h2>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <div className="w-1/4">
                            <h4>Nombre:</h4>
                            <input type="text" placeholder="Nombre" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="w-1/4">
                            <h4>Precio:</h4>
                            <input type="number" placeholder="Precio" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="w-1/4">
                            <h4>Cantidad:</h4>
                            <input type="number" placeholder="Cantidad" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <div className="w-1/2">
                            <h4>Descripción:</h4>
                            <input type="text" placeholder="Descripción" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                    </div>            
                    <div className="flex justify-end gap-4 mt-6">
                        <button className="px-4 py-2 bg-white text-red-500 border border-red-500 rounded-md" onClick={() => setModal(false)}>Cerrar</button>
                        <button className="px-4 py-2 bg-blue-900 text-white border border-blue-900 rounded-md">Guardar</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
