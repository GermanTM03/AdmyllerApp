// /app/sucursal/[id]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import SucursalEdit from '@/src/components/sucursales/sucursal/SucursalEdit';
import React from 'react';

const Page = () => {
    const { id } = useParams<{ id: string }>(); // Asegurar que id sea una cadena de texto

    if (!id) {
        return <div>Cargando...</div>;
    }

    return (
        <SucursalEdit id ={id} />
    );
}

export default Page;
