import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  DigitalGrowthChart, 
  DigitalizationGauge, 
  RegionalComparisonRadar 
} from '../components/charts/HomeCharts';
import { timelineData, orderedYears } from '../data/homeTimelineData';

export function HomePage() {
  const [activeYear, setActiveYear] = useState(null);

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_circle_at_10%_-10%,rgba(34,211,238,0.15),transparent),radial-gradient(800px_circle_at_90%_0%,rgba(99,102,241,0.12),transparent)] bg-slate-950 text-white font-sans selection:bg-cyan-500/30">
      
      <main className="px-4 py-10 mx-auto space-y-16 max-w-6xl">
        
        {/* --- Hero Section --- */}
        <section className="flex flex-col items-center text-center space-y-8 animate-fade-in-up">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full opacity-25 blur transition duration-500 group-hover:opacity-50"></div>
            <div className="relative flex justify-center items-center p-2 w-40 h-40 rounded-full bg-slate-950 ring-1 ring-white/10 md:w-52 md:h-52">
              <img
                src={`${import.meta.env.BASE_URL}logo3.png`} // Asegúrate que esta imagen esté en public/
                alt="Logo UCE"
                className="object-contain w-3/4 h-3/4 drop-shadow-2xl"
              />
            </div>
          </div>

          <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
              Nivel de Digitalización en Ecuador
            </h1>
            <div className="flex flex-wrap justify-center gap-2 text-sm md:text-base text-cyan-400 font-medium">
              <span className="px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/20">Sistemas Distribuidos</span>
              <span className="px-3 py-1 rounded-full bg-blue-950/30 border border-blue-500/20">Legislacion Informatica</span>
              <span className="px-3 py-1 rounded-full bg-slate-800/50 border border-white/10">2026</span>
            </div>
            <p className="text-lg text-slate-400 leading-relaxed">
              Un análisis integral de la evolución tecnológica, normativa y social del Ecuador, comparado con referentes regionales.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/app"
              className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-slate-900 transition-all duration-200 bg-cyan-500 rounded-full hover:bg-cyan-400 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-slate-900"
            >
              <span>Explorar Dashboard</span>
              <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <Link
              to="/digitalizacion"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-cyan-200 border border-cyan-500/40 rounded-full bg-white/5 hover:bg-white/10 transition"
            >
              Ver Dashboard 2025-2026
            </Link>
          </div>
        </section>

        {/* --- Resumen de Indicadores (Gráficos) --- */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DigitalGrowthChart />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex-1 p-6 rounded-2xl border bg-white/5 border-white/10 backdrop-blur-sm">
              <h3 className="text-center font-semibold text-slate-200 mb-4">Índice EGDI (ONU)</h3>
              <DigitalizationGauge />
            </div>
            <div className="flex-1">
              <RegionalComparisonRadar />
            </div>
          </div>
        </section>

        {/* --- Tarjetas de Información --- */}
        <section className="grid gap-4 md:grid-cols-3">
          {[
            { title: 'Eventos Históricos', desc: 'Línea de tiempo detallada desde 2002 hasta 2026.', icon: '📅' },
            { title: 'Indicadores Reales', desc: 'Datos del SRI, BCE, FirmaEC e INEC actualizados.', icon: '📊' },
            { title: 'Marco Legal', desc: 'Análisis de leyes clave como LOPDP y Comercio Electrónico.', icon: '⚖️' },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl border bg-white/5 border-white/10 hover:bg-white/10 transition duration-300">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* --- Línea de Tiempo Resumida --- */}
        <section className="relative border-t border-white/10 pt-16">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 px-4 text-slate-500 text-sm font-medium tracking-widest uppercase">
            Hitos Clave
          </div>
          
          <div className="relative">
            {/* Línea vertical central */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 md:-translate-x-1/2"></div>

            <div className="space-y-12">
              {orderedYears.map((year, index) => {
                const events = timelineData[year] || [];
                const isEven = index % 2 === 0;

                return (
                  <div key={year} className={`relative flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''} items-center md:items-start`}>
                    
                    {/* Año (Círculo Central) */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-slate-950 bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)] z-10 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    
                    {/* Espaciador */}
                    <div className="w-full md:w-1/2"></div>

                    {/* Contenido */}
                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                      <div 
                        className={`group cursor-pointer transition-all duration-300 ${activeYear === year ? 'scale-105' : 'hover:scale-102'}`}
                        onClick={() => setActiveYear(activeYear === year ? null : year)}
                      >
                        <span className="text-4xl font-black text-white/10 group-hover:text-white/20 transition-colors select-none">
                          {year}
                        </span>
                        <div className="mt-2 space-y-4">
                          {events.map((event, idx) => (
                            <div key={idx} className="p-4 rounded-xl border bg-white/5 border-white/10 hover:border-cyan-500/30 transition-colors">
                              <h4 className="text-cyan-300 font-bold text-sm mb-1">{event.title}</h4>
                              <p className="text-slate-400 text-xs leading-relaxed">{event.description}</p>
                              {event.category && (
                                <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 text-slate-400 uppercase tracking-wide">
                                  {event.category}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* --- Footer Simple --- */}
        <footer className="text-center pt-20 pb-10 border-t border-white/5 text-slate-500 text-sm">
          <p>© 2026 Universidad Central del Ecuador — Facultad de Ingeniería y Ciencias Aplicadas.</p>
        </footer>

      </main>
    </div>
  );
}