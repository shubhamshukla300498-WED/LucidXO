import test from 'node:test';
import assert from 'node:assert/strict';
import {Journey} from '../src/journey';
test('manual transition completes continuously in five seconds',()=>{const j=new Journey();j.update(0,1,false,0,0,true);assert.equal(j.from,0);assert.equal(j.to,1);assert.equal(j.mix,0);for(let i=0;i<300;i++)j.update(1/60,1,false,0,0,true);assert.ok(j.mix>.9999);});
test('silence and pause cannot advance an automatic journey',()=>{const j=new Journey();for(let i=0;i<4000;i++)j.update(.016,0,true,0,0,true);assert.equal(j.ready,false);j.update(40,0,true,1,1,false);assert.equal(j.ready,false);});
test('automatic journey waits for onsets and minimum dwell',()=>{const j=new Journey();for(let i=0;i<18;i++){j.update(.5,0,true,.2,1,true);j.update(.5,0,true,.2,0,true);}assert.equal(j.ready,true);});
test('sustained music has a bounded timed fallback',()=>{const j=new Journey();for(let i=0;i<65;i++)j.update(.5,0,true,.1,0,true);assert.equal(j.ready,true);});
