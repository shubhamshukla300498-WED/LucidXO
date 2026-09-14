import test from 'node:test';
import assert from 'node:assert/strict';
import {Journey,worlds} from '../src/journey';
test('five reference presets are available alongside the original three',()=>{assert.equal(worlds.length,8);assert.equal(new Set(worlds).size,8);});
test('manual transition completes continuously in two seconds',()=>{const j=new Journey();j.update(0,4,false,0,0,true);assert.equal(j.from,3);assert.equal(j.to,4);assert.equal(j.mix,0);for(let i=0;i<120;i++)j.update(1/60,4,false,0,0,true);assert.ok(j.mix>.9999);});
test('silence and pause cannot advance an automatic journey',()=>{const j=new Journey();for(let i=0;i<4000;i++)j.update(.016,3,true,0,0,true);assert.equal(j.ready,false);j.update(40,3,true,1,1,false);assert.equal(j.ready,false);});
test('automatic journey waits for four onsets and six seconds',()=>{const j=new Journey();for(let i=0;i<5;i++){j.update(.5,3,true,.2,1,true);j.update(.5,3,true,.2,0,true);}assert.equal(j.ready,false);j.update(1,3,true,.2,0,true);assert.equal(j.ready,true);});
test('sustained music switches after ten seconds without onsets',()=>{const j=new Journey();for(let i=0;i<20;i++)j.update(.5,3,true,.1,0,true);assert.equal(j.ready,true);});
