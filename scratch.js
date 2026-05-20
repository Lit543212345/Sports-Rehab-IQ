import fs from 'fs';
import path from 'path';

const currentDir = process.cwd();
const injuriesStr = fs.readFileSync(path.join(currentDir, 'src/data/knowledgebase/injuries.ts'), 'utf-8');
const injuriesMatch = injuriesStr.match(/export const injuries: Injury\[\] = \[([\s\S]*?)\];/);

if (injuriesMatch) {
  const code = injuriesMatch[0]
    .replace('export const injuries: Injury[] = ', 'const injuries = ')
    .replace(/import type {.*?}.*?;/, '');
  
  // Quick and dirty eval
  const tempScript = `
    ${code}
    const regions = {};
    injuries.forEach(i => {
      if (!regions[i.region]) regions[i.region] = [];
      regions[i.region].push(i.id + ' (' + i.diagnosticTreeRootId + ')');
    });
    console.log(JSON.stringify(regions, null, 2));
  `;
  fs.writeFileSync('temp.js', tempScript);
}
