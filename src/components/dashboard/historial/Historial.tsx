'use client'
import Modal from '../../common/Modal'
import { Button } from '@tremor/react'
import React, { useState } from 'react'
import { FaEdit, FaPrint, FaTrashAlt } from 'react-icons/fa';
import { CardsOrdersData } from '../orders/cardsOrders/CardsOrdersData';

export function Historial() {
    const [modal, setModal] = useState(false);
    const { clientName, vehicleSerialNumber, licensePlate, id } = CardsOrdersData[0];

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Historial</h1>
                <Button 
                    icon={FaPrint} 
                    className='bg-blue-900 text-white border border-blue-900 rounded-md' 
                    onClick={() => setModal(true)}
                > 
                    Generar reporte
                </Button>
            </div>
            <div className="flex mb-4">
                <h2 className="text-xl font-semibold mr-4">Nombre del cliente: {clientName}</h2>
                <h2 className="text-xl font-semibold mr-4">Placas: {licensePlate}</h2>
                <h2 className="text-xl font-semibold">Número de serie: {vehicleSerialNumber}</h2>
            </div>
            

            <div className="flex items-center justify-between bg-gray-200 p-4 rounded-lg shadow-md">
                <div>
                    <h3 className="text-lg font-semibold">Reporte #{id}</h3>
                </div>
                <div className="flex space-x-8">
                    <div className="text-center flex flex-col items-center">
                        <p className="text-blue-500">Editar</p>
                        <FaEdit className="text-blue-500 cursor-pointer hover:text-blue-700" />
                    </div>
                    <div className="text-center flex flex-col items-center">
                        <p className="text-orange-500">Imprimir</p>
                        <FaPrint className="text-orange-500 cursor-pointer hover:text-orange-700" />
                    </div>
                    <div className="text-center flex flex-col items-center">
                        <p className="text-red-500">Eliminar</p>
                        <FaTrashAlt className="text-red-500 cursor-pointer hover:text-red-700" />
                    </div>
                </div>
            </div>

            <Modal open={modal} setOpen={setModal}>
                <div className="p-4">
                    <h1 className="text-3xl font-bold text-black absolute top-2 left-2">Generar reporte</h1>
                    <div className="text-center mt-10">
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
                        <button className="px-4 py-2 bg-white text-red-500 border border-red-500 rounded-md" onClick={() => setModal(false)}>Cerrar</button>
                        <button className="px-4 py-2 bg-blue-900 text-white border border-blue-900 rounded-md">Guardar</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
