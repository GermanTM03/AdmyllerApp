'use client'
import { Bars3BottomRightIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import Menu from './Menu';
import { HeaderLink } from './HeaderData';

type Props = {
    links: HeaderLink[]
}

const HeaderMobile = ({ links }: Props) => {
    const { theme, setTheme } = useTheme();
    const [openMenu, setOpenMenu] = useState(false)
    const [mounted, setMounted] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setMounted(!mounted)
    }, [])

    return (
        <div
            className="h-full container mx-auto flex items-center justify-between p-4 lg:hidden"
            id="Header"
        >
            <button onClick={() => setOpenMenu(!openMenu)}>
                <Bars3BottomRightIcon className="w-6" />
            </button>

            {
                mounted ?
                    theme === "light" ?
                        <Link href="/home" className="flex items-center">
                            <Image src="/assets/brand/admyller-imagotype.svg" width="96" height="35" alt="Logo Admyller" />
                        </Link>
                        :
                        <Link href="/home" className="flex items-center">
                            <Image src="/assets/brand/admyller-dark.svg" width="96" height="35" alt="Logo Admyller" />
                        </Link>
                    :
                    null
            }

            <button onClick={() => router.push('login')}>
                <ArrowRightEndOnRectangleIcon className="w-6 0" />
            </button>

            {
                openMenu && <Menu theme={theme} setTheme={setTheme} open={openMenu} onClose={setOpenMenu} links={links} />
            }
        </div>
    )
}

export default HeaderMobile