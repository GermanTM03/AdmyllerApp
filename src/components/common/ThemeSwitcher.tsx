"use client"
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { Icon } from "@tremor/react";
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    };

    return (
        <>
            {
                theme === 'light' ?
                    <button
                        onClick={() => setTheme('dark')}
                    >
                        <Icon icon={MoonIcon}
                            className='text-blue-950 hover:text-blue-900 duration-150'
                            tooltip="Modo oscuro"
                        />
                        {/* <MoonIcon className="h-5 text-blue-950 hover:scale-110 duration-150"/> */}
                    </button>
                    :
                    <button
                        onClick={() => setTheme('light')}
                    >
                        <Icon icon={SunIcon}
                            className='dark:text-yellow-400 dark:hover:text-yellow-500 duration-150'
                            tooltip="Modo claro"
                        />
                        {/* <SunIcon className="h-5 text-blue-950 hover:scale-110 duration-150" /> */}
                    </button>
            }
        </>
    );
}

export default ThemeSwitcher