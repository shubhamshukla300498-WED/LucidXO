import { defineConfig } from 'vite';
// A self-contained preview makes branch-based GitHub Pages deployment reproducible.
export default defineConfig({base:'./',build:{outDir:'dist',assetsInlineLimit:1000000,cssCodeSplit:false},plugins:[{
  name:'inline-preview', enforce:'post', generateBundle(_,bundle){
    const html = bundle['index.html'];
    if(!html || html.type!=='asset')return;
    let text=String(html.source);
    for(const [name,file] of Object.entries(bundle)){
      if(file.type==='chunk' && file.isEntry){text=text.replace(/<script type="module"[^>]*src="[^"]+"[^>]*><\/script>/,()=>`<script type="module">${file.code.replaceAll('</script','<\\/script')}</script>`);delete bundle[name];}
      if(file.type==='asset' && name.endsWith('.css')){text=text.replace(/<link rel="stylesheet"[^>]+>/,()=>`<style>${file.source}</style>`);delete bundle[name];}
    }
    html.source=text;
  }
} ]});
