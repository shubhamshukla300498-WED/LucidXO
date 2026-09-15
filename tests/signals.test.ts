import test from 'node:test';
import assert from 'node:assert/strict';
import {FeatureAnalyzer,bandPower,resolution,smooth} from '../src/signals';
import {seeded} from '../src/organism';

test('attack/release envelopes are independent of display refresh rate',()=>{
  const simulate=(hz:number)=>{let v=0;for(let i=0;i<hz;i++)v=smooth(v,1,1/hz);for(let i=0;i<hz;i++)v=smooth(v,0,1/hz);return v;};
  assert.ok(Math.abs(simulate(30)-simulate(120))<1e-12);
});
test('frequency bands respect sample rate and reject unrelated bins',()=>{
  for(const rate of [44100,48000,96000]){const bins=new Float32Array(1024).fill(-Infinity);bins[Math.round(90*2048/rate)]=-10;assert.ok(bandPower(bins,rate,2048,20,150)>0);assert.equal(bandPower(bins,rate,2048,600,2500),0);}
});
test('silence does not become full-scale noise after normalization',()=>{
 const analyzer=new FeatureAnalyzer();const bins=new Float32Array(1024).fill(-100),wave=new Float32Array(2048).fill(.0001);for(let i=0;i<1000;i++)analyzer.update(bins,wave,48000,1/60);assert.equal(analyzer.features.bass,0);assert.equal(analyzer.features.onset,0);assert.ok(analyzer.features.energy<.001);
});
test('a bass impulse has a bounded independent response and decays',()=>{
 const analyzer=new FeatureAnalyzer(),bins=new Float32Array(1024).fill(-100),wave=new Float32Array(2048).fill(.2);bins[4]=-4;const f=analyzer.update(bins,wave,48000,.02);assert.ok(f.bass>f.high);assert.ok(f.bass<=1);assert.ok(f.energy>0);bins.fill(-Infinity);wave.fill(0);for(let i=0;i<300;i++)analyzer.update(bins,wave,48000,1/60);assert.ok(f.bass<.0001);assert.equal(f.onset<.0001,true);
});
test('native 4K is not multiplied by device pixel ratio',()=>{
 assert.deepEqual(resolution(1600,900,'Native 4K',2),[3840,2160]);assert.deepEqual(resolution(900,1600,'Native 4K',3),[2160,3840]);assert.deepEqual(resolution(2160,2160,'Native 4K',2),[2160,2160]);assert.deepEqual(resolution(1600,900,'Performance',2),[1280,720]);assert.deepEqual(resolution(1600,900,'Balanced',2),[1920,1080]);
});
test('seed sequence is reproducible and changes with seed',()=>{const a=seeded(7319),b=seeded(7319),c=seeded(100);for(let i=0;i<30;i++){const x=a();assert.equal(x,b());assert.ok(x>=0&&x<1);assert.notEqual(x,c());}});

test('quiet audible bass produces a visible normalized response and an onset',()=>{const a=new FeatureAnalyzer(),bins=new Float32Array(1024).fill(-100),wave=new Float32Array(2048).fill(.01);bins[4]=-40;const f=a.update(bins,wave,48000,1/60);assert.ok(f.bass>.15);assert.equal(f.onset,1);assert.ok(f.high<.05);});
test('high-frequency input stays distinct from bass',()=>{const a=new FeatureAnalyzer(),bins=new Float32Array(1024).fill(-Infinity),wave=new Float32Array(2048).fill(.05);bins.fill(-35,150,350);for(let i=0;i<30;i++)a.update(bins,wave,48000,1/60);assert.ok(a.features.high>.5);assert.equal(a.features.bass,0);});
test('isolated band transients trigger distinct visual pulses',()=>{for(const [bin,key] of [[4,'kick'],[50,'snare'],[300,'hat']] as const){const a=new FeatureAnalyzer(),bins=new Float32Array(1024).fill(-Infinity),wave=new Float32Array(2048).fill(.1);bins[bin]=-10;const f=a.update(bins,wave,48000,1/60);assert.equal(f[key],1);for(const other of ['kick','snare','hat'] as const)if(other!==key)assert.equal(f[other],0);for(let i=0;i<90;i++)a.update(bins,wave,48000,1/60);assert.ok(f[key]<.01,'sustained tone must not keep retriggering');}});


test('kick attacks remain visible over a sustained bass bed at different refresh rates',()=>{
 for(const hz of [30,60,120]){
  const a=new FeatureAnalyzer(),bins=new Float32Array(1024).fill(-Infinity),wave=new Float32Array(2048).fill(.15);
  bins[3]=-22;for(let i=0;i<hz;i++)a.update(bins,wave,48000,1/hz);
  assert.ok(a.features.bass>.8);assert.ok(a.features.kick<.01);
  let hits=0;
  for(let beat=0;beat<4;beat++){
   bins[4]=-9;const f=a.update(bins,wave,48000,1/hz);
   if(f.kick>.9)hits++;
   assert.equal(f.snare,0);assert.equal(f.hat,0);
   bins[4]=-Infinity;for(let i=1;i<hz/2;i++)a.update(bins,wave,48000,1/hz);
  }
  assert.equal(hits,4,`all kicks detected at ${hz} Hz`);
 }
});
