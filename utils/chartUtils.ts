
/**
 * Gera um caminho SVG suave (curva de Bézier) para um conjunto de dados.
 */
export const generateSmoothPath = (data: number[], width: number, height: number): string => {
  if (data.length < 2) return "";

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((val, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((val - min) / range) * height,
  }));

  let path = `M ${points[0].x},${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const cpX = (curr.x + next.x) / 2;
    path += ` C ${cpX},${curr.y} ${cpX},${next.y} ${next.x},${next.y}`;
  }

  return path;
};

/**
 * Gera dados simulados baseados em uma tendência e volatilidade.
 */
export const generateMockHistory = (points: number, startVal: number, trend: number, volatility: number): number[] => {
  const data = [startVal];
  for (let i = 1; i < points; i++) {
    const change = (Math.random() - 0.5) * volatility + trend;
    data.push(Math.max(0, data[i - 1] + change));
  }
  return data;
};
