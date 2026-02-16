export const guessOrg = (url, label) => {
  const host = url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
  if (host.includes('asambleanacional')) return 'Asamblea Nacional del Ecuador';
  if (host.includes('telecomunicaciones')) return 'Ministerio de Telecomunicaciones';
  if (host.includes('ecuadorencifras')) return 'Instituto Nacional de Estadística y Censos (INEC)';
  if (host.includes('gob.ec')) return 'Gobierno del Ecuador';
  if (host.includes('un.org')) return 'United Nations';
  return label || host;
};

export const buildAPA = (event) => {
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