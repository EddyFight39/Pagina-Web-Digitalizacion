import React from 'react';
import { InternetUsageTable } from '../components/ui/InternetUsageTable';
import { 
  FirmaTreemap, 
  BankingPolarChart, 
  ComparisonRadialBar, 
  PersonDemographicChart,
  GenderGauge,
  NeonTrendChart,
  IndicatorProgressBar
} from '../components/charts/IndicatorsCharts';
import { formatNumber } from '../utils/formatters';

export const getIndicatorSections = (firmaTotal, firmaTop, firmaMax, firmaStats) => [
  {
    id: 'internet-uso',
    title: 'Uso de internet (ENEMDU)',
    category: 'Conectividad',
    tags: ['inec', 'enemdu', 'internet', 'hogares', 'personas'],
    summary: 'Muestra qué tanto usan internet los hogares y las personas, para medir conectividad digital.',
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-2xl border indicator-charts bg-white/5 border-white/10">
          <div className="text-sm font-semibold">Resumen ENEMDU</div>
          <p className="mt-1 text-xs text-slate-400">Esta sección se visualiza en la vista de tablas.</p>
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
      <div className="p-5 space-y-4 rounded-2xl border bg-white/5 border-white/10">
        <div className="space-y-6 indicator-charts">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">📊 Indicador Principal: EGDI</h3>
              <p className="text-sm text-slate-400">E-Government Development Index (ONU)</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/10">Estándar internacional</span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 items-center">
            {/* Gráfico Radial de Comparación */}
            <div className="p-2">
              <div className="text-xs text-center text-slate-400 mb-2">Comparativa Regional (Escala 0-1)</div>
              <ComparisonRadialBar />
            </div>

            {/* Tarjetas de Datos */}
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-900/40 to-blue-800/10 rounded-xl border border-blue-500/30 flex justify-between items-center">
                <div>
                  <div className="text-xs text-blue-300 font-semibold uppercase">Ecuador 🇪🇨</div>
                  <div className="text-3xl font-bold text-white">0,7800</div>
                  <div className="text-[10px] text-blue-200">Nivel ALTO • Puesto 67</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">67</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-xs text-red-300 font-semibold uppercase">Chile 🇨🇱</div>
                  <div className="text-xl font-bold text-white">0,8827</div>
                  <div className="text-[10px] text-slate-400">Líder Regional</div>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-xs text-green-300 font-semibold uppercase">Canadá 🇨🇦</div>
                  <div className="text-xl font-bold text-white">0,8452</div>
                  <div className="text-[10px] text-slate-400">Referente Norte</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 text-xs rounded-xl border bg-slate-950/60 border-white/10 text-slate-300">
            <p className="mb-2"><span className="font-semibold text-cyan-400">Análisis:</span> Ecuador se consolida en el grupo de "Alto Nivel" (0.75-1.0), pero mantiene una brecha de ~0.10 puntos con los líderes regionales en infraestructura y servicios integrados.</p>
          </div>
        </div>

        <div className="indicator-tables">
          <div className="p-4 rounded-xl border bg-white/5 border-white/10">
            <div className="mb-3 text-xs text-slate-400">Resumen EGDI 2024</div>
            <table className="w-full text-xs text-slate-300">
              <thead>
                <tr className="border-b text-slate-400 border-white/10">
                  <th className="py-1 pr-2 text-left">País</th>
                  <th className="py-1 pr-2 text-left">EGDI</th>
                  <th className="py-1 pr-2 text-left">Nivel</th>
                  <th className="py-1 text-left">Puesto</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-1 pr-2">Ecuador</td>
                  <td className="py-1 pr-2">0,7800</td>
                  <td className="py-1 pr-2">ALTO</td>
                  <td className="py-1">67</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-1 pr-2">Chile</td>
                  <td className="py-1 pr-2">0,8827</td>
                  <td className="py-1 pr-2">MUY ALTO</td>
                  <td className="py-1">31</td>
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
          Fuente: <a href={`${import.meta.env.BASE_URL}Technical%20Appendix%20(Web%20version)%2030102024.pdf`} target="_blank" rel="noopener noreferrer" className="ml-1 text-cyan-300 hover:underline">UN E-Government Survey 2024</a>
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
      <div className="p-4 rounded-2xl border bg-white/5 border-white/10">
        <div className="space-y-4 indicator-charts">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold">Indicadores operativos (Ecuador)</h4>
            <span className="px-2 py-1 text-xs rounded-full border bg-white/10 border-white/10">Fuentes oficiales</span>
          </div>
          <div className="grid gap-3 mb-4 md:grid-cols-4">
            <div className="p-3 rounded-xl border bg-white/5 border-white/10">
              <div className="text-xs text-slate-400">Trámites (Gob.ec)</div>
              <div className="text-xl font-semibold">7000</div>
            </div>
            <div className="p-3 rounded-xl border bg-white/5 border-white/10">
              <div className="text-xs text-slate-400">Visitas</div>
              <div className="text-xl font-semibold">67.91M</div>
            </div>
            <div className="p-3 rounded-xl border bg-white/5 border-white/10">
              <div className="text-xs text-slate-400">Regulaciones</div>
              <div className="text-xl font-semibold">2761</div>
            </div>
            <div className="p-3 rounded-xl border bg-white/5 border-white/10">
              <div className="text-xs text-slate-400">Instituciones</div>
              <div className="text-xl font-semibold">379</div>
            </div>
          </div>
          <div className="p-4 mb-4 rounded-xl border bg-white/5 border-white/10">
            <div className="mb-3 text-xs text-slate-400">Gob.ec — métricas destacadas</div>
            <div className="space-y-3">
              <IndicatorProgressBar label="Trámites" value="7000" color="bg-cyan-400" width="70%" />
              <IndicatorProgressBar label="Regulaciones" value="2761" color="bg-indigo-400" width="27.61%" />
              <IndicatorProgressBar label="Instituciones" value="379" color="bg-emerald-400" width="3.79%" />
            </div>
            <p className="mt-3 text-xs text-slate-500">Fuente: Gob.ec (Trámites más visitados).</p>
          </div>
          <div className="p-4 mb-4 rounded-xl border bg-white/5 border-white/10">
            <div className="flex justify-between items-center mb-3 text-xs text-slate-400">
              <span>SRI — distribución de trámites electrónicos</span>
              <span>Total: 256 trámites</span>
            </div>
            <div className="flex overflow-hidden h-3 rounded-full bg-white/10">
              <div className="h-full bg-blue-500" style={{ width: '92.97%' }} title="SRI en Línea 92,97%"></div>
              <div className="h-full bg-amber-500" style={{ width: '5.08%' }} title="GOB.ec 5,08%"></div>
              <div className="h-full bg-purple-500" style={{ width: '1.95%' }} title="Quipux 1,95%"></div>
            </div>
            <div className="grid gap-3 mt-3 text-xs md:grid-cols-3 text-slate-300">
              <div className="flex gap-2 items-center">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>SRI en Línea: 92,97%
              </div>
              <div className="flex gap-2 items-center">
                <span className="inline-block w-2 h-2 bg-amber-500 rounded-full"></span>GOB.ec: 5,08%
              </div>
              <div className="flex gap-2 items-center">
                <span className="inline-block w-2 h-2 bg-purple-500 rounded-full"></span>Quipux: 1,95%
              </div>
            </div>
          </div>
        </div>
        <div className="indicator-tables">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs border-b text-slate-400 border-white/10">
                  <th className="py-2 pr-4 text-left">Indicador</th>
                  <th className="py-2 pr-4 text-left">Dato</th>
                  <th className="py-2 text-left">Fuente</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-white/10"><td className="py-2 pr-4">Número de trámites</td><td className="py-2 pr-4">7000</td><td className="py-2"><a href="https://www.gob.ec/" target="_blank" className="text-cyan-300 hover:underline">Gob.ec</a></td></tr>
                <tr className="border-b border-white/10"><td className="py-2 pr-4">SRI Servicios</td><td className="py-2 pr-4">2600</td><td className="py-2"><a href="https://www.sri.gob.ec/servicios-y-tramites" target="_blank" className="text-cyan-300 hover:underline">SRI</a></td></tr>
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
      <div className="p-4 rounded-2xl border bg-white/5 border-white/10">
        <div className="space-y-6 indicator-charts">
          <div className="flex gap-3 justify-between items-start">
            <div>
              <h4 className="font-semibold">Volumen de Firmas por Sistema</h4>
              <p className="text-xs text-slate-400">Distribución de uso en plataformas públicas</p>
            </div>
            <span className="px-2 py-1 text-xs rounded-full border bg-white/10 border-white/10">FirmaEC</span>
          </div>

          <div className="grid gap-3 mb-4 md:grid-cols-3">
            <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-900/20 to-cyan-900/5 border border-cyan-500/20">
              <div className="text-xs text-cyan-200 uppercase tracking-wider font-semibold">Total de firmas</div>
              <div className="text-2xl font-bold text-white mt-1">{formatNumber(firmaTotal)}</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Sistema Líder</div>
              <div className="text-lg font-bold text-white mt-1 truncate" title={firmaTop[0]?.system}>{firmaTop[0]?.system || '—'}</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Sistemas Activos</div>
              <div className="text-2xl font-bold text-white mt-1">{formatNumber(firmaStats ? firmaStats.length : 0)}</div>
            </div>
          </div>

          {/* Gráfico Treemap */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <h5 className="text-sm font-semibold text-slate-300">Mapa de Calor por Volumen</h5>
              <span className="text-[10px] text-slate-500">Top 12 sistemas</span>
            </div>
            {firmaTop.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-xs text-slate-500 bg-white/5 rounded-xl">Cargando datos...</div>
            ) : (
              <FirmaTreemap data={firmaTop} />
            )}
          </div>
        </div>

        <div className="indicator-tables mt-6">
          <div className="p-4 rounded-xl border bg-white/5 border-white/10">
            <div className="mb-3 text-xs text-slate-400">Detalle tabular (Top 10)</div>
            {firmaTop.length === 0 ? (
              <div className="text-xs text-slate-300">Cargando datos del CSV…</div>
            ) : (
              <table className="w-full text-xs text-slate-300">
                <thead>
                  <tr className="border-b text-slate-400 border-white/10">
                    <th className="py-1 pr-2 text-left">Sistema</th>
                    <th className="py-1 text-right">Firmas Generadas</th>
                  </tr>
                </thead>
                <tbody>
                  {firmaTop.map(item => (
                    <tr key={item.system} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-2 pr-2 font-medium text-cyan-100">{item.system}</td>
                      <td className="py-2 text-right font-mono text-slate-300">{formatNumber(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="mt-3 text-xs text-slate-400">
          Fuente: <a href="https://lookerstudio.google.com/u/0/reporting/824a3ec0-8acc-4f88-8378-6f47119ea2b6/page/H0iLD?s=r4mCJYK5ziU" target="_blank" rel="noopener noreferrer" className="ml-1 text-cyan-300 hover:underline">Looker Studio — Estadísticas FirmaEC</a>
        </div>
      </div>
    ),
  },
  {
    id: 'bce',
    title: 'Indicadores macroeconómicos — BCE',
    category: 'Economía',
    tags: ['bce', 'inflación', 'tasas', 'liquidez', 'm2', 'remesas'],
    summary: 'Contexto económico financiero actualizado.',
    content: (
      <div className="p-4 rounded-2xl border bg-white/5 border-white/10">
        <div className="space-y-6 indicator-charts">
          <h4 className="font-semibold border-b border-white/10 pb-2">Tablero Macroeconómico</h4>
          
          <div className="grid gap-4 md:grid-cols-3">
            <NeonTrendChart 
              title="Inflación Mensual" 
              value="0,37%" 
              subtext="Enero 2026" 
              color="#fbbf24" // Amber
              data={[0.1, 0.15, 0.2, 0.18, 0.25, 0.37]}
            />
            <NeonTrendChart 
              title="Desempleo" 
              value="2,61%" 
              subtext="Dic 2025 (Tendencia a baja)" 
              color="#f43f5e" // Rose
              data={[3.8, 3.5, 3.2, 2.9, 2.7, 2.61]}
            />
            <NeonTrendChart 
              title="Liquidez M2" 
              value="100.311 M" 
              subtext="Millones USD" 
              color="#10b981" // Emerald
              data={[98000, 98500, 99200, 99800, 100100, 100311]}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <NeonTrendChart 
              title="Tasa Activa Referencial" 
              value="7,54%" 
              subtext="Costo del crédito" 
              color="#3b82f6" // Blue
              data={[7.2, 7.3, 7.4, 7.45, 7.5, 7.54]}
            />
            <NeonTrendChart 
              title="Remesas" 
              value="$ 2.012 M" 
              subtext="Flujo trimestral constante" 
              color="#8b5cf6" // Violet
              data={[1800, 1850, 1920, 1980, 2000, 2012]}
            />
          </div>
        </div>

        <div className="indicator-tables mt-6">
          <div className="p-4 rounded-xl border bg-white/5 border-white/10">
            <div className="mb-3 text-xs text-slate-400">Resumen de indicadores BCE</div>
            <table className="w-full text-xs text-slate-300">
              <tbody>
                <tr className="border-b border-white/10"><td className="py-2">Tasa Pasiva</td><td className="py-2 text-right">5,61%</td></tr>
                <tr className="border-b border-white/10"><td className="py-2">Deuda Interna</td><td className="py-2 text-right">36.294 M</td></tr>
                <tr><td className="py-2">Riesgo País</td><td className="py-2 text-right">454 puntos</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="text-xs text-slate-400 mt-2">
          Fuente: <a href="https://contenido.bce.fin.ec/documentos/informacioneconomica/MonetarioFinanciero/ix_MonetariasFinancierasPrin.html" target="_blank" className="ml-1 text-cyan-300 hover:underline">Banco Central del Ecuador</a>
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
      <div className="p-4 rounded-2xl border bg-white/5 border-white/10">
        <div className="space-y-4 indicator-charts">
          <div className="flex gap-3 justify-between items-start mb-4">
            <div>
              <h4 className="font-semibold">Presencia financiera — Superintendencia de Bancos</h4>
              <p className="text-xs text-slate-400">Boletín de Inclusión Financiera (sep 2025)</p>
            </div>
            <span className="px-2 py-1 text-xs rounded-full border bg-white/10 border-white/10">Ecuador</span>
          </div>

          <div className="grid gap-3 mb-4 md:grid-cols-5">
            <div className="p-3 rounded-xl border bg-white/5 border-white/10"><div className="text-xs text-slate-400">Puntos de atención</div><div className="text-xl font-semibold">179.275</div><div className="text-xs text-emerald-300">+8,7%</div></div>
            <div className="p-3 rounded-xl border bg-white/5 border-white/10"><div className="text-xs text-slate-400">Cajeros</div><div className="text-xl font-semibold">5.022</div><div className="text-xs text-emerald-300">+2,8%</div></div>
            <div className="p-3 rounded-xl border bg-white/5 border-white/10"><div className="text-xs text-slate-400">Corresponsales</div><div className="text-xl font-semibold">48.536</div><div className="text-xs text-emerald-300">+6,8%</div></div>
            <div className="p-3 rounded-xl border bg-white/5 border-white/10"><div className="text-xs text-slate-400">Datáfonos</div><div className="text-xl font-semibold">124.343</div><div className="text-xs text-emerald-300">+10,6%</div></div>
            <div className="p-3 rounded-xl border bg-white/5 border-white/10"><div className="text-xs text-slate-400">Oficinas</div><div className="text-xl font-semibold">1.374</div><div className="text-xs text-rose-300">-2,3%</div></div>
          </div>

          <div className="grid gap-4 mb-4 md:grid-cols-2">
            <div className="p-4 rounded-xl border bg-white/5 border-white/10">
              <div className="mb-3 text-xs text-slate-400">Densidad por 10.000 adultos</div>
              <div className="space-y-3">
                <IndicatorProgressBar label="Datáfonos" value="71.7" color="bg-amber-500" width="71.7%" />
                <IndicatorProgressBar label="Corresponsales" value="36.1" color="bg-emerald-500" width="36.1%" />
                <IndicatorProgressBar label="Cajas" value="20.8" color="bg-purple-500" width="20.8%" />
                <IndicatorProgressBar label="Cajeros" value="3.7" color="bg-cyan-500" width="10%" />
              </div>
            </div>
            <div className="p-4 rounded-xl border bg-white/5 border-white/10">
              <div className="mb-3 text-xs text-slate-400">Cobertura Regional (Puntos/10k adultos)</div>
              <div className="space-y-3">
                <IndicatorProgressBar label="Galápagos" value="355.0" color="bg-blue-500" width="100%" />
                <IndicatorProgressBar label="Sierra" value="158.3" color="bg-blue-500" width="45%" />
                <IndicatorProgressBar label="Costa" value="118.5" color="bg-blue-500" width="33%" />
                <IndicatorProgressBar label="Oriente" value="73.2" color="bg-blue-500" width="20%" />
              </div>
            </div>
          </div>
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
      <div className="p-4 rounded-2xl border bg-white/5 border-white/10">
        <div className="flex gap-3 justify-between items-start mb-6">
          <div>
            <h4 className="font-semibold">Ecosistema Financiero Digital</h4>
            <p className="text-xs text-slate-400">Boletín Trimestral Sep 2025</p>
          </div>
          <span className="px-2 py-1 text-xs rounded-full border bg-white/10 border-white/10">Oficial</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-6 mb-8">
          {/* Gráfico Polar de Canales */}
          <div className="p-4 rounded-2xl border bg-white/5 border-white/10 flex flex-col items-center">
            <h5 className="text-sm font-semibold mb-4 text-center">Preferencia de Canales Transaccionales</h5>
            <BankingPolarChart />
            <div className="mt-4 text-xs text-center text-slate-400 max-w-xs">
              La <strong>Banca Celular (49.4%)</strong> domina el ecosistema, superando ampliamente a las oficinas físicas.
            </div>
          </div>

          {/* Métricas clave */}
          <div className="grid gap-4 content-start">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900/30 to-emerald-900/10 border border-emerald-500/20">
              <div className="text-xs text-emerald-200 mb-1">Transacciones Totales</div>
              <div className="text-3xl font-bold text-white">4,343 M</div>
              <div className="text-xs text-emerald-400 mt-1">▲ +14,3% crecimiento anual</div>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900/30 to-blue-900/10 border border-blue-500/20">
              <div className="text-xs text-blue-200 mb-1">Canales Electrónicos</div>
              <div className="text-3xl font-bold text-white">76,7%</div>
              <div className="text-xs text-blue-400 mt-1">Participación mayoritaria</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-xs text-slate-400 mb-1">Banca Móvil</div>
              <div className="text-2xl font-bold text-white">+32,5%</div>
              <div className="text-xs text-slate-500 mt-1">El canal de mayor crecimiento</div>
            </div>
          </div>
        </div>

        <h5 className="text-sm font-semibold mb-4 border-l-4 border-cyan-500 pl-3">Demografía Financiera</h5>
        
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          {/* Tarjetas de Crédito */}
          <div className="p-5 rounded-2xl border bg-white/5 border-white/10">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-semibold text-cyan-300">Tarjeta de Crédito</div>
              <span className="text-xs px-2 py-0.5 rounded bg-white/10">30.9% Tenencia</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <GenderGauge male={55.2} female={44.8} title="Uso por Género" />
              <div className="flex flex-col justify-center text-xs space-y-2 text-slate-300">
                <p>• Brecha de género persiste en acceso al crédito.</p>
                <p>• Hombres lideran la tenencia con 55%.</p>
              </div>
            </div>

            <div className="mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Por Grupo Etario</div>
            <PersonDemographicChart 
              data={[
                { label: '< 24', value: '4%', color: 'text-blue-400' },
                { label: '25-44', value: '50%', color: 'text-cyan-400' },
                { label: '45-64', value: '35%', color: 'text-emerald-400' },
                { label: '65+', value: '11%', color: 'text-purple-400' },
              ]}
            />
          </div>

          {/* Créditos de Consumo */}
          <div className="p-5 rounded-2xl border bg-white/5 border-white/10">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-semibold text-amber-300">Crédito de Consumo</div>
              <span className="text-xs px-2 py-0.5 rounded bg-white/10">11.0% Tenencia</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <GenderGauge male={52} female={48} title="Acceso por Género" />
              <div className="flex flex-col justify-center text-xs space-y-2 text-slate-300">
                <p>• Distribución más equitativa que en tarjetas.</p>
                <p>• Penetración general sigue siendo baja (11%).</p>
              </div>
            </div>

            <div className="mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Por Grupo Etario</div>
            <PersonDemographicChart 
              data={[
                { label: '< 24', value: '7%', color: 'text-blue-400' },
                { label: '25-44', value: '57%', color: 'text-cyan-400' },
                { label: '45-64', value: '30%', color: 'text-emerald-400' },
                { label: '65+', value: '6%', color: 'text-purple-400' },
              ]}
            />
          </div>
        </div>

        <div className="text-xs text-slate-400 mt-4 border-t border-white/10 pt-3">
          Fuente: <a href="https://www.superbancos.gob.ec/estadisticas/portalestudios/estudios-y-analisis/" target="_blank" rel="noopener noreferrer" className="ml-1 text-cyan-300 hover:underline">Superintendencia de Bancos (Sep 2025)</a>
        </div>
      </div>
    ),
  },
];