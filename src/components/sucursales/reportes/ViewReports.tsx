"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import ReportForm from './Modal/ReportForm';

interface Report {
    reportId: number;
    customerName: string | null;
    address: string | null;
    phoneNumber: string | null;
    serialNumber: string | null;
    licensePlates: string | null;
    brand: string | null;
    mileage: number;
    fuelType: string | null;
    model: string | null;
    color: string | null;
    visualDetails: string | null;
    entryDate: string;
    valuableItems: string | null;
}

const ViewReports = ({ id }: { id: string }) => {
    const router = useRouter();
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingReport, setEditingReport] = useState<Report | null>(null);

    useEffect(() => {
        const fetchReports = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`https://localhost:7208/api/Reports/ReportBranch/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Error ${response.status}: ${errorData.message || 'No autorizado'}`);
                }

                const data: Report[] = await response.json();
                setReports(data);
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, [id]);

    const handleDelete = async (reportId: number) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`https://localhost:7208/api/Reports/DeleteReport/${reportId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message || 'No autorizado'}`);
            }

            alert('Reporte eliminado con éxito');
            setReports(reports.filter(report => report.reportId !== reportId));
            router.push('/dashboard');
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'Error desconocido');
        }
    };

    const openEditModal = (report: Report) => {
        setEditingReport(report);
    };

    const closeEditModal = () => {
        setEditingReport(null);
    };

    const handleEdit = async (editedReport: Report) => {
        // Aquí puedes implementar la lógica para editar el reporte, utilizando el ID de editedReport
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Detalles del Reporte</h1>
            {reports.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre del Cliente</th>
                            <th>Fecha de Ingreso</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map(report => (
                            <tr key={report.reportId}>
                                <td>{report.reportId}</td>
                                <td>{report.customerName || 'N/A'}</td>
                                <td>{new Date(report.entryDate).toLocaleString()}</td>
                                <td>
                                    <button onClick={() => openEditModal(report)}>Editar</button>
                                    <button onClick={() => handleDelete(report.reportId)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay datos disponibles.</p>
            )}

            {editingReport && (
                <ReportForm
                    report={editingReport}
                    onClose={closeEditModal}
                />
            )}
        </div>
    );
};

export default ViewReports;
