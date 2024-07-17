import React, { useState } from 'react';
import { Card } from '@tremor/react';
import { FaEdit, FaTrashAlt, FaInfoCircle, FaPrint } from 'react-icons/fa';
import ModalEdit from '../../../common/ModalEdit';

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

export function CardSales({ idQuotation, client, QuotationDate, description, quantity, total, product }: CardSalesProps) {
  const formatDate = (date: Date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('es-ES', options);
  };

  const [modalEdit, setModalEdit] = useState(false);

  const handleEditClick = () => {
    setModalEdit(true);
  };

  return (
    <>
      <Card className='h-76 w-80 flex flex-col justify-between cursor-pointer hover:shadow-md p-4 mx-auto md:mx-2'>
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 ml-4">
            <h2 className="text-xl font-bold">Cotización {idQuotation}</h2>
            <p className="text-blue-900 font-bold">Cliente: {client}</p>
            <p className="text-gray-800 font-bold">Fecha: {formatDate(QuotationDate)}</p>
            <p className="text-blue-800 font-bold">Cantidad de productos y/o servicios: {quantity}</p>
            <p className="text-black mt-2 font-bold">Descripción: {truncateText(description, 50)}</p>
            <p className="text-red-600 font-bold">Total: {total}</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="text-center flex flex-col items-center" onClick={handleEditClick}>
            <p className="text-blue-500">Editar</p>
            <FaEdit className="text-blue-500 cursor-pointer hover:text-blue-700" />
          </div>
          <div className="text-center flex flex-col items-center">
            <p className="text-orange-500">Imprimir</p>
            <FaPrint className="text-orange-500 cursor-pointer hover:text-orange-700" />
          </div>
          <div className="text-center flex flex-col items-center">
            <p className="text-green-500">Información</p>
            <FaInfoCircle className="text-green-500 cursor-pointer hover:text-green-700" />
          </div>
          <div className="text-center flex flex-col items-center">
            <p className="text-red-500">Eliminar</p>
            <FaTrashAlt className="text-red-500 cursor-pointer hover:text-red-700" />
          </div>
        </div>
      </Card>
      <ModalEdit open={modalEdit} setOpen={setModalEdit} >
        <div className="p-4">
          <h1 className="text-3xl font-bold text-black absolute top-2 left-2">Editar Cotización</h1>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-black">Modal editar</h2>
          </div>
        </div>
      </ModalEdit>
    </>
  );
}
