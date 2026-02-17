import React from 'react';
import ReactApexChart from 'react-apexcharts';

// ==========================================
// 1. Componentes de UI (Barras y Métricas)
// ==========================================

/**
 * NUEVO: Gráfico de Iconos Demográficos
 * Muestra porcentajes con iconos de personas coloreados (estilo infografía).
 */
export const PersonDemographicChart = ({ data }) => (
  <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-4 rounded-xl border bg-white/5 border-white/10">
    {data.map((item, idx) => (
      <div key={idx} className="flex flex-col justify-center items-center text-center group">
        <svg
          className={`w-12 h-12 mb-2 transition-transform duration-300 group-hover:scale-110 ${item.color}`}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
        </svg>
        <div className={`text-2xl font-bold ${item.color}`}>
          {item.value}
        </div>
        <div className="mt-1 text-xs font-medium text-slate-300">{item.label}</div>
        {item.subtext && <div className="text-[10px] text-slate-500">{item.subtext}</div>}
      </div>
    ))}
  </div>
);

/**
 * Barra de progreso simple con etiqueta y valor.
 * @param {string} label - Texto a la izquierda
 * @param {string} value - Valor textual a la derecha (ej: "78%")
 * @param {string} color - Clase de color (ej: "bg-blue-500")
 * @param {string} width - Porcentaje de ancho (ej: "78%")
 */
export const IndicatorProgressBar = ({ label, value, color = 'bg-cyan-500', width }) => (
  <div className="w-full">
    <div className="flex justify-between items-center mb-1 text-xs">
      <span className="text-slate-300">{label}</span>
      <span className={`font-semibold text-white`}>{value}</span>
    </div>
    <div className="overflow-hidden h-2 rounded-full bg-white/10">
      <div 
        className={`h-full rounded-full transition-all duration-500 ${color}`} 
        style={{ width: width }}
      ></div>
    </div>
  </div>
);

/**
 * Barra de progreso segmentada (Multicolor).
 * Útil para mostrar distribuciones (ej: SRI vs Gob.ec vs Quipux).
 * @param {Array} segments - Array de objetos { color, width, label, tooltip }
 */
export const MultiSegmentBar = ({ segments }) => (
  <div className="w-full">
    {/* Barra Visual */}
    <div className="flex overflow-hidden h-3 rounded-full bg-white/10">
      {segments.map((seg, i) => (
        <div 
          key={i}
          className={`h-full ${seg.color}`} 
          style={{ width: seg.width }} 
          title={`${seg.label}: ${seg.tooltip || seg.width}`}
        ></div>
      ))}
    </div>
    {/* Leyenda */}
    <div className="flex flex-wrap gap-3 mt-3">
      {segments.map((seg, i) => (
        <div key={i} className="flex gap-2 items-center text-xs text-slate-300">
          <span className={`inline-block w-2 h-2 rounded-full ${seg.color}`}></span>
          <span>{seg.label}: <span className="font-semibold text-white">{seg.valueDisplay || seg.width}</span></span>
        </div>
      ))}
    </div>
  </div>
);

// ==========================================
// 2. Gráficos Interactivos (ApexCharts)
// ==========================================

/**
 * Gráfico de Barras Horizontales para Sistemas (FirmaEC).
 * Muestra el Top 10 de sistemas.
 */
export const FirmaSystemsChart = ({ data }) => {
  // data espera ser un array: [{ system: 'Quipux', total: 5000 }, ...]
  const sortedData = [...data].sort((a, b) => b.total - a.total).slice(0, 10);
  
  const series = [{
    name: 'Firmas generadas',
    data: sortedData.map(d => d.total)
  }];

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      fontFamily: 'Inter, sans-serif',
      toolbar: { show: false },
      background: 'transparent',
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        barHeight: '60%',
        distributed: true, // Colores diferentes por barra
      }
    },
    colors: [
      '#22d3ee', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', 
      '#d946ef', '#ec4899', '#f43f5e', '#ef4444', '#f97316'
    ],
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: { colors: ['#fff'] },
      formatter: function (val, opt) {
        return val.toLocaleString('es-EC');
      },
      offsetX: 0,
    },
    xaxis: {
      categories: sortedData.map(d => d.system),
      labels: {
        style: { colors: '#94a3b8', fontSize: '11px' }
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: '#cbd5e1', fontSize: '11px' },
        maxWidth: 200, // Dar espacio a nombres largos
      }
    },
    grid: {
      borderColor: 'rgba(255, 255, 255, 0.05)',
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } }, 
    },
    theme: { mode: 'dark' },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val) => val.toLocaleString('es-EC') + " firmas"
      }
    },
    legend: { show: false }
  };

  return (
    <div className="w-full h-80">
      <ReactApexChart options={options} series={series} type="bar" height="100%" />
    </div>
  );
};

/**
 * Gráfico de Donut para Distribución de Canales (Banca).
 */
export const BankingChannelsChart = () => {
  const series = [49.4, 23.2, 9.9, 7.1, 6.3, 3.8, 0.3];
  const labels = ['Banca celular', 'Oficina', 'Internet', 'POS', 'Cajeros', 'Corresponsales', 'Otros'];

  const options = {
    chart: {
      type: 'donut',
      fontFamily: 'Inter, sans-serif',
      background: 'transparent',
    },
    labels: labels,
    colors: ['#3b82f6', '#f59e0b', '#06b6d4', '#10b981', '#8b5cf6', '#ec4899', '#64748b'],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: { color: '#94a3b8' },
            value: {
              color: '#fff',
              fontSize: '20px',
              formatter: (val) => val + '%'
            },
            total: {
              show: true,
              label: 'Canal Líder',
              color: '#94a3b8',
              formatter: () => 'Celular'
            }
          }
        }
      }
    },
    stroke: { show: false },
    dataLabels: { enabled: false },
    legend: {
      position: 'bottom',
      labels: { colors: '#cbd5e1' }
    },
    theme: { mode: 'dark' },
    tooltip: {
      theme: 'dark',
      y: { formatter: (val) => val + "%" }
    }
  };

  return (
    <div className="w-full h-80">
      <ReactApexChart options={options} series={series} type="donut" height="100%" />
    </div>
  );
};

/**
 * Minigráfico de Línea (Sparkline) para tendencias económicas.
 * Ej: Inflación mensual últimos 6 meses.
 */
export const EconomicTrendSparkline = ({ data, color = '#22d3ee', title, value }) => {
  const series = [{ data: data }]; // Ej: [0.1, 0.2, 0.15, 0.3, 0.37]

  const options = {
    chart: {
      type: 'area',
      height: 80,
      sparkline: { enabled: true }, // Modo sparkline elimina ejes y grids
      fontFamily: 'Inter, sans-serif',
    },
    stroke: { curve: 'smooth', width: 2 },
    fill: { opacity: 0.3 },
    colors: [color],
    tooltip: {
      fixed: { enabled: false },
      x: { show: false },
      y: { title: { formatter: () => '' } },
      marker: { show: false }
    },
    theme: { mode: 'dark' }
  };

  return (
    <div className="flex flex-col justify-between p-4 h-full rounded-2xl border bg-white/5 border-white/10">
      <div>
        <div className="text-xs text-slate-400">{title}</div>
        <div className="text-2xl font-bold text-white">{value}</div>
      </div>
      <div className="mt-2 h-16">
        <ReactApexChart options={options} series={series} type="area" height="100%" />
      </div>
    </div>
  );
};