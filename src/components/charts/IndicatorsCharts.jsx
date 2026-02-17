import React from 'react';
import ReactApexChart from 'react-apexcharts';

// ==========================================
// 1. Componentes Visuales (Iconos y Métricas)
// ==========================================

/**
 * Gráfico de Iconos Demográficos (Estilo Infografía)
 */
export const PersonDemographicChart = ({ data }) => (
  <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-4 rounded-xl border bg-white/5 border-white/10 backdrop-blur-sm">
    {data.map((item, idx) => (
      <div key={idx} className="flex flex-col justify-center items-center text-center group hover:bg-white/5 rounded-lg p-2 transition-all">
        <svg
          className={`w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] ${item.color}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
        </svg>
        <div className={`text-xl font-bold ${item.color} font-mono`}>
          {item.value}
        </div>
        <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{item.label}</div>
        {item.subtext && <div className="text-[9px] text-slate-500">{item.subtext}</div>}
      </div>
    ))}
  </div>
);

/**
 * Barra de progreso simple (Legacy support para secciones menores)
 */
export const IndicatorProgressBar = ({ label, value, color = 'bg-cyan-500', width }) => (
  <div className="w-full">
    <div className="flex justify-between items-center mb-1 text-xs">
      <span className="text-slate-300">{label}</span>
      <span className={`font-semibold text-white`}>{value}</span>
    </div>
    <div className="overflow-hidden h-2 rounded-full bg-white/10">
      <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: width }}></div>
    </div>
  </div>
);

// ==========================================
// 2. Gráficos Interactivos Avanzados (ApexCharts)
// ==========================================

/**
 * NUEVO: Treemap para Sistemas de Firma
 * Visualiza el volumen como bloques rectangulares.
 */
export const FirmaTreemap = ({ data }) => {
  const sortedData = [...data].sort((a, b) => b.total - a.total).slice(0, 12);
  
  const series = [{
    data: sortedData.map(d => ({
      x: d.system,
      y: d.total
    }))
  }];

  const options = {
    chart: {
      type: 'treemap',
      height: 350,
      fontFamily: 'Inter, sans-serif',
      toolbar: { show: false },
      background: 'transparent',
    },
    colors: ['#22d3ee', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e'],
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
        strokeWidth: 2,
        strokeColor: '#0f172a', // Coincide con fondo oscuro
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '10px',
        fontWeight: 'bold',
        colors: ['#fff']
      },
      offsetY: -4
    },
    tooltip: {
      theme: 'dark',
      y: { formatter: (val) => val.toLocaleString('es-EC') + " firmas" }
    },
    theme: { mode: 'dark' },
    legend: { show: false }
  };

  return (
    <div className="w-full h-80 rounded-xl overflow-hidden bg-white/5 border border-white/10 p-2">
      <ReactApexChart options={options} series={series} type="treemap" height="100%" />
    </div>
  );
};

/**
 * NUEVO: Gráfico Polar (Polar Area) para Canales Bancarios
 */
export const BankingPolarChart = () => {
  const series = [49.4, 23.2, 9.9, 7.1, 6.3, 3.8];
  const labels = ['Banca Móvil', 'Oficina', 'Internet', 'POS', 'Cajeros', 'Corresponsables'];

  const options = {
    chart: {
      type: 'polarArea',
      fontFamily: 'Inter, sans-serif',
      background: 'transparent',
    },
    labels: labels,
    stroke: { colors: ['#0f172a'] },
    fill: { opacity: 0.8 },
    colors: ['#3b82f6', '#f59e0b', '#06b6d4', '#10b981', '#8b5cf6', '#ec4899'],
    yaxis: { show: false },
    legend: {
      position: 'bottom',
      fontSize: '11px',
      labels: { colors: '#cbd5e1' },
      markers: { radius: 12 }
    },
    plotOptions: {
      polarArea: {
        rings: { strokeWidth: 1, strokeColor: 'rgba(255,255,255,0.1)' },
        spokes: { strokeWidth: 1, connectorColors: 'rgba(255,255,255,0.1)' }
      }
    },
    theme: { mode: 'dark' },
    tooltip: {
      theme: 'dark',
      y: { formatter: (val) => val + "%" }
    }
  };

  return (
    <div className="w-full h-80 flex justify-center items-center">
      <ReactApexChart options={options} series={series} type="polarArea" height="100%" width="100%" />
    </div>
  );
};

/**
 * NUEVO: Barras Radiales Comparativas (Para EGDI)
 */
export const ComparisonRadialBar = () => {
  const series = [88.27, 84.52, 78.00]; // Chile, Canada, Ecuador
  const labels = ['Chile', 'Canadá', 'Ecuador'];

  const options = {
    chart: {
      type: 'radialBar',
      height: 380,
      fontFamily: 'Inter, sans-serif',
      background: 'transparent',
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
        },
        track: {
          background: 'rgba(255,255,255,0.05)',
          strokeWidth: '100%',
        },
        dataLabels: {
          name: { show: false },
          value: { show: false }
        }
      }
    },
    colors: ['#ef4444', '#22c55e', '#3b82f6'],
    labels: labels,
    legend: {
      show: true,
      floating: true,
      fontSize: '12px',
      position: 'left',
      offsetX: 0,
      offsetY: 10,
      labels: { colors: '#cbd5e1' },
      formatter: function(seriesName, opts) {
        return seriesName + ":  " + (opts.w.globals.series[opts.seriesIndex] / 100).toFixed(4)
      },
      itemMargin: { vertical: 3 }
    },
    theme: { mode: 'dark' },
    tooltip: { enabled: true, theme: 'dark' }
  };

  return (
    <div className="w-full h-80">
      <ReactApexChart options={options} series={series} type="radialBar" height="100%" />
    </div>
  );
};

/**
 * NUEVO: Gráfico de Medidor Semi-Circular (Para Género)
 */
export const GenderGauge = ({ male, female, title }) => {
  const series = [male, female];
  
  const options = {
    chart: {
      type: 'donut',
      background: 'transparent',
      fontFamily: 'Inter, sans-serif',
    },
    labels: ['Hombres', 'Mujeres'],
    colors: ['#3b82f6', '#ec4899'],
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 10,
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: { show: true, color: '#94a3b8', offsetY: -20 },
            value: { show: true, color: '#fff', offsetY: -10, formatter: val => val + "%" },
            total: {
              show: true,
              label: 'Total',
              color: '#64748b',
              fontSize: '12px',
              offsetY: -15,
              formatter: () => '100%'
            }
          }
        }
      }
    },
    dataLabels: { enabled: false },
    grid: { padding: { bottom: -80 } },
    legend: { position: 'bottom', labels: { colors: '#cbd5e1' } },
    theme: { mode: 'dark' },
    tooltip: { theme: 'dark' }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-xl border bg-white/5 border-white/10">
      <h5 className="text-xs font-semibold text-slate-400 mb-[-20px] z-10">{title}</h5>
      <div className="h-48 w-full">
        <ReactApexChart options={options} series={series} type="donut" height="100%" />
      </div>
    </div>
  );
};

/**
 * Sparkline de Área con Brillo (Neon) para el BCE
 */
export const NeonTrendChart = ({ data, color = '#22d3ee', title, value, subtext }) => {
  const series = [{ data: data }];

  const options = {
    chart: {
      type: 'area',
      height: 100,
      sparkline: { enabled: true },
      fontFamily: 'Inter, sans-serif',
      animations: { enabled: true }
    },
    stroke: { curve: 'smooth', width: 3 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    },
    colors: [color],
    theme: { mode: 'dark' },
    tooltip: { fixed: { enabled: false }, x: { show: false }, marker: { show: false } }
  };

  return (
    <div className="relative overflow-hidden p-5 rounded-2xl border bg-gradient-to-br from-slate-900 to-slate-950 border-white/10 shadow-lg group hover:border-white/20 transition-all">
      <div className="relative z-10 flex justify-between items-end mb-2">
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">{title}</div>
          <div className={`text-2xl font-bold mt-1`} style={{ color }}>{value}</div>
          {subtext && <div className="text-[10px] text-slate-500 mt-0.5">{subtext}</div>}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-50 group-hover:opacity-80 transition-opacity">
        <ReactApexChart options={options} series={series} type="area" height="100%" width="100%" />
      </div>
    </div>
  );
};