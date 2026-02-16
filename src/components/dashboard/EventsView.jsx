import { EventCard } from '../common/EventCard';

export function EventsView({ filtered, compactView, isTimelineOpen, setIsTimelineOpen, isVerticalTimelineOpen, setIsVerticalTimelineOpen, activeTab, setActiveTab, showEvents, setShowEvents, stats }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 p-4 rounded-2xl border bg-white/5 border-white/10">
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <h3 className="font-semibold">Línea de tiempo</h3>
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={() => setIsTimelineOpen(true)} className="bg-white/10 hover:bg-white/20 border border-white/10 px-3 py-1.5 rounded-full text-sm">Visualizar timeline</button>
            <button onClick={() => setIsVerticalTimelineOpen(!isVerticalTimelineOpen)} className="bg-white/10 hover:bg-white/20 border border-white/10 px-3 py-1.5 rounded-full text-sm">Comparativa</button>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs">{stats.shown} resultados</span>
          </div>
        </div>
      </div>

      {showEvents && (
        <>
          {filtered.length === 0 ? (
            <div className="p-6 rounded-2xl border bg-white/5 border-white/10 text-slate-300">No hay eventos.</div>
          ) : (
            <div className={`grid ${compactView ? 'gap-3' : 'gap-4'}`}>
              {filtered.map(event => (
                <EventCard key={event.id || `${event.titulo}-${event.fecha}`} event={event} compact={compactView} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}