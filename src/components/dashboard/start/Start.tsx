'use client'
import { useEffect, useState } from 'react'
import { Button, TextInput } from '@tremor/react'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid'
import { IBranch } from '@/src/interfaces/branch'
import { useSession } from 'next-auth/react'
import { IUser } from '@/src/interfaces/user'
import { useRouter } from 'next/navigation'
import WorkshopCard from '../WorkshopCard'
import Modal from '../../common/Modal'
import BranchForm from '../branches/BranchForm'
import FormHeader from '../../common/FormHeader'

type Props = {
    branches: IBranch[]
}

const Start = ({ branches }: Props) => {
    const [user, setUser] = useState<IUser>()
    const [_branches, setBranches] = useState<IBranch[]>([])
    const { data: session, status }: any = useSession();
    const router = useRouter()

    useEffect(() => {
        if (status === 'authenticated') {
            setUser({
                full_Name: session.user.fullName,
                email: session.user.email,
            })
        }
    }, [status])


    useEffect(() => {
        setBranches(branches)
    }, [branches])

    const [modal, setModal] = useState(false)

    return (
        <section className='py-4'>
            <h1 className='text-2xl mb-4'>Bienvenido, {user?.full_Name}</h1>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='w-1/2 text-xl'>Tus sucursales:</h2>
                <div className='w-1/2 flex items-center justify-end gap-4'>
                    <TextInput icon={MagnifyingGlassIcon} placeholder='Buscar por nombre de taller...' className='max-w-md' />
                    <Button icon={PlusIcon} className='bg-slate-900' onClick={() => setModal(!modal)}> Agregar</Button>
                </div>
            </div>
            <div className='grid grid-cols-3 gap-6'>
                {
                    _branches.map((item) => (
                        <WorkshopCard key={item.branchId} item={item} />
                    ))
                }
            </div>
            <Modal open={modal} setOpen={setModal}>
                <div className='w-[40vw] p-6'>
                    <FormHeader title='Agregar sucursal' />
                    <BranchForm openModal={setModal} />
                </div>
            </Modal>
        </section>
    )
}

export default Start
