"use client";

import React, { useState } from 'react';

const employeesData = [
    { id: 1, name: 'John Doe', position: 'Software Engineer', area: 'Development', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Jane Smith', position: 'Project Manager', area: 'Management', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Sam Johnson', position: 'Product Designer', area: 'Design', image: 'https://via.placeholder.com/150' },
];

export function Employees() {
    const [employees, setEmployees] = useState(employeesData);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', position: '', area: '' });

    const showEmployeeDetails = (employee) => {
        setSelectedEmployee(employee);
        setIsEditing(false);
        setFormData({ name: employee.name, position: employee.position, area: employee.area });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.position || !formData.area) {
            alert('Todos los campos son obligatorios');
            return;
        }

        setEmployees(employees.map(emp => (emp.id === selectedEmployee.id ? { ...emp, ...formData } : emp)));
        setSelectedEmployee({ ...selectedEmployee, ...formData });
        setIsEditing(false);
    };

    return (
        <div className="text-center p-6">
            <h1 className="text-3xl font-bold mb-6">Empleados</h1>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Puesto</th>
                        <th className="px-4 py-2">Área</th>
                        <th className="px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id} className="bg-white border-t border-gray-200">
                            <td className="px-4 py-2">{employee.name}</td>
                            <td className="px-4 py-2">{employee.position}</td>
                            <td className="px-4 py-2">{employee.area}</td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => showEmployeeDetails(employee)}
                                    className="bg-gray-800 text-white rounded-full p-2 focus:outline-none"
                                >
                                    Ver detalles
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedEmployee && (
                <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Puesto</label>
                                <input
                                    type="text"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Área</label>
                                <input
                                    type="text"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Guardar
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <h2 className="text-xl font-semibold mb-2">{selectedEmployee.name}</h2>
                            <p className="text-gray-600 mb-1">Puesto: {selectedEmployee.position}</p>
                            <p className="text-gray-600">Área: {selectedEmployee.area}</p>
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={handleEdit}
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => setSelectedEmployee(null)}
                                    className="bg-gray-800 text-white rounded-full p-2 focus:outline-none"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
