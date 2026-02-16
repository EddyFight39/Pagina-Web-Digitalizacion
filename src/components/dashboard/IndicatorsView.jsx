import { useState, useMemo } from 'react';
import { getIndicatorSections } from '../../data/indicatorsContent';

export function IndicatorsView({ firmaTotal, firmaTop, firmaMax, firmaStats }) {
  const [indicatorQuery, setIndicatorQuery] = useState('');
  const [indicatorCategory, setIndicatorCategory] = useState('all');

  // 1. Generamos las secciones combinando la config estática con los datos dinámicos
  const sections = useMemo(() => {
    return getIndicatorSections(firmaTotal, firmaTop, firmaMax, firmaStats);
  }, [firmaTotal, firmaTop, firmaMax, firmaStats]);

  // 2. Extraemos las categorías únicas para el filtro
  const categories = useMemo(() => 
    ['all', ...new Set(sections.map(s => s.category))],
  [sections]);

  // 3. Filtramos las secciones según la búsqueda del usuario
  const filteredSections = sections.filter(s => {
    const matchesCategory = indicatorCategory === 'all' || s.category === indicatorCategory;
    const matchesSearch = !indicatorQuery || 
      s.title.toLowerCase().includes(indicatorQuery.toLowerCase()) ||
      s.tags.some(tag => tag.toLowerCase().includes(indicatorQuery.toLowerCase())) ||
      s.summary.toLowerCase().includes(indicatorQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* --- Barra de Filtros Interna --- */}
      <div className="p-4 rounded-2xl border bg-white/5 border-white/10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr]">
          <div>
            <label className="text-xs text-slate-400">Filtrar indicadores</label>
            <input
              type="text"
              value={indicatorQuery}
              onChange={(e) => setIndicatorQuery(e.target.value)}
              placeholder="Buscar por nombre, tag o descripción..."
              className="px-3 py-2 mt-1 w-full text-sm rounded-xl border bg-white/5 border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-500"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400">Categoría</label>
            <select
              value={indicatorCategory}
              onChange={(e) => setIndicatorCategory(e.target.value)}
              className="px-3 py-2 mt-1 w-full text-sm text-white rounded-xl border bg-white/5 border-white/10 cursor-pointer"
            >
              <option value="all" className="bg-white text-slate-900">Todas</option>
              {categories.filter(c => c !== 'all').map(cat => (
                <option key={cat} value={cat} className="bg-white text-slate-900">{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* --- Lista de Secciones Renderizadas --- */}
      <div className="space-y-12">
        {filteredSections.length > 0 ? (
          filteredSections.map(section => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              
              {/* Cabecera de la Sección */}
              <div className="mb-4 px-1">
                <div className="flex flex-wrap gap-2 items-center mb-2">
                  <h3 className="text-xl font-bold text-cyan-400">{section.title}</h3>
                  <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded border bg-white/10 border-white/20 text-slate-300">
                    {section.category}
                  </span>
                </div>
                
                <p className="text-sm text-slate-400 max-w-3xl mb-3">
                  {section.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {section.tags.map(tag => (
                    <span key={tag} className="text-xs text-slate-500">#{tag}</span>
                  ))}
                </div>
              </div>

              {/* Contenido (Gráficos, Tablas, etc.) */}
              {section.content}
              
              {/* Separador visual entre secciones */}
              <div className="mt-12 border-b border-white/5"></div>
            </section>
          ))
        ) : (
          <div className="p-8 text-center rounded-2xl border border-dashed bg-white/5 border-white/10">
            <p className="text-slate-400">No se encontraron indicadores con esos filtros.</p>
            <button 
              onClick={() => { setIndicatorQuery(''); setIndicatorCategory('all'); }}
              className="mt-2 text-sm text-cyan-400 hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}