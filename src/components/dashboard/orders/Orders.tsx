'use client'

import Modal from '../../common/Modal'
import { Button,TextInput } from '@tremor/react'
import React, { useState } from 'react'
import { PlusIcon,MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { CardsOrdersData } from "./cardsOrders/CardsOrdersData";
import { CardOrders } from "./cardsOrders/CardsOrders";

export function Orders() {
    const [modal, setModal] = useState(false)
    return (
        <div>
           <div className='w-full lg:w-1/2 flex flex-col lg:flex-row items-center lg:justify-end gap-4 mb-4'>
             <h1 className='w-full lg:w-1/2 text-3xl font-bold'>Reportes</h1>
              <TextInput  icon={MagnifyingGlassIcon}  placeholder='Buscar por cliente, placas, serie...' className='max-w-full lg:max-w-md w-full '/>
              <Button icon={PlusIcon} className='bg-blue-900 text-white border border-blue-900 rounded-md' onClick={() => setModal(!modal)}>Agregar</Button>
           </div>
            <section>
                <Modal open={modal} setOpen={setModal}>
                    <div className="p-4">
                        <h1 className="text-3xl font-bold text-black absolute top-2 left-2">Generar reporte</h1>
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold text-black">Informacion del cliente</h2>
                        </div>
                        <div className="flex gap-4 mt-4">
                            <div className="w-1/2">
                                <h4>Nombre:</h4>
                                <input type="text" placeholder="Nombre" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div className="w-1/2">
                                <h4>Num_tel:</h4>
                                <input type="number" placeholder="Numero telefonico" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h4>Dirección:</h4>
                            <input type="text" placeholder="Dirección" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="text-center mt-6">
                            <h2 className="text-2xl font-semibold text-black">Vehiculo</h2>
                        </div>
                        <div className="flex gap-4 mt-4">
                            <div className="w-1/4">
                                <h4>Num serie:</h4>
                                <input type="text" placeholder="Numero de serie" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div className="w-1/4">
                                <h4>Marca:</h4>
                                <input type="text" placeholder="Marca" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div className="w-1/4">
                                <h4>Fecha entrada:</h4>
                                <input type="date" placeholder="Fecha entrada" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div className="w-1/4">
                                <h4>% Combustible:</h4>
                                <input type="number" placeholder="Nivel de combustible" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                        </div>
                        <div className="flex gap-4 mt-4">
                            <div className="w-1/2">
                                <h4>Placas:</h4>
                                <input type="text" placeholder="Placas" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div className="w-1/2">
                                <h4>Modelo:</h4>
                                <input type="text" placeholder="Modelo" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                        </div>
                        <div className="flex gap-4 mt-4">
                            <div className="w-1/2">
                                <h4>Kilometraje:</h4>
                                <input type="number" placeholder="Kilometraje" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div className="w-1/2">
                                <h4>Color:</h4>
                                <input type="text" placeholder="Color" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h4>Observaciones del vehiculo:</h4>
                            <input type="text" placeholder="Observaciones del vehiculo" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="mt-4">
                            <h4>Descripción del servicio:</h4>
                            <input type="text" placeholder="Descripción del servicio" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="mt-4">
                            <h4>Fecha de salida:</h4>
                            <input type="date" placeholder="Fecha de salida" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="mt-4">
                            <h4>Objetos de valor:</h4>
                            <input type="text" placeholder="Objetos de valor" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <button className="px-4 py-2 bg-white text-red-500 border border-red-500 rounded-md">Cerrar</button>
                            <button className="px-4 py-2 bg-blue-900 text-white border border-blue-900 rounded-md">Guardar</button>
                        </div>
                    </div>
                </Modal>
            </section>
            <section>
            <div className="min-h-screen flex items-center justify-center  mt-0 mb-56 container mx-auto sm:mb-40 ">
                <div className="flex flex-wrap justify-center gap-4">
                    {CardsOrdersData.map(card => (
                        <CardOrders 
                            key={card.id}
                            clientName={card.clientName}
                            licensePlate={card.licensePlate}
                            vehicleSerialNumber={card.vehicleSerialNumber}
                        />
                    ))}
                </div>
            </div>
            </section>
        </div>
    );
}
