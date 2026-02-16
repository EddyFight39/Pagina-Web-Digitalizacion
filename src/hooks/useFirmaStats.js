import { useState, useEffect, useMemo } from 'react';

export function useFirmaStats() {
  const [firmaStats, setFirmaStats] = useState([]);
  const [firmaTotal, setFirmaTotal] = useState(0);

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

    fetch(`${import.meta.env.BASE_URL}Estad%C3%ADsticas%20FirmaEC_FirmaEC%20Escritorio_Tabla.csv`)
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

  const firmaTop = useMemo(() => {
    return [...firmaStats].sort((a, b) => b.total - a.total).slice(0, 10);
  }, [firmaStats]);

  const firmaMax = useMemo(() => {
    if (!firmaTop.length) return 1;
    return Math.max(...firmaTop.map(item => item.total));
  }, [firmaTop]);

  return { firmaStats, firmaTotal, firmaTop, firmaMax };
}