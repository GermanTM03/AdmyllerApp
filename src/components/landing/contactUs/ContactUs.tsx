"use client"; // Agrega esta línea al principio

import { useState } from "react";

export function ContactUs () {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const target = event.target as typeof event.target & {
      name: { value: string };
      email: { value: string };
      message: { value: string };
    };

    const data = {
      name: target.name.value,
      email: target.email.value,
      message: target.message.value,
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Mensaje enviado exitosamente");
      setLoading(false);
      // Reiniciar el formulario
      target.name.value = "";
      target.email.value = "";
      target.message.value = "";
    } else {
      console.log("Error al enviar el mensaje");
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-100 p-8 mb-20">
      <form onSubmit={handleSubmit} className="max-w-lg w-full p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Formulario de Contacto</h2>
        <div className="w-full flex flex-col my-4">
          <label className="font-bold text-gray-800" htmlFor="name">
            Nombre
          </label>
          <input
            type="text"
            minLength={3}
            maxLength={150}
            required
            className="p-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            autoComplete="off"
            id="name"
            name="name"
          />
        </div>
        <div className="w-full flex flex-col my-4">
          <label className="font-bold text-gray-800" htmlFor="email">
            Correo electrónico
          </label>
          <input
            type="email"
            minLength={5}
            maxLength={150}
            required
            className="p-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            autoComplete="off"
            id="email"
            name="email"
          />
        </div>
        <div className="w-full flex flex-col my-4">
          <label className="font-bold text-gray-800" htmlFor="message">
            Mensaje
          </label>
          <textarea
            rows={4}
            required
            minLength={10}
            maxLength={500}
            name="message"
            className="w-full p-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 w-full bg-blue-700 disabled:bg-blue-400 disabled:text-gray-100 text-white font-medium mt-4 rounded-md"
        >
          {loading ? "Enviando..." : "Enviar Mensaje"}
        </button>
      </form>
    </div>
  );
};

