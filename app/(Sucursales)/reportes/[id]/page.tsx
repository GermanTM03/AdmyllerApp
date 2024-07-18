// /app/sucursal/[id]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import AddReports from '@/src/components/sucursales/funciones/AddReports';
import React from 'react';

const Page = () => {
    const { id } = useParams();

    if (!id) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            Holamundo
            <AddReports id ={id} />
        </div>
        // <SucursalEdit id ={id} />
    );
}

export default Page;
