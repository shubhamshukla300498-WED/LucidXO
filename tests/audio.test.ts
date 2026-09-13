import test from 'node:test';
import assert from 'node:assert/strict';
import {AudioManager} from '../src/audio';
class FakeNode{connect(){}disconnect(){}}
class FakeContext{sampleRate=48000;resume(){return Promise.resolve();}close(){return Promise.resolve();}createAnalyser(){return new FakeNode();}createMediaStreamSource(){return new FakeNode();}}
Object.defineProperty(globalThis,'AudioContext',{value:FakeContext,configurable:true});
const track=()=>({stopped:false,onended:null,stop(){this.stopped=true;}});
function devices(value:object){Object.defineProperty(globalThis.navigator,'mediaDevices',{value,configurable:true});}

test('capture without an audio track stops the video and exposes a useful error',async()=>{
 const video=track();devices({getDisplayMedia:async()=>({getAudioTracks:()=>[],getTracks:()=>[video]})});const audio=new AudioManager();await audio.capture('tab');assert.equal(video.stopped,true);assert.equal(audio.status.state,'error');assert.match(audio.status.message,/no audio/);audio.dispose();
});
test('a capture resolving after stop cannot reconnect a stale stream',async()=>{
 let resolve:(value:unknown)=>void=()=>{};let entered=false;const mic=track();devices({getUserMedia:()=>{entered=true;return new Promise(r=>resolve=r);}});const audio=new AudioManager();const pending=audio.capture('mic');while(!entered)await Promise.resolve();audio.stop();resolve({getAudioTracks:()=>[mic],getTracks:()=>[mic]});await pending;assert.equal(mic.stopped,true);assert.equal(audio.status.state,'idle');audio.dispose();
});
test('permission denial ends in an error state rather than a silent active source',async()=>{
 devices({getUserMedia:async()=>{throw Error('Permission denied');}});const audio=new AudioManager();await audio.capture('mic');assert.equal(audio.status.state,'error');assert.equal(audio.status.kind,'none');assert.match(audio.status.message,/Permission denied/);audio.dispose();
});
