'use client'
import { SessionProvider } from "next-auth/react"
import { ReactElement } from "react"

type Props = {
    children: ReactElement
}

const NextAuthProvider = ({ children }: Props) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default NextAuthProvider