'use client'
import React from 'react'
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import ThemeSwitcher from './ThemeSwitcher'
import { Icon } from '@tremor/react'

const Navbar = () => {
    return (
        <nav className='h-20 w-[calc(100vw-11rem)] fixed top-0 left-44 border-b-2'>
            <div className='h-full container mx-auto flex justify-between items-center'>
                <h1 className='text-2xl'>Inicio</h1>
                <div className='h-full flex items-center gap-4'>
                    <button>
                        <Icon icon={MagnifyingGlassIcon} className=' text-blue-950 dark:text-white' tooltip='Buscar' />
                    </button>
                    <ThemeSwitcher />
                    <div className='flex items-center gap-4 '>
                        <div className='h-10 w-10 bg-blue-950 flex items-center justify-center text-white rounded-full cursor-pointer'>
                            JD
                        </div>
                        <span>John Doe</span>
                        <button>
                            <Icon icon={ChevronDownIcon} tooltip='Ver más' className=' text-blue-950 dark:text-white'/>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar