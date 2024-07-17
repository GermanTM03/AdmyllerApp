'use client'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, ReactChild, ReactFragment, ReactPortal, SetStateAction } from 'react'
import { useEffect } from 'react'

type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>
    open: boolean
    children: ReactChild | ReactFragment | ReactPortal | boolean | null | undefined
}

const ModalAdd = ({ open, setOpen, children }: Props) => {
    const modalVariants = {
        hidden: { opacity: 0, y: '-100%' },
        visible: { opacity: 1, y: 0 },
    };

    useEffect(() => {
        let body = document.querySelector("body")
        if (open) {
            body?.setAttribute("style", "overflow: hidden")
        }

        return () => {
            body?.setAttribute("style", "overflow: auto")
        }
    }, [open])

    return (
        <AnimatePresence>
            {
                open &&
                <motion.div className="fixed w-full inset-0 z-50 flex items-center justify-center  backdrop-blur-sm  "
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.3 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="absolute inset-0 bg-slate-900/30 " onClick={() => setOpen(!open)}></div>
                    <div className="relative w-[90%] sm:w-[80%] max-w-4xl bg-neutral-50 dark:bg-neutral-900 rounded-lg max-h-[95%] overflow-auto shadow-2xl">
                        {children}
                        <button onClick={() => setOpen(!open)} className='absolute top-2 right-2 shadow-xl rounded-full p-1 hover:rotate-90 duration-150 bg-neutral-50 dark:bg-neutral-800'>
                            <XMarkIcon width={24} height={24} className='text-inherit' />
                        </button>
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default ModalAdd