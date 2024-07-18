// /app/sucursal/[id]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import Inventario from '@/src/components/sucursales/inventario/Inventario';
import AddProduct from '@/src/components/sucursales/inventario/AddProduct';
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
            <AddProduct id ={id} />
        </div>
        // <SucursalEdit id ={id} />
    );
}

export default Page;
