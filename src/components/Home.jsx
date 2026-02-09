import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_circle_at_10%_-10%,rgba(34,211,238,0.15),transparent),radial-gradient(800px_circle_at_90%_0%,rgba(99,102,241,0.12),transparent)] bg-slate-950 text-white">
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        <section className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Nivel de Digitalización en Ecuador
            </h1>
            <p className="text-slate-300 text-sm md:text-base">
              Resumen ejecutivo y comparativa con Canadá, usando indicadores oficiales (EGDI, acceso a internet y marco legal).
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/app"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-5 py-2.5 rounded-full text-sm"
              >
                Entrar al análisis
              </Link>
              <Link
                to="/app#indicadores"
                className="border border-white/20 hover:bg-white/10 px-5 py-2.5 rounded-full text-sm"
              >
                Ver indicadores
              </Link>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm uppercase tracking-wider text-slate-400">Indicadores clave</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-600/5 border border-blue-500/30 rounded-xl p-4">
                <div className="text-xs text-blue-300 font-semibold">EGDI Ecuador</div>
                <div className="text-2xl font-bold text-blue-300">0,7800</div>
                <div className="text-xs text-slate-400">Puesto 67</div>
              </div>
              <div className="bg-gradient-to-br from-green-600/20 to-green-600/5 border border-green-500/30 rounded-xl p-4">
                <div className="text-xs text-green-300 font-semibold">EGDI Canadá</div>
                <div className="text-2xl font-bold text-green-300">0,8452</div>
                <div className="text-xs text-slate-400">Puesto 47</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-xs text-slate-300 font-semibold">Internet hogares (EC)</div>
                <div className="text-2xl font-bold">71,3%</div>
                <div className="text-xs text-slate-400">INEC 2025</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-xs text-slate-300 font-semibold">Internet hogares (CA)</div>
                <div className="text-2xl font-bold">96,1%</div>
                <div className="text-xs text-slate-400">CRTC 2024</div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="font-semibold mb-2">Eventos y línea de tiempo</h3>
            <p className="text-sm text-slate-300">Explora los hitos históricos y comparativos de Ecuador y Canadá.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="font-semibold mb-2">Indicadores oficiales</h3>
            <p className="text-sm text-slate-300">EGDI, ENEMDU y métricas clave con fuentes verificadas.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="font-semibold mb-2">Análisis interactivo</h3>
            <p className="text-sm text-slate-300">Secciones dinámicas para metodología, resultados y conclusiones.</p>
          </div>
        </section>

        <section className="flex justify-center">
          <div className="h-44 w-44 md:h-52 md:w-52 rounded-full bg-white/90 border-4 border-white/20 shadow-lg flex items-center justify-center p-3">
            <img
              src={`${import.meta.env.BASE_URL}logo3.png`}
              alt="Universidad Central del Ecuador"
              className="h-full w-full object-contain"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
