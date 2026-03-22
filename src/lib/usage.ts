import fs from 'fs';
import path from 'path';

const usagePath = path.join(process.cwd(), 'data', 'usage.json');

export function getUsageData(): Record<string, number> {
  try {
    if (!fs.existsSync(usagePath)) {
      const dir = path.dirname(usagePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(usagePath, JSON.stringify({ 'financial-analytics-dashboard': 1 }));
    }
    return JSON.parse(fs.readFileSync(usagePath, 'utf-8'));
  } catch {
    return {};
  }
}

export function incrementUsage(slug: string): number {
  const data = getUsageData();
  data[slug] = (data[slug] || 0) + 1;
  try {
    fs.writeFileSync(usagePath, JSON.stringify(data, null, 2));
  } catch {
    // ignore write errors
  }
  return data[slug];
}
