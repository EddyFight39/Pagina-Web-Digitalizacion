import React from 'react';
import { InternetUsageTable } from '../components/ui/InternetUsageTable';
import { formatNumber } from '../utils/formatters';

/**
 * Genera la configuración de las secciones de indicadores.
 * Recibe datos dinámicos calculados en hooks (como las estadísticas del CSV de firmas).
 */
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
        <div className="space-y-4 indicator-charts">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">📊 Indicador Principal: EGDI</h3>
              <p className="text-sm text-slate-400">E-Government Development Index (ONU)</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/10">Estándar internacional</span>
          </div>

          <div className="p-4 rounded-2xl border bg-white/5 border-white/10">
            <div className="flex justify-between items-center mb-3 text-xs text-slate-400">
              <span>Escala 0 – 1.0</span>
              <span>Comparación EGDI 2024</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="text-slate-300">🇪🇨 Ecuador</span>
                  <span className="font-semibold text-blue-300">0,7800</span>
                </div>
                <div className="overflow-hidden h-2 rounded-full bg-white/10">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '78.00%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="text-slate-300">🇨🇱 Chile</span>
                  <span className="font-semibold text-red-300">0,8827</span>
                </div>
                <div className="overflow-hidden h-2 rounded-full bg-white/10">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: '88.27%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="text-slate-300">🇨🇦 Canadá</span>
                  <span className="font-semibold text-green-300">0,8452</span>
                </div>
                <div className="overflow-hidden h-2 rounded-full bg-white/10">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '84.52%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-gradient-to-br rounded-2xl border from-blue-600/20 to-blue-600/5 border-blue-500/30">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">🇪🇨 Ecuador</h4>
                <span className="px-2 py-1 text-xs rounded-full border bg-blue-500/20 border-blue-500/30">Nivel ALTO</span>
              </div>
              <div className="mt-3 text-4xl font-bold text-blue-300">0,7800</div>
              <p className="mt-2 text-sm text-slate-400">Puesto 67 mundial</p>
            </div>
            <div className="p-4 bg-gradient-to-br rounded-2xl border from-red-600/20 to-red-600/5 border-red-500/30">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">🇨🇱 Chile</h4>
                <span className="px-2 py-1 text-xs rounded-full border bg-red-500/20 border-red-500/30">Nivel MUY ALTO</span>
              </div>
              <div className="mt-3 text-4xl font-bold text-red-300">0,8827</div>
              <p className="mt-2 text-sm text-slate-400">Puesto 31 (top 50)</p>
            </div>
            <div className="p-4 bg-gradient-to-br rounded-2xl border from-green-600/20 to-green-600/5 border-green-500/30">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">🇨🇦 Canadá</h4>
                <span className="px-2 py-1 text-xs rounded-full border bg-green-500/20 border-green-500/30">Nivel MUY ALTO</span>
              </div>
              <div className="mt-3 text-4xl font-bold text-green-300">0,8452</div>
              <p className="mt-2 text-sm text-slate-400">Puesto 47 (top 50)</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-xl border bg-white/5 border-white/10">
              <h5 className="mb-2 text-sm font-semibold">¿Por qué es el indicador principal?</h5>
              <ul className="pl-5 space-y-1 text-xs list-disc text-slate-300">
                <li>Estándar internacional de la ONU para medir gobierno digital.</li>
                <li>Integra servicios en línea, infraestructura TIC y capital humano.</li>
                <li>Comparación objetiva entre 193 países.</li>
                <li>Usado en investigaciones académicas y políticas públicas.</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl border bg-white/5 border-white/10">
              <h5 className="mb-2 text-sm font-semibold">Otros indicadores considerados</h5>
              <ul className="pl-5 space-y-1 text-xs list-disc text-slate-300">
                <li>Acceso a internet (hogares y personas).</li>
                <li>Número de trámites digitales disponibles.</li>
                <li>Adopción de firma electrónica (certificados emitidos).</li>
                <li>Existencia de marcos legales habilitantes.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 text-xs rounded-xl border bg-slate-950/60 border-white/10 text-slate-300">
            <p className="mb-2"><span className="font-semibold">¿0,7800 es un buen puntaje?</span> Sí. Es nivel ALTO (rangos ONU: bajo &lt; 0.50, medio 0.50–0.75, alto 0.75–1.0).</p>
            <p>Puesto 67 de 193 países (tercio superior). Persisten brechas frente a “muy alto” (&gt; 0.85) donde están Chile y Canadá.</p>
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
          Fuente:
          <a
            href={`${import.meta.env.BASE_URL}Technical%20Appendix%20(Web%20version)%2030102024.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-cyan-300 hover:underline"
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
            <div className="space-y-2">
              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span>Trámites</span>
                  <span className="font-semibold">7000</span>
                </div>
                <div className="overflow-hidden h-2 rounded-full bg-white/10">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span>Regulaciones</span>
                  <span className="font-semibold">2761</span>
                </div>
                <div className="overflow-hidden h-2 rounded-full bg-white/10">
                  <div className="h-full bg-indigo-400 rounded-full" style={{ width: '27.61%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span>Instituciones</span>
                  <span className="font-semibold">379</span>
                </div>
                <div className="overflow-hidden h-2 rounded-full bg-white/10">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '3.79%' }}></div>
                </div>
              </div>
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
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                SRI en Línea: 238 (92,97%)
              </div>
              <div className="flex gap-2 items-center">
                <span className="inline-block w-2 h-2 bg-amber-500 rounded-full"></span>
                GOB.ec: 13 (5,08%)
              </div>
              <div className="flex gap-2 items-center">
                <span className="inline-block w-2 h-2 bg-purple-500 rounded-full"></span>
                Quipux: 5 (1,95%)
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">Fuente: SRI — Trámites electrónicos.</p>
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
      <div className="p-4 rounded-2xl border bg-white/5 border-white/10">
        <div className="space-y-4 indicator-charts">
          <div className="flex gap-3 justify-between items-start mb-4">
            <div>
              <h4 className="font-semibold">FirmaEC — firmas electrónicas por sistema</h4>
              <p className="text-xs text-slate-400">Datos consolidados del panel oficial (CSV)</p>
            </div>
            <span className="px-2 py-1 text-xs rounded-full border bg-white/10 border-white/10">FirmaEC</span>
          </div>

          <div className="grid gap-3 mb-4 md:grid-cols-3">
            <div className="p-3 rounded-xl border bg-white/5 border-white/10">
              <div className="text-xs text-slate-400">Total de firmas</div>
              <div className="text-xl font-semibold">{formatNumber(firmaTotal)}</div>
            </div>
            <div className="p-3 rounded-xl border bg-white/5 border-white/10">
              <div className="text-xs text-slate-400">Sistema líder</div>
              <div className="text-sm font-semibold text-white">{firmaTop[0]?.system || '—'}</div>
            </div>
            <div className="p-3 rounded-xl border bg-white/5 border-white/10">
              <div className="text-xs text-slate-400">Sistemas con firmas</div>
              <div className="text-xl font-semibold">{formatNumber(firmaStats ? firmaStats.length : 0)}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl border bg-white/5 border-white/10">
            <div className="mb-3 text-xs text-slate-400">Top 10 sistemas por volumen de firmas</div>
            {firmaTop.length === 0 ? (
              <div className="text-xs text-slate-300">Cargando datos del CSV…</div>
            ) : (
              <div className="space-y-2 text-xs">
                {firmaTop.map(item => (
                  <div key={item.system}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-200">{item.system}</span>
                      <span className="font-semibold">{formatNumber(item.total)}</span>
                    </div>
                    <div className="overflow-hidden h-2 rounded-full bg-white/10">
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
          <div className="p-4 rounded-xl border bg-white/5 border-white/10">
            <div className="mb-3 text-xs text-slate-400">Top 10 sistemas por volumen de firmas</div>
            {firmaTop.length === 0 ? (
              <div className="text-xs text-slate-300">Cargando datos del CSV…</div>
            ) : (
              <table className="w-full text-xs text-slate-300">
                <thead>
                  <tr className="border-b text-slate-400 border-white/10">
                    <th className="py-1 pr-2 text-left">Sistema</th>
                    <th className="py-1 text-left">Firmas</th>
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

        <div className="mt-3 text-xs text-slate-400">
          Fuente:
          <a
            href="https://lookerstudio.google.com/u/0/reporting/824a3ec0-8acc-4f88-8378-6f47119ea2b6/page/H0iLD?s=r4mCJYK5ziU"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-cyan-300 hover:underline"
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
      <div className="p-4 rounded-2xl border bg-white/5 border-white/10">
        <div className="space-y-4 indicator-charts">
          <div className="flex gap-3 justify-between items-start mb-4">
            <div>
              <h4 className="font-semibold">Indicadores macroeconómicos — BCE</h4>
              <p className="text-xs text-slate-400">Principales indicadores del sector monetario y financiero</p>
            </div>
            <span className="px-2 py-1 text-xs rounded-full border bg-white/10 border-white/10">Ecuador</span>
          </div>

          <div className="grid gap-3 mb-4 md:grid-cols-3">
            <div className="p-3 rounded-xl border bg-white/5 border-white/10">
              <div className="text-xs text-slate-400">Inflación mensual</div>
              <div className="text-xl font-semibold">0,37%</div>
              <div className="text-xs text-slate-500">Enero 2026</div>
            </div>
            <div className="p-3 rounded-xl border bg-white/5 border-white/10">
              <div className="text-xs text-slate-400">Desempleo nacional</div>
              <div className="text-xl font-semibold">2,61%</div>
              <div className="text-xs text-slate-500">Diciembre 2025</div>
            </div>
            <div className="p-3 rounded-xl border bg-white/5 border-white/10">
              <div className="text-xs text-slate-400">Liquidez total M2</div>
              <div className="text-xl font-semibold">100.311,92</div>
              <div className="text-xs text-slate-500">Millones USD (dic 2025)</div>
            </div>
            <div className="p-3 rounded-xl border bg-white/5 border-white/10">
              <div className="text-xs text-slate-400">Tasa activa referencial</div>
              <div className="text-xl font-semibold">7,54%</div>
              <div className="text-xs text-slate-500">Febrero 2026</div>
            </div>
            <div className="p-3 rounded-xl border bg-white/5 border-white/10">
              <div className="text-xs text-slate-400">Tasa pasiva referencial</div>
              <div className="text-xl font-semibold">5,61%</div>
              <div className="text-xs text-slate-500">Febrero 2026</div>
            </div>
            <div className="p-3 rounded-xl border bg-white/5 border-white/10">
              <div className="text-xs text-slate-400">Remesas de trabajadores</div>
              <div className="text-xl font-semibold">2.012,71</div>
              <div className="text-xs text-slate-500">Millones USD (III T 2025)</div>
            </div>
          </div>

          <div className="grid gap-4 mb-4 md:grid-cols-3">
            <div className="p-4 rounded-xl border bg-white/5 border-white/10">
              <div className="mb-3 text-xs text-slate-400">Precios y empleo (escala 0–5%)</div>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span>Inflación mensual</span>
                    <span className="font-semibold">0,37%</span>
                  </div>
                  <div className="overflow-hidden h-2 rounded-full bg-white/10">
                    <div className="h-full bg-amber-400" style={{ width: '7.4%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span>Desempleo nacional</span>
                    <span className="font-semibold">2,61%</span>
                  </div>
                  <div className="overflow-hidden h-2 rounded-full bg-white/10">
                    <div className="h-full bg-rose-400" style={{ width: '52.2%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border bg-white/5 border-white/10">
              <div className="mb-3 text-xs text-slate-400">Tasas referenciales (escala 0–10%)</div>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span>Tasa activa</span>
                    <span className="font-semibold">7,54%</span>
                  </div>
                  <div className="overflow-hidden h-2 rounded-full bg-white/10">
                    <div className="h-full bg-blue-400" style={{ width: '75.4%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span>Tasa pasiva</span>
                    <span className="font-semibold">5,61%</span>
                  </div>
                  <div className="overflow-hidden h-2 rounded-full bg-white/10">
                    <div className="h-full bg-emerald-400" style={{ width: '56.1%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border bg-white/5 border-white/10">
              <div className="mb-3 text-xs text-slate-400">Sector externo (escala 0–4.000 millones USD)</div>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span>Exportaciones</span>
                    <span className="font-semibold">3.402,42</span>
                  </div>
                  <div className="overflow-hidden h-2 rounded-full bg-white/10">
                    <div className="h-full bg-cyan-400" style={{ width: '85.1%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span>Saldo comercial</span>
                    <span className="font-semibold">744,17</span>
                  </div>
                  <div className="overflow-hidden h-2 rounded-full bg-white/10">
                    <div className="h-full bg-indigo-400" style={{ width: '18.6%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span>Remesas</span>
                    <span className="font-semibold">2.012,71</span>
                  </div>
                  <div className="overflow-hidden h-2 rounded-full bg-white/10">
                    <div className="h-full bg-purple-400" style={{ width: '50.3%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 mb-4 md:grid-cols-2">
            <div className="p-4 rounded-xl border bg-white/5 border-white/10">
              <div className="mb-3 text-xs text-slate-400">Finanzas públicas (escala 0–5% del PIB)</div>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span>Ingresos SPNF</span>
                    <span className="font-semibold">2,94%</span>
                  </div>
                  <div className="overflow-hidden h-2 rounded-full bg-white/10">
                    <div className="h-full bg-emerald-400" style={{ width: '58.8%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span>Erogaciones SPNF</span>
                    <span className="font-semibold">3,03%</span>
                  </div>
                  <div className="overflow-hidden h-2 rounded-full bg-white/10">
                    <div className="h-full bg-rose-400" style={{ width: '60.6%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border bg-white/5 border-white/10">
              <div className="mb-3 text-xs text-slate-400">Deuda y PIB (escala 0–130.000 millones USD)</div>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span>Deuda pública interna</span>
                    <span className="font-semibold">36.294,00</span>
                  </div>
                  <div className="overflow-hidden h-2 rounded-full bg-white/10">
                    <div className="h-full bg-orange-400" style={{ width: '27.9%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span>PIB nominal</span>
                    <span className="font-semibold">124.676,1</span>
                  </div>
                  <div className="overflow-hidden h-2 rounded-full bg-white/10">
                    <div className="h-full bg-blue-400" style={{ width: '95.9%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 mb-4 md:grid-cols-2">
            <div className="p-4 rounded-xl border bg-white/5 border-white/10">
              <div className="mb-2 text-xs text-slate-400">Actividad y sector externo</div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex justify-between items-center">
                  <span>Saldo balanza comercial</span>
                  <span className="font-semibold">744,17 (nov 2025)</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Exportaciones de bienes</span>
                  <span className="font-semibold">3.402,42 (nov 2025)</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Producción petrolera nacional</span>
                  <span className="font-semibold">467.574,55 (05-02-2026)</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>PIB nominal</span>
                  <span className="font-semibold">124.676,1 (2024 prel.)</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border bg-white/5 border-white/10">
              <div className="mb-2 text-xs text-slate-400">Finanzas públicas y mercados</div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex justify-between items-center">
                  <span>Total ingresos SPNF</span>
                  <span className="font-semibold">2,94% PIB (oct 2025)</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Total erogaciones SPNF</span>
                  <span className="font-semibold">3,03% PIB (oct 2025)</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Saldo deuda pública interna</span>
                  <span className="font-semibold">36.294,00 (oct 2025)</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Riesgo país</span>
                  <span className="font-semibold">454 (08-02-2026)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 mb-4 rounded-xl border bg-white/5 border-white/10">
            <div className="mb-2 text-xs text-slate-400">Mercados internacionales</div>
            <div className="grid gap-3 text-xs md:grid-cols-3 text-slate-300">
              <div className="flex justify-between items-center">
                <span>Índice Dow Jones</span>
                <span className="font-semibold">50.115,67 (08-02-2026)</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Precio del oro (Fixing PM)</span>
                <span className="font-semibold">4.948,00 (08-02-2026)</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Bonos soberanos (USD)</span>
                <span className="font-semibold">2030 98,76 · 2034 100,97 · 2035 91,10 · 2039 102,38 · 2040 82,34</span>
              </div>
            </div>
          </div>
        </div>

        <div className="indicator-tables">
          <div className="p-4 rounded-xl border bg-white/5 border-white/10">
            <div className="mb-3 text-xs text-slate-400">Resumen de indicadores BCE</div>
            <table className="w-full text-xs text-slate-300">
              <thead>
                <tr className="border-b text-slate-400 border-white/10">
                  <th className="py-1 pr-2 text-left">Indicador</th>
                  <th className="py-1 text-left">Dato</th>
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
            className="ml-1 text-cyan-300 hover:underline"
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
            <div className="p-3 rounded-xl border bg-white/5 border-white/10">
              <div className="text-xs text-slate-400">Puntos de atención</div>
              <div className="text-xl font-semibold">179.275</div>
              <div className="text-xs text-emerald-300">+8,7% anual</div>
            </div>
            <div className="p-3 rounded-xl border bg-white/5 border-white/10">
              <div className="text-xs text-slate-400">Oficinas</div>
              <div className="text-xl font-semibold">1.374</div>
              <div className="text-xs text-rose-300">-2,3% anual</div>
            </div>
            <div className="p-3 rounded-xl border bg-white/5 border-white/10">
              <div className="text-xs text-slate-400">Cajeros automáticos</div>
              <div className="text-xl font-semibold">5.022</div>
              <div className="text-xs text-emerald-300">+2,8% anual</div>
            </div>
            <div className="p-3 rounded-xl border bg-white/5 border-white/10">
              <div className="text-xs text-slate-400">Corresponsales</div>
              <div className="text-xl font-semibold">48.536</div>
              <div className="text-xs text-emerald-300">+6,8% anual</div>
            </div>
            <div className="p-3 rounded-xl border bg-white/5 border-white/10">
              <div className="text-xs text-slate-400">Datáfonos y cajas</div>
              <div className="text-xl font-semibold">124.343</div>
              <div className="text-xs text-emerald-300">+10,6% anual</div>
            </div>
          </div>

          <div className="grid gap-4 mb-4 md:grid-cols-2">
            <div className="p-4 rounded-xl border bg-white/5 border-white/10">
              <div className="flex justify-between items-center mb-2 text-xs text-slate-400">
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
                    <div className="flex justify-between items-center mb-1">
                      <span>{item.label}</span>
                      <span className="font-semibold">{item.value}</span>
                    </div>
                    <div className="overflow-hidden h-2 rounded-full bg-white/10">
                      <div className={`h-full ${item.color}`} style={{ width: `${Math.min(item.value * 1.2, 100)}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl border bg-white/5 border-white/10">
              <div className="flex justify-between items-center mb-2 text-xs text-slate-400">
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
                    <div className="flex justify-between items-center mb-1">
                      <span>{item.label}</span>
                      <span className="font-semibold">{item.value}</span>
                    </div>
                    <div className="overflow-hidden h-2 rounded-full bg-white/10">
                      <div className={`h-full ${item.color}`} style={{ width: `${Math.min(item.value / 3.5, 100)}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 mb-4 md:grid-cols-2">
            <div className="p-4 rounded-xl border bg-white/5 border-white/10">
              <div className="mb-3 text-xs text-slate-400">Cajeros automáticos por ubicación</div>
              <div className="flex overflow-hidden h-3 rounded-full bg-white/10">
                <div className="h-full bg-blue-500" style={{ width: '40.6%' }} title="En oficina 40,6%"></div>
                <div className="h-full bg-slate-300" style={{ width: '59.4%' }} title="Fuera de oficina 59,4%"></div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3 text-xs text-slate-300">
                <div className="flex gap-2 items-center">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                  En oficina: 40,6%
                </div>
                <div className="flex gap-2 items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-slate-300"></span>
                  Fuera de oficina: 59,4%
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border bg-white/5 border-white/10">
              <div className="mb-3 text-xs text-slate-400">Corresponsales no bancarios por ubicación</div>
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
                    <div className="flex justify-between items-center mb-1">
                      <span>{item.label}</span>
                      <span className="font-semibold">{item.value}%</span>
                    </div>
                    <div className="overflow-hidden h-2 rounded-full bg-white/10">
                      <div className={`h-full ${item.color}`} style={{ width: `${Math.min(item.value * 2, 100)}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 mb-4 rounded-xl border bg-white/5 border-white/10">
            <div className="mb-3 text-xs text-slate-400">Cobertura territorial por región (puntos por 10.000 adultos)</div>
            <div className="space-y-3 text-xs">
              {[
                { label: 'Costa o Litoral', v2024: 105.3, v2025: 118.5 },
                { label: 'Sierra o Interandina', v2024: 158.1, v2025: 158.3 },
                { label: 'Oriental o Amazónica', v2024: 40.9, v2025: 73.2 },
                { label: 'Insular o Galápagos', v2024: 91.2, v2025: 355.0 },
              ].map(region => (
                <div key={region.label}>
                  <div className="flex justify-between items-center mb-1">
                    <span>{region.label}</span>
                    <span className="text-slate-400">{region.v2024} → <span className="font-semibold text-white">{region.v2025}</span></span>
                  </div>
                  <div className="flex overflow-hidden h-2 rounded-full bg-white/10">
                    <div className="h-full bg-emerald-500" style={{ width: `${Math.min(region.v2024 / 4, 100)}%` }} title={`Sep 2024: ${region.v2024}`}></div>
                    <div className="h-full bg-blue-500" style={{ width: `${Math.min(region.v2025 / 4, 100)}%` }} title={`Sep 2025: ${region.v2025}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="indicator-tables">
          <div className="grid gap-4 mb-4 md:grid-cols-2">
            <div className="p-4 rounded-xl border bg-white/5 border-white/10">
              <div className="mb-2 text-xs text-slate-400">Densidad por 10.000 adultos (sep 2024 → sep 2025)</div>
              <table className="w-full text-xs text-slate-300">
                <thead>
                  <tr className="border-b text-slate-400 border-white/10">
                    <th className="py-1 pr-2 text-left">Tipo</th>
                    <th className="py-1 pr-2 text-left">2024</th>
                    <th className="py-1 pr-2 text-left">2025</th>
                    <th className="py-1 text-left">Δ%</th>
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

            <div className="p-4 rounded-xl border bg-white/5 border-white/10">
              <div className="mb-2 text-xs text-slate-400">Densidad por 1.000 km2 (sep 2024 → sep 2025)</div>
              <table className="w-full text-xs text-slate-300">
                <thead>
                  <tr className="border-b text-slate-400 border-white/10">
                    <th className="py-1 pr-2 text-left">Tipo</th>
                    <th className="py-1 pr-2 text-left">2024</th>
                    <th className="py-1 pr-2 text-left">2025</th>
                    <th className="py-1 text-left">Δ%</th>
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
            className="ml-1 text-cyan-300 hover:underline"
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
      <div className="p-4 rounded-2xl border bg-white/5 border-white/10">
        <div className="flex gap-3 justify-between items-start mb-4">
          <div>
            <h4 className="font-semibold">Inclusión financiera — créditos, tarjetas y transacciones</h4>
            <p className="text-xs text-slate-400">Boletín Trimestral de Inclusión Financiera (sep 2025)</p>
          </div>
          <span className="px-2 py-1 text-xs rounded-full border bg-white/10 border-white/10">Ecuador</span>
        </div>

        <div className="grid gap-3 mb-4 indicator-charts md:grid-cols-5">
          <div className="p-3 rounded-xl border bg-white/5 border-white/10">
            <div className="text-xs text-slate-400">Transacciones (ene-sep 2025)</div>
            <div className="text-xl font-semibold">4,343 millones</div>
            <div className="text-xs text-emerald-300">+14,3% anual</div>
          </div>
          <div className="p-3 rounded-xl border bg-white/5 border-white/10">
            <div className="text-xs text-slate-400">Canales electrónicos</div>
            <div className="text-xl font-semibold">76,7%</div>
            <div className="text-xs text-emerald-300">+17,8% anual</div>
          </div>
          <div className="p-3 rounded-xl border bg-white/5 border-white/10">
            <div className="text-xs text-slate-400">Banca móvil</div>
            <div className="text-xl font-semibold">+32,5%</div>
            <div className="text-xs text-slate-500">Incremento anual</div>
          </div>
          <div className="p-3 rounded-xl border bg-white/5 border-white/10">
            <div className="text-xs text-slate-400">Banca electrónica</div>
            <div className="text-xl font-semibold">-0,1%</div>
            <div className="text-xs text-rose-300">Decrecimiento anual</div>
          </div>
          <div className="p-3 rounded-xl border bg-white/5 border-white/10">
            <div className="text-xs text-slate-400">Participación física</div>
            <div className="text-xl font-semibold">23,3%</div>
            <div className="text-xs text-slate-500">Sep 2025</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-4 mb-4">
          <div className="p-4 rounded-xl border indicator-charts bg-white/5 border-white/10">
            <div className="mb-3 text-xs text-slate-400">Participación por tipo de canal (sep 2025)</div>
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
                  <div className="flex justify-between items-center mb-1">
                    <span>{item.label}</span>
                    <span className="font-semibold">{item.value.toFixed(2).replace('.', ',')}%</span>
                  </div>
                  <div className="overflow-hidden h-2 rounded-full bg-white/10">
                    <div className={`h-full ${item.color}`} style={{ width: `${Math.max(item.value * 1.8, 2)}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl border indicator-tables bg-white/5 border-white/10">
            <div className="mb-3 text-xs text-slate-400">Transacciones por tipo de canal</div>
            <table className="w-full text-xs text-slate-300">
              <thead>
                <tr className="border-b text-slate-400 border-white/10">
                  <th className="py-1 pr-2 text-left">Canal</th>
                  <th className="py-1 pr-2 text-left">Sep 2024</th>
                  <th className="py-1 pr-2 text-left">Sep 2025</th>
                  <th className="py-1 text-left">Part. 2025</th>
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

            <div className="mt-4 mb-2 text-xs text-slate-400">Transacciones por canal</div>
            <table className="w-full text-xs text-slate-300">
              <thead>
                <tr className="border-b text-slate-400 border-white/10">
                  <th className="py-1 pr-2 text-left">Canal</th>
                  <th className="py-1 pr-2 text-left">Sep 2024</th>
                  <th className="py-1 pr-2 text-left">Sep 2025</th>
                  <th className="py-1 text-left">Part. 2025</th>
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

        <div className="grid gap-4 mb-4 indicator-charts lg:grid-cols-2">
          <div className="p-4 rounded-xl border bg-white/5 border-white/10">
            <div className="mb-3 text-xs text-slate-400">Adultos con tarjeta de crédito</div>
            <div className="flex overflow-hidden mb-3 h-3 rounded-full bg-white/10">
              <div className="h-full bg-blue-500" style={{ width: '30.9%' }} title="Tiene 30,9%"></div>
              <div className="h-full bg-amber-500" style={{ width: '69.1%' }} title="No tiene 69,1%"></div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-slate-300">
              <div className="flex gap-2 items-center"><span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>Tiene: 30,9%</div>
              <div className="flex gap-2 items-center"><span className="inline-block w-2 h-2 bg-amber-500 rounded-full"></span>No tiene: 69,1%</div>
            </div>

            <div className="mb-2 text-xs text-slate-400">Por sexo</div>
            <div className="space-y-2 text-xs">
              {[{ label: 'Hombres', value: 34.86 }, { label: 'Mujeres', value: 27.11 }].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-1"><span>{item.label}</span><span className="font-semibold">{item.value.toFixed(2).replace('.', ',')}%</span></div>
                  <div className="overflow-hidden h-2 rounded-full bg-white/10"><div className="h-full bg-cyan-400" style={{ width: `${item.value * 2.2}%` }}></div></div>
                </div>
              ))}
            </div>

            <div className="mt-4 mb-2 text-xs text-slate-400">Por edad (participación)</div>
            <div className="space-y-2 text-xs">
              {[
                { label: 'Hasta 24 años', men: 4.6, women: 4.2 },
                { label: '25 a 44 años', men: 49.3, women: 50.9 },
                { label: '45 a 64 años', men: 35.0, women: 34.3 },
                { label: '65 años y más', men: 11.1, women: 10.6 },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-1"><span>{item.label}</span><span className="text-slate-400">{item.men.toFixed(1).replace('.', ',')}% / {item.women.toFixed(1).replace('.', ',')}%</span></div>
                  <div className="flex overflow-hidden h-2 rounded-full bg-white/10">
                    <div className="h-full bg-blue-500" style={{ width: `${Math.max(item.men * 1.6, 2)}%` }}></div>
                    <div className="h-full bg-pink-400" style={{ width: `${Math.max(item.women * 1.6, 2)}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl border bg-white/5 border-white/10">
            <div className="mb-3 text-xs text-slate-400">Créditos (consumo y microcréditos)</div>

            <div className="mb-4">
              <div className="mb-2 text-xs text-slate-400">Consumo — adultos con crédito</div>
              <div className="flex overflow-hidden mb-2 h-3 rounded-full bg-white/10">
                <div className="h-full bg-blue-500" style={{ width: '11%' }} title="Tiene 11,0%"></div>
                <div className="h-full bg-amber-500" style={{ width: '89%' }} title="No tiene 89,0%"></div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3 text-xs text-slate-300">
                <div className="flex gap-2 items-center"><span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>Tiene: 11,0%</div>
                <div className="flex gap-2 items-center"><span className="inline-block w-2 h-2 bg-amber-500 rounded-full"></span>No tiene: 89,0%</div>
              </div>
              <div className="mb-1 text-xs text-slate-400">Por sexo</div>
              <div className="space-y-2 text-xs">
                {[{ label: 'Hombres', value: 11.66 }, { label: 'Mujeres', value: 10.33 }].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between items-center mb-1"><span>{item.label}</span><span className="font-semibold">{item.value.toFixed(2).replace('.', ',')}%</span></div>
                    <div className="overflow-hidden h-2 rounded-full bg-white/10"><div className="h-full bg-cyan-400" style={{ width: `${item.value * 2.2}%` }}></div></div>
                  </div>
                ))}
              </div>
              <div className="mt-3 mb-1 text-xs text-slate-400">Por edad</div>
              <div className="space-y-2 text-xs">
                {[
                  { label: 'Hasta 24 años', men: 8.0, women: 5.9 },
                  { label: '25 a 44 años', men: 58.2, women: 56.6 },
                  { label: '45 a 64 años', men: 28.2, women: 31.2 },
                  { label: '65 años y más', men: 5.6, women: 6.3 },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between items-center mb-1"><span>{item.label}</span><span className="text-slate-400">{item.men.toFixed(1).replace('.', ',')}% / {item.women.toFixed(1).replace('.', ',')}%</span></div>
                    <div className="flex overflow-hidden h-2 rounded-full bg-white/10">
                      <div className="h-full bg-blue-500" style={{ width: `${Math.max(item.men * 1.4, 2)}%` }}></div>
                      <div className="h-full bg-pink-400" style={{ width: `${Math.max(item.women * 1.4, 2)}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-xs text-slate-400">Microcréditos — adultos con crédito</div>
              <div className="flex overflow-hidden mb-2 h-3 rounded-full bg-white/10">
                <div className="h-full bg-blue-500" style={{ width: '3.8%' }} title="Tiene 3,8%"></div>
                <div className="h-full bg-amber-500" style={{ width: '96.2%' }} title="No tiene 96,2%"></div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3 text-xs text-slate-300">
                <div className="flex gap-2 items-center"><span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>Tiene: 3,8%</div>
                <div className="flex gap-2 items-center"><span className="inline-block w-2 h-2 bg-amber-500 rounded-full"></span>No tiene: 96,2%</div>
              </div>
              <div className="mb-1 text-xs text-slate-400">Por sexo</div>
              <div className="space-y-2 text-xs">
                {[{ label: 'Hombres', value: 4.70 }, { label: 'Mujeres', value: 2.89 }].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between items-center mb-1"><span>{item.label}</span><span className="font-semibold">{item.value.toFixed(2).replace('.', ',')}%</span></div>
                    <div className="overflow-hidden h-2 rounded-full bg-white/10"><div className="h-full bg-cyan-400" style={{ width: `${item.value * 4}%` }}></div></div>
                  </div>
                ))}
              </div>
              <div className="mt-3 mb-1 text-xs text-slate-400">Por edad</div>
              <div className="space-y-2 text-xs">
                {[
                  { label: 'Hasta 24 años', men: 14.2, women: 11.7 },
                  { label: '25 a 44 años', men: 47.3, women: 51.5 },
                  { label: '45 a 64 años', men: 32.5, women: 32.1 },
                  { label: '65 años y más', men: 6.1, women: 4.8 },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between items-center mb-1"><span>{item.label}</span><span className="text-slate-400">{item.men.toFixed(1).replace('.', ',')}% / {item.women.toFixed(1).replace('.', ',')}%</span></div>
                    <div className="flex overflow-hidden h-2 rounded-full bg-white/10">
                      <div className="h-full bg-blue-500" style={{ width: `${Math.max(item.men * 1.4, 2)}%` }}></div>
                      <div className="h-full bg-pink-400" style={{ width: `${Math.max(item.women * 1.4, 2)}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 mb-4 indicator-charts md:grid-cols-2">
          <div className="p-4 rounded-xl border bg-white/5 border-white/10">
            <div className="mb-3 text-xs text-slate-400">Tarjetas de débito</div>
            <div className="flex justify-between items-center mb-2 text-sm">
              <span>10,6 millones</span>
              <span className="text-emerald-300">+9,6% anual</span>
            </div>
            <div className="flex overflow-hidden h-3 rounded-full bg-white/10">
              <div className="h-full bg-blue-500" style={{ width: '50.8%' }} title="Hombres 50,8%"></div>
              <div className="h-full bg-pink-400" style={{ width: '49.2%' }} title="Mujeres 49,2%"></div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3 text-xs text-slate-300">
              <div className="flex gap-2 items-center"><span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>Hombres: 50,8%</div>
              <div className="flex gap-2 items-center"><span className="inline-block w-2 h-2 bg-pink-400 rounded-full"></span>Mujeres: 49,2%</div>
            </div>
          </div>
          <div className="p-4 rounded-xl border bg-white/5 border-white/10">
            <div className="mb-3 text-xs text-slate-400">Tarjetas de crédito</div>
            <div className="flex justify-between items-center mb-2 text-sm">
              <span>4,2 millones</span>
              <span className="text-emerald-300">+6,1% anual</span>
            </div>
            <div className="flex overflow-hidden h-3 rounded-full bg-white/10">
              <div className="h-full bg-blue-500" style={{ width: '55.2%' }} title="Hombres 55,2%"></div>
              <div className="h-full bg-pink-400" style={{ width: '44.8%' }} title="Mujeres 44,8%"></div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3 text-xs text-slate-300">
              <div className="flex gap-2 items-center"><span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>Hombres: 55,2%</div>
              <div className="flex gap-2 items-center"><span className="inline-block w-2 h-2 bg-pink-400 rounded-full"></span>Mujeres: 44,8%</div>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-400">
          Fuente:
          <a
            href="https://www.superbancos.gob.ec/estadisticas/portalestudios/estudios-y-analisis/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-cyan-300 hover:underline"
          >
            Superintendencia de Bancos — Boletín Trimestral de Inclusión Financiera (sep 2025)
          </a>
        </div>
      </div>
    ),
  },
];