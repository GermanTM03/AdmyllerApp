// /app/sucursal/[id]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import Inventario from '@/src/components/sucursales/funciones/inventario';
import React from 'react';

const Page = () => {
    const { id } = useParams();

    if (!id) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            Holamundo
            <Inventario id ={id} />
        </div>
        // <SucursalEdit id ={id} />
    );
}

export default Page;
