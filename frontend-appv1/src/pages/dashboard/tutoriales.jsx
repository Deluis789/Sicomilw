import React from "react";

const videos = [
    {
        id: "1cDJpfsSH_5AeY40HKY87LfGV-QoMUAtT",
        title: "INICIAR SESIÓN",
        description: "Este tutorial cubre cómo iniciar sesión en la plataforma correctamente.",
        source: "drive",
    },
    {
        id: "1JptE4y83PWVPXhjIC22W2vmIUjCmzRoz",
        title: "MÓDULO NOVEDADES",
        description: "Aquí se muestra cómo utilizar el módulo de novedades de la plataforma.",
        source: "drive",
    },
    {
        id: "1J7iNmlLhhdQuqdwGPfaqt7Rn8V2cUKhC",
        title: "MÓDULO DE PARTES",
        description: "Este video te enseña a gestionar y registrar partes en el sistema.",
        source: "drive",
    },
    {
        id: "1NI5P-tBTnrtTPKHeD968OPjedYl5jlhV",
        title: "MÓDULO INFORME",
        description: "Aprende cómo generar y gestionar informes.",
        source: "drive",
    },
];

const Tutoriales = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black">
            {/* Barra de navegación con logo */}
            <div className="bg-gray-900 py-4 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <img src="/img/logoMinisterioLogin.png" alt="Logo Institución" className="h-20 sm:h-24" />
                    <h1 className="text-white font-semibold text-2xl sm:text-3xl md:text-4xl text-center">
                        VIDEOS TUTORIALES USUARIOS
                    </h1>
                </div>
            </div>

            {/* Contenido principal de los tutoriales */}
            <div className="py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-12">
                        {videos.map((video) => (
                            <div
                                key={video.id}
                                className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl transform transition-transform hover:scale-105 duration-500 ease-in-out"
                            >
                                <div className="relative w-full h-0 pb-[56.25%] mb-6">
                                    <iframe
                                        className="absolute top-0 left-0 w-full h-full rounded-xl"
                                        src={
                                            video.source === "drive"
                                                ? `https://drive.google.com/file/d/${video.id}/preview`
                                                : `https://www.youtube.com/embed/${video.id}`
                                        }
                                        frameBorder="0"
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <div className="px-6 pb-6">
                                    <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">{video.title}</h2>
                                    <p className="text-sm text-gray-300 mb-6">{video.description}</p>
                                    <div className="flex justify-center">
                                        <a
                                            href={
                                                video.source === "drive"
                                                    ? `https://drive.google.com/file/d/${video.id}/view`
                                                    : `https://www.youtube.com/watch?v=${video.id}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block px-6 py-2 sm:px-8 sm:py-3 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-gray-600 to-gray-700 rounded-full shadow-lg transform transition-all hover:scale-105 duration-300 ease-in-out"
                                        >
                                            Ver Video
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tutoriales;
