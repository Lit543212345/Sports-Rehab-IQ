const fs = require('fs');
const r = JSON.parse(fs.readFileSync('./lighthouse-report.json', 'utf8'));

const printCategoryFailures = (categoryKey) => {
  const category = r.categories[categoryKey];
  if (!category) return;
  console.log(`\n=== ${category.title} Audit Failures (Score: ${category.score}) ===`);
  category.auditRefs.forEach(ref => {
    const a = r.audits[ref.id];
    // Check if score is poor (null usually means not applicable or informative, but we focus on actual failures)
    if (a.score !== 1 && a.score !== null) {
      console.log(`- ${a.title}: ${a.displayValue || ''} (Score: ${a.score})`);
      if (a.details && a.details.items && a.details.items.length > 0) {
        console.log(`  Details:`, JSON.stringify(a.details.items).slice(0, 200) + '...');
      }
    }
  });
};

printCategoryFailures('performance');
printCategoryFailures('accessibility');
printCategoryFailures('best-practices');
printCategoryFailures('seo');
printCategoryFailures('pwa');
