import {FeatureAnalyzer,emptyFeatures,type AudioFeatures} from './signals';
export type AudioStatus={state:'idle'|'requesting'|'active'|'paused'|'error';label:string;message:string;kind:'none'|'file'|'mic'|'tab'|'demo'};
export class AudioManager {
  context:AudioContext|null=null;private analyser:AnalyserNode|null=null;private source:AudioNode|null=null;private stream:MediaStream|null=null;private media:HTMLAudioElement|null=null;private url:string|null=null;private generation=0;
  private demoTimer=0;private demoNodes:AudioNode[]=[];private analyzer=new FeatureAnalyzer();private spectrum=new Float32Array(1024);private waveform=new Float32Array(2048);
  status:AudioStatus={state:'idle',label:'No audio connected',message:'The organism breathes on its own. Add sound to bring it to life.',kind:'none'};
  onChange:(s:AudioStatus)=>void=()=>{};
  private report(s:AudioStatus){this.status=s;this.onChange(s);}
  private async ready(){if(!this.context)this.context=new AudioContext();await this.context.resume();if(!this.analyser){this.analyser=this.context.createAnalyser();this.analyser.fftSize=2048;this.analyser.smoothingTimeConstant=0;}}
  stop(){this.generation++;clearInterval(this.demoTimer);this.demoTimer=0;this.demoNodes.forEach(n=>n.disconnect());this.demoNodes=[];this.source?.disconnect();this.source=null;this.stream?.getTracks().forEach(t=>{t.onended=null;t.stop();});this.stream=null;if(this.media){this.media.pause();this.media.removeAttribute('src');this.media.load();this.media=null;}if(this.url)URL.revokeObjectURL(this.url);this.url=null;this.analyzer=new FeatureAnalyzer();this.report({state:'idle',label:'No audio connected',message:'Autonomous breathing',kind:'none'});}
  private fail(error:unknown){const message=error instanceof Error?error.message:'Audio could not be started.';this.stop();this.report({state:'error',kind:'none',label:'Audio unavailable',message});}
  async capture(kind:'mic'|'tab'){
    this.stop();const token=this.generation;this.report({state:'requesting',kind,label:kind==='mic'?'Connecting microphone':'Choose a tab and share audio',message:kind==='tab'?'Choose a browser tab and enable “Share audio”. Audio availability depends on your browser.':'Your microphone is analyzed locally, without speaker monitoring.'});
    try{await this.ready();if(token!==this.generation)return;
      if(!navigator.mediaDevices)throw Error('Capture needs HTTPS and a supported browser. Try a local audio file.');
      const stream=kind==='mic'?await navigator.mediaDevices.getUserMedia({audio:true}):await navigator.mediaDevices.getDisplayMedia({video:true,audio:true});
      if(token!==this.generation){stream.getTracks().forEach(t=>t.stop());return;}
      if(!stream.getAudioTracks().length){stream.getTracks().forEach(t=>t.stop());throw Error('The selected surface shared no audio. Choose a tab with “Share audio”, or load a local file.');}
      this.stream=stream;stream.getTracks().forEach(t=>t.onended=()=>this.stop());this.source=this.context!.createMediaStreamSource(stream);this.source.connect(this.analyser!);
      this.report({state:'active',kind,label:kind==='mic'?'Microphone':'Browser tab',message:'Connected · processed locally'});
    }catch(e){if(token===this.generation)this.fail(e);}
  }
  async load(file:File){
    this.stop();const token=this.generation;this.report({state:'requesting',kind:'file',label:file.name,message:'Loading your track…'});
    try{await this.ready();if(token!==this.generation)return;this.url=URL.createObjectURL(file);const media=new Audio(this.url);this.media=media;media.loop=true;this.source=this.context!.createMediaElementSource(media);this.source.connect(this.analyser!);this.source.connect(this.context!.destination);media.onerror=()=>{if(token===this.generation)this.fail(Error('This audio file could not be decoded. Try MP3, WAV, or OGG.'));};await media.play();if(token===this.generation)this.report({state:'active',kind:'file',label:file.name,message:'Local playback · loops continuously'});}catch(e){if(token===this.generation)this.fail(e);}
  }
  toggle(){if(this.status.kind==='file'&&this.media){if(this.media.paused){this.media.play().then(()=>this.report({...this.status,state:'active'})).catch(e=>this.fail(e));}else{this.media.pause();this.report({...this.status,state:'paused'});}}}
  async demo(){
    this.stop();const token=this.generation;try{await this.ready();if(token!==this.generation)return;
      const ctx=this.context!;const master=ctx.createGain();master.gain.value=.14;master.connect(this.analyser!);master.connect(ctx.destination);this.source=master;let beat=0;
      const tick=()=>{if(token!==this.generation)return;const now=ctx.currentTime;const kick=ctx.createOscillator(),gain=ctx.createGain();kick.frequency.setValueAtTime(90,now);kick.frequency.exponentialRampToValueAtTime(35,now+.25);gain.gain.setValueAtTime(.001,now);gain.gain.exponentialRampToValueAtTime(.9,now+.01);gain.gain.exponentialRampToValueAtTime(.001,now+.38);kick.connect(gain);gain.connect(master);kick.start();kick.stop(now+.4);kick.onended=()=>{kick.disconnect();gain.disconnect();};
        if(beat++%2===0){const voice=ctx.createOscillator(),env=ctx.createGain();voice.type='sine';voice.frequency.value=[164.81,196,220,146.83][Math.floor(beat/8)%4];env.gain.setValueAtTime(.001,now);env.gain.exponentialRampToValueAtTime(.3,now+.1);env.gain.exponentialRampToValueAtTime(.001,now+1.8);voice.connect(env);env.connect(master);voice.start();voice.stop(now+1.85);voice.onended=()=>{voice.disconnect();env.disconnect();};}};
      tick();this.demoTimer=window.setInterval(tick,600);this.report({state:'active',kind:'demo',label:'First contact',message:'Built-in sound · 100 BPM · synthesized locally'});
    }catch(e){if(token===this.generation)this.fail(e);}
  }
  update(dt:number):AudioFeatures{if(!this.analyser||this.status.state!=='active')return emptyFeatures();this.analyser.getFloatFrequencyData(this.spectrum);this.analyser.getFloatTimeDomainData(this.waveform);return this.analyzer.update(this.spectrum,this.waveform,this.context!.sampleRate,dt);}
  dispose(){this.stop();this.analyser?.disconnect();void this.context?.close();}
}
