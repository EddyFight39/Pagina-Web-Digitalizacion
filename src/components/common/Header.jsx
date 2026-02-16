import { Link } from 'react-router-dom';

export function Header({
  title,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedCountry,
  setSelectedCountry,
  sortOrder,
  setSortOrder,
  onlyWithSources,
  setOnlyWithSources,
  compactView,
  setCompactView,
  categories,
  countries,
  headerCollapsed,
  setHeaderCollapsed,
  stats,
  onExport,
  onCopyAPA
}) {
  return (
    <header className="z-10 border-b backdrop-blur md:sticky md:top-0 border-white/10 bg-slate-950/80">
      <div className="flex flex-col gap-4 px-3 py-3 mx-auto max-w-6xl md:px-4 md:py-4 md:gap-5">
        {/* --- Top Bar: Logo, Info y Botones de Acción --- */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
          <Link
            to="/"
            className="flex gap-3 items-center transition hover:opacity-90"
            aria-label="Ir al inicio"
          >
            <div className="flex overflow-hidden justify-center items-center p-1 w-12 h-12 rounded-full border bg-white/90 border-white/20">
              <img
                src={`${import.meta.env.BASE_URL}logo3.png`}
                alt="Universidad Central del Ecuador"
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-wide">LEGISLACION INFORMATICA</h1>
              <p className="text-xs text-slate-400">Universidad Central del Ecuador</p>
            </div>
          </Link>

          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => window.print()}
              className="border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full text-sm transition"
            >
              Imprimir
            </button>
            <button
              onClick={onExport}
              className="border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full text-sm transition"
            >
              Exportar Excel
            </button>
            <button
              onClick={onCopyAPA}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-4 py-1.5 rounded-full text-sm transition"
            >
              Copiar APA 7
            </button>
            <button
              onClick={() => setHeaderCollapsed(prev => !prev)}
              className="md:hidden border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full text-sm font-semibold transition"
              title={headerCollapsed ? 'Mostrar filtros' : 'Ocultar filtros'}
            >
              {headerCollapsed ? '▼ Filtros' : '▲ Filtros'}
            </button>
          </div>
        </div>

        {/* --- Título Principal --- */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold leading-tight md:text-4xl">
            {title || 'Nivel de Digitalización en Ecuador'}
          </h2>
        </div>

        {/* --- Área de Filtros y Estadísticas (Colapsable) --- */}
        {!headerCollapsed && (
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
            
            {/* Panel de Filtros */}
            <div className="p-4 rounded-2xl border bg-white/5 border-white/10">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {/* Buscador */}
                <div className="sm:col-span-2 md:col-span-2">
                  <label className="text-xs text-slate-400">Buscar</label>
                  <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Ej: LOPDP, 2023, INEC, Reglamento..."
                    className="px-3 py-2 mt-1 w-full text-sm rounded-xl border bg-white/5 border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-500"
                  />
                </div>

                {/* Selector de Categoría */}
                <div>
                  <label className="text-xs text-slate-400">Categoría</label>
                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 mt-1 w-full text-sm text-white rounded-xl border bg-white/5 border-white/10 cursor-pointer"
                  >
                    <option value="all" className="bg-white text-slate-900">Todas</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="bg-white text-slate-900">{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Selector de País */}
                <div>
                  <label className="text-xs text-slate-400">País</label>
                  <select
                    value={selectedCountry}
                    onChange={e => setSelectedCountry(e.target.value)}
                    className="px-3 py-2 mt-1 w-full text-sm text-white rounded-xl border bg-white/5 border-white/10 cursor-pointer"
                  >
                    <option value="all" className="bg-white text-slate-900">Todos</option>
                    {countries.map(country => (
                      <option key={country} value={country} className="bg-white text-slate-900">{country}</option>
                    ))}
                  </select>
                </div>

                {/* Ordenamiento */}
                <div>
                  <label className="text-xs text-slate-400">Orden</label>
                  <select
                    value={sortOrder}
                    onChange={e => setSortOrder(e.target.value)}
                    className="px-3 py-2 mt-1 w-full text-sm text-white rounded-xl border bg-white/5 border-white/10 cursor-pointer"
                  >
                    <option value="desc" className="bg-white text-slate-900">Más reciente → más antiguo</option>
                    <option value="asc" className="bg-white text-slate-900">Más antiguo → más reciente</option>
                  </select>
                </div>

                {/* Checkboxes */}
                <div className="flex flex-col justify-center gap-2 pt-2 sm:pt-0">
                  <label className="flex gap-2 items-center text-sm cursor-pointer hover:text-cyan-300 transition">
                    <input
                      type="checkbox"
                      checked={onlyWithSources}
                      onChange={e => setOnlyWithSources(e.target.checked)}
                      className="rounded border-white/20 bg-white/10 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
                    />
                    Solo con fuentes
                  </label>
                  <label className="flex gap-2 items-center text-sm cursor-pointer hover:text-cyan-300 transition">
                    <input
                      type="checkbox"
                      checked={compactView}
                      onChange={e => setCompactView(e.target.checked)}
                      className="rounded border-white/20 bg-white/10 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
                    />
                    Vista compacta
                  </label>
                </div>
              </div>
            </div>

            {/* Tarjetas de Estadísticas Rápidas */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex flex-col items-center p-6 text-center bg-gradient-to-br rounded-2xl border transition from-blue-600/20 to-blue-600/5 border-blue-500/30 hover:border-blue-500/50">
                <div className="flex gap-2 justify-center items-center mb-3">
                  <span className="text-xl">📊</span>
                  <div className="text-xs font-semibold text-blue-400 uppercase">Total</div>
                </div>
                <div className="text-3xl font-bold text-blue-300">{stats?.total || 0}</div>
                <p className="mt-2 text-[10px] text-slate-400">Eventos en la base</p>
              </div>

              <div className="flex flex-col items-center p-6 text-center bg-gradient-to-br rounded-2xl border transition from-green-600/20 to-green-600/5 border-green-500/30 hover:border-green-500/50">
                <div className="flex gap-2 justify-center items-center mb-3">
                  <span className="text-xl">✅</span>
                  <div className="text-xs font-semibold text-green-400 uppercase">Visibles</div>
                </div>
                <div className="text-3xl font-bold text-green-300">{stats?.shown || 0}</div>
                <p className="mt-2 text-[10px] text-slate-400">Tras aplicar filtros</p>
              </div>

              <div className="flex flex-col items-center p-6 text-center bg-gradient-to-br rounded-2xl border transition from-purple-600/20 to-purple-600/5 border-purple-500/30 hover:border-purple-500/50">
                <div className="flex gap-2 justify-center items-center mb-3">
                  <span className="text-xl">🏷️</span>
                  <div className="text-xs font-semibold text-purple-400 uppercase">Categorías</div>
                </div>
                <div className="text-3xl font-bold text-purple-300">{categories.length - 1}</div>
                <p className="mt-2 text-[10px] text-slate-400">Temas activos</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}