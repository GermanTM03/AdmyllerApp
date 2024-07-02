'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import { TextInput } from '@tremor/react'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { Controller, useForm } from 'react-hook-form'
import { IUser } from '@/src/interfaces/user'
import { useRouter } from 'next/navigation' 

const Page = () => {
    const router = useRouter();
    const [serverErrors, setServerErrors] = useState<{ [key: string]: string }>({});

    const { handleSubmit, control, reset, formState: { errors } } = useForm<IUser>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
    });

    const formHandler = async (data: IUser) => {
        setServerErrors({}); 
        console.log('Form Data:', data);
        try {
            const response = await fetch('https://localhost:7208/api/Auth/SingUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    full_Name: data.name,
                    email: data.email,
                    password: data.password,
                }),
            });

            console.log('Response:', response);

            if (response.ok) {
                const result = await response.json();
                console.log('Result:', result);
                reset();
                alert("Te haz registrado correctamente")
                router.push('/login'); 
            } else {
                const error = await response.json();
                console.log('Error:', error);
                if (error.error && error.error.includes('correo electrónico ya está en uso')) {
                    setServerErrors({ email: 'El correo electrónico ya está en uso' });
                } else {
                    setServerErrors(error.errors || { general: error.error });
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setServerErrors({ general: 'Ocurrió un error al crear la cuenta' });
        }
    }

    return (
        <section className='h-screen'>
            <div className='h-full grid grid-cols-2'>
                <div className='col-span-1 content-center'>
                    <form onSubmit={handleSubmit(formHandler)} className='max-w-lg mx-auto'>
                        <Link href={'/home'} className='flex items-center gap-2 mb-4'>
                            <ChevronLeftIcon className='h-4' />
                            Regresar al sitio web
                        </Link>
                        <div className='h-24 flex items-center'>
                            <Image src={'/assets/brand/admyller-logo-color.svg'} width={244} height={244} alt='Admyller Logo' />
                        </div>
                        <h1 className='text-2xl mb-4'>Crear cuenta</h1>
                        <p className='mb-4'>
                            ¡Ingresa tus datos, registrate y comienza con la experiencia Admyller!
                        </p>
                        <div className='flex flex-col gap-1 mb-4'>
                            <label htmlFor="">Nombre:</label>
                            <Controller
                                control={control}
                                name='name'
                                rules={{ required: 'Tu nombre es requerido' }}
                                render={({ field }) => (
                                    <TextInput type="text" {...field}
                                        placeholder='John Doe'
                                        className='h-10'
                                    />
                                )}
                            />
                            {errors.name && <span className='text-sm text-red-500'>{errors.name.message}</span>}
                        </div>
                        <div className='flex flex-col gap-1 mb-4'>
                            <label htmlFor="">Email:</label>
                            <Controller
                                control={control}
                                name='email'
                                rules={{ 
                                    required: 'El email es requerido',
                                    pattern: {
                                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                        message: 'Ingresa un email válido'
                                    }
                                }}
                                render={({ field }) => (
                                    <TextInput type="email" {...field}
                                        placeholder='johndoe@email.com'
                                        className='h-10'
                                    />
                                )}
                            />
                            {errors.email && <span className='text-sm text-red-500'>{errors.email.message}</span>}
                            {serverErrors.email && <span className='text-sm text-red-500'>{serverErrors.email}</span>}
                        </div>
                        <div className='flex flex-col gap-1 mb-4'>
                            <label htmlFor="">Contraseña:</label>
                            <Controller
                                control={control}
                                name='password'
                                rules={{ 
                                    required: 'La contraseña es requerida',
                                    minLength: {
                                        value: 8,
                                        message: 'La contraseña debe tener al menos 8 caracteres'
                                    }
                                }}
                                render={({ field }) => (
                                    <TextInput type='password' {...field}
                                        placeholder='Escriba su contraseña...'
                                        className='h-10'
                                    />
                                )}
                            />
                            {errors.password && <span className='text-sm text-red-500'>{errors.password.message}</span>}
                            {serverErrors.password && <span className='text-sm text-red-500'>{serverErrors.password}</span>}
                        </div>
                        {serverErrors.general && <span className='text-sm text-red-500'>{serverErrors.general}</span>}
                        <button type='submit' className='w-full h-10 bg-slate-900 text-white px-2 rounded-md'>
                            Crear cuenta
                        </button>
                    </form>
                </div>
                <div className='overflow-hidden col-span-1 h-svh'>
                    <img className='hover:scale-110 duration-150 w-full h-full object-cover object-right'
                        src='https://images.unsplash.com/photo-1504222490345-c075b6008014?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    />
                </div>
            </div>
        </section>
    )
}

export default Page;
