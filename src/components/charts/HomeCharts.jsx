import React from 'react';
import ReactApexChart from 'react-apexcharts';

/**
 * Gráfico de Área: Crecimiento Digital
 * Muestra la evolución de transacciones o adopción digital a lo largo del tiempo.
 */
export function DigitalGrowthChart() {
  const series = [
    {
      name: 'Transacciones digitales (Millones)',
      data: [0.5, 2, 15, 35, 120, 210, 285, 380, 450, 520, 600, 680],
    },
  ];

  const options = {
    chart: {
      type: 'area',
      height: 350,
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false,
      },
      background: 'transparent',
      zoom: {
        enabled: false,
      },
    },
    colors: ['#06b6d4'], // Cyan-500
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    xaxis: {
      categories: [
        '2014', '2015', '2016', '2017', '2018', '2019', 
        '2020', '2021', '2022', '2023', '2024', '2025'
      ],
      labels: {
        style: {
          colors: '#94a3b8', // slate-400
          fontSize: '12px',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#94a3b8',
          fontSize: '12px',
        },
        formatter: (value) => value.toFixed(0),
      },
    },
    grid: {
      borderColor: 'rgba(255, 255, 255, 0.1)',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    theme: {
      mode: 'dark',
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: true,
      },
      y: {
        formatter: function (val) {
          return val + " M";
        }
      }
    },
  };

  return (
    <div className="w-full p-4 rounded-2xl border bg-white/5 border-white/10">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Evolución de Transacciones Digitales</h3>
        <p className="text-xs text-slate-400">Crecimiento exponencial impulsado por marcos legales (2014-2025)</p>
      </div>
      <div className="h-64 md:h-80">
        <ReactApexChart options={options} series={series} type="area" height="100%" />
      </div>
    </div>
  );
}

/**
 * Gráfico Radial: Índice de Gobierno Digital (Comparativo Rápido)
 * Útil para mostrar el puntaje EGDI en el Home de forma visual.
 */
export function DigitalizationGauge() {
  const series = [78]; // EGDI Ecuador 0.78 -> 78%

  const options = {
    chart: {
      type: 'radialBar',
      background: 'transparent',
      fontFamily: 'Inter, sans-serif',
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 15,
          size: '60%',
          background: 'transparent',
          image: undefined,
        },
        track: {
          background: 'rgba(255, 255, 255, 0.1)',
          strokeWidth: '100%',
          margin: 5, // margin is in pixels
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#94a3b8',
            fontSize: '13px',
          },
          value: {
            offsetY: 5,
            color: '#fff',
            fontSize: '24px',
            show: true,
            formatter: function (val) {
              return (val / 100).toFixed(4);
            }
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#22d3ee'], // Cyan-400
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['Puntaje EGDI'],
    colors: ['#2563eb'], // Blue-600 start color
  };

  return (
    <div className="flex justify-center items-center h-full">
      <ReactApexChart options={options} series={series} type="radialBar" height={280} />
    </div>
  );
}

/**
 * Gráfico de Radar: Comparativa Regional
 * Compara Ecuador con líderes regionales (Chile, Canadá).
 */
export function RegionalComparisonRadar() {
  const series = [{
    name: 'Ecuador 🇪🇨',
    data: [78, 65, 82, 55, 70],
  }, {
    name: 'Chile 🇨🇱',
    data: [88, 85, 90, 80, 88],
  }, {
    name: 'Canadá 🇨🇦',
    data: [84, 92, 88, 85, 95],
  }];

  const options = {
    chart: {
      type: 'radar',
      background: 'transparent',
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
    },
    stroke: {
      width: 2,
      colors: ['#22d3ee', '#ef4444', '#22c55e']
    },
    fill: {
      opacity: 0.2
    },
    markers: {
      size: 3,
      hover: { size: 5 }
    },
    xaxis: {
      categories: ['Servicios Online', 'Infraestructura', 'Capital Humano', 'Participación', 'Seguridad'],
      labels: {
        style: {
          colors: ['#cbd5e1', '#cbd5e1', '#cbd5e1', '#cbd5e1', '#cbd5e1'],
          fontSize: '11px',
        }
      }
    },
    yaxis: {
      show: false,
      min: 0,
      max: 100,
    },
    legend: {
      position: 'bottom',
      labels: {
        colors: '#cbd5e1',
      },
      markers: {
        radius: 12,
      }
    },
    colors: ['#22d3ee', '#ef4444', '#22c55e'], // Cyan, Red, Green
    theme: { mode: 'dark' }
  };

  return (
    <div className="w-full p-4 rounded-2xl border bg-white/5 border-white/10">
      <h3 className="mb-2 text-lg font-semibold text-white">Brecha Regional</h3>
      <div className="h-72">
        <ReactApexChart options={options} series={series} type="radar" height="100%" />
      </div>
    </div>
  );
}