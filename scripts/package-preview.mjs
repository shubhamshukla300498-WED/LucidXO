import {copyFileSync,writeFileSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const html=readFileSync('dist/index.html');
if(/<script[^>]+src=/.test(html.toString()))throw Error('Preview must contain its JavaScript.');
copyFileSync('dist/index.html','docs/index.html');
writeFileSync('docs/.nojekyll','');
console.log('Packaged docs/index.html:',createHash('sha256').update(html).digest('hex'));
