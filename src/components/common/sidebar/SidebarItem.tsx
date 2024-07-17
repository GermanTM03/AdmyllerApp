'use client'
import { LinkItem } from '@/src/data/navbar'
import { Icon } from '@tremor/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
    item: LinkItem
    setModal?: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarItem = ({ item, setModal }: Props) => {
    const pathname = usePathname()

    const getStyle = () => {
        if (pathname.includes(item.route)) {
            return 'bg-slate-900 hover:bg-slate-800 text-white *:!text-white'
        }
        return 'hover:bg-slate-900 hover:text-white *:hover:text-white'
    }

    const getRoutes = () => {
        const id = pathname.split('/')[1]
        if (item.route.includes("/start")) return "/start"
        return `/${id}${item.route}`
    }

    function logoutHandler() {
        setModal?.(true)
    }

    return (
        <>
            {
                item.label === 'Salir' ?
                    <a className={`${getStyle()} w-full h-10 rounded-md flex items-center gap-2 duration-200 cursor-pointer`}
                        onClick={logoutHandler}
                    >
                        <Icon icon={item.icon} className='dark:text-white text-slate-900' />
                        <span>{item.label}</span>
                    </a>
                    :
                    <Link href={getRoutes()} className={`${getStyle()} w-full h-10 rounded-md flex items-center gap-2 duration-200`}>
                        <Icon icon={item.icon} className='dark:text-white text-slate-900' />
                        <span>{item.label}</span>
                    </Link>
            }
        </>
    )
}

export default SidebarItem