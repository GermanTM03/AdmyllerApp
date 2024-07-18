// /app/sucursal/[id]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import AddReports from '@/src/components/sucursales/reportes/AddReports';
import ViewReports from '@/src/components/sucursales/reportes/ViewReports';
import React from 'react';

const Page = () => {
    const { id } = useParams<{ id: string }>(); // Asegurar que id sea una cadena de texto

    if (!id) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            Holamundo
            <AddReports id ={id} />
            <ViewReports id ={id} />

        </div>
        // <SucursalEdit id ={id} />
    );
}

export default Page;
