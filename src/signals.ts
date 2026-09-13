export interface AudioFeatures {kick:number;snare:number;hat:number;bass:number;lowMid:number;mid:number;high:number;energy:number;onset:number;flux:number;centroid:number;}
export const emptyFeatures=():AudioFeatures=>({kick:0,snare:0,hat:0,bass:0,lowMid:0,mid:0,high:0,energy:0,onset:0,flux:0,centroid:0});
export const smooth=(value:number,target:number,dt:number,attack=.035,release=.3)=>value+(target-value)*(1-Math.exp(-dt/(target>value?attack:release)));
export function bandPower(spectrum:Float32Array,sampleRate:number,fftSize:number,low:number,high:number){
  const a=Math.max(1,Math.floor(low*fftSize/sampleRate));const b=Math.min(spectrum.length,Math.ceil(high*fftSize/sampleRate));
  if(b<=a)return 0;let sum=0;for(let i=a;i<b;i++)sum+=10**(spectrum[i]/10);return Math.sqrt(sum/(b-a));
}
export class FeatureAnalyzer {
  features=emptyFeatures();private previous=new Float32Array(1024);private peak=new Float32Array(4).fill(.003);private fluxFloor=.015;private cooldown=0;private previousBass=0;
  private bandPrevious=[0,0,0];private bandCooldown=[0,0,0];
  update(spectrum:Float32Array,wave:Float32Array,sampleRate:number,dt:number){
    dt=Math.min(.1,Math.max(0,dt));let square=0;for(const x of wave)square+=x*x;const rms=Math.sqrt(square/wave.length);
    const bands=[[20,150],[150,600],[600,2500],[2500,sampleRate/2]];const names=['bass','lowMid','mid','high'] as const;
    for(let n=0;n<4;n++){const p=bandPower(spectrum,sampleRate,spectrum.length*2,...bands[n] as [number,number]);this.peak[n]=Math.max(.003,p,this.peak[n]*Math.exp(-dt/6));this.features[names[n]]=smooth(this.features[names[n]],rms<.002?0:Math.min(1,Math.sqrt(p/this.peak[n])),dt);}
    // Separate transient envelopes; frequency ranges are proxies, not instrument recognition.
    const values=[this.features.bass,this.features.mid,this.features.high];
    const pulseNames=['kick','snare','hat'] as const;
    for(let i=0;i<3;i++){
      this.bandCooldown[i]-=dt;this.features[pulseNames[i]]*=Math.exp(-dt/[.16,.23,.065][i]);
      const rise=(values[i]-this.bandPrevious[i])/Math.max(dt,.001);
      if(rms>.003&&values[i]>.08&&rise>2.8&&this.bandCooldown[i]<=0){this.features[pulseNames[i]]=1;this.bandCooldown[i]=[.20,.18,.075][i];}
      this.bandPrevious[i]=values[i];
    }
    if(this.previous.length!==spectrum.length)this.previous=new Float32Array(spectrum.length);
    let flux=0,weight=0,centroid=0;
    for(let i=0;i<spectrum.length;i++){const p=10**(spectrum[i]/20);flux+=Math.max(0,p-this.previous[i]);this.previous[i]=p;weight+=p;centroid+=i*p;}
    flux/=spectrum.length;this.cooldown-=dt;
    this.features.onset*=Math.exp(-dt/.25);
    const bassRise=this.features.bass-this.previousBass;this.previousBass=this.features.bass;
    if(rms>.003&&(flux>Math.max(.0001,this.fluxFloor*1.65)||bassRise>.09)&&this.cooldown<=0){this.features.onset=1;this.cooldown=.17;}
    this.fluxFloor=smooth(this.fluxFloor,flux,dt,.15,1.5);
    this.features.energy=smooth(this.features.energy,Math.min(1,rms*4),dt);
    this.features.flux=smooth(this.features.flux,Math.min(1,flux*160),dt);
    this.features.centroid=weight>0?centroid/weight/spectrum.length:0;
    return this.features;
  }
}
export function resolution(width:number,height:number,quality:string,pixelRatio=typeof window==='undefined'?1:window.devicePixelRatio||1){
  const aspect=width/Math.max(height,1);
  if(quality==='Native 4K')return aspect>=1?[Math.round(2160*aspect),2160]:[2160,Math.round(2160/aspect)];
  const cap=quality==='Performance'?1280:1920;const scale=Math.min(pixelRatio,cap/Math.max(width,height));return [Math.max(1,Math.round(width*scale)),Math.max(1,Math.round(height*scale))];
}
