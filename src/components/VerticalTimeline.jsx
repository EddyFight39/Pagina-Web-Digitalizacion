import { useState, useMemo } from 'react';

export function VerticalTimeline({ events = [] }) {
  const [showEcuador, setShowEcuador] = useState(true);
  const [showCanada, setShowCanada] = useState(true);
  const [showChile, setShowChile] = useState(true);

  const filteredEvents = useMemo(() => {
    return events
      .filter(e => {
        if (e.pais === 'Ecuador' && !showEcuador) return false;
        if (e.pais === 'Canadá' && !showCanada) return false;
        if (e.pais === 'Chile' && !showChile) return false;
        return true;
      })
      .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  }, [events, showEcuador, showCanada, showChile]);

  const getCountryColor = (pais) => {
    if (pais === 'Canadá') return 'bg-green-600';
    if (pais === 'Chile') return 'bg-red-600';
    return 'bg-blue-600';
  };

  const getCountryFlag = (pais) => {
    if (pais === 'Canadá') return '🇨🇦';
    if (pais === 'Chile') return '�🇱';
    return '�🇪🇨';
  };

  return (
    <div className="px-3 py-6 mx-auto w-full max-w-4xl sm:py-8 sm:px-4">
      {/* Controles de filtro */}
      <div className="flex flex-wrap gap-4 justify-center mb-6 sm:mb-12 sm:gap-6">
        <label className="flex gap-3 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showEcuador}
            onChange={(e) => setShowEcuador(e.target.checked)}
            className="w-5 h-5 cursor-pointer"
          />
          <span className="text-lg font-semibold">🇪🇨 Ecuador</span>
        </label>
        <label className="flex gap-3 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showCanada}
            onChange={(e) => setShowCanada(e.target.checked)}
            className="w-5 h-5 cursor-pointer"
          />
          <span className="text-lg font-semibold">🇨🇦 Canadá</span>
        </label>
        <label className="flex gap-3 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showChile}
            onChange={(e) => setShowChile(e.target.checked)}
            className="w-5 h-5 cursor-pointer"
          />
          <span className="text-lg font-semibold">🇨🇱 Chile</span>
        </label>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Línea central */}
        <div className="hidden absolute left-1/2 w-1 h-full bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 transform -translate-x-1/2 sm:block"></div>

        {/* Eventos */}
        <div className="space-y-12">
          {filteredEvents.map((event, index) => {
            const isLeft = index % 2 === 0;
            const isCanada = event.pais === 'Canadá';
            const colorClass = getCountryColor(event.pais);
            const flag = getCountryFlag(event.pais);
            const year = event.fecha ? parseInt(event.fecha.split('-')[0]) : new Date().getFullYear();

            return (
              <div key={event.id} className="relative">
                <div className={`flex flex-col sm:flex-row ${isLeft ? '':'sm:flex-row-reverse'}`}>
                  {/* Mitad izquierda o derecha con contenido */}
                  <div className="px-3 py-3 w-full sm:w-1/2 sm:px-6 sm:py-4">
                    <div className={`bg-white rounded-lg shadow-lg p-5 border-l-4 transition active:scale-[0.99] ${isCanada ? 'border-green-600' : 'border-blue-600'}`}>
                      <div className="mb-2 text-xs font-semibold text-gray-500 sm:hidden">
                        {year} · {event.pais}
                      </div>
                      <div className="flex gap-2 items-center mb-2">
                        <span className="text-3xl">{flag}</span>
                        <span className="text-sm font-bold text-gray-600 uppercase">
                          {event.pais}
                        </span>
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-gray-800">
                        {event.titulo}
                      </h3>
                      <p className="mb-3 text-sm text-gray-700">
                        {event.descripcion}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded">
                          {event.categoria}
                        </span>
                      </div>
                      {event.fuentes && event.fuentes.length > 0 && (
                        <div className="pt-3 mt-3 border-t border-gray-200">
                          <p className="mb-2 text-xs font-semibold text-gray-600">Fuentes:</p>
                          <ul className="space-y-1">
                            {event.fuentes.map((fuente, i) => (
                              <li key={i}>
                                {fuente.url ? (
                                  <a
                                    href={fuente.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-600 hover:underline"
                                  >
                                    {fuente.label} ↗
                                  </a>
                                ) : (
                                  <span className="text-xs text-gray-600">{fuente.label}</span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Centro: Círculo con año */}
                  <div className="hidden justify-center w-0 sm:flex">
                    <div className={`flex relative z-10 justify-center items-center w-16 h-16 text-xl font-bold text-white rounded-full border-4 border-white shadow-lg ${colorClass}`}>
                      {year}
                    </div>
                  </div>

                  {/* Mitad derecha o izquierda vacía */}
                  <div className="hidden w-1/2 sm:block"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filteredEvents.length === 0 && (
        <div className="py-12 text-center text-gray-500">
          <p className="text-lg">No hay eventos para mostrar</p>
        </div>
      )}
    </div>
  );
}
