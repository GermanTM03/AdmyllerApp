// /app/sucursal/[id]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import SucursalEdit from '@/src/components/sucursales/funciones/SucursalEdit';
import React from 'react';

const Page = () => {
    const { id } = useParams();

    if (!id) {
        return <div>Cargando...</div>;
    }

    return (
        <SucursalEdit id ={id} />
    );
}

export default Page;
