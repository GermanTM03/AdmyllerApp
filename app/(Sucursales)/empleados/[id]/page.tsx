// /app/sucursal/[id]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import Inventario from '@/src/components/sucursales/inventario/Inventario';
import React from 'react';

const Page = () => {
    const { id } = useParams<{ id: string }>(); // Asegurar que id sea una cadena de texto

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
