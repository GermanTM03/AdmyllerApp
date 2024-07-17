
import { Button } from '@tremor/react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Props = {
    setModal: Dispatch<SetStateAction<boolean>>
}

const Logout = ({ setModal }: Props) => {
    const [loading, setLoading] = useState(false)
    const navigation = useRouter()

    const handleSignout = () => {
        setLoading(true)
        signOut({redirect: false}).then(() => {
            navigation.push('/login')
            setModal(false)
        })
    }

    useEffect(() => {
        return () => {
            setLoading(false)
        }
    }, [])

    return (
        <div className='p-6'>
            <h1 className='mb-4 text-2xl font-medium'>Cerrar sesión</h1>
            <p className='mb-4'>¿Estás seguro de que deseas salir de Admyller?</p>
            <div className='flex justify-end gap-4'>
                <Button
                    disabled={loading}
                    variant='secondary'
                    color='red'
                    onClick={() => setModal(false)}>Cancelar</Button>
                <Button onClick={handleSignout} loading={loading}>{loading ? "Cerrando sesión" : "Cerrar sesión"}</Button>
            </div>
        </div>
    )
}

export default Logout