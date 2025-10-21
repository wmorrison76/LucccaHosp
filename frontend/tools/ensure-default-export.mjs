#!/usr/bin/env node
const fs = require('fs'), path = require('path');
const files = process.argv.slice(2);
for (const f of files) {
  let s = fs.readFileSync(f, 'utf8');

  if (/export\s+default\s+/m.test(s)) { 
    console.log('✓ has default:', f); 
    continue; 
  }

  // try to find a named component/function/class that is exported
  let m = s.match(/export\s+(?:function|const|class)\s+([A-Za-z_]\w*)/);
  if (!m) m = s.match(/(?:function|const|class)\s+([A-Za-z_]\w*)/);

  if (m) {
    fs.appendFileSync(f, `\nexport default ${m[1]};\n`);
    console.log('→ added default alias in', f, '→', m[1]);
  } else {
    console.log('! could not detect a symbol to alias in', f, '(open it and tell me the component name)');
  }
}
