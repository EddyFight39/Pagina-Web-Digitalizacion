import { useEffect, useRef, useState, useMemo } from 'react';
import { Timeline, DataSet } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.css';

export function TimelineModal({ events, isOpen, onClose }) {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterCountry, setFilterCountry] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const countryMatch = filterCountry === 'all' || e.pais === filterCountry;
      const categoryMatch = filterCategory === 'all' || e.categoria === filterCategory;
      const searchMatch = searchQuery === '' || 
        e.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
      return countryMatch && categoryMatch && searchMatch;
    });
  }, [events, filterCountry, filterCategory, searchQuery]);

  const countries = useMemo(() => {
    return ['all', ...new Set(events.map(e => e.pais).filter(Boolean))];
  }, [events]);

  const categories = useMemo(() => {
    return ['all', ...new Set(filteredEvents.map(e => e.categoria).filter(Boolean))];
  }, [filteredEvents]);

  const formatDate = (iso) => {
    if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso || '—';
    const [y, m, d] = iso.split('-').map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d));
    return dt.toLocaleDateString('es-EC', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      timeZone: 'UTC',
    });
  };

  const itemsRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const items = new DataSet(
      filteredEvents.map(e => ({
        id: e.id,
        content: `<div class="font-semibold text-xs text-center px-2 py-1">${e.titulo}</div>`,
        start: e.fecha || '1900-01-01',
        title: `${e.titulo}\n${e.pais || 'General'} · ${e.categoria}\n${e.fecha || '—'}`,
        className: e.pais === 'Canadá' ? 'bg-green-600' : 'bg-blue-600'
      }))
    );

    itemsRef.current = items;

    const options = {
      stack: true,
      zoomMin: 1000 * 60 * 60 * 24 * 30,
      zoomMax: 1000 * 60 * 60 * 24 * 365 * 100,
      moveable: true,
      horizontalScroll: true,
      selectable: true,
      tooltip: { followMouse: true },
      timeAxis: { scale: 'year', step: 5 }
    };

    if (timelineRef.current) {
      timelineRef.current.destroy();
    }

    timelineRef.current = new Timeline(containerRef.current, items, options);
    
    timelineRef.current.on('click', (properties) => {
      if (properties.item) {
        const event = filteredEvents.find(e => e.id === properties.item);
        if (event) setSelectedEvent(event);
      }
    });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.destroy();
        timelineRef.current = null;
      }
    };
  }, [filteredEvents, isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCloseClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-[1000] p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/10 bg-slate-900">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">Línea de tiempo interactiva</h2>
            <p className="text-xs text-slate-400">Mostrando {filteredEvents.length} de {events.length} eventos</p>
          </div>
          <button
            onClick={handleCloseClick}
            className="text-2xl text-slate-400 hover:text-white transition flex-shrink-0 ml-2 p-1 cursor-pointer"
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Filtros */}
        <div className="px-4 py-3 bg-slate-800/50 border-b border-white/10 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">País</label>
              <select
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm text-white hover:border-white/40 focus:outline-none focus:border-white/60"
              >
                <option value="all">Todos los países</option>
                {countries.map(c => c !== 'all' && <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Categoría</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm text-white hover:border-white/40 focus:outline-none focus:border-white/60"
              >
                <option value="all">Todas las categorías</option>
                {categories.map(c => c !== 'all' && <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-slate-400 block mb-1">Buscar evento</label>
              <input
                type="text"
                placeholder="Escribe para filtrar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm text-white placeholder-slate-500 hover:border-white/40 focus:outline-none focus:border-white/60"
              />
            </div>
          </div>

          {/* Leyenda */}
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-600"></div>
              <span>🇪🇨 Ecuador</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-600"></div>
              <span>🇨🇦 Canadá</span>
            </div>
          </div>
        </div>
        
        {/* Timeline y Panel */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden gap-4 p-4">
          <div ref={containerRef} className="flex-1 rounded-xl overflow-hidden border border-white/10 bg-white/5 min-h-96"></div>
          
          {selectedEvent && (
            <div className="lg:w-96 flex flex-col gap-3 overflow-y-auto pr-2">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3 sticky top-0">
                <div>
                  <h3 className="font-semibold text-base mb-2">{selectedEvent.titulo}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedEvent.pais && (
                      <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${selectedEvent.pais === 'Canadá' ? 'bg-green-500/20 border-green-500/40 text-green-300' : 'bg-blue-500/20 border-blue-500/40 text-blue-300'}`}>
                        {selectedEvent.pais === 'Canadá' ? '🇨🇦' : '🇪🇨'} {selectedEvent.pais}
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold">
                      {selectedEvent.categoria}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-mono mb-3">
                    📅 {formatDate(selectedEvent.fecha)}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedEvent.descripcion}
                  </p>
                </div>

                {selectedEvent.imagen && (
                  <div className="rounded-lg overflow-hidden border border-white/10">
                    <img src={selectedEvent.imagen} alt={selectedEvent.titulo} className="w-full h-auto" />
                  </div>
                )}

                {(selectedEvent.fuentes || []).length > 0 && (
                  <div className="space-y-2 pt-3 border-t border-white/10">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase">📚 Fuentes</h4>
                    <ul className="space-y-2">
                      {selectedEvent.fuentes.map((f, i) => (
                        <li key={i} className="text-xs">
                          {f.url ? (
                            <a
                              href={f.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-300 hover:text-cyan-200 hover:underline break-words"
                            >
                              📄 {f.label} ↗
                            </a>
                          ) : (
                            <span className="text-slate-400">
                              📄 {f.label} {f.note && <span className="text-slate-600">({f.note})</span>}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {filteredEvents.length === 0 && (
          <div className="flex items-center justify-center flex-1 text-slate-400">
            <p>No hay eventos que coincidan con los filtros</p>
          </div>
        )}
      </div>
    </div>
  );
}
