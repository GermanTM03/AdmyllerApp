"use client"
import Link from "next/link";
import React, { useState } from 'react';

export function Legal() {
    const [feedbackGiven, setFeedbackGiven] = useState(false);
    const [feedbackOption, setFeedbackOption] = useState(null);

    const handleOptionSelect = (option) => {
        setFeedbackOption(option);
    };

    const handleSubmitFeedback = () => {
        // Aquí podrías enviar el feedback a tu backend o realizar alguna acción con el feedbackOption
        setFeedbackGiven(true);
    };
    return (
        <div className="p-4 md:p-8 lg:p-12">
            <section className="mb-8">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Términos y Condiciones</h1>
                <p className="mb-4">Bienvenido a Admyller. Al acceder y utilizar nuestros servicios de administración y gestión de talleres y refaccionarias, aceptas cumplir con estos Términos y Condiciones. Si no estás de acuerdo con estos términos, por favor no utilices nuestros servicios.</p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Servicios</h2>
                <p className="mb-4">Proveemos una plataforma para la administración y gestión de talleres y refaccionarias, incluyendo pero no limitándose a la gestión de inventarios, reservas, facturación y reportes.</p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Uso del Servicio</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>Debes ser mayor de edad y tener la capacidad legal para contratar.</li>
                    <li>Proporcionar información veraz y completa durante el proceso de registro.</li>
                    <li>Mantener la confidencialidad de tus credenciales de acceso.</li>
                    <li>No utilizar el servicio para fines ilegales o no autorizados.</li>
                </ul>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Propiedad Intelectual</h2>
                <p className="mb-4">Todos los contenidos, marcas, logotipos y demás elementos de propiedad intelectual en nuestra plataforma son propiedad exclusiva de Admyller y están protegidos por las leyes aplicables.</p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Limitación de Responsabilidad</h2>
                <p className="mb-4">Admyller no será responsable por daños directos, indirectos, incidentales, especiales o consecuentes que resulten del uso o la imposibilidad de uso de nuestro servicio.</p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Modificaciones</h2>
                <p className="mb-4">Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones serán efectivas al publicarse en nuestro sitio web.</p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Ley Aplicable</h2>
                <p className="mb-4">Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes de México.</p>
            </section>
            <section className="mb-8">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Aviso de Privacidad</h1>
                <p className="mb-4">En Admyller, valoramos tu privacidad y nos comprometemos a proteger tus datos personales. Este Aviso de Privacidad explica cómo recopilamos, usamos y compartimos tu información.</p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Información Recopilada</h2>
                <p className="mb-4">Podemos recopilar la siguiente información:</p>
                <ul className="list-disc list-inside mb-4">
                    <li>Datos personales: nombre, dirección, correo electrónico, número de teléfono.</li>
                    <li>Información de la empresa: nombre de la empresa, dirección, información de contacto.</li>
                    <li>Información de uso: datos sobre cómo utilizas nuestra plataforma.</li>
                </ul>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Uso de la Información</h2>
                <p className="mb-4">Utilizamos la información recopilada para:</p>
                <ul className="list-disc list-inside mb-4">
                    <li>Proveer y mejorar nuestros servicios.</li>
                    <li>Comunicarnos contigo sobre tu cuenta y nuestros servicios.</li>
                    <li>Cumplir con obligaciones legales y regulatorias.</li>
                </ul>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Compartir Información</h2>
                <p className="mb-4">No compartimos tu información personal con terceros, excepto cuando sea necesario para:</p>
                <ul className="list-disc list-inside mb-4">
                    <li>Proveer nuestros servicios (por ejemplo, con proveedores de servicios).</li>
                    <li>Cumplir con la ley.</li>
                    <li>Proteger nuestros derechos y propiedad.</li>
                </ul>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Seguridad</h2>
                <p className="mb-4">Implementamos medidas de seguridad adecuadas para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción.</p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Derechos del Usuario</h2>
                <p className="mb-4">Tienes derecho a:</p>
                <ul className="list-disc list-inside mb-4">
                    <li>Acceder a tus datos personales.</li>
                    <li>Solicitar la corrección de datos inexactos.</li>
                    <li>Solicitar la eliminación de tus datos personales.</li>
                </ul>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Contacto</h2>
                <p className="mb-4">Para cualquier consulta sobre este Aviso de Privacidad, puedes contactarnos en:</p>
                <Link href="/contact" className="px-4 py-1 rounded-md bg-blueRadial text-white font-bold text-xs sm:text-sm tracking-wide">Contactanos</Link>
            </section>
            <section className="mb-8" >
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Condiciones de Uso</h1>
                <p className="mb-4">Estas Condiciones de Uso rigen tu acceso y uso de los servicios proporcionados por Admyller. Al utilizar nuestros servicios, aceptas cumplir con estas condiciones.</p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Registro y Cuenta</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>Debes registrarte para utilizar nuestros servicios.</li>
                    <li>Proporcionar información veraz y mantenerla actualizada.</li>
                    <li>Ser responsable de todas las actividades que ocurran bajo tu cuenta.</li>
                </ul>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Conducta del Usuario</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>No usar nuestros servicios para actividades ilegales.</li>
                    <li>No intentar acceder sin autorización a nuestras redes o sistemas.</li>
                    <li>No transmitir virus, malware o cualquier otro código dañino.</li>
                </ul>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Terminación del Servicio</h2>
                <p className="mb-4">Nos reservamos el derecho de suspender o terminar tu acceso a nuestros servicios en caso de violación de estas condiciones o de cualquier ley aplicable.</p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Propiedad Intelectual</h2>
                <p className="mb-4">Todo el contenido y software de nuestra plataforma es propiedad de Admyller y está protegido por las leyes de propiedad intelectual.</p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Limitación de Responsabilidad</h2>
                <p className="mb-4">Admyller no será responsable por cualquier daño derivado del uso de nuestra plataforma, incluyendo, pero no limitado a, daños directos, indirectos, incidentales, punitivos y consecuentes.</p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Modificaciones</h2>
                <p className="mb-4">Podemos modificar estas Condiciones de Uso en cualquier momento. Las modificaciones serán efectivas al publicarse en nuestro sitio web.</p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Ley Aplicable</h2>
                <p className="mb-4">Estas Condiciones de Uso se regirán e interpretarán de acuerdo con las leyes de México.</p>
            </section>
        
            <div className="relative right-0 md:right-64 shadow-lg rounded-lg p-4 max-w-md mx-auto mt-4">
            {!feedbackGiven ? (
                <>
                    <h2 className="text-lg font-semibold mb-4">¿Te fue útil esta información?</h2>
                    <div className="flex justify-between mb-4">
                        <button
                            onClick={() => handleOptionSelect('no')}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mr-2"
                        >
                            Sí
                        </button>
                        <button
                            onClick={() => handleSubmitFeedback()}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg ml-2"
                        >
                            No
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h2 className="text-lg font-semibold mb-4">Gracias por tus comentarios</h2>
                    <p className="mb-4">¿Qué te pareció?</p>
                    <div className="mb-4">
                        <label className="block mb-2">Selecciona una opción:</label>
                        <div>
                            <label className="inline-flex items-center mb-2">
                                <input
                                    type="radio"
                                    name="feedbackOption"
                                    value="confusa"
                                    onChange={() => handleOptionSelect('confusa')}
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2">La información es confusa o incorrecta</span>
                            </label>
                            <label className="inline-flex items-center mb-2">
                                <input
                                    type="radio"
                                    name="feedbackOption"
                                    value="no-encontrada"
                                    onChange={() => handleOptionSelect('no-encontrada')}
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2">Esta no es la información que estaba buscando</span>
                            </label>
                            <label className="inline-flex items-center mb-2">
                                <input
                                    type="radio"
                                    name="feedbackOption"
                                    value="no-gusta"
                                    onChange={() => handleOptionSelect('no-gusta')}
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2">No me gusta esta política</span>
                            </label>
                        </div>
                    </div>
                    <button
                        onClick={() => handleSubmitFeedback()}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                    >
                        Enviar
                    </button>
                </>
            )}
        </div>
        </div>
        
    );
}
