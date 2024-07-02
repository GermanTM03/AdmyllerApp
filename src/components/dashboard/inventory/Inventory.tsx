'use client'
import Modal from '../../common/Modal'
import { Button, TextInput } from '@tremor/react'
import React, { useState } from 'react'
import { FaBoxes, FaPlus } from 'react-icons/fa';
import { CardsInventoryData } from "./cardsInventory/CardsInventoryData";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { CardInventory } from "./cardsInventory/CardsInventory";

export function Inventory() {
    const [modal, setModal] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Inventario</h1>
                <TextInput  icon={MagnifyingGlassIcon}  placeholder='Buscar por nombre de producto...' className='max-w-full lg:max-w-md w-full '/>
                <Button 
                    icon={FaBoxes} 
                    className='bg-blue-900 text-white border border-blue-900 rounded-md' 
                    onClick={() => setModal(true)}> Agregar producto
                </Button>
            </div>
            <Modal open={modal} setOpen={setModal}>
                <div className="p-4">
                    <h1 className="text-3xl font-bold text-black absolute top-2 left-2">Agregar producto</h1>
                    <div className="text-center mt-10">
                        <h2 className="text-2xl font-semibold text-black">Producto</h2>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <div className="w-1/4">
                            <h4>Foto producto</h4>
                            <label className="flex items-center justify-center w-full p-2 border border-gray-300 rounded-md text-blue-500 cursor-pointer bg-white hover:bg-gray-100">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="h-16 w-16 object-cover" />
                                ) : (
                                    <>
                                        <FaPlus className="mr-2" />
                                        <span>Agregar imagen</span>
                                    </>
                                )}
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={handleImageChange} 
                                />
                            </label>
                        </div>
                        <div className="w-1/4">
                            <h4>Nombre:</h4>
                            <input type="text" placeholder="Nombre" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="w-1/4">
                            <h4>Precio:</h4>
                            <input type="number" placeholder="Precio" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="w-1/4">
                            <h4>Cantidad:</h4>
                            <input type="number" placeholder="Cantidad" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <div className="w-1/2">
                            <h4>Descripción:</h4>
                            <input type="text" placeholder="Descripción" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                    </div>            
                    <div className="flex justify-end gap-4 mt-6">
                        <button className="px-4 py-2 bg-white text-red-500 border border-red-500 rounded-md" onClick={() => setModal(false)}>Cerrar</button>
                        <button className="px-4 py-2 bg-blue-900 text-white border border-blue-900 rounded-md">Guardar</button>
                    </div>
                </div>
            </Modal>
            <section>
              <div >
                  <div className="flex flex-wrap justify-center gap-4">
                    {CardsInventoryData.map(card => (
                        <CardInventory
                            key={card.id}
                            imgProduct={card.imgProduct}
                            nameProduct={card.nameProduct}
                            price={card.price}
                            quantity={card.quantity}
                            description={card. description}

                        />
                    ))}
                  </div>
              </div>
            </section>
        </div>
    );
}
