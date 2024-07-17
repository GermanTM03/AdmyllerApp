'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation'; // Importa usePathname y useSearchParams
import { HomeIcon, ClipboardDocumentListIcon, ChartPieIcon, UserGroupIcon, Cog6ToothIcon, ArrowLeftStartOnRectangleIcon, ChartBarSquareIcon, CalendarDaysIcon } from '@heroicons/react/24/solid';
import { Icon } from '@tremor/react';
import Image from 'next/image';

export const MENU_ITEMS = [
    { id: 0, label: "sucursal", route: "/sucursal/", icon: HomeIcon },
    { id: 2, label: "Inventario", route: "/inventory", icon: ClipboardDocumentListIcon },
    { id: 3, label: "Reportes", route: "/orders", icon: ChartPieIcon },
    { id: 4, label: "Ventas", route: "/sales", icon: ChartBarSquareIcon },
    { id: 5, label: "Citas", route: "/quotes", icon: CalendarDaysIcon },
    { id: 6, label: "Empleados", route: "/employees", icon: UserGroupIcon },
];

export const BOTTOM_MENU_ITEMS = [
    { id: 0, label: "Configuración", route: "/config/", icon: Cog6ToothIcon },
    { id: 2, label: "Salir", route: "/home", icon: ArrowLeftStartOnRectangleIcon },
];

const Sidebar = () => {
    const pathname = usePathname(); // Obtiene la ruta actual
    const id = pathname.split('/').pop(); // Extrae el último segmento como id

    return (
        <aside className='w-44 hidden md:block fixed left-0 h-screen bg-zinc-100 dark:bg-slate-900 border-r-2'>
            <nav className='h-full py-4 px-2 flex flex-col gap-4 duration-300'>
                <div className='h-14 flex items-center justify-evenly'>
                    <Image src={'/assets/brand/admyller-icon.svg'} width={24} height={24} alt='Admyller Icon' />
                    <Image src={'/assets/brand/admyller-logo-color.svg'} width={100} height={100} alt='Admyller Logo' />
                </div>
                <div className='flex flex-col justify-between h-full'>
                    <ul className='flex flex-col gap-2'>
                        {
                            MENU_ITEMS.map((item) => (
                                <li key={item.id} className='hover:bg-blue-950 rounded-md duration-150 h-10'>
                                    <Link href={`${item.route}${item.id === 0 ? id : ''}`} className='h-full capitalize flex items-center gap-2 text-blue-950 *:hover:text-white'>
                                        <Icon icon={item.icon} className='text-blue-950' />
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                    <ul className='flex flex-col gap-2'>
                        {
                            BOTTOM_MENU_ITEMS.map((item) => (
                                <li key={item.id} className='hover:bg-blue-950 rounded-md duration-150 h-10'>
                                    <Link href={`${item.route}${item.id === 0 ? id : ''}`} className='h-full capitalize flex items-center gap-2 text-blue-950 *:hover:text-white'>
                                        <Icon icon={item.icon} className='text-blue-950' />
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
