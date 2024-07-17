'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { HomeIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { Icon } from '@tremor/react';
import Image from 'next/image';

export const MENU_ITEMS = [
    {
        id: 0,
        label: 'Dashboard',
        route: '/dashboard',
        icon: HomeIcon,
    },
];

export const BOTTOM_MENU_ITEMS = [
    {
        id: 0,
        label: 'Configuración',
        route: '/configure',
        icon: Cog6ToothIcon,
    },
];

const Sidebar = () => {
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/home';
    };

    const confirmLogout = () => {
        setShowLogoutConfirmation(true);
    };

    const cancelLogout = () => {
        setShowLogoutConfirmation(false);
    };

    return (
        <aside className="w-44 hidden md:block fixed left-0 h-screen bg-zinc-100 dark:bg-slate-900 border-r-2">
            <nav className="h-full py-4 px-2 flex flex-col gap-4 duration-300">
                <div className="h-14 flex items-center justify-evenly">
                    <Image src={'/assets/brand/admyller-icon.svg'} width={24} height={24} alt="Admyller Icon" />
                    <Image src={'/assets/brand/admyller-logo-color.svg'} width={100} height={100} alt="Admyller Logo" />
                </div>
                <div className="flex flex-col justify-between h-full">
                    <ul className="flex flex-col gap-2">
                        {MENU_ITEMS.map((item) => (
                            <li key={item.id} className="hover:bg-blue-950 rounded-md duration-150 h-10">
                                <Link href={item.route} className="h-full capitalize flex items-center gap-2 text-blue-950 *:hover:text-white">
                                    <Icon icon={item.icon} className="text-blue-950" />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul className="flex flex-col gap-2">
                        {BOTTOM_MENU_ITEMS.map((item) => (
                            <li key={item.id} className="hover:bg-blue-950 rounded-md duration-150 h-10">
                                <Link href={item.route} className="h-full capitalize flex items-center gap-2 text-blue-950 *:hover:text-white">
                                    <Icon icon={item.icon} className="text-blue-950" />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                        <li
                            onClick={confirmLogout}
                            className="hover:bg-blue-950 rounded-md duration-150 h-10 cursor-pointer flex items-center gap-2 text-blue-950 *:hover:text-white"
                        >
                            <Icon icon={ArrowLeftOnRectangleIcon} className="text-blue-950" />
                            <span>Salir</span>
                        </li>
                    </ul>
                </div>
            </nav>
            {showLogoutConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold">¿Estás seguro de que deseas cerrar sesión?</h2>
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={cancelLogout} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                                Cancelar
                            </button>
                            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
