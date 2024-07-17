'use client'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    children: string
    href: string
}

const HeroButton = ({ children, href }: Props) => {
    const router = useRouter()
    const { theme, setTheme } = useTheme()

    return (
        <button className="p-3 text-white rounded-md dark:bg-blueRadial bg-radialDark md:max-w-56 hover:-translate-y-2 duration-300 "
            onClick={() => router.push(href)}
        >
            {children}
        </button>
    )
}

export default HeroButton