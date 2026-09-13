import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {useControls,type Controls} from './store';
import {resolution,emptyFeatures,type AudioFeatures} from './signals';
import {vertex,fragment} from './coreShader';

const palettes={Iridescent:{body:0x655169,rim:0xc77cf5,vein:0xc6a173,fill:0x71bac0,core:0xc7945e},Ember:{body:0x713421,rim:0xff814a,vein:0xe1a45a,fill:0xa06191,core:0xff763d},Verdant:{body:0x354d35,rim:0xb5d997,vein:0xb3c683,fill:0x7b91b7,core:0x7eac7f}};
export function seeded(seed:number){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
export interface RenderStats{fps:number;width:number;height:number;triangles:number;calls:number;geometries:number;textures:number;frameMs:number;gpu:string;frames:number;p95:number;}
export class Organism {
  renderer:T.WebGLRenderer;scene=new T.Scene();camera=new T.PerspectiveCamera(38,1,.1,70);orbit:OrbitControls;
  private group=new T.Group();private arms:T.Group[]=[];private composer:EffectComposer;private bloom:UnrealBloomPass;
  private body=new T.MeshPhysicalMaterial({color:0x655169,metalness:.8,roughness:.3,clearcoat:.7,clearcoatRoughness:.22,iridescence:.9,iridescenceIOR:1.3,iridescenceThicknessRange:[180,470],envMapIntensity:.42});
  private veins=new T.MeshStandardMaterial({color:0xdbc69a,metalness:.6,roughness:.3,emissive:0xe3bc7d,emissiveIntensity:.25});
  private membrane=new T.MeshPhysicalMaterial({color:0x55473f,metalness:.35,roughness:.35,iridescence:1,side:T.DoubleSide});
  private key=new T.DirectionalLight(0xf9d9b3,4);private rim=new T.DirectionalLight(0xc77cf5,4);private fill=new T.DirectionalLight(0x71bac0,2);
  private imageTexture:T.Texture;private blank:T.DataTexture;private core:T.Mesh;private coreMaterial:T.ShaderMaterial;private imageGeneration=0;
  private env:T.WebGLRenderTarget;private resizeObserver:ResizeObserver;private lastSize='';private lastPalette='';private lastDetail='';private detailTimer=0;private disposed=false;private lost=false;
  private frame=0;private time=0;private last=0;private lastReport=0;private intervals:number[]=[];private recent:number[]=[];private statsFrames=0;private freezeUntil=0;private unsubscribe:()=>void;private visualFeatures=emptyFeatures();
  onStats:(stats:RenderStats)=>void=()=>{};onError:(message:string)=>void=()=>{};onFeatures:(f:AudioFeatures)=>void=()=>{};
  private contextLost=(event:Event)=>{event.preventDefault();this.lost=true;this.onError('Graphics context lost. Waiting for your GPU to recover…');};
  private contextRestored=()=>{this.lost=false;this.lastSize='';this.onError('');};
  constructor(private host:HTMLElement,private audio:{update:(dt:number)=>AudioFeatures}){
    this.renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
    this.renderer.setPixelRatio(1);this.renderer.setClearColor(0x010102);this.renderer.toneMapping=T.ACESFilmicToneMapping;this.renderer.toneMappingExposure=.8;this.renderer.info.autoReset=false;
    host.appendChild(this.renderer.domElement);this.renderer.domElement.setAttribute('aria-label','Interactive 3D alien organism. Drag to orbit and scroll to zoom.');
    this.renderer.domElement.addEventListener('webglcontextlost',this.contextLost);this.renderer.domElement.addEventListener('webglcontextrestored',this.contextRestored);
    this.camera.position.set(0,.15,12.2);this.orbit=new OrbitControls(this.camera,this.renderer.domElement);this.orbit.enableDamping=true;this.orbit.enablePan=false;this.orbit.minDistance=5;this.orbit.maxDistance=18;this.orbit.rotateSpeed=.35;this.orbit.addEventListener('start',()=>{this.freezeUntil=performance.now()+5000;});
    const pmrem=new T.PMREMGenerator(this.renderer);const room=new RoomEnvironment();this.env=pmrem.fromScene(room,.04);this.scene.environment=this.env.texture;room.dispose();pmrem.dispose();
    this.scene.add(this.group);this.key.position.set(-3,4,5);this.rim.position.set(3,2,-2);this.fill.position.set(-4,-2,1);this.scene.add(this.key,this.rim,this.fill,new T.AmbientLight(0x7b647f,.45));
    this.blank=new T.DataTexture(new Uint8Array([150,110,76,255]),1,1);this.blank.needsUpdate=true;this.imageTexture=this.blank;
    this.coreMaterial=new T.ShaderMaterial({vertexShader:vertex,fragmentShader:fragment,uniforms:{uTime:{value:0},uEnergy:{value:0},uGlow:{value:.35},uColor:{value:new T.Color(0xc7945e)},uImage:{value:this.blank},uImageMix:{value:0}}});
    this.core=new T.Mesh(new T.SphereGeometry(.72,32,24),this.coreMaterial);this.scene.add(this.core);
    this.composer=new EffectComposer(this.renderer);this.composer.addPass(new RenderPass(this.scene,this.camera));this.bloom=new UnrealBloomPass(new T.Vector2(800,600),.3,.6,1.15);this.composer.addPass(this.bloom);this.composer.addPass(new OutputPass());
    this.rebuild(useControls.getState());this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(host);this.resize();
    this.unsubscribe=useControls.subscribe((s,old)=>{if(s.seed!==old.seed||s.detail!==old.detail){clearTimeout(this.detailTimer);this.detailTimer=window.setTimeout(()=>this.rebuild(useControls.getState()),200);}if(s.quality!==old.quality||s.aspect!==old.aspect){this.resize();this.intervals=[];}});
    this.frame=requestAnimationFrame(this.animate);
  }
  private tube(points:T.Vector3[],radius:number,segments:number,radial:number){
    const curve=new T.CatmullRomCurve3(points);const g=new T.TubeGeometry(curve,segments,radius,radial,false);const pos=g.attributes.position;const v=new T.Vector3();
    for(let i=0;i<=segments;i++){const t=i/segments;const c=curve.getPointAt(t);const taper=(.08+.92*Math.pow(1-t,.68))*(1+.1*Math.sin(t*50));for(let j=0;j<=radial;j++){const k=i*(radial+1)+j;v.fromBufferAttribute(pos,k).sub(c).multiplyScalar(taper).add(c);pos.setXYZ(k,v.x,v.y,v.z);}}
    g.computeVertexNormals();return g;
  }
  private clearGroup(){this.group.traverse(o=>{if(o instanceof T.Mesh)o.geometry.dispose();});this.group.clear();this.arms=[];}
  private rebuild(s:Controls){
    const detailKey=`${s.seed}:${s.detail}`;if(detailKey===this.lastDetail)return;this.lastDetail=detailKey;this.clearGroup();const rand=seeded(s.seed);const arms=8;const level=s.detail>.72?3:2;const segments=Math.round(15+s.detail*17);const radial=s.detail>.4?7:5;
    for(let a=0;a<arms;a++){
      const arm=new T.Group(),bones:T.BufferGeometry[]=[],luminous:T.BufferGeometry[]=[],sheets:T.BufferGeometry[]=[];
      const angle=a/arms*Math.PI*2;const points:T.Vector3[]=[];const curl=.4+rand()*.35;
      for(let i=0;i<9;i++){const t=i/8;const r=.5+2.2*t;const theta=angle+curl*t*t;points.push(new T.Vector3(Math.cos(theta)*r,Math.sin(theta)*r,(Math.sin(t*4.5+a*.6)*.3)+t*t*.32));}
      const trunk=new T.CatmullRomCurve3(points);bones.push(this.tube(points,.14,segments*2,radial));
      const branch=(start:T.Vector3,direction:T.Vector3,length:number,radius:number,depth:number,phase:number)=>{
        const perpendicular=new T.Vector3(-direction.y,direction.x,.2*Math.sin(phase)).normalize();const path:T.Vector3[]=[];
        for(let k=0;k<=6;k++){const t=k/6;path.push(start.clone().addScaledVector(direction,length*t).addScaledVector(perpendicular,Math.sin(t*2.3)*length*.35).add(new T.Vector3(0,0,Math.sin(t*3+phase)*length*.12)));}
        bones.push(this.tube(path,radius,Math.max(8,segments-depth*3),radial));
        if(depth===0){luminous.push(this.tube(path,.006,12,4));return;}
        const curve=new T.CatmullRomCurve3(path);
        for(let j=1;j<=3;j++){const t=.2+j*.19;const p=curve.getPoint(t),tangent=curve.getTangent(t);for(const side of [-1,1]){const next=tangent.clone().applyAxisAngle(new T.Vector3(0,0,1),side*(.62+.3*rand()));next.z+=.15*Math.sin(phase+j);next.normalize();branch(p,next,length*(.30+.07*rand())*(1-.24*t),radius*.36,depth-1,phase+j);}}
      };
      const branches=5+Math.floor(s.detail*4);
      for(let b=0;b<branches;b++){const t=.13+b/(branches-1)*.73;const p=trunk.getPoint(t),tangent=trunk.getTangent(t);for(const side of [-1,1]){const d=tangent.clone().applyAxisAngle(new T.Vector3(0,0,1),side*(.7+.18*rand()));d.z+=side*.14;branch(p,d.normalize(),(.68+.34*Math.sin(t*Math.PI))*(.6+rand()*.35),.045*(1-t*.45),level-1,a+b);}}
      // Curved ribs frame the central cavity rather than filling it with a sphere.
      for(let rib=0;rib<4;rib++){const path:T.Vector3[]=[];for(let i=0;i<=20;i++){const t=i/20;const r=.42+.8*Math.sin(t*Math.PI);const ang=angle+(rib-1.5)*.1+.18*Math.sin(t*Math.PI);path.push(new T.Vector3(Math.cos(ang)*r,Math.sin(ang)*r,-.42+1.05*t));}bones.push(this.tube(path,.038,32,radial));if(rib===1)luminous.push(this.tube(path,.012,32,5));}
      for(const [geos,mat] of [[bones,this.body],[luminous,this.veins],[sheets,this.membrane]] as const){if(geos.length){const merged=mergeGeometries(geos);geos.forEach(g=>g.dispose());if(merged)arm.add(new T.Mesh(merged,mat));}}
      arm.userData.phase=a/arms*Math.PI*2;this.arms.push(arm);this.group.add(arm);
    }
    const collar=new T.Mesh(new T.TorusGeometry(.59,.035,10,128),this.veins);collar.position.z=.25;this.group.add(collar);
  }
  private resize(){if(this.disposed)return;const w=this.host.clientWidth,h=this.host.clientHeight;if(!w||!h)return;const [width,height]=resolution(w,h,useControls.getState().quality);const key=`${width}:${height}`;if(key===this.lastSize)return;this.lastSize=key;
    const gl=this.renderer.getContext();const max=gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);if(width>max||height>max){this.onError(`This GPU supports at most ${max}px render targets. Choose Balanced quality.`);return;}
    this.renderer.setSize(width,height,false);this.composer.setSize(width,height);this.camera.aspect=w/h;this.camera.fov=w/h<1?58:38;this.camera.updateProjectionMatrix();
  }
  private animate=(now:number)=>{
    if(this.disposed)return;this.frame=requestAnimationFrame(this.animate);const raw=this.last?now-this.last:16.67;this.last=now;const dt=Math.min(.05,raw/1000);if(this.lost)return;const s=useControls.getState();const incoming=this.audio.update(dt);if(s.playing)Object.assign(this.visualFeatures,incoming);const f=this.visualFeatures;
    if(s.playing)this.time+=dt*(.3+s.motion*1.5);const t=this.time;
    if(s.palette!==this.lastPalette){this.lastPalette=s.palette;const p=palettes[s.palette];this.body.color.setHex(p.body);this.veins.color.setHex(p.vein);this.veins.emissive.setHex(p.vein);this.rim.color.setHex(p.rim);this.fill.color.setHex(p.fill);this.coreMaterial.uniforms.uColor.value.setHex(p.core);}
    const energy=f.bass*s.reactivity;this.group.rotation.y=Math.sin(t*.12)*.18;this.group.rotation.x=Math.sin(t*.09)*.11;
    for(const arm of this.arms){const phase=arm.userData.phase;const breath=1+.014*Math.sin(t*.85+phase*.25)+energy*.055*s.energy;arm.scale.setScalar(breath);arm.rotation.z=Math.sin(t*.3+phase)*.014*s.motion+f.mid*s.reactivity*.006*Math.sin(phase);arm.position.z=Math.sin(t*.55+phase)*.045*s.motion;}
    this.veins.emissiveIntensity=.09+s.glow*.55+f.high*s.reactivity*.55+f.onset*s.reactivity*.25;this.body.roughness=.29-f.flux*s.reactivity*.05;this.bloom.strength=s.glow*.65;this.bloom.enabled=s.glow>.01;
    const u=this.coreMaterial.uniforms;u.uTime.value=t;u.uEnergy.value=energy*.5+s.energy*.2;u.uGlow.value=s.glow;u.uImageMix.value=this.imageTexture!==this.blank?s.imageMix:0;
    // Image strength is a shader uniform, so editing the slider does not recompile materials.
    if(this.body.userData.imageStrength)this.body.userData.imageStrength.value=s.imageMix;
    this.orbit.autoRotate=false;
    if(s.orbit&&s.playing&&now>this.freezeUntil){const radius=this.camera.position.length();const theta=Math.sin(t*.045)*.35;this.camera.position.x=Math.sin(theta)*radius;this.camera.position.z=Math.cos(theta)*Math.sqrt(radius*radius-this.camera.position.y*this.camera.position.y);}
    this.orbit.update(dt);
    this.renderer.info.reset();this.composer.render();this.statsFrames++;
    if(raw<1000){this.recent.push(raw);if(this.recent.length>120)this.recent.shift();if(this.intervals.length<18000)this.intervals.push(raw);}
    if(now-this.lastReport>500){this.lastReport=now;const avg=this.recent.reduce((a,b)=>a+b,0)/Math.max(1,this.recent.length);const sorted=[...this.intervals].sort((a,b)=>a-b);const gl=this.renderer.getContext();const debug=gl.getExtension('WEBGL_debug_renderer_info');this.onStats({fps:Math.round(1000/avg),width:this.renderer.domElement.width,height:this.renderer.domElement.height,triangles:this.renderer.info.render.triangles,calls:this.renderer.info.render.calls,geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures,frameMs:avg,gpu:debug?gl.getParameter(debug.UNMASKED_RENDERER_WEBGL):'GPU name unavailable',frames:this.statsFrames,p95:sorted[Math.floor(sorted.length*.95)]||0});this.onFeatures(f);}
  };
  async setImage(file:File){
    const generation=++this.imageGeneration;
    const bitmap=await createImageBitmap(file);if(this.disposed||generation!==this.imageGeneration){bitmap.close();return;}
    const scale=Math.min(1,2048/Math.max(bitmap.width,bitmap.height));const canvas=document.createElement('canvas');canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);canvas.getContext('2d')!.drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();
    const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;texture.wrapS=texture.wrapT=T.RepeatWrapping;texture.anisotropy=Math.min(8,this.renderer.capabilities.getMaxAnisotropy());
    if(this.imageTexture!==this.blank)this.imageTexture.dispose();this.imageTexture=texture;this.body.map=texture;this.body.needsUpdate=true;this.coreMaterial.uniforms.uImage.value=texture;
    this.body.onBeforeCompile=shader=>{shader.uniforms.imageStrength={value:useControls.getState().imageMix};this.body.userData.imageStrength=shader.uniforms.imageStrength;shader.fragmentShader='uniform float imageStrength;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`#ifdef USE_MAP\nvec4 sampledDiffuseColor=texture2D(map,vMapUv);diffuseColor*=mix(vec4(1.),sampledDiffuseColor,imageStrength);\n#endif`);};this.body.needsUpdate=true;
  }
  clearImage(){this.imageGeneration++;if(this.imageTexture!==this.blank)this.imageTexture.dispose();this.imageTexture=this.blank;this.body.map=null;this.body.needsUpdate=true;this.coreMaterial.uniforms.uImage.value=this.blank;}
  capture(){this.composer.render();return new Promise<Blob>((resolve,reject)=>this.renderer.domElement.toBlob(blob=>blob?resolve(blob):reject(Error('Frame could not be captured.')),'image/png'));}
  resetCamera(){this.camera.position.set(0,.15,12.2);this.orbit.target.set(0,0,0);this.orbit.update();}
  dispose(){this.disposed=true;cancelAnimationFrame(this.frame);clearTimeout(this.detailTimer);this.unsubscribe();this.resizeObserver.disconnect();this.orbit.dispose();this.clearGroup();this.core.geometry.dispose();this.coreMaterial.dispose();this.body.dispose();this.veins.dispose();this.membrane.dispose();if(this.imageTexture!==this.blank)this.imageTexture.dispose();this.blank.dispose();this.env.dispose();this.bloom.dispose();this.composer.passes.forEach(p=>{if(p!==this.bloom)p.dispose();});this.composer.dispose();this.renderer.domElement.removeEventListener('webglcontextlost',this.contextLost);this.renderer.domElement.removeEventListener('webglcontextrestored',this.contextRestored);this.renderer.dispose();this.renderer.domElement.remove();}
}
