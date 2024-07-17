// /app/sucursal/[id]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import Sucursal from '@/src/components/sucursales/Sucursal';
import React from 'react';

const Page = () => {
    const { id } = useParams();

    if (!id) {
        return <div>Cargando...</div>;
    }

    return (
        <Sucursal id ={id} />
    );
}

export default Page;
