import { CardOrdersProps } from "./ICardsOrders";
import { Card } from '@tremor/react';
import Link from "next/link";


export function CardOrders({  clientName, licensePlate, vehicleSerialNumber }: CardOrdersProps) {
   
    return (
        <Card className='h-64 w-80 flex flex-col  justify-between cursor-pointer hover:shadow-md '>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl text-slate-900 font-bold tracking-wide" style={{ color: 'rgb(15 23 42)' }}>
                    {clientName}
                </h1>

            </div>
            <div className="mt-2">
                <p className="text-base text-black font-bold tracking-wide">Placas: {licensePlate}</p>
                <p className="text-base text-black font-bold tracking-wide">Num serie: {vehicleSerialNumber}</p>
            </div>
            <div className="flex justify-center mt-4">
                <button className="px-3 py-1 bg-slate-900 text-white border border-blue-900 rounded-md">
                    <Link href="/historial">Consultar</Link>
                </button>
            </div>
        </Card>
    );
}