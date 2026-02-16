import React from 'react';

export function SynthesisView() {
  return (
    <div className="space-y-6">
      {/* --- Encabezado del Análisis --- */}
      <div className="p-6 rounded-2xl border bg-gradient-to-br from-cyan-900/20 to-blue-900/10 border-cyan-500/30">
        <h3 className="text-2xl font-bold text-white mb-2">Síntesis: Nivel de Digitalización en Ecuador</h3>
        <p className="text-slate-300">
          Ecuador se encuentra en una etapa de **consolidación digital**. Si bien existe un marco legal robusto (Ley de Comercio Electrónico, LOPDP) y servicios públicos líderes (SRI, FirmaEC), persisten brechas significativas en infraestructura rural y adopción financiera profunda.
        </p>
      </div>

      {/* --- Semáforo de Pilares --- */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Pilar 1: Normativa */}
        <div className="p-4 rounded-xl border bg-white/5 border-white/10">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-white">Marco Normativo</h4>
            <span className="px-2 py-1 text-xs font-bold text-green-900 bg-green-400 rounded-full">AVANZADO</span>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            Leyes habilitantes como la de Comercio Electrónico (2002) y Protección de Datos (2021) brindan seguridad jurídica.
          </p>
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '90%' }}></div>
          </div>
        </div>

        {/* Pilar 2: Gobierno Digital */}
        <div className="p-4 rounded-xl border bg-white/5 border-white/10">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-white">Gobierno Digital</h4>
            <span className="px-2 py-1 text-xs font-bold text-blue-900 bg-blue-400 rounded-full">EN PROGRESO</span>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            El EGDI (0.7800) es alto. Servicios como SRI y FirmaEC son exitosos, pero falta interoperabilidad total entre instituciones.
          </p>
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>

        {/* Pilar 3: Infraestructura */}
        <div className="p-4 rounded-xl border bg-white/5 border-white/10">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-white">Infraestructura</h4>
            <span className="px-2 py-1 text-xs font-bold text-amber-900 bg-amber-400 rounded-full">BRECHA</span>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            Alta penetración móvil, pero el acceso a fibra óptica en hogares rurales y la velocidad promedio siguen siendo limitados.
          </p>
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>

      {/* --- Análisis FODA (2x2 Grid) --- */}
      <h4 className="text-lg font-semibold mt-8 mb-4 border-b border-white/10 pb-2">Matriz de Análisis</h4>
      <div className="grid gap-4 md:grid-cols-2">
        
        {/* Fortalezas */}
        <div className="p-5 rounded-2xl border bg-white/5 border-l-4 border-l-green-500 border-t-white/10 border-r-white/10 border-b-white/10">
          <h5 className="font-bold text-green-400 mb-3">Fortalezas</h5>
          <ul className="space-y-2 text-sm text-slate-300 list-disc pl-4">
            <li>Identidad digital sólida mediante <strong>FirmaEC</strong>.</li>
            <li>Cultura tributaria digital establecida (SRI en línea).</li>
            <li>Existencia de una Agenda de Transformación Digital nacional.</li>
          </ul>
        </div>

        {/* Oportunidades */}
        <div className="p-5 rounded-2xl border bg-white/5 border-l-4 border-l-blue-500 border-t-white/10 border-r-white/10 border-b-white/10">
          <h5 className="font-bold text-blue-400 mb-3">Oportunidades</h5>
          <ul className="space-y-2 text-sm text-slate-300 list-disc pl-4">
            <li>Implementación de la <strong>Carpeta Ciudadana</strong> única.</li>
            <li>Expansión de servicios Fintech y Open Banking (Ley Fintech).</li>
            <li>Uso de IA para automatizar trámites burocráticos repetitivos.</li>
          </ul>
        </div>

        {/* Debilidades */}
        <div className="p-5 rounded-2xl border bg-white/5 border-l-4 border-l-amber-500 border-t-white/10 border-r-white/10 border-b-white/10">
          <h5 className="font-bold text-amber-400 mb-3">Debilidades</h5>
          <ul className="space-y-2 text-sm text-slate-300 list-disc pl-4">
            <li>Baja inclusión financiera real en sectores vulnerables.</li>
            <li>Dependencia excesiva de redes móviles vs. fijas.</li>
            <li>Duplicidad de requisitos en trámites interinstitucionales.</li>
          </ul>
        </div>

        {/* Amenazas */}
        <div className="p-5 rounded-2xl border bg-white/5 border-l-4 border-l-red-500 border-t-white/10 border-r-white/10 border-b-white/10">
          <h5 className="font-bold text-red-400 mb-3">Amenazas</h5>
          <ul className="space-y-2 text-sm text-slate-300 list-disc pl-4">
            <li>Ciberataques a infraestructura crítica (Ransomware).</li>
            <li>Obsolescencia tecnológica en el sector público.</li>
            <li>Fuga de talento TI hacia mercados internacionales.</li>
          </ul>
        </div>
      </div>

      {/* --- Conclusión Final --- */}
      <div className="mt-6 p-4 rounded-xl bg-slate-800/50 border border-white/10 text-sm text-slate-400">
        <strong>Conclusión del Grupo:</strong> Ecuador ha superado la etapa de "digitalización básica". El reto hacia 2030 no es solo crear más leyes, sino asegurar que la tecnología mejore la calidad de vida del ciudadano promedio, reduciendo la brecha digital y garantizando la privacidad de los datos.
      </div>
    </div>
  );
}