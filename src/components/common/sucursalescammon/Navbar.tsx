'use client'
import React from 'react'
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import ThemeSwitcher from './ThemeSwitcher'
import { Icon } from '@tremor/react'


import { useEffect, useState } from 'react';

interface UserProfile {
  userId: number;
  fullName: string;
  email: string;
}

interface ApiResponse {
  value: UserProfile;
}


const Navbar = () => {

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          console.log('Bearer Token:', token);
  
          const response = await fetch('https://localhost:7208/api/Users/ProfileUser', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.message || 'No autorizado'}`);
          }
  
          const data: ApiResponse = await response.json();
          console.log('Data recibida:', data);
  
          setProfile(data.value);
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError('Error desconocido');
          }
        } finally {
          setLoading(false);
        }
      };
  
      fetchProfile();
    }, []);
  
    if (loading) {
      return <div>Cargando...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }


    return (
        <nav className='h-20 w-[calc(100vw-11rem)] fixed top-0 left-44 border-b-2'>
            <div className='h-full container mx-auto flex justify-between items-center'>
                <h1 className='text-2xl'>Inicio</h1>
                <div className='h-full flex items-center gap-4'>
                    <button>
                        <Icon icon={MagnifyingGlassIcon} className=' text-blue-950 dark:text-white' tooltip='Buscar' />
                    </button>
                    <ThemeSwitcher />
                    <div className='flex items-center gap-4 '>
                        <div className='h-10 w-10 bg-blue-950 flex items-center justify-center text-white rounded-full cursor-pointer'>
                            JD
                        </div>
                        {profile ? (
        <div>
          <p>{profile.fullName}</p>
        </div>
      ) : (
        <p>No se encontró información del perfil.</p>
      )}
                      
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar