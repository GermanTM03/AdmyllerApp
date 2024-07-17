'use client'
import { BOTTOM_MENU_ITEMS, MENU_ITEMS, START_ITEM } from '@/src/data/navbar'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Logout from '@/src/components/auth/Logout'
import Modal from '../Modal'
import React, { useState } from 'react'
import SidebarItem from './SidebarItem'

const Sidebar = () => {
    const pathname = usePathname()
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <aside className='w-[calc(15vw)] hidden md:block fixed left-0 h-screen bg-zinc-100 dark:bg-slate-900 border-r-2'>
                <nav className='h-full py-4 px-2 flex flex-col gap-4 duration-300'>
                    <div className='h-14 flex items-center justify-evenly'>
                        <Image src={'/assets/brand/admyller-imagotype-2.svg'} width={88} height={88} alt='Admyller Icon' />
                    </div>
                    <div className='flex flex-col justify-between h-full'>
                        <ul className='flex flex-col gap-2'>
                            {
                                pathname === '/start' ?
                                    <SidebarItem item={START_ITEM} />
                                    :
                                    <>
                                        <SidebarItem item={START_ITEM} />
                                        {
                                            MENU_ITEMS.map((item) => (
                                                <SidebarItem key={item.id} item={item} />
                                            ))
                                        }
                                    </>
                            }
                        </ul>
                        <ul className='flex flex-col gap-2'>
                            {
                                BOTTOM_MENU_ITEMS.map((item) => (
                                    <SidebarItem key={item.id} item={item} setModal={setOpenModal} />
                                ))
                            }
                        </ul>
                    </div>
                </nav>
            </aside>
            <Modal open={openModal} setOpen={setOpenModal}>
                <Logout setModal={setOpenModal}></Logout>
            </Modal>
        </>
    )
}

export default Sidebar