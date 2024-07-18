// /app/sucursal/[id]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import AddCitas from '@/src/components/sucursales/citas/AddCitas';
import Citas from '@/src/components/sucursales/citas/Citas';
import React from 'react';

const Page = () => {
    const { id } = useParams() as { id: string };

    if (!id) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <AddCitas id={id} />
            <Citas id={id} />
        </div>
    );
}


export default Page;
