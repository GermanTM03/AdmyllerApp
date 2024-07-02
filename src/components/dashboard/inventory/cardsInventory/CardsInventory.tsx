import { CardInventoryProps } from "./ICardsInventory";
import { Card } from '@tremor/react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + "";
}

export function CardInventory({ imgProduct, nameProduct, price, quantity, description }: CardInventoryProps) {
    return (
        <Card className='h-76 w-80 flex flex-col justify-between cursor-pointer hover:shadow-md p-4 mx-auto md:mx-2'>
            <div className="flex items-center justify-between mb-4">
                {imgProduct && (
                    <img src={imgProduct} alt={nameProduct} className="h-16 w-16 object-cover rounded-md" />
                )}
                <div className="flex-1 ml-4">
                    <h2 className="text-xl font-bold">{truncateText(nameProduct, 37)}</h2>
                    <p className="text-red-500 font-bold">Precio: ${price}</p>
                    <p className="text-blue-900 font-bold">Cantidad: {quantity}</p>
                    <p className="text-black mt-2">Descripción: {truncateText(description, 91)}</p>
                </div>
            </div>
            <div className="flex space-x-48">
                <div className="text-center flex flex-col items-center">
                    <p className="text-blue-500">Editar</p>
                    <FaEdit className="text-blue-500 cursor-pointer hover:text-blue-700" />
                </div>
                <div className="text-center flex flex-col items-center">
                    <p className="text-red-500">Eliminar</p>
                    <FaTrashAlt className="text-red-500 cursor-pointer hover:text-red-700" />
                </div>
            </div>
        </Card>
    );
}
