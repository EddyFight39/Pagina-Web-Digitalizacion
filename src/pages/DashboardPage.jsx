import { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';

// --- Componentes de UI Globales ---
import { Header } from '../components/common/Header';
import { TimelineModal } from '../components/ui/TimelineModal';
import { VerticalTimeline } from '../components/ui/VerticalTimeline';
import { ReportInteractive } from '../components/ui/ReportInteractive';

// --- Sub-vistas del Dashboard ---
import { EventsView } from '../components/dashboard/EventsView';
import { IndicatorsView } from '../components/dashboard/IndicatorsView';
import { SynthesisView } from '../components/dashboard/SynthesisView';
import { BibliographyView } from '../components/dashboard/BibliographyView';

// --- Hooks y Utilidades ---
import { useEvents } from '../hooks/useEvents';
import { useFirmaStats } from '../hooks/useFirmaStats';
import { buildAPA } from '../utils/citations';

export function DashboardPage() {
  // 1. Lógica de Eventos (Filtros, Búsqueda, Datos)
  const {
    filtered,
    categories,
    countries,
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
    metadata
  } = useEvents();

  // 2. Lógica de Estadísticas Externas (CSV FirmaEC, etc.)
  const { firmaStats, firmaTotal, firmaTop, firmaMax } = useFirmaStats();

  // 3. Estado Local de la UI
  const [contentTab, setContentTab] = useState('eventos');
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isVerticalTimelineOpen, setIsVerticalTimelineOpen] = useState(false);
  const [compactView, setCompactView] = useState(false);
  const [headerCollapsed, setHeaderCollapsed] = useState(false);
  const [showEvents, setShowEvents] = useState(true); // Controla visibilidad dentro de EventsView

  // 4. Estadísticas calculadas al vuelo para el Header
  const stats = useMemo(() => ({
    total: filtered.length, // O el total sin filtrar si prefieres
    shown: filtered.length,
    withSources: filtered.filter(e => (e.fuentes || []).length > 0).length
  }), [filtered]);

  // --- Handlers de Acción ---

  const handleExportExcel = () => {
    try {
      const wb = XLSX.utils.book_new();
      const exportData = filtered.map(e => ({
        Fecha: e.fecha,
        Título: e.titulo,
        Categoría: e.categoria,
        País: e.pais,
        Descripción: e.descripcion,
        Fuentes: (e.fuentes || []).map(f => `${f.label} (${f.url || 'local'})`).join('; ')
      }));
      const ws = XLSX.utils.json_to_sheet(exportData);
      XLSX.utils.book_append_sheet(wb, ws, "Eventos Filtrados");
      XLSX.writeFile(wb, "Reporte_Digitalizacion_Ecuador.xlsx");
    } catch (error) {
      console.error("Error al exportar Excel:", error);
      alert("Hubo un error al generar el Excel.");
    }
  };

  const handleCopyAPAAll = () => {
    if (filtered.length === 0) return;
    const text = filtered.map(e => buildAPA(e)).filter(Boolean).join('\n\n');
    navigator.clipboard.writeText(text)
      .then(() => alert(`Se han copiado ${filtered.length} referencias en formato APA al portapapeles.`))
      .catch(() => alert('No se pudo copiar al portapapeles.'));
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_circle_at_10%_-10%,rgba(34,211,238,0.15),transparent),radial-gradient(800px_circle_at_90%_0%,rgba(99,102,241,0.12),transparent)] bg-slate-950 text-white font-sans selection:bg-cyan-500/30">
      
      {/* --- Header con Filtros --- */}
      <Header
        title={metadata?.document?.nombre || "Dashboard de Digitalización"}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onlyWithSources={onlyWithSources}
        setOnlyWithSources={setOnlyWithSources}
        compactView={compactView}
        setCompactView={setCompactView}
        categories={categories}
        countries={countries}
        headerCollapsed={headerCollapsed}
        setHeaderCollapsed={setHeaderCollapsed}
        stats={stats}
        onExport={handleExportExcel}
        onCopyAPA={handleCopyAPAAll}
      />

      {/* --- Contenido Principal --- */}
      <main className="px-3 py-6 mx-auto max-w-6xl md:px-4 space-y-6">
        
        {/* Navegación de Pestañas (Tabs) */}
        <nav className="flex overflow-x-auto gap-2 pb-2 mb-4 scrollbar-hide">
          {[
            { id: 'eventos', label: 'Eventos y Timeline' },
            { id: 'indicadores', label: 'Indicadores Oficiales' },
            { id: 'informe', label: 'Informe Interactivo' },
            { id: 'sintesis', label: 'Síntesis / FODA' },
            { id: 'bibliografia', label: 'Bibliografía' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setContentTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                contentTab === tab.id
                  ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* --- Renderizado Condicional de Vistas --- */}
        <div className="animate-fade-in">
          
          {contentTab === 'eventos' && (
            <EventsView
              filtered={filtered}
              compactView={compactView}
              isTimelineOpen={isTimelineOpen}
              setIsTimelineOpen={setIsTimelineOpen}
              isVerticalTimelineOpen={isVerticalTimelineOpen}
              setIsVerticalTimelineOpen={setIsVerticalTimelineOpen}
              showEvents={showEvents}
              setShowEvents={setShowEvents}
              stats={stats}
            />
          )}

          {contentTab === 'indicadores' && (
            <IndicatorsView
              firmaTotal={firmaTotal}
              firmaTop={firmaTop}
              firmaMax={firmaMax}
              firmaStats={firmaStats}
            />
          )}

          {contentTab === 'informe' && (
            <div className="space-y-4">
               {/* Wrapper para darle el estilo consistente */}
               <div className="p-1">
                 <ReportInteractive />
               </div>
            </div>
          )}

          {contentTab === 'sintesis' && (
            <SynthesisView />
          )}

          {contentTab === 'bibliografia' && (
            <BibliographyView events={filtered} />
          )}
        </div>
      </main>

      {/* --- Modales Globales --- */}
      
      {/* Modal: Timeline Horizontal (Vis.js) */}
      <TimelineModal
        events={filtered}
        isOpen={isTimelineOpen}
        onClose={() => setIsTimelineOpen(false)}
      />

      {/* Modal: Timeline Vertical (Comparativa) */}
      {isVerticalTimelineOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-md bg-slate-950/80">
           <div className="min-h-screen py-8 px-4">
             <div className="mx-auto max-w-5xl bg-slate-900 rounded-2xl border border-white/10 shadow-2xl">
               <div className="flex justify-between items-center p-6 border-b border-white/10">
                 <h2 className="text-2xl font-bold text-white">Línea de Tiempo Comparativa</h2>
                 <button
                   onClick={() => setIsVerticalTimelineOpen(false)}
                   className="p-2 text-slate-400 hover:text-white transition"
                 >
                   ✕
                 </button>
               </div>
               <div className="p-4 md:p-8 bg-slate-950/50">
                 <VerticalTimeline events={filtered} />
               </div>
             </div>
           </div>
        </div>
      )}

    </div>
  );
}