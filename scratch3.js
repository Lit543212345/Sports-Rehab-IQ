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
    import fs from 'fs';
    ${code}
    const result = {};
    injuries.forEach(i => {
      if (!result[i.region]) result[i.region] = [];
      result[i.region].push({ id: i.id, rootId: i.diagnosticTreeRootId, name: i.name, overview: i.overview });
    });
    fs.writeFileSync('all-injuries-data.json', JSON.stringify(result, null, 2));
  `;
  fs.writeFileSync('temp3.js', tempScript);
}
