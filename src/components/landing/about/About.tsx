import React from 'react';
import { CardsAboutData } from "./cardsAbout/CardsAboutData";
import { CardAbout } from "./cardsAbout/CardsAbout";

export function About() {
    return (
        <div className="flex flex-col min-h-screen">
            <section>
                <div className="flex-grow py-6 mb-20">
                    <div className="p-10 rounded shadow-md">
                        <h1 className="text-4xl font-bold text-center mb-10">Nosotros</h1>
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold degradedBlue bg-blueLight">Nosotros somos</h1>
                            <h3 className="text-lg">Admyller es una empresa innovadora dedicada a la gestión de talleres y refaccionarias a
                                través de nuestra plataforma web diseñada para cubrir todas tus necesidades administrativas. Nuestro enfoque se
                                centra en proporcionar herramientas eficientes y automatizadas que optimizan tus procesos clave, permitiéndote
                                concentrarte en lo que realmente importa: hacer crecer tu negocio.</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-6 rounded-lg shadow-md">
                                <h1 className="text-xl font-bold mb-2 degradedBlue bg-blueLight">Misión</h1>
                                <p>Nuestra misión es proporcionar una plataforma web integral que facilite la gestión eficiente de talleres y refaccionarias,
                                    automatizando y optimizando los procesos clave. Nos comprometemos a mejorar la productividad, la precisión en la toma de decisiones
                                    y la satisfacción del cliente a través de soluciones tecnológicas innovadoras y accesibles</p>
                            </div>
                            <div className="p-6 rounded-lg shadow-md">
                                <h1 className="text-xl font-bold mb-2 degradedBlue bg-blueLight">Visión</h1>
                                <p>Nuestra visión es ser la solución líder en la gestión de talleres y refaccionarias, reconocida por nuestra innovación, confiabilidad
                                    y capacidad para transformar la operatividad de nuestros clientes. Aspiramos a expandir nuestras funcionalidades y alcance, adaptándonos
                                    constantemente a las necesidades del mercado y de nuestros usuarios, contribuyendo al crecimiento sostenible del sector automotriz.</p>
                            </div>
                            <div className="p-6 rounded-lg shadow-md">
                                <h1 className="text-xl font-bold mb-2 degradedBlue bg-blueLight">Valores</h1>
                                <p>Nuestros valores son: </p>
                                <p>° Calidad </p>
                                <p>° Responsabilidad </p>
                                <p>° Innovación </p>
                                <p>° Trabajo en equipo </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
           
            <div className="min-h-screen flex items-center justify-center mt-0 sm:-mt-52 mb-56 container mx-auto sm:mb-40">
                <div className="flex flex-wrap justify-center gap-4">
                    {CardsAboutData.map(card => (
                        <CardAbout
                            key={card.id}
                            imageProfile={card.imageProfile}
                            name={card.name}
                            role={card.role}
                            description={card.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

