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
test('seeded anatomical generation is reproducible and changes with seed',()=>{const a=seeded(7319),b=seeded(7319),c=seeded(100);for(let i=0;i<30;i++){const x=a();assert.equal(x,b());assert.ok(x>=0&&x<1);assert.notEqual(x,c());}});
