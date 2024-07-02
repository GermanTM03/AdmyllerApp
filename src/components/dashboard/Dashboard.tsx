'use client'
import React, { useState } from 'react'
import WorkshopCard from './WorkshopCard'
import { WORKSHOPS } from './WorshopData'
import { Button, Card, TextInput } from '@tremor/react'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid'
import Modal from '../common/Modal'

const Dashboard = () => {

    const [modal, setModal] = useState(false)
    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        // Limpiar el token almacenado en localStorage (ejemplo)
        localStorage.removeItem('token');
        console.log('Token eliminado. Cerrando sesión...');
        window.location.href = '/home';        // Aquí podrías redireccionar al usuario a la página de inicio de sesión u otra página.
    };


    return (
        <section className='py-4'>
            <h1 className='text-2xl mb-4'>Bienvenido, John Doe</h1>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='w-1/2 text-xl'>Tus talleres:</h2>
                <div className='w-1/2 flex items-center justify-end gap-4'>
                    <TextInput icon={MagnifyingGlassIcon} placeholder='Buscar por nombre de taller...' className='max-w-md' />
                    <Button icon={PlusIcon} className='bg-slate-900' onClick={() => setModal(!modal)}> Agregar</Button>
                    {/* Botón para cerrar sesión */}
                    <Button onClick={handleLogout} className='bg-red-600 text-white'>Cerrar sesión</Button>
                </div>
            </div>
            <div className='grid grid-cols-3 gap-6'>
                {
                    WORKSHOPS.map((item) => (
                        <WorkshopCard key={item.id} item={item} />
                    ))
                }
            </div>
            <Modal open={modal} setOpen={setModal}>
                <div>
                    <h1>Hello World!!</h1>
                    <p>This a fake text, ya tenemos modal</p>
                </div>
            </Modal>
        </section>
    )
}

export default Dashboard
