import fs from 'fs';
import path from 'path';

const currentDir = process.cwd();
const injuriesStr = fs.readFileSync(path.join(currentDir, 'src/data/knowledgebase/injuries.ts'), 'utf-8');
const injuriesMatch = injuriesStr.match(/export const injuries: Injury\[\] = \[([\s\S]*?)\];/);

if (injuriesMatch) {
  const code = injuriesMatch[0]
    .replace('export const injuries: Injury[] = ', 'const injuries = ')
    .replace(/import type {.*?}.*?;/, '');
  
  const tempScript = `
    ${code}
    injuries.filter(i => i.region === 'lower-leg-ankle-foot').slice(0, 3).forEach(i => console.log(i.name + ':\\n' + i.overview + '\\n'));
  `;
  fs.writeFileSync('temp2.js', tempScript);
}
