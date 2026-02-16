import { useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import dashboardData from '../../data/data-digitalizacion.json';

const badgeStyles = {
	success: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/40',
	warning: 'bg-amber-400/15 text-amber-300 border-amber-400/40',
	danger: 'bg-red-400/15 text-red-300 border-red-400/40',
};

const chartBase = {
	chart: {
		background: 'transparent',
		toolbar: { show: false },
		fontFamily: 'Inter, system-ui, sans-serif',
	},
	theme: { mode: 'dark' },
	legend: { labels: { colors: '#cbd5e1' } },
	grid: {
		borderColor: 'rgba(255, 255, 255, 0.08)',
		strokeDashArray: 4,
	},
	xaxis: { labels: { style: { colors: '#94a3b8', fontSize: '12px' } } },
	yaxis: { labels: { style: { colors: '#94a3b8', fontSize: '12px' } } },
};

const buildChartSeries = (block) => {
	if (block.datasets) {
		return block.datasets.map((dataset) => ({
			name: dataset.label,
			data: dataset.data,
		}));
	}

	if (block.values) {
		return [{ name: block.title || 'Serie', data: block.values }];
	}

	return [];
};

const buildChartOptions = (block) => {
	const options = { ...chartBase };
	const labels = block.labels || [];

	if (block.chartType === 'radar') {
		options.xaxis = {
			categories: labels,
			labels: { style: { colors: '#cbd5e1', fontSize: '11px' } },
		};
		options.yaxis = { min: 0, max: 100, show: false };
		options.fill = { opacity: 0.2 };
		options.stroke = { width: 2 };
	}

	if (block.chartType === 'bar') {
		options.plotOptions = {
			bar: {
				borderRadius: 6,
				distributed: true,
				columnWidth: '45%',
			},
		};
		options.xaxis = { categories: labels, labels: { style: { colors: '#cbd5e1' } } };
		options.dataLabels = { enabled: false };
	}

	if (block.chartType === 'line' || block.chartType === 'area') {
		options.stroke = { curve: 'smooth', width: 3 };
		options.xaxis = { categories: labels, labels: { style: { colors: '#cbd5e1' } } };
		options.dataLabels = { enabled: false };
	}

	return options;
};

const TableBlock = ({ headers, rows }) => (
	<div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
		<table className="min-w-full text-sm text-slate-300">
			<thead>
				<tr className="bg-blue-600/90 text-white">
					{headers.map((header) => (
						<th key={header} className="px-4 py-3 text-center font-semibold">
							{header}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{rows.map((row, rowIndex) => (
					<tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}>
						{row.map((cell, cellIndex) => (
							<td key={cellIndex} className="px-3 py-3 text-center">
								{cell}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

const ChartBlock = ({ block }) => {
	const series = buildChartSeries(block);
	const options = useMemo(() => buildChartOptions(block), [block]);

	return (
		<div className="rounded-2xl border border-white/10 bg-white/5 p-5">
			<h3 className="text-lg font-semibold text-white mb-3">{block.title}</h3>
			<div className="h-80">
				<ReactApexChart options={options} series={series} type={block.chartType} height="100%" />
			</div>
			{block.note && <p className="text-xs text-slate-400 mt-2">{block.note}</p>}
		</div>
	);
};

const SimulationSection = ({ section }) => {
	const sim = section.simulation;
	const initialIndex = Math.max(0, sim.years.indexOf(2024));
	const [index, setIndex] = useState(initialIndex);

	const indicators = Object.entries(sim.indicators);
	const totalAverage = useMemo(() => {
		const sum = indicators.reduce((acc, [, indicator]) => acc + (indicator.values[index] || 0), 0);
		if (!indicators.length) return 0;
		return (sum / indicators.length).toFixed(2);
	}, [indicators, index]);

	return (
		<div className="space-y-8">
			<div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/30 to-cyan-600/10 p-8 text-center">
				<div className="text-sm text-cyan-200">Nivel de Digitalizacion Total</div>
				<div className="text-6xl font-black text-white mt-2">{totalAverage}%</div>
				<div className="text-sm text-slate-300 mt-2">Madurez digital - Ano seleccionado</div>
			</div>

			<div>
				<div className="flex justify-between text-sm text-slate-400 mb-2">
					<span>{sim.years[0]}</span>
					<span>{sim.years[sim.years.length - 1]}</span>
				</div>
				<input
					type="range"
					min="0"
					max={sim.years.length - 1}
					value={index}
					onChange={(event) => setIndex(Number(event.target.value))}
					className="w-full accent-cyan-400"
				/>
				<div className="text-center text-4xl font-bold text-cyan-300 mt-3">{sim.years[index]}</div>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{indicators.map(([key, indicator]) => (
					<div key={key} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
						<div className="text-xs text-slate-400 mb-2">{indicator.label}</div>
						<div className="text-3xl font-bold text-cyan-300">
							{indicator.values[index]}{indicator.unit}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const renderBlocks = (blocks) => (
	<div className="space-y-6">
		{blocks.map((block, index) => {
			if (block.type === 'table') {
				return <TableBlock key={index} headers={block.headers} rows={block.rows} />;
			}

			if (block.type === 'chart') {
				return <ChartBlock key={index} block={block} />;
			}

			if (block.type === 'text') {
				return (
					<div
						key={index}
						className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300 leading-relaxed"
						dangerouslySetInnerHTML={{ __html: block.content }}
					/>
				);
			}

			if (block.type === 'kpis') {
				return (
					<div key={index} className="grid gap-4 md:grid-cols-2">
						{block.items.map((item) => (
							<div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
								<div className="text-sm text-slate-400 mb-2">{item.label}</div>
								<div className="text-3xl font-bold text-cyan-300 mb-2">{item.value}</div>
								<p className="text-xs text-slate-400">{item.description}</p>
							</div>
						))}
					</div>
				);
			}

			if (block.type === 'card') {
				return (
					<div key={index} className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
						<h3 className="text-2xl font-bold text-cyan-200 mb-4">{block.title}</h3>
						<div className="text-6xl font-black text-white mb-3">{block.content}</div>
						<p className="text-sm text-slate-300">{block.description}</p>
					</div>
				);
			}

			if (block.type === 'bibliografia') {
				return (
					<div key={index} className="space-y-3">
						{block.label && <h3 className="text-xl font-semibold text-white">{block.label}</h3>}
						<div className="grid gap-4 md:grid-cols-2">
							{block.items.map((item) => (
								<div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
									<div className="text-sm font-semibold text-white mb-2">{item.label}</div>
									<p className="text-xs text-slate-400 mb-2">{item.description}</p>
									<a
										href={item.url}
										target="_blank"
										rel="noreferrer"
										className="text-xs text-cyan-300 hover:underline"
									>
										{item.url}
									</a>
								</div>
							))}
						</div>
					</div>
				);
			}

			return null;
		})}
	</div>
);

const SectionRenderer = ({ section, sectionId }) => (
	<section id={sectionId} className="scroll-mt-24 space-y-6">
		<div>
			<h2 className="text-2xl font-bold text-white mb-2">{section.title}</h2>
			{section.intro && <p className="text-sm text-slate-400 max-w-3xl">{section.intro}</p>}
		</div>

		{section.type === 'definitions' && (
			<div className="grid gap-4 md:grid-cols-2">
				{section.items.map((item) => (
					<div key={item.term} className="rounded-2xl border border-white/10 bg-white/5 p-5">
						<h3 className="font-semibold text-white mb-2">{item.term}</h3>
						<p className="text-xs text-slate-400">{item.description}</p>
					</div>
				))}
			</div>
		)}

		{section.type === 'text' && (
			<p className="text-sm text-slate-300 leading-relaxed">{section.content}</p>
		)}

		{section.type === 'table' && (
			<TableBlock headers={section.headers} rows={section.rows} />
		)}

		{section.type === 'kpis' && (
			<div className="grid gap-4 md:grid-cols-3">
				{section.items.map((item) => (
					<div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
						<div className="text-xs text-slate-400 mb-2">{item.label}</div>
						<div className="text-2xl font-bold text-cyan-300 mb-2">{item.value}</div>
						<p className="text-xs text-slate-400">{item.description}</p>
					</div>
				))}
			</div>
		)}

		{section.type === 'chart' && section.chart && (
			<ChartBlock block={section.chart} />
		)}

		{section.type === 'conclusion' && (
			<div className="space-y-4">
				{section.summary && <p className="text-sm text-slate-300">{section.summary}</p>}
				<div className="grid gap-4 md:grid-cols-3">
					{section.semaforo.map((item) => (
						<div key={item.dimension} className="rounded-2xl border border-white/10 bg-white/5 p-4">
							<div className="text-sm font-semibold text-white">{item.dimension}</div>
							<span className={`inline-flex mt-2 items-center px-2 py-1 text-xs rounded-full border ${badgeStyles[item.color] || 'border-white/10 text-slate-300'}`}>
								{item.nivel}
							</span>
						</div>
					))}
				</div>
			</div>
		)}

		{section.type === 'simulation' && <SimulationSection section={section} />}

		{section.blocks && renderBlocks(section.blocks)}

		{section.explanation && (
			<div className="rounded-2xl border border-white/10 bg-white/5 p-5">
				<h3 className="text-lg font-semibold text-white mb-2">{section.explanation.title}</h3>
				<div className="text-sm text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: section.explanation.content }} />
			</div>
		)}

		{section.key_message && (
			<div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
				<strong>Mensaje clave:</strong> {section.key_message}
			</div>
		)}
	</section>
);

export function DigitalDashboard() {
	const [navOpen, setNavOpen] = useState(false);

	return (
		<div className="min-h-screen bg-slate-950 text-white">
			<button
				onClick={() => setNavOpen((prev) => !prev)}
				className="fixed top-4 left-4 z-50 rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg lg:hidden"
			>
				Menu
			</button>

			<aside
				className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-slate-950/95 backdrop-blur border-r border-white/10 transition-transform ${
					navOpen ? 'translate-x-0' : '-translate-x-full'
				} lg:translate-x-0`}
			>
				<div className="p-6 border-b border-white/10">
					<h2 className="text-lg font-bold text-cyan-200">{dashboardData.sidebar.header}</h2>
				</div>
				<nav className="p-4 space-y-2">
					{dashboardData.sidebar.items.map((item) => (
						<a
							key={item.id}
							href={`#${item.id}`}
							onClick={() => setNavOpen(false)}
							className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
						>
							<span className="text-cyan-400">•</span>
							<span>{item.label}</span>
						</a>
					))}
				</nav>
			</aside>

			<main className="lg:ml-64 px-5 py-10 space-y-10">
				<header className="space-y-3 max-w-4xl">
					<h1 className="text-3xl md:text-4xl font-black text-white">{dashboardData.title}</h1>
					<p className="text-sm text-slate-400">{dashboardData.subtitle}</p>
				</header>

				<div className="space-y-12">
					{Object.entries(dashboardData.sections).map(([id, section]) => (
						<SectionRenderer key={id} sectionId={id} section={section} />
					))}
				</div>
			</main>
		</div>
	);
}