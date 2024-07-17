'use client'
import { Button, NumberInput, TextInput } from '@tremor/react'
import { Controller, useForm } from 'react-hook-form'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IBranch } from '@/src/interfaces/branch'
import { AddBranch, DeleteBranch, UpdateBrach } from '@/app/actions/branch'
import { useRouter } from 'next/navigation'
import Toast from '../../common/Toast'
import { toast } from 'sonner'

type Props = {
    openModal?: Dispatch<SetStateAction<boolean>>
    data?: IBranch
    isEdit?: boolean
}

const BranchForm = ({ openModal, data, isEdit = false }: Props) => {

    const [loading, setLoading] = useState(false)
    const [deleteLoader, setDeleteLoader] = useState(false)
    const router = useRouter()

    const { control, formState: { errors }, handleSubmit, reset, setError, setValue, } = useForm<IBranch>({
        defaultValues: {
            address: `${isEdit ? data?.address : ''}`,
            businessName: `${isEdit ? data?.businessName : ''}`,
            email: `${isEdit ? data?.email : ''}`,
            phoneNumber: `${isEdit ? data?.phoneNumber : ''}`,
            rfc: `${isEdit ? data?.rfc : 'XAXX010101000'}`
        }
    })

    const saveForm = async (branch: IBranch) => {
        setLoading(true)
        if (isEdit && data?.branchId) {
            const response = await UpdateBrach(data.branchId, branch)
            if (response && response.isSuccess) {
                // toast.custom((t) => (
                //     <Toast toastId={t} title={'Actualizar sucursal'} status='success' description={'¡Sucursal modificada con éxito!'} />
                // ));
                setLoading(false)
                return
            }
            // toast.custom((t) => (
            //     <Toast toastId={t} title={'Actualizar sucursal'} status='danger' description={'Ocurrió un error al actualizar la sucursal'} />
            // ), { duration: 0 });
        } else {
            const response = await AddBranch(branch)
            if (response?.isSuccess) {
                reset()
                openModal?.(false)
            }
        }
    }

    const handleDelete = async () => {
        if (!data || !data.branchId) return
        setDeleteLoader(true)
        const response = await DeleteBranch(data.branchId)
        if (response?.isSuccess) {
            openModal?.(false)
            router.push('/start')
        }
    }

    useEffect(() => {
        return () => {
            setLoading(false)
            setDeleteLoader(false)
        }
    }, [])

    return (
        <div >
            <form onSubmit={handleSubmit(saveForm)}>
                <div className="grid grid-cols-2 gap-3 mb-3 ">

                    <div className="col-span-2">
                        <label >
                            Nombre de la sucursal:
                            <Controller
                                name="businessName"
                                control={control}
                                rules={{ required: 'El nombre de la sucursal es requerida', maxLength: { value: 100, message: "Se ha excedido el máximo de carácteres permitidos" } }}
                                render={({ field }) => (
                                    <TextInput
                                        placeholder="Nombre de la sucursal..."
                                        error={errors.businessName !== undefined}
                                        errorMessage={errors.businessName?.message}
                                        value={field.value}
                                        onChange={field.onChange}
                                        maxLength={101}
                                    />
                                )}
                            />
                        </label>
                    </div>

                    <div className="col-span-2">
                        <label >
                            Dirección:
                            <Controller
                                name="address"
                                control={control}
                                rules={{ required: 'La dirección es requerida', maxLength: { value: 100, message: "Se ha excedido el máximo de carácteres permitidos" } }}
                                render={({ field }) => (
                                    <TextInput
                                        placeholder="Dirección de la sucursal..."
                                        error={errors.address !== undefined}
                                        errorMessage={errors.address?.message}
                                        value={field.value}
                                        onChange={field.onChange}
                                        maxLength={101}
                                    />
                                )}
                            />
                        </label>
                    </div>

                    <div className="col-span-2">
                        <label >
                            RFC:
                            <Controller
                                name="rfc"
                                control={control}
                                // rules={{ required: 'La dirección es requerida', maxLength: { value: 100, message: "Se ha excedido el máximo de carácteres permitidos" } }}
                                render={({ field }) => (
                                    <TextInput
                                        placeholder="Registro Federal de Contribuyentes..."
                                        error={errors.rfc !== undefined}
                                        errorMessage={errors.rfc?.message}
                                        value={field.value}
                                        onChange={field.onChange}
                                        maxLength={101}
                                    />
                                )}
                            />
                        </label>
                    </div>

                    <div className="col-span-2">
                        <label >
                            Correo electrónico:
                            <Controller
                                name="email"
                                control={control}
                                // rules={{ required: 'La dirección es requerida', maxLength: { value: 100, message: "Se ha excedido el máximo de carácteres permitidos" } }}
                                render={({ field }) => (
                                    <TextInput
                                        type='email'
                                        placeholder="Correo electrónico..."
                                        error={errors.email !== undefined}
                                        errorMessage={errors.email?.message}
                                        value={field.value}
                                        onChange={field.onChange}
                                        maxLength={101}
                                    />
                                )}
                            />
                        </label>
                    </div>

                    <div className="col-span-2">
                        <label >
                            Teléfono:
                            <Controller
                                name="phoneNumber"
                                control={control}
                                // rules={{ required: 'La dirección es requerida', maxLength: { value: 100, message: "Se ha excedido el máximo de carácteres permitidos" } }}
                                render={({ field }) => (
                                    <NumberInput
                                        placeholder="Teléfono..."
                                        error={errors.phoneNumber !== undefined}
                                        errorMessage={errors.phoneNumber?.message}
                                        value={field.value}
                                        onChange={field.onChange}
                                        maxLength={10}
                                        enableStepper={false}
                                    />
                                )}
                            />
                        </label>
                    </div>
                </div>

                <div className="w-full flex gap-4 flex-col mt-4">
                    <Button type="submit" loading={loading} className='bg-slate-900 text-white' disabled={deleteLoader}>
                        Guardar sucursal
                    </Button>
                    {
                        isEdit &&
                        <Button loading={deleteLoader} variant='secondary' color='red' onClick={handleDelete} disabled={loading}>
                            Eliminar sucursal
                        </Button>
                    }
                </div>
            </form>
        </div>
    )
}

export default BranchForm