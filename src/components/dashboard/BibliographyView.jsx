import { useState } from 'react';
import { buildAPA } from '../../utils/citations';

export function BibliographyView({ events }) {
  const [show, setShow] = useState(true);
  return (
    <div className="p-4 rounded-2xl border bg-white/5 border-white/10">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Bibliografía</h3>
        <button onClick={() => setShow(!show)} className="px-2 py-1 text-xs rounded-full border border-white/10 bg-white/5">
          {show ? '▲' : '▼'}
        </button>
      </div>
      {show && (
        <div className="p-3 mt-3 text-xs whitespace-pre-wrap rounded-xl border bg-slate-950/60 border-white/10 text-slate-300">
          {events.map(buildAPA).filter(Boolean).join('\n\n') || '—'}
        </div>
      )}
    </div>
  );
}