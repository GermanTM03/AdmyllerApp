'use client'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { HeaderLink } from './HeaderData'
import { useRouter } from 'next/navigation'

type Props = {
    theme?: string
    setTheme: Dispatch<SetStateAction<string>>
    open: boolean
    onClose: Dispatch<SetStateAction<boolean>>
    links: HeaderLink[]
}

const Menu = ({ onClose, open, theme, links, setTheme }: Props) => {
    const controls = useAnimation();
    const router = useRouter()

    useEffect(() => {
        controls.start({ x: open ? 0 : '-100%' });
    }, [open, controls]);

    const linkHandler = (route: string) => {
        router.push(route)
        onClose(!open)
    }

    function closeHandler() {
        onClose(!open)
    }

    return (

        <AnimatePresence>
            <motion.div
                className='fixed px-4 pb-4 w-full max-w-md h-screen inset-0 bg-zinc-100 dark:bg-slate-900 z-20 overflow-hidden lg:hidden'
                initial={{ x: '-100%' }}
                animate={controls}
                exit={{ x: '-100%' }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
                <aside className='h-full flex flex-col text-slate-950 dark:text-white'>
                    <div className='h-16 w-full flex justify-between items-center'>
                        {
                            theme === "light" ?
                                <Link href="/" className="flex items-center">
                                    <Image src="/assets/brand/admyller-logo-color.svg" width="96" height="35" alt="Logo Admyller" />
                                </Link>
                                :
                                <Link href="/" className="flex items-center">
                                    <Image src="/assets/brand/admyller-logo-white.svg" width="96" height="35" alt="Logo Admyller" />
                                </Link>
                        }
                        <button>
                            <XMarkIcon className='w-6' onClick={closeHandler} />
                        </button>
                    </div>
                    <div className='w-full h-full flex flex-col justify-between'>
                        <ul>
                            {
                                links.map((item) => (
                                    <li key={item.id} onClick={() => linkHandler(item.route)}
                                        className='mb-4 py-2 active:p-2 active:bg-blueRadial duration-150 rounded-md'
                                    >
                                        {item.name}
                                    </li>
                                ))
                            }
                            <li onClick={() => setTheme(`${theme === 'light' ? 'dark' : 'light'}`)}
                                className='mb-4 py-2 active:p-2 active:bg-blueRadial duration-150 rounded-md'
                            >
                                {`${theme === 'light' ? 'Modo oscuro' : 'Modo claro'}`}
                            </li>
                        </ul>
                        <ul>
                            <li className='mb-4 py-2 active:p-2 active:bg-blueRadial duration-150 rounded-md'>
                                Registrarse
                            </li>
                            <li className='mb-4 py-2 active:p-2 active:bg-blueRadial duration-150 rounded-md'>
                                Iniciar sesion
                            </li>
                        </ul>
                    </div>
                </aside>
            </motion.div>
        </AnimatePresence>
    )
}

export default Menu