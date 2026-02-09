import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as XLSX from 'xlsx'
import './App.css'
import { EventCard } from './components/EventCard.jsx'
import { TimelineModal } from './components/TimelineModal.jsx'
import { VerticalTimeline } from './components/VerticalTimeline.jsx'
import { InternetUsageTable } from './components/InternetUsageTable.jsx'
import { ReportInteractive } from './components/ReportInteractive.jsx'
import { useEvents } from './hooks/useEvents.js'

function App() {
  const {
    activeTab,
    setActiveTab,
    activeEvents,
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
    metadata,
  } = useEvents();

  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isVerticalTimelineOpen, setIsVerticalTimelineOpen] = useState(false);
  const [compactView, setCompactView] = useState(false);
  const [headerCollapsed, setHeaderCollapsed] = useState(false);
  const [showEvents, setShowEvents] = useState(true);
  const [showBibliography, setShowBibliography] = useState(true);
  const [contentTab, setContentTab] = useState('eventos');
  const [indicatorQuery, setIndicatorQuery] = useState('');
  const [indicatorCategory, setIndicatorCategory] = useState('all');
  const [indicatorViews, setIndicatorViews] = useState({});
  const [indicatorShowAll, setIndicatorShowAll] = useState(false);
  const [firmaStats, setFirmaStats] = useState([]);
  const [firmaTotal, setFirmaTotal] = useState(0);
  const location = useLocation();

  const stats = useMemo(() => {
    const total = activeEvents.length;
    const shown = filtered.length;
    const withSources = filtered.filter(e => (e.fuentes || []).length > 0).length;
    return { total, shown, withSources };
  }, [activeEvents, filtered]);

  useEffect(() => {
    const parseFirmaLine = (line) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      if (trimmed.startsWith('"')) {
        const end = trimmed.indexOf('",');
        if (end !== -1) {
          const system = trimmed.slice(1, end);
          const totalStr = trimmed.slice(end + 2);
          const total = Number(totalStr.replace(/[^0-9]/g, ''));
          if (!system || Number.isNaN(total)) return null;
          return { system, total };
        }
      }
      const [system, totalStr] = trimmed.split(',');
      if (!system || !totalStr) return null;
      const total = Number(totalStr.replace(/[^0-9]/g, ''));
      if (Number.isNaN(total)) return null;
      return { system, total };
    };

    fetch('/Estad%C3%ADsticas%20FirmaEC_FirmaEC%20Escritorio_Tabla.csv')
      .then(res => res.text())
      .then(text => {
        const lines = text.split(/\r?\n/).slice(1);
        const rows = lines.map(parseFirmaLine).filter(Boolean);
        setFirmaStats(rows);
        const total = rows.reduce((sum, item) => sum + item.total, 0);
        setFirmaTotal(total);
      })
      .catch(() => {
        setFirmaStats([]);
        setFirmaTotal(0);
      });
  }, []);

  useEffect(() => {
    if (location.hash === '#indicadores') {
      setContentTab('indicadores');
    }
  }, [location.hash]);

  const firmaTop = useMemo(() => {
    return [...firmaStats]
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  }, [firmaStats]);

  const firmaMax = useMemo(() => {
    if (!firmaTop.length) return 1;
    return Math.max(...firmaTop.map(item => item.total));
  }, [firmaTop]);

  const title = metadata?.title || 'Nivel de Digitalización en Ecuador';
  const document = metadata?.document;

  const formatDateES = (iso) => {
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

  const formatNumber = (value) => {
    return new Intl.NumberFormat('es-EC').format(value || 0);
  };

  const getIndicatorView = (id) => indicatorViews[id] || 'full';
  const setIndicatorView = (id, view) => {
    setIndicatorViews(prev => ({ ...prev, [id]: view }));
  };

  const digitalizacionSummaryContent = useMemo(() => (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
      <div className="indicator-charts space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-600/5 border border-blue-500/30 rounded-2xl p-4">
            <div className="text-xs text-blue-300 font-semibold">EGDI Ecuador (2024)</div>
            <div className="text-3xl font-bold text-blue-300">0,7800</div>
            <p className="text-xs text-slate-400">Nivel ALTO · Puesto 67</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-600/5 border border-cyan-500/30 rounded-2xl p-4">
            <div className="text-xs text-cyan-300 font-semibold">Internet en hogares (EC)</div>
            <div className="text-3xl font-bold text-cyan-300">71,3%</div>
            <p className="text-xs text-slate-400">ENEMDU 2025</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-600/5 border border-emerald-500/30 rounded-2xl p-4">
            <div className="text-xs text-emerald-300 font-semibold">Trámites digitales (SRI)</div>
            <div className="text-3xl font-bold text-emerald-300">76,7%</div>
            <p className="text-xs text-slate-400">Participación canal electrónico (sep 2025)</p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="text-xs text-slate-400 mb-3">Comparación rápida (Ecuador vs Canadá)</div>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span>EGDI</span>
                <span className="text-slate-400">EC 0,7800 · CA 0,8452</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden flex">
                <div className="h-full bg-blue-500" style={{ width: '78%' }}></div>
                <div className="h-full bg-green-500" style={{ width: '84.52%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span>Internet en hogares</span>
                <span className="text-slate-400">EC 71,3% · CA 96,1%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden flex">
                <div className="h-full bg-cyan-500" style={{ width: '71.3%' }}></div>
                <div className="h-full bg-emerald-500" style={{ width: '96.1%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-xs text-slate-400 mb-3">Uso de canales digitales (sep 2025)</div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden flex">
              <div className="h-full bg-blue-500" style={{ width: '76.7%' }} title="Electrónico 76,7%"></div>
              <div className="h-full bg-amber-500" style={{ width: '23.3%' }} title="Físico 23,3%"></div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 mt-3">
              <div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>Electrónico: 76,7%</div>
              <div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-amber-500"></span>Físico: 23,3%</div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-xs text-slate-400 mb-3">Identidad digital (FirmaEC)</div>
            <div className="text-2xl font-bold text-white">{formatNumber(firmaTotal)} firmas</div>
            <p className="text-xs text-slate-400 mt-1">Total acumulado en sistemas integrados</p>
            <div className="mt-3 text-xs text-slate-300">Sistema líder: <span className="font-semibold">{firmaTop[0]?.system || '—'}</span></div>
          </div>
        </div>

        <div className="bg-slate-950/60 border border-white/10 rounded-xl p-4 text-sm text-slate-300">
          <p><span className="font-semibold">Conclusión:</span> Con un EGDI de 0,7800 (nivel alto), Ecuador ya muestra madurez en gobierno digital. Esto se refleja en la oferta de servicios: Gob.ec concentra miles de trámites y, en el sistema financiero, el canal electrónico ya representa 76,7% de las transacciones (sep 2025). Además, el uso de firma electrónica es transversal, con un volumen alto de firmas en sistemas públicos y privados. La brecha con Canadá se explica principalmente por conectividad: 71,3% de hogares con internet en Ecuador frente a 96,1% en Canadá, lo que limita el alcance real de los servicios. En síntesis, el país tiene una base normativa y operativa fuerte, pero su impacto depende de ampliar cobertura y fortalecer la interoperabilidad institucional.</p>
        </div>
      </div>

      <div className="indicator-tables">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="text-xs text-slate-400 mb-3">Síntesis de indicadores clave</div>
          <table className="w-full text-xs text-slate-300">
            <thead>
              <tr className="text-slate-400 border-b border-white/10">
                <th className="text-left py-1 pr-2">Indicador</th>
                <th className="text-left py-1 pr-2">Ecuador</th>
                <th className="text-left py-1">Comparación</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-1 pr-2">EGDI 2024</td>
                <td className="py-1 pr-2">0,7800 (ALTO)</td>
                <td className="py-1">Canadá 0,8452</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-1 pr-2">Internet hogares</td>
                <td className="py-1 pr-2">71,3%</td>
                <td className="py-1">Canadá 96,1%</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-1 pr-2">Canal electrónico</td>
                <td className="py-1 pr-2">76,7%</td>
                <td className="py-1">Físico 23,3%</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-1 pr-2">Trámites Gob.ec</td>
                <td className="py-1 pr-2">7000</td>
                <td className="py-1">Cobertura nacional</td>
              </tr>
              <tr>
                <td className="py-1 pr-2">FirmaEC</td>
                <td className="py-1 pr-2">{formatNumber(firmaTotal)} firmas</td>
                <td className="py-1">Uso transversal</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ), [firmaTotal, firmaTop, formatNumber]);

  const indicatorSections = useMemo(() => ([
    {
      id: 'internet-uso',
      title: 'Uso de internet (ENEMDU)',
      category: 'Conectividad',
      tags: ['inec', 'enemdu', 'internet', 'hogares', 'personas'],
      summary: 'Muestra qué tanto usan internet los hogares y las personas, para medir conectividad digital.',
      content: (
        <div className="space-y-4">
          <div className="indicator-charts bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="text-sm font-semibold">Resumen ENEMDU</div>
            <p className="text-xs text-slate-400 mt-1">Esta sección se visualiza en la vista de tablas.</p>
          </div>
          <div className="indicator-tables">
            <InternetUsageTable />
          </div>
        </div>
      ),
    },
    {
      id: 'egdi',
      title: 'Indicador principal: EGDI (ONU)',
      category: 'Gobierno digital',
      tags: ['egdi', 'onu', 'gobierno digital', 'comparación internacional'],
      summary: 'Compara qué tan avanzado está el gobierno digital (servicios en línea, infraestructura y talento).',
      content: (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
          <div className="indicator-charts space-y-4">
            <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">📊 Indicador Principal: EGDI</h3>
              <p className="text-sm text-slate-400">E-Government Development Index (ONU)</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/10">Estándar internacional</span>
            </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
              <span>Escala 0 – 1.0</span>
              <span>Comparación EGDI 2024</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300">🇪🇨 Ecuador</span>
                  <span className="text-blue-300 font-semibold">0,7800</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '78.00%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300">🇨🇦 Canadá</span>
                  <span className="text-green-300 font-semibold">0,8452</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '84.52%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-600/5 border border-blue-500/30 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">🇪🇨 Ecuador</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 border border-blue-500/30">Nivel ALTO</span>
              </div>
              <div className="mt-3 text-4xl font-bold text-blue-300">0,7800</div>
              <p className="text-sm text-slate-400 mt-2">Puesto 67 mundial</p>
            </div>
            <div className="bg-gradient-to-br from-green-600/20 to-green-600/5 border border-green-500/30 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">🇨🇦 Canadá</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30">Nivel MUY ALTO</span>
              </div>
              <div className="mt-3 text-4xl font-bold text-green-300">0,8452</div>
              <p className="text-sm text-slate-400 mt-2">Puesto 47 (top 50)</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h5 className="text-sm font-semibold mb-2">¿Por qué es el indicador principal?</h5>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-5">
                <li>Estándar internacional de la ONU para medir gobierno digital.</li>
                <li>Integra servicios en línea, infraestructura TIC y capital humano.</li>
                <li>Comparación objetiva entre 193 países.</li>
                <li>Usado en investigaciones académicas y políticas públicas.</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h5 className="text-sm font-semibold mb-2">Otros indicadores considerados</h5>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-5">
                <li>Acceso a internet (hogares y personas).</li>
                <li>Número de trámites digitales disponibles.</li>
                <li>Adopción de firma electrónica (certificados emitidos).</li>
                <li>Existencia de marcos legales habilitantes.</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-white/10 rounded-xl p-4 text-xs text-slate-300">
            <p className="mb-2"><span className="font-semibold">¿0,7800 es un buen puntaje?</span> Sí. Es nivel ALTO (rangos ONU: bajo &lt; 0.50, medio 0.50–0.75, alto 0.75–1.0).</p>
            <p>Puesto 67 de 193 países (tercio superior). Persisten brechas frente a “muy alto” (&gt; 0.85) donde está Canadá.</p>
          </div>
          </div>

          <div className="indicator-tables">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-3">Resumen EGDI 2024</div>
              <table className="w-full text-xs text-slate-300">
                <thead>
                  <tr className="text-slate-400 border-b border-white/10">
                    <th className="text-left py-1 pr-2">País</th>
                    <th className="text-left py-1 pr-2">EGDI</th>
                    <th className="text-left py-1 pr-2">Nivel</th>
                    <th className="text-left py-1">Puesto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-1 pr-2">Ecuador</td>
                    <td className="py-1 pr-2">0,7800</td>
                    <td className="py-1 pr-2">ALTO</td>
                    <td className="py-1">67</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-2">Canadá</td>
                    <td className="py-1 pr-2">0,8452</td>
                    <td className="py-1 pr-2">MUY ALTO</td>
                    <td className="py-1">47</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-xs text-slate-400">
            Fuente:
            <a
              href="/Technical%20Appendix%20(Web%20version)%2030102024.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 hover:underline ml-1"
            >
              UN E-Government Survey 2024 — Technical Appendix (PDF)
            </a>
          </div>
        </div>
      ),
    },
    {
      id: 'operativos',
      title: 'Indicadores operativos (Gob.ec y SRI)',
      category: 'Servicios digitales',
      tags: ['gob.ec', 'sri', 'trámites', 'servicios'],
      summary: 'Indica cuántos trámites digitales hay y por qué canales se usan (Gob.ec y SRI).',
      content: (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="indicator-charts space-y-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold">Indicadores operativos (Ecuador)</h4>
            <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10">Fuentes oficiales</span>
          </div>
          <div className="grid md:grid-cols-4 gap-3 mb-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-xs text-slate-400">Trámites (Gob.ec)</div>
              <div className="text-xl font-semibold">7000</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-xs text-slate-400">Visitas</div>
              <div className="text-xl font-semibold">67.91M</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-xs text-slate-400">Regulaciones</div>
              <div className="text-xl font-semibold">2761</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-xs text-slate-400">Instituciones</div>
              <div className="text-xl font-semibold">379</div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
            <div className="text-xs text-slate-400 mb-3">Gob.ec — métricas destacadas</div>
            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>Trámites</span>
                  <span className="font-semibold">7000</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>Regulaciones</span>
                  <span className="font-semibold">2761</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-400 rounded-full" style={{ width: '27.61%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>Instituciones</span>
                  <span className="font-semibold">379</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '3.79%' }}></div>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">Fuente: Gob.ec (Trámites más visitados).</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
              <span>SRI — distribución de trámites electrónicos</span>
              <span>Total: 256 trámites</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden flex">
              <div className="h-full bg-blue-500" style={{ width: '92.97%' }} title="SRI en Línea 92,97%"></div>
              <div className="h-full bg-amber-500" style={{ width: '5.08%' }} title="GOB.ec 5,08%"></div>
              <div className="h-full bg-purple-500" style={{ width: '1.95%' }} title="Quipux 1,95%"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-3 text-xs text-slate-300 mt-3">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                SRI en Línea: 238 (92,97%)
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-amber-500"></span>
                GOB.ec: 13 (5,08%)
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-purple-500"></span>
                Quipux: 5 (1,95%)
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">Fuente: SRI — Trámites electrónicos.</p>
          </div>
          </div>
          <div className="indicator-tables">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-400 border-b border-white/10">
                  <th className="text-left py-2 pr-4">Indicador</th>
                  <th className="text-left py-2 pr-4">Dato</th>
                  <th className="text-left py-2">Fuente</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Número de trámites (Gob.ec)</td>
                  <td className="py-2 pr-4">7000 trámites</td>
                  <td className="py-2">
                    <a
                      href="https://www.gob.ec/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:underline"
                    >
                      Portal Gob.ec
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">SRI Servicios y Trámites</td>
                  <td className="py-2 pr-4">2600 servicios y trámites</td>
                  <td className="py-2">
                    <a
                      href="https://www.sri.gob.ec/servicios-y-tramites"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:underline"
                    >
                      SRI — Servicios y Trámites
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">SRI en Línea (trámites electrónicos)</td>
                  <td className="py-2 pr-4">238 trámites (92,97%)</td>
                  <td className="py-2">
                    <a
                      href="https://www.sri.gob.ec/sri-tramites-electronicos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:underline"
                    >
                      SRI — Trámites electrónicos
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">GOB.ec (SRI)</td>
                  <td className="py-2 pr-4">13 trámites (5,08%)</td>
                  <td className="py-2">
                    <a
                      href="https://www.sri.gob.ec/sri-tramites-electronicos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:underline"
                    >
                      SRI — Trámites electrónicos
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Quipux (SRI)</td>
                  <td className="py-2 pr-4">5 trámites (1,95%)</td>
                  <td className="py-2">
                    <a
                      href="https://www.sri.gob.ec/sri-tramites-electronicos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:underline"
                    >
                      SRI — Trámites electrónicos
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Firma electrónica</td>
                  <td className="py-2 pr-4">Habilitante legal y uso en trámites</td>
                  <td className="py-2">
                    <a
                      href="https://www.firmadigital.gob.ec/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:underline"
                    >
                      FirmaDigital.gob.ec
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Créditos (consumo y microcréditos)</td>
                  <td className="py-2 pr-4">Adultos con crédito: consumo 11,0% · microcrédito 3,8%</td>
                  <td className="py-2">
                    <a
                      href="https://www.superbancos.gob.ec/estadisticas/portalestudios/estudios-y-analisis/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:underline"
                    >
                      Boletín Trimestral de Inclusión Financiera (sep 2025)
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
        </div>
      ),
    },
    {
      id: 'firmaec',
      title: 'FirmaEC — firmas electrónicas por sistema',
      category: 'Identidad digital',
      tags: ['firmaec', 'firma electrónica', 'certificados', 'sistemas'],
      summary: 'Mide el uso de firma electrónica por sistema como señal de identidad digital.',
      content: (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="indicator-charts space-y-4">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h4 className="font-semibold">FirmaEC — firmas electrónicas por sistema</h4>
              <p className="text-xs text-slate-400">Datos consolidados del panel oficial (CSV)</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10">FirmaEC</span>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mb-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-xs text-slate-400">Total de firmas</div>
              <div className="text-xl font-semibold">{formatNumber(firmaTotal)}</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-xs text-slate-400">Sistema líder</div>
              <div className="text-sm font-semibold text-white">{firmaTop[0]?.system || '—'}</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-xs text-slate-400">Sistemas con firmas</div>
              <div className="text-xl font-semibold">{formatNumber(firmaStats.length)}</div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-xs text-slate-400 mb-3">Top 10 sistemas por volumen de firmas</div>
            {firmaTop.length === 0 ? (
              <div className="text-xs text-slate-300">Cargando datos del CSV…</div>
            ) : (
              <div className="space-y-2 text-xs">
                {firmaTop.map(item => (
                  <div key={item.system}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-200">{item.system}</span>
                      <span className="font-semibold">{formatNumber(item.total)}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-400 rounded-full"
                        style={{ width: `${Math.max((item.total / firmaMax) * 100, 4)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          </div>

          <div className="indicator-tables">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-3">Top 10 sistemas por volumen de firmas</div>
              {firmaTop.length === 0 ? (
                <div className="text-xs text-slate-300">Cargando datos del CSV…</div>
              ) : (
                <table className="w-full text-xs text-slate-300">
                  <thead>
                    <tr className="text-slate-400 border-b border-white/10">
                      <th className="text-left py-1 pr-2">Sistema</th>
                      <th className="text-left py-1">Firmas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {firmaTop.map(item => (
                      <tr key={item.system} className="border-b border-white/10">
                        <td className="py-1 pr-2">{item.system}</td>
                        <td className="py-1">{formatNumber(item.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="text-xs text-slate-400 mt-3">
            Fuente:
            <a
              href="https://lookerstudio.google.com/u/0/reporting/824a3ec0-8acc-4f88-8378-6f47119ea2b6/page/H0iLD?s=r4mCJYK5ziU"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 hover:underline ml-1"
            >
              Looker Studio — Estadísticas FirmaEC
            </a>
          </div>
        </div>
      ),
    },
    {
      id: 'bce',
      title: 'Indicadores macroeconómicos — BCE',
      category: 'Economía',
      tags: ['bce', 'inflación', 'tasas', 'liquidez', 'm2', 'remesas'],
      summary: 'Da el contexto económico que puede afectar la adopción digital.',
      content: (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="indicator-charts space-y-4">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h4 className="font-semibold">Indicadores macroeconómicos — BCE</h4>
              <p className="text-xs text-slate-400">Principales indicadores del sector monetario y financiero</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10">Ecuador</span>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mb-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-xs text-slate-400">Inflación mensual</div>
              <div className="text-xl font-semibold">0,37%</div>
              <div className="text-xs text-slate-500">Enero 2026</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-xs text-slate-400">Desempleo nacional</div>
              <div className="text-xl font-semibold">2,61%</div>
              <div className="text-xs text-slate-500">Diciembre 2025</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-xs text-slate-400">Liquidez total M2</div>
              <div className="text-xl font-semibold">100.311,92</div>
              <div className="text-xs text-slate-500">Millones USD (dic 2025)</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-xs text-slate-400">Tasa activa referencial</div>
              <div className="text-xl font-semibold">7,54%</div>
              <div className="text-xs text-slate-500">Febrero 2026</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-xs text-slate-400">Tasa pasiva referencial</div>
              <div className="text-xl font-semibold">5,61%</div>
              <div className="text-xs text-slate-500">Febrero 2026</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-xs text-slate-400">Remesas de trabajadores</div>
              <div className="text-xl font-semibold">2.012,71</div>
              <div className="text-xs text-slate-500">Millones USD (III T 2025)</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-3">Precios y empleo (escala 0–5%)</div>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span>Inflación mensual</span>
                    <span className="font-semibold">0,37%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400" style={{ width: '7.4%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span>Desempleo nacional</span>
                    <span className="font-semibold">2,61%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-400" style={{ width: '52.2%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-3">Tasas referenciales (escala 0–10%)</div>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span>Tasa activa</span>
                    <span className="font-semibold">7,54%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400" style={{ width: '75.4%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span>Tasa pasiva</span>
                    <span className="font-semibold">5,61%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400" style={{ width: '56.1%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-3">Sector externo (escala 0–4.000 millones USD)</div>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span>Exportaciones</span>
                    <span className="font-semibold">3.402,42</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400" style={{ width: '85.1%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span>Saldo comercial</span>
                    <span className="font-semibold">744,17</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-400" style={{ width: '18.6%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span>Remesas</span>
                    <span className="font-semibold">2.012,71</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-400" style={{ width: '50.3%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-3">Finanzas públicas (escala 0–5% del PIB)</div>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span>Ingresos SPNF</span>
                    <span className="font-semibold">2,94%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400" style={{ width: '58.8%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span>Erogaciones SPNF</span>
                    <span className="font-semibold">3,03%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-400" style={{ width: '60.6%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-3">Deuda y PIB (escala 0–130.000 millones USD)</div>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span>Deuda pública interna</span>
                    <span className="font-semibold">36.294,00</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400" style={{ width: '27.9%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span>PIB nominal</span>
                    <span className="font-semibold">124.676,1</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400" style={{ width: '95.9%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-2">Actividad y sector externo</div>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-center justify-between">
                  <span>Saldo balanza comercial</span>
                  <span className="font-semibold">744,17 (nov 2025)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Exportaciones de bienes</span>
                  <span className="font-semibold">3.402,42 (nov 2025)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Producción petrolera nacional</span>
                  <span className="font-semibold">467.574,55 (05-02-2026)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>PIB nominal</span>
                  <span className="font-semibold">124.676,1 (2024 prel.)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-2">Finanzas públicas y mercados</div>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-center justify-between">
                  <span>Total ingresos SPNF</span>
                  <span className="font-semibold">2,94% PIB (oct 2025)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Total erogaciones SPNF</span>
                  <span className="font-semibold">3,03% PIB (oct 2025)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Saldo deuda pública interna</span>
                  <span className="font-semibold">36.294,00 (oct 2025)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Riesgo país</span>
                  <span className="font-semibold">454 (08-02-2026)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
            <div className="text-xs text-slate-400 mb-2">Mercados internacionales</div>
            <div className="grid md:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span>Índice Dow Jones</span>
                <span className="font-semibold">50.115,67 (08-02-2026)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Precio del oro (Fixing PM)</span>
                <span className="font-semibold">4.948,00 (08-02-2026)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Bonos soberanos (USD)</span>
                <span className="font-semibold">2030 98,76 · 2034 100,97 · 2035 91,10 · 2039 102,38 · 2040 82,34</span>
              </div>
            </div>
          </div>
          </div>

          <div className="indicator-tables">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-3">Resumen de indicadores BCE</div>
              <table className="w-full text-xs text-slate-300">
                <thead>
                  <tr className="text-slate-400 border-b border-white/10">
                    <th className="text-left py-1 pr-2">Indicador</th>
                    <th className="text-left py-1">Dato</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-1 pr-2">Inflación mensual</td>
                    <td className="py-1">0,37% (ene 2026)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-1 pr-2">Desempleo nacional</td>
                    <td className="py-1">2,61% (dic 2025)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-1 pr-2">Liquidez total M2</td>
                    <td className="py-1">100.311,92 (millones USD)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-1 pr-2">Tasa activa referencial</td>
                    <td className="py-1">7,54% (feb 2026)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-1 pr-2">Tasa pasiva referencial</td>
                    <td className="py-1">5,61% (feb 2026)</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-2">Remesas</td>
                    <td className="py-1">2.012,71 (millones USD)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-xs text-slate-400">
            Fuente:
            <a
              href="https://contenido.bce.fin.ec/documentos/informacioneconomica/MonetarioFinanciero/ix_MonetariasFinancierasPrin.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 hover:underline ml-1"
            >
              Banco Central del Ecuador — Indicadores monetarios y financieros
            </a>
          </div>
        </div>
      ),
    },
    {
      id: 'presencia-financiera',
      title: 'Presencia financiera — Superintendencia de Bancos',
      category: 'Inclusión financiera',
      tags: ['puntos de atención', 'cajeros', 'corresponsales', 'datáfonos'],
      summary: 'Mide cuántos puntos de atención hay y qué tan cerca están de la gente.',
      content: (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="indicator-charts space-y-4">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h4 className="font-semibold">Presencia financiera — Superintendencia de Bancos</h4>
              <p className="text-xs text-slate-400">Boletín de Inclusión Financiera (sep 2025)</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10">Ecuador</span>
          </div>

          <div className="grid md:grid-cols-5 gap-3 mb-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-xs text-slate-400">Puntos de atención</div>
              <div className="text-xl font-semibold">179.275</div>
              <div className="text-xs text-emerald-300">+8,7% anual</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-xs text-slate-400">Oficinas</div>
              <div className="text-xl font-semibold">1.374</div>
              <div className="text-xs text-rose-300">-2,3% anual</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-xs text-slate-400">Cajeros automáticos</div>
              <div className="text-xl font-semibold">5.022</div>
              <div className="text-xs text-emerald-300">+2,8% anual</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-xs text-slate-400">Corresponsales</div>
              <div className="text-xl font-semibold">48.536</div>
              <div className="text-xs text-emerald-300">+6,8% anual</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-xs text-slate-400">Datáfonos y cajas</div>
              <div className="text-xl font-semibold">124.343</div>
              <div className="text-xs text-emerald-300">+10,6% anual</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Puntos de atención por 10.000 adultos</span>
                <span>Total: 133,3 (+7,35%)</span>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { label: 'Oficinas', value: 1.0, color: 'bg-blue-500' },
                  { label: 'Cajeros', value: 3.7, color: 'bg-cyan-500' },
                  { label: 'Corresponsales', value: 36.1, color: 'bg-emerald-500' },
                  { label: 'Datáfonos', value: 71.7, color: 'bg-amber-500' },
                  { label: 'Cajas', value: 20.8, color: 'bg-purple-500' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span>{item.label}</span>
                      <span className="font-semibold">{item.value}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${Math.min(item.value * 1.2, 100)}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Puntos de atención por 1.000 km2</span>
                <span>Total: 4,8 a 339,9</span>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { label: 'Oficinas', value: 4.8, color: 'bg-blue-500' },
                  { label: 'Cajeros', value: 17.7, color: 'bg-cyan-500' },
                  { label: 'Corresponsales', value: 171.2, color: 'bg-emerald-500' },
                  { label: 'Datáfonos', value: 339.9, color: 'bg-amber-500' },
                  { label: 'Cajas', value: 98.6, color: 'bg-purple-500' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span>{item.label}</span>
                      <span className="font-semibold">{item.value}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${Math.min(item.value / 3.5, 100)}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-3">Cajeros automáticos por ubicación</div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden flex">
                <div className="h-full bg-blue-500" style={{ width: '40.6%' }} title="En oficina 40,6%"></div>
                <div className="h-full bg-slate-300" style={{ width: '59.4%' }} title="Fuera de oficina 59,4%"></div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 mt-3">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                  En oficina: 40,6%
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-slate-300"></span>
                  Fuera de oficina: 59,4%
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-3">Corresponsales no bancarios por ubicación</div>
              <div className="space-y-2 text-xs">
                {[
                  { label: 'Fábrica / Industria', value: 24.9, color: 'bg-blue-500' },
                  { label: 'Tienda', value: 16.9, color: 'bg-amber-500' },
                  { label: 'Bazar', value: 9.4, color: 'bg-purple-500' },
                  { label: 'Minimarket', value: 8.7, color: 'bg-emerald-500' },
                  { label: 'Salud y afines', value: 7.8, color: 'bg-cyan-500' },
                  { label: 'Otros', value: 32.2, color: 'bg-slate-300' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span>{item.label}</span>
                      <span className="font-semibold">{item.value}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${Math.min(item.value * 2, 100)}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
            <div className="text-xs text-slate-400 mb-3">Cobertura territorial por región (puntos por 10.000 adultos)</div>
            <div className="space-y-3 text-xs">
              {[
                { label: 'Costa o Litoral', v2024: 105.3, v2025: 118.5 },
                { label: 'Sierra o Interandina', v2024: 158.1, v2025: 158.3 },
                { label: 'Oriental o Amazónica', v2024: 40.9, v2025: 73.2 },
                { label: 'Insular o Galápagos', v2024: 91.2, v2025: 355.0 },
              ].map(region => (
                <div key={region.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span>{region.label}</span>
                    <span className="text-slate-400">{region.v2024} → <span className="text-white font-semibold">{region.v2025}</span></span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden flex">
                    <div className="h-full bg-emerald-500" style={{ width: `${Math.min(region.v2024 / 4, 100)}%` }} title={`Sep 2024: ${region.v2024}`}></div>
                    <div className="h-full bg-blue-500" style={{ width: `${Math.min(region.v2025 / 4, 100)}%` }} title={`Sep 2025: ${region.v2025}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          </div>

          <div className="indicator-tables">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-2">Densidad por 10.000 adultos (sep 2024 → sep 2025)</div>
              <table className="w-full text-xs text-slate-300">
                <thead>
                  <tr className="text-slate-400 border-b border-white/10">
                    <th className="text-left py-1 pr-2">Tipo</th>
                    <th className="text-left py-1 pr-2">2024</th>
                    <th className="text-left py-1 pr-2">2025</th>
                    <th className="text-left py-1">Δ%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-1 pr-2">Oficinas</td>
                    <td className="py-1 pr-2">1,1</td>
                    <td className="py-1 pr-2">1,0</td>
                    <td className="py-1 text-rose-300">-3,6%</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-1 pr-2">Cajeros automáticos</td>
                    <td className="py-1 pr-2">3,7</td>
                    <td className="py-1 pr-2">3,7</td>
                    <td className="py-1 text-emerald-300">+1,0%</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-1 pr-2">Corresponsales</td>
                    <td className="py-1 pr-2">34,6</td>
                    <td className="py-1 pr-2">36,1</td>
                    <td className="py-1 text-emerald-300">+4,4%</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-1 pr-2">POS</td>
                    <td className="py-1 pr-2">65,8</td>
                    <td className="py-1 pr-2">71,7</td>
                    <td className="py-1 text-emerald-300">+8,9%</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-2">Cajas</td>
                    <td className="py-1 pr-2">19,1</td>
                    <td className="py-1 pr-2">20,8</td>
                    <td className="py-1 text-emerald-300">+9,0%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-2">Densidad por 1.000 km2 (sep 2024 → sep 2025)</div>
              <table className="w-full text-xs text-slate-300">
                <thead>
                  <tr className="text-slate-400 border-b border-white/10">
                    <th className="text-left py-1 pr-2">Tipo</th>
                    <th className="text-left py-1 pr-2">2024</th>
                    <th className="text-left py-1 pr-2">2025</th>
                    <th className="text-left py-1">Δ%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-1 pr-2">Oficinas</td>
                    <td className="py-1 pr-2">5,0</td>
                    <td className="py-1 pr-2">4,8</td>
                    <td className="py-1 text-rose-300">-2,3%</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-1 pr-2">Cajeros automáticos</td>
                    <td className="py-1 pr-2">17,3</td>
                    <td className="py-1 pr-2">17,7</td>
                    <td className="py-1 text-emerald-300">+2,3%</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-1 pr-2">Corresponsales</td>
                    <td className="py-1 pr-2">161,9</td>
                    <td className="py-1 pr-2">171,2</td>
                    <td className="py-1 text-emerald-300">+5,8%</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-1 pr-2">POS</td>
                    <td className="py-1 pr-2">308,1</td>
                    <td className="py-1 pr-2">339,9</td>
                    <td className="py-1 text-emerald-300">+10,3%</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-2">Cajas</td>
                    <td className="py-1 pr-2">89,4</td>
                    <td className="py-1 pr-2">98,6</td>
                    <td className="py-1 text-emerald-300">+10,4%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          </div>

          <div className="text-xs text-slate-400">
            Fuente:
            <a
              href="https://www.superbancos.gob.ec/estadisticas/portalestudios/estudios-y-analisis/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 hover:underline ml-1"
            >
              Superintendencia de Bancos — Estudios y análisis (Boletines de Inclusión Financiera)
            </a>
          </div>
        </div>
      ),
    },
    {
      id: 'inclusion-financiera',
      title: 'Inclusión financiera — créditos, tarjetas y transacciones',
      category: 'Inclusión financiera',
      tags: ['créditos', 'tarjetas', 'transacciones', 'canales', 'banca móvil'],
      summary: 'Muestra el uso de créditos, tarjetas y canales digitales en finanzas.',
      content: (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h4 className="font-semibold">Inclusión financiera — créditos, tarjetas y transacciones</h4>
              <p className="text-xs text-slate-400">Boletín Trimestral de Inclusión Financiera (sep 2025)</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10">Ecuador</span>
          </div>

          <div className="indicator-charts grid md:grid-cols-5 gap-3 mb-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-xs text-slate-400">Transacciones (ene-sep 2025)</div>
              <div className="text-xl font-semibold">4,343 millones</div>
              <div className="text-xs text-emerald-300">+14,3% anual</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-xs text-slate-400">Canales electrónicos</div>
              <div className="text-xl font-semibold">76,7%</div>
              <div className="text-xs text-emerald-300">+17,8% anual</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-xs text-slate-400">Banca móvil</div>
              <div className="text-xl font-semibold">+32,5%</div>
              <div className="text-xs text-slate-500">Incremento anual</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-xs text-slate-400">Banca electrónica</div>
              <div className="text-xl font-semibold">-0,1%</div>
              <div className="text-xs text-rose-300">Decrecimiento anual</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-xs text-slate-400">Participación física</div>
              <div className="text-xl font-semibold">23,3%</div>
              <div className="text-xs text-slate-500">Sep 2025</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-4 mb-4">
            <div className="indicator-charts bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-3">Participación por tipo de canal (sep 2025)</div>
              <div className="space-y-2 text-xs">
                {[
                  { label: 'Banca celular', value: 49.40, color: 'bg-blue-500' },
                  { label: 'Oficina', value: 23.22, color: 'bg-amber-500' },
                  { label: 'Internet', value: 9.87, color: 'bg-cyan-500' },
                  { label: 'Datáfono POS', value: 7.08, color: 'bg-emerald-500' },
                  { label: 'Cajeros automáticos', value: 6.29, color: 'bg-purple-500' },
                  { label: 'Corresponsal no bancario', value: 3.75, color: 'bg-fuchsia-500' },
                  { label: 'Banca telefónica', value: 0.25, color: 'bg-slate-300' },
                  { label: 'Entidades serv. auxiliares', value: 0.06, color: 'bg-slate-400' },
                  { label: 'Plataforma pagos móviles', value: 0.04, color: 'bg-slate-500' },
                  { label: 'Terminal autoservicio', value: 0.03, color: 'bg-slate-500' },
                  { label: 'Visitas', value: 0.01, color: 'bg-slate-600' },
                  { label: 'Ventanillas otra entidad', value: 0.00, color: 'bg-slate-700' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span>{item.label}</span>
                      <span className="font-semibold">{item.value.toFixed(2).replace('.', ',')}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${Math.max(item.value * 1.8, 2)}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="indicator-tables bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-3">Transacciones por tipo de canal</div>
              <table className="w-full text-xs text-slate-300">
                <thead>
                  <tr className="text-slate-400 border-b border-white/10">
                    <th className="text-left py-1 pr-2">Canal</th>
                    <th className="text-left py-1 pr-2">Sep 2024</th>
                    <th className="text-left py-1 pr-2">Sep 2025</th>
                    <th className="text-left py-1">Part. 2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-1 pr-2">Electrónico</td>
                    <td className="py-1 pr-2">2.829</td>
                    <td className="py-1 pr-2">3.331</td>
                    <td className="py-1">76,7%</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-1 pr-2">Físico</td>
                    <td className="py-1 pr-2">972</td>
                    <td className="py-1 pr-2">1.011</td>
                    <td className="py-1">23,3%</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-2">Total</td>
                    <td className="py-1 pr-2">3.801</td>
                    <td className="py-1 pr-2">4.343</td>
                    <td className="py-1">100%</td>
                  </tr>
                </tbody>
              </table>

              <div className="text-xs text-slate-400 mt-4 mb-2">Transacciones por canal</div>
              <table className="w-full text-xs text-slate-300">
                <thead>
                  <tr className="text-slate-400 border-b border-white/10">
                    <th className="text-left py-1 pr-2">Canal</th>
                    <th className="text-left py-1 pr-2">Sep 2024</th>
                    <th className="text-left py-1 pr-2">Sep 2025</th>
                    <th className="text-left py-1">Part. 2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-1 pr-2">Internet</td>
                    <td className="py-1 pr-2">428</td>
                    <td className="py-1 pr-2">429</td>
                    <td className="py-1">9,9%</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-1 pr-2">Oficina</td>
                    <td className="py-1 pr-2">968</td>
                    <td className="py-1 pr-2">1.008</td>
                    <td className="py-1">23,2%</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-1 pr-2">Banca celular</td>
                    <td className="py-1 pr-2">1.620</td>
                    <td className="py-1 pr-2">2.145</td>
                    <td className="py-1">49,4%</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-1 pr-2">Otros</td>
                    <td className="py-1 pr-2">785</td>
                    <td className="py-1 pr-2">760</td>
                    <td className="py-1">17,5%</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-2">Total</td>
                    <td className="py-1 pr-2">3.801</td>
                    <td className="py-1 pr-2">4.343</td>
                    <td className="py-1">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="indicator-charts grid lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-3">Adultos con tarjeta de crédito</div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden flex mb-3">
                <div className="h-full bg-blue-500" style={{ width: '30.9%' }} title="Tiene 30,9%"></div>
                <div className="h-full bg-amber-500" style={{ width: '69.1%' }} title="No tiene 69,1%"></div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 mb-4">
                <div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>Tiene: 30,9%</div>
                <div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-amber-500"></span>No tiene: 69,1%</div>
              </div>

              <div className="text-xs text-slate-400 mb-2">Por sexo</div>
              <div className="space-y-2 text-xs">
                {[{ label: 'Hombres', value: 34.86 }, { label: 'Mujeres', value: 27.11 }].map(item => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1"><span>{item.label}</span><span className="font-semibold">{item.value.toFixed(2).replace('.', ',')}%</span></div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-cyan-400" style={{ width: `${item.value * 2.2}%` }}></div></div>
                  </div>
                ))}
              </div>

              <div className="text-xs text-slate-400 mt-4 mb-2">Por edad (participación)</div>
              <div className="space-y-2 text-xs">
                {[
                  { label: 'Hasta 24 años', men: 4.6, women: 4.2 },
                  { label: '25 a 44 años', men: 49.3, women: 50.9 },
                  { label: '45 a 64 años', men: 35.0, women: 34.3 },
                  { label: '65 años y más', men: 11.1, women: 10.6 },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1"><span>{item.label}</span><span className="text-slate-400">{item.men.toFixed(1).replace('.', ',')}% / {item.women.toFixed(1).replace('.', ',')}%</span></div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden flex">
                      <div className="h-full bg-blue-500" style={{ width: `${Math.max(item.men * 1.6, 2)}%` }}></div>
                      <div className="h-full bg-pink-400" style={{ width: `${Math.max(item.women * 1.6, 2)}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-3">Créditos (consumo y microcréditos)</div>

              <div className="mb-4">
                <div className="text-xs text-slate-400 mb-2">Consumo — adultos con crédito</div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden flex mb-2">
                  <div className="h-full bg-blue-500" style={{ width: '11%' }} title="Tiene 11,0%"></div>
                  <div className="h-full bg-amber-500" style={{ width: '89%' }} title="No tiene 89,0%"></div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 mb-3">
                  <div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>Tiene: 11,0%</div>
                  <div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-amber-500"></span>No tiene: 89,0%</div>
                </div>
                <div className="text-xs text-slate-400 mb-1">Por sexo</div>
                <div className="space-y-2 text-xs">
                  {[{ label: 'Hombres', value: 11.66 }, { label: 'Mujeres', value: 10.33 }].map(item => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1"><span>{item.label}</span><span className="font-semibold">{item.value.toFixed(2).replace('.', ',')}%</span></div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-cyan-400" style={{ width: `${item.value * 2.2}%` }}></div></div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-slate-400 mt-3 mb-1">Por edad</div>
                <div className="space-y-2 text-xs">
                  {[
                    { label: 'Hasta 24 años', men: 8.0, women: 5.9 },
                    { label: '25 a 44 años', men: 58.2, women: 56.6 },
                    { label: '45 a 64 años', men: 28.2, women: 31.2 },
                    { label: '65 años y más', men: 5.6, women: 6.3 },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1"><span>{item.label}</span><span className="text-slate-400">{item.men.toFixed(1).replace('.', ',')}% / {item.women.toFixed(1).replace('.', ',')}%</span></div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden flex">
                        <div className="h-full bg-blue-500" style={{ width: `${Math.max(item.men * 1.4, 2)}%` }}></div>
                        <div className="h-full bg-pink-400" style={{ width: `${Math.max(item.women * 1.4, 2)}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-400 mb-2">Microcréditos — adultos con crédito</div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden flex mb-2">
                  <div className="h-full bg-blue-500" style={{ width: '3.8%' }} title="Tiene 3,8%"></div>
                  <div className="h-full bg-amber-500" style={{ width: '96.2%' }} title="No tiene 96,2%"></div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 mb-3">
                  <div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>Tiene: 3,8%</div>
                  <div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-amber-500"></span>No tiene: 96,2%</div>
                </div>
                <div className="text-xs text-slate-400 mb-1">Por sexo</div>
                <div className="space-y-2 text-xs">
                  {[{ label: 'Hombres', value: 4.70 }, { label: 'Mujeres', value: 2.89 }].map(item => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1"><span>{item.label}</span><span className="font-semibold">{item.value.toFixed(2).replace('.', ',')}%</span></div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-cyan-400" style={{ width: `${item.value * 4}%` }}></div></div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-slate-400 mt-3 mb-1">Por edad</div>
                <div className="space-y-2 text-xs">
                  {[
                    { label: 'Hasta 24 años', men: 14.2, women: 11.7 },
                    { label: '25 a 44 años', men: 47.3, women: 51.5 },
                    { label: '45 a 64 años', men: 32.5, women: 32.1 },
                    { label: '65 años y más', men: 6.1, women: 4.8 },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1"><span>{item.label}</span><span className="text-slate-400">{item.men.toFixed(1).replace('.', ',')}% / {item.women.toFixed(1).replace('.', ',')}%</span></div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden flex">
                        <div className="h-full bg-blue-500" style={{ width: `${Math.max(item.men * 1.4, 2)}%` }}></div>
                        <div className="h-full bg-pink-400" style={{ width: `${Math.max(item.women * 1.4, 2)}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="indicator-charts grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-3">Tarjetas de débito</div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>10,6 millones</span>
                <span className="text-emerald-300">+9,6% anual</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden flex">
                <div className="h-full bg-blue-500" style={{ width: '50.8%' }} title="Hombres 50,8%"></div>
                <div className="h-full bg-pink-400" style={{ width: '49.2%' }} title="Mujeres 49,2%"></div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 mt-3">
                <div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>Hombres: 50,8%</div>
                <div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-pink-400"></span>Mujeres: 49,2%</div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-3">Tarjetas de crédito</div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>4,2 millones</span>
                <span className="text-emerald-300">+6,1% anual</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden flex">
                <div className="h-full bg-blue-500" style={{ width: '55.2%' }} title="Hombres 55,2%"></div>
                <div className="h-full bg-pink-400" style={{ width: '44.8%' }} title="Mujeres 44,8%"></div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 mt-3">
                <div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>Hombres: 55,2%</div>
                <div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-pink-400"></span>Mujeres: 44,8%</div>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400">
            Fuente:
            <a
              href="https://www.superbancos.gob.ec/estadisticas/portalestudios/estudios-y-analisis/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 hover:underline ml-1"
            >
              Superintendencia de Bancos — Boletín Trimestral de Inclusión Financiera (sep 2025)
            </a>
          </div>
        </div>
      ),
    },
  ]), [firmaMax, firmaStats.length, firmaTop, firmaTotal]);

  const indicatorCategories = useMemo(() => {
    const unique = Array.from(new Set(indicatorSections.map(section => section.category)));
    return ['all', ...unique];
  }, [indicatorSections]);

  const filteredIndicatorSections = useMemo(() => {
    const normalizedQuery = indicatorQuery.trim().toLowerCase();
    return indicatorSections.filter(section => {
      const matchesCategory = indicatorCategory === 'all' || section.category === indicatorCategory;
      if (!normalizedQuery) return matchesCategory;
      const haystack = `${section.title} ${section.category} ${(section.tags || []).join(' ')}`.toLowerCase();
      return matchesCategory && haystack.includes(normalizedQuery);
    });
  }, [indicatorSections, indicatorQuery, indicatorCategory]);

  const buildAPA = (event) => {
    const fuentes = Array.isArray(event.fuentes) ? event.fuentes : [];
    if (!fuentes.length) {
      return `${event.titulo}. (${event.fecha || 's. f.'}).`;
    }
    return fuentes
      .map(f => {
        if (!f.url) {
          return `${event.titulo}. (${(event.fecha || '').slice(0, 4) || 's. f.'}). ${f.label}. (Fuente local: documento del usuario).`;
        }
        const org = guessOrg(f.url, f.label);
        const year = (event.fecha || '').slice(0, 4) || 's. f.';
        return `${org}. (${year}). ${f.label}. ${f.url}`;
      })
      .join('\n');
  };

  const handleCopyAPAAll = async () => {
    const apa = filtered.map(buildAPA).filter(Boolean).join('\n\n');
    await navigator.clipboard.writeText(apa || '');
    alert('APA copiada');
  };

  const handleExportExcel = () => {
    const rows = filtered.map(e => ({
      id: e.id || '',
      pais: e.pais || '',
      categoria: e.categoria || '',
      titulo: e.titulo || '',
      fecha: e.fecha || '',
      descripcion: e.descripcion || '',
      fuentes: (e.fuentes || []).map(f => `${f.label}${f.url ? ` (${f.url})` : ''}`).join(' | '),
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Eventos');

    const date = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(workbook, `digitalizacion_${activeTab}_${date}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_circle_at_10%_-10%,rgba(34,211,238,0.15),transparent),radial-gradient(800px_circle_at_90%_0%,rgba(99,102,241,0.12),transparent)] bg-slate-950 text-white">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-90 transition"
              aria-label="Ir al inicio"
            >
              <div className="h-12 w-12 rounded-full bg-white/90 border border-white/20 flex items-center justify-center overflow-hidden p-1">
                <img
                  src="/logo3.png"
                  alt="Universidad Central del Ecuador"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-base font-semibold tracking-wide">GRUPO 4</h1>
                <p className="text-xs text-slate-400">Universidad Central del Ecuador</p>
              </div>
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => window.print()}
                className="border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full text-sm"
              >
                Imprimir
              </button>
              <button
                onClick={handleExportExcel}
                className="border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full text-sm"
              >
                Exportar Excel
              </button>
              <button
                onClick={handleCopyAPAAll}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-4 py-1.5 rounded-full text-sm"
              >
                Copiar APA 7
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-bold leading-tight">{title}</h2>
          </div>

          {!headerCollapsed && (
            <>
              <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <label className="text-xs text-slate-400">Buscar</label>
                      <input
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Ej: LOPDP, 2023, INEC, Reglamento..."
                        className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Categoría</label>
                      <select
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                        className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                      >
                        <option value="all" className="bg-white text-slate-900">Todas</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat} className="bg-white text-slate-900">{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">País</label>
                      <select
                        value={selectedCountry}
                        onChange={e => setSelectedCountry(e.target.value)}
                        className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                      >
                        <option value="all" className="bg-white text-slate-900">Todos</option>
                        {countries.map(country => (
                          <option key={country} value={country} className="bg-white text-slate-900">{country}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Orden</label>
                      <select
                        value={sortOrder}
                        onChange={e => setSortOrder(e.target.value)}
                        className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                      >
                        <option value="desc" className="bg-white text-slate-900">Más reciente → más antiguo</option>
                        <option value="asc" className="bg-white text-slate-900">Más antiguo → más reciente</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                          type="checkbox"
                          checked={onlyWithSources}
                          onChange={e => setOnlyWithSources(e.target.checked)}
                        />
                        Solo con fuentes
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                          type="checkbox"
                          checked={compactView}
                          onChange={e => setCompactView(e.target.checked)}
                        />
                        Vista compacta
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-600/5 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/50 transition flex flex-col items-center text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="text-2xl">📊</span>
                      <div className="text-xs font-semibold text-blue-400 uppercase">Total</div>
                    </div>
                    <div className="text-4xl font-bold text-blue-300">{stats.total}</div>
                    <p className="text-xs text-slate-400 mt-3">Eventos en la base</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-600/20 to-green-600/5 border border-green-500/30 rounded-2xl p-6 hover:border-green-500/50 transition flex flex-col items-center text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="text-2xl">✅</span>
                      <div className="text-xs font-semibold text-green-400 uppercase">Mostrados</div>
                    </div>
                    <div className="text-4xl font-bold text-green-300">{stats.shown}</div>
                    <p className="text-xs text-slate-400 mt-3">Después de filtros</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-600/5 border border-purple-500/30 rounded-2xl p-6 hover:border-purple-500/50 transition flex flex-col items-center text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="text-2xl">🏷️</span>
                      <div className="text-xs font-semibold text-purple-400 uppercase">Categorías</div>
                    </div>
                    <div className="text-4xl font-bold text-purple-300">{categories.length}</div>
                    <p className="text-xs text-slate-400 mt-3">Tipos de eventos</p>
                  </div>
                </div>
              </div>

            </>
          )}
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center py-3">
          <button
            onClick={() => setHeaderCollapsed(prev => !prev)}
            className="border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full text-sm font-semibold transition"
            title={headerCollapsed ? 'Mostrar filtros' : 'Ocultar filtros'}
          >
            {headerCollapsed ? '▼ Mostrar filtros' : '▲ Ocultar filtros'}
          </button>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <section className="space-y-4">
          <h3 className="text-sm uppercase tracking-wider text-slate-400">Resumen</h3>
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 className="font-semibold mb-2">Resumen ejecutivo</h3>
              <ul className="text-sm text-slate-300 list-disc pl-5 space-y-2">
                <li>Base documental con {stats.total} eventos verificados y {stats.withSources} con fuentes.</li>
                <li>Enfoque en marco legal, infraestructura digital y estadísticas oficiales.</li>
                <li>Comparación orientada a madurez digital y brechas de implementación.</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Datos del documento</h3>
              <dl className="text-sm text-slate-300 grid gap-2">
                <div className="grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-slate-500">Documento</dt>
                  <dd className="font-semibold text-white">{document?.nombre || '—'}</dd>
                </div>
                <div className="grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-slate-500">Institución</dt>
                  <dd>{document?.institucion || '—'}</dd>
                </div>
                <div className="grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-slate-500">Asignatura</dt>
                  <dd>{document?.asignatura || '—'}</dd>
                </div>
                <div className="grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-slate-500">Docente</dt>
                  <dd>{document?.docente || '—'}</dd>
                </div>
                <div className="grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-slate-500">Fecha (portada)</dt>
                  <dd>{formatDateES(document?.fecha_portada)} ({document?.fecha_portada || '—'})</dd>
                </div>
                <div className="grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-slate-500">Integrantes</dt>
                  <dd>{(document?.integrantes || []).join(', ') || '—'}</dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Notas rápidas</h3>
            <ul className="text-sm text-slate-300 list-disc pl-5 space-y-2">
              <li>Las fechas se presentan en formato ISO (AAAA-MM-DD) para ordenar sin ambigüedades.</li>
              <li>Las fuentes se abren en una pestaña nueva.</li>
              <li>Puedes exportar el JSON filtrado o copiar la bibliografía en APA.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm uppercase tracking-wider text-slate-400">Contenido</h3>
              <p className="text-xs text-slate-500">Explora resultados, indicadores y análisis</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'eventos', label: 'Eventos' },
                { id: 'indicadores', label: 'Indicadores' },
                { id: 'informe', label: 'Análisis' },
                { id: 'sintesis', label: 'Síntesis' },
                { id: 'bibliografia', label: 'Bibliografía' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setContentTab(tab.id)}
                  className={`px-3 py-1.5 rounded-full text-xs border ${contentTab === tab.id ? 'bg-white/15 border-white/30' : 'border-white/10 hover:bg-white/10'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {contentTab === 'eventos' && (
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold">Línea de tiempo</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setIsTimelineOpen(true)}
                      className="bg-white/10 hover:bg-white/20 border border-white/10 px-3 py-1.5 rounded-full text-sm"
                    >
                      Visualizar timeline
                    </button>
                    <button
                      onClick={() => setIsVerticalTimelineOpen(!isVerticalTimelineOpen)}
                      className="bg-white/10 hover:bg-white/20 border border-white/10 px-3 py-1.5 rounded-full text-sm"
                    >
                      Comparativa
                    </button>
                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs">{stats.shown} resultados</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab('timeline')}
                      className={`px-3 py-1 rounded-full text-xs border ${activeTab === 'timeline' ? 'bg-white/15 border-white/30' : 'border-white/10 hover:bg-white/10'}`}
                    >
                      Línea de tiempo (hitos)
                    </button>
                    <button
                      onClick={() => setActiveTab('reference')}
                      className={`px-3 py-1 rounded-full text-xs border ${activeTab === 'reference' ? 'bg-white/15 border-white/30' : 'border-white/10 hover:bg-white/10'}`}
                    >
                      Marco legal y estadísticas
                    </button>
                  </div>
                  <button
                    onClick={() => setShowEvents(!showEvents)}
                    className={`px-3 py-1 rounded-full text-xs border transition ${showEvents ? 'bg-white/15 border-white/30' : 'bg-white/5 border-white/10'}`}
                    title={showEvents ? 'Ocultar eventos' : 'Mostrar eventos'}
                  >
                    {showEvents ? '👁️ Ocultar eventos' : '👁️‍🗨️ Mostrar eventos'}
                  </button>
                </div>
              </div>

              {showEvents && (
                <>
                  {filtered.length === 0 ? (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-slate-300">
                      No hay eventos que coincidan con los filtros actuales.
                    </div>
                  ) : (
                    <div className={`grid ${compactView ? 'gap-3' : 'gap-4'}`}>
                      {filtered.map(event => (
                        <EventCard
                          key={event.id || `${event.titulo}-${event.fecha}`}
                          event={event}
                          compact={compactView}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {contentTab === 'indicadores' && (
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-semibold">Panel de indicadores</h4>
                    <p className="text-xs text-slate-400">Filtra por tema o busca una gráfica específica.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    <div className="w-full sm:w-72">
                      <label className="text-xs text-slate-400">Buscar indicador</label>
                      <input
                        value={indicatorQuery}
                        onChange={e => setIndicatorQuery(e.target.value)}
                        placeholder="Ej: EGDI, FirmaEC, transacciones, M2..."
                        className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <div className="w-full sm:w-56">
                      <label className="text-xs text-slate-400">Categoría</label>
                      <select
                        value={indicatorCategory}
                        onChange={e => setIndicatorCategory(e.target.value)}
                        className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                      >
                        {indicatorCategories.map(cat => (
                          <option key={cat} value={cat} className="bg-white text-slate-900">{cat === 'all' ? 'Todas' : cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center gap-2 text-sm text-slate-300">
                        <input
                          type="checkbox"
                          checked={indicatorShowAll}
                          onChange={e => setIndicatorShowAll(e.target.checked)}
                        />
                        Mostrar todas las vistas
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {indicatorCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setIndicatorCategory(cat)}
                      className={`text-xs px-3 py-1 rounded-full border transition ${indicatorCategory === cat ? 'bg-white/20 border-white/30' : 'bg-white/5 border-white/10'}`}
                    >
                      {cat === 'all' ? 'Todas' : cat}
                    </button>
                  ))}
                </div>

                <div className="grid md:grid-cols-3 gap-3 mt-4">
                  {filteredIndicatorSections.map(section => (
                    <button
                      key={section.id}
                      onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                      title={section.summary}
                      className="text-left bg-white/5 border border-white/10 rounded-xl p-3 hover:border-cyan-400/50 transition"
                    >
                      <div className="text-xs text-slate-400">{section.category}</div>
                      <div className="font-semibold text-sm text-white mt-1">{section.title}</div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden mt-3">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-indigo-400" style={{ width: '60%' }}></div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {filteredIndicatorSections.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-slate-300">
                  No se encontraron indicadores con los filtros actuales.
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredIndicatorSections.map(section => {
                    const view = indicatorShowAll ? 'full' : getIndicatorView(section.id);
                    return (
                      <section
                        key={section.id}
                        id={section.id}
                        className={`space-y-4 scroll-mt-24 indicator-view-${view}`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div>
                            <h4 className="text-lg font-semibold">{section.title}</h4>
                            <p className="text-xs text-slate-400">{section.category}</p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10">{section.category}</span>
                            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 text-xs">
                              {['full', 'charts', 'tables'].map(option => (
                                <button
                                  key={option}
                                  onClick={() => setIndicatorView(section.id, option)}
                                  disabled={indicatorShowAll}
                                  className={`px-3 py-1 rounded-full transition ${view === option ? 'bg-white/20 text-white' : 'text-slate-300'} ${indicatorShowAll ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                  {option === 'full' ? 'Completo' : option === 'charts' ? 'Gráficas' : 'Tablas'}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                        {section.content}
                      </section>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {contentTab === 'informe' && (
            <ReportInteractive />
          )}

          {contentTab === 'sintesis' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">¿Qué tan digitalizado está Ecuador?</h3>
                  <p className="text-xs text-slate-400">Síntesis con base en EGDI, conectividad y servicios digitales.</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10">Síntesis</span>
              </div>
              {digitalizacionSummaryContent}
            </div>
          )}

          {contentTab === 'bibliografia' && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Bibliografía</h3>
                <button
                  onClick={() => setShowBibliography(prev => !prev)}
                  className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
                  title={showBibliography ? 'Ocultar bibliografía' : 'Mostrar bibliografía'}
                >
                  {showBibliography ? '▲' : '▼'}
                </button>
              </div>
              {showBibliography && (
                <div className="mt-3 bg-slate-950/60 border border-white/10 rounded-xl p-3 text-xs whitespace-pre-wrap text-slate-300">
                  {filtered.map(buildAPA).filter(Boolean).join('\n\n') || '—'}
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      <TimelineModal
        events={filtered}
        isOpen={isTimelineOpen}
        onClose={() => setIsTimelineOpen(false)}
      />

      {isVerticalTimelineOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen py-8">
            <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl m-4">
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold">Línea de Tiempo Comparativa</h2>
                <button
                  onClick={() => setIsVerticalTimelineOpen(false)}
                  className="text-2xl hover:opacity-60"
                >
                  ✕
                </button>
              </div>
              <div className="p-8 dark:bg-slate-950">
                <VerticalTimeline events={filtered} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App

function guessOrg(url, label) {
  const host = url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
  if (host.includes('asambleanacional')) return 'Asamblea Nacional del Ecuador';
  if (host.includes('telecomunicaciones')) return 'Ministerio de Telecomunicaciones';
  if (host.includes('ecuadorencifras')) return 'Instituto Nacional de Estadística y Censos (INEC)';
  if (host.includes('gob.ec')) return 'Gobierno del Ecuador';
  if (host.includes('un.org')) return 'United Nations';
  return label || host;
}
