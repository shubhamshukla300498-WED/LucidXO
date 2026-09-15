export const vertex=`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`;
export const fragment=`
precision highp float;
varying vec2 vUv;
uniform float uTime,uBass,uMid,uHigh,uOnset,uEnergy,uGlow,uImageMix,uAspect,uDetail,uSeed,uZoom,uFrom,uTo,uBlend,uPattern,uKick,uKickAge;
uniform vec3 uColor,uFlight;
uniform sampler2D uImage;
uniform mat4 uCamera;
mat2 rot(float a){return mat2(cos(a),-sin(a),sin(a),cos(a));}
vec3 palette(float t){return .52+.48*cos(6.28318*(vec3(.02,.33,.63)+t));}
// Repeated organic vaults: the opening, ribs and small folds share one distance estimate.
float vault(vec3 p){
 float z=p.z;
 p.xy=rot(.05*sin(z*.33+uTime*.10)+.14*uMid*sin(z*.9))*p.xy;
 float a=atan(p.y,p.x),r=length(p.xy);
 float breathing=uBass*1.1;
 float aperture=2.35+breathing+.20*sin(z*.5+uTime*.18);
 float symmetry=8.+2.*mod(floor(uSeed),3.);
 float petal=cos(a*symmetry);
 float petals=.35*petal+.16*cos(a*symmetry*2.+.3*sin(z*.4))+.075*cos(a*symmetry*4.);
 petals*=1.+.16*sin(uTime*.12);
 float wall=aperture+petals-r;
 float slice=sin(z*2.6-uSeed*.013);
 float ribs=length(vec2((r-aperture-petals)*.8,slice*.48))-(.10+.055*uBass);
 // Smaller nested folds break up the broad ribs without obscuring their silhouette.
 float folds=.014*sin(a*48.+z*5.+sin(a*12.)*2.)*sin(z*13.);
 return min(wall,ribs)+folds;
}

float boxSdf(vec3 p,vec3 b){vec3 q=abs(p)-b;return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.);}
float ellipsoid(vec3 p,vec3 r){float k0=length(p/r),k1=length(p/(r*r));return k0*(k0-1.)/max(k1,.0001);}
// Five reference-led constructions: coils, petals, woven sheets, box portals, and sculpted masks.
float referenceWorld(vec3 p,float which){
 float a=atan(p.y,p.x),r=length(p.xy),phase=uTime*.15+uPattern*.12;
 if(which<3.5){
  float sector=6.28318/7.;float angle=mod(a+sector*.5,sector)-sector*.5;
  vec3 q=vec3(cos(angle)*r-2.65,sin(angle)*r,p.z);
  q.xy=rot(q.z*.7+phase)*q.xy;
  float winding=atan(q.y,q.x),rad=length(q.xy);
  float coil=abs(sin(winding*3.+q.z*2.2+log(rad+.25)*5.))*.18;
  float shell=abs(rad-(.65+.12*sin(q.z*1.7)+uBass*.22))-.055;
  float wire=max(shell,coil-.035-uHigh*.015);
  float web=abs(sin(a*21.+p.z*2.+phase)*sin(r*9.-p.z*3.))*.10;
  return min(wire,max(abs(r-2.8)-.08,web-.017));
 }
 if(which<4.5){
  float petals=mix(cos(a*12.),cos(a*16.),.5+.5*sin(uPattern*.25))+.16*sin(p.z*.4);
  float radius=2.2+.42*petals+.16*cos(a*32.)+uBass*.55;
  float z=mod(p.z+1.1,2.2)-1.1;
  float flower=length(vec2(r-radius,z*.8))-(.065+.03*sin(phase));
  float flare=abs(r-radius-.23*sin(z*4.+phase))-.035;
  return min(flower,max(flare,abs(z)-.38));
 }
 if(which<5.5){
  vec3 q=p;q.xy=rot(.24*sin(q.z*.3)+phase*.3)*q.xy;
  float fabric=q.y-.8*sin(q.x*1.4+q.z*.65+phase)-.45*sin(q.x*2.7-q.z*.8);
  float layers=abs(mod(fabric+1.1,2.2)-1.1)-.027;
  float weave=.012*sin(q.x*38.+uMid)*sin(q.z*38.);
  return max(layers+weave,2.+uBass*.45-r);
 }
 if(which<6.5){
  vec3 q=p;q.xy=rot(.12*sin(q.z*.4+phase))*q.xy;
  q.z=mod(q.z+1.3,2.6)-1.3;
  float outer=boxSdf(q,vec3(2.75+uBass*.25,2.75,.12));
  float inner=boxSdf(q,vec3(2.35,2.35,.3));
  float frame=max(outer,-inner);
  vec3 pillar=vec3(abs(p.x)-2.85,p.y,mod(p.z+1.3,2.6)-1.3);
  return min(frame,boxSdf(pillar,vec3(.12,3.3,.18)));
 }
 // Repeated frontal masks: brow, nose, inset eyes, and radiating feather-like ornaments.
 vec3 q=p;q.z=p.z-uFlight.z+5.;q.xy=rot(.055*sin(phase))*q.xy/(1.+uBass*.12);
 float head=ellipsoid(q,vec3(1.35,1.8,.42));
 float eyes=min(ellipsoid(q-vec3(.55,.35,.38),vec3(.32,.16,.25)),ellipsoid(q-vec3(-.55,.35,.38),vec3(.32,.16,.25)));
 head=max(head,-eyes);
 float nose=ellipsoid(q-vec3(0.,-.02,.5),vec3(.17,.52,.23));
 float brow=ellipsoid(vec3(abs(q.x)-.55,q.y-.65,q.z-.35),vec3(.55,.10,.18));
 float crown=length(vec2(length(vec2(q.x,q.y-1.1))-(.9+.18*cos(atan(q.x,q.y-1.1)*9.)),q.z))-.055;
 float mask=min(min(head,nose),min(brow,crown));
 // The mask floats ahead of the camera; wings frame its face.
 vec3 side=q;side.x=abs(side.x)-2.3;
 float wing=abs(length(side.xy)-(1.2+.18*cos(atan(side.y,side.x)*12.+phase)))-.055;
 wing=max(wing,abs(side.z)-.09);
 return min(mask,wing);
}
// Three independent surface constructions, sharing lighting and audio features.
float shape(vec3 p,float which){
 // Slow, continuous harmonic warping changes each tunnel without stepping symmetry counts.
 if(which<6.5){
  float z=p.z-uFlight.z;
  float morph=.5+.5*sin(uPattern*.37+uSeed*.013);
  float angle=atan(p.y,p.x);
  p.xy=rot(.12*sin(z*.35+uPattern*.24))*p.xy;
  p.xy*=1.+.12*sin(angle*5.+z*.7+uPattern*.65)*morph+.065*sin(angle*9.-z*.4+uPattern*.43);
 }
 if(which>2.5)return referenceWorld(p,which);
 if(which<.5)return vault(p);
 vec3 q=p; q.xy=rot(uTime*.13+sin(q.z*.4)*uMid*.35)*q.xy;
 float d;
 if(which<1.5){
  q*=1.15+.25*sin(uTime*.11)+uBass*.28;
  q.yz=rot(.35*sin(uTime*.17))*q.yz;
  float g=sin(q.x)*cos(q.y)+sin(q.y)*cos(q.z)+sin(q.z)*cos(q.x);
  d=(abs(g)-(.13+.14*uBass))*.45;
 }else{
  q.xy=rot(.4*sin(q.z*.21+uTime*.16))*q.xy;
  vec3 cell=mod(q+2.,4.)-2.;
  float octa=(abs(cell.x)+abs(cell.y)+abs(cell.z)-(1.65+uBass*.7))*.57735;
  float shell=abs(octa)-.055;
  vec3 r=cell;r.xz=rot(uTime*.2+uMid*.7)*r.xz;
  float ring=length(vec2(length(r.xy)-1.25,r.z))-.055;
  d=min(shell,ring);
 }
 vec3 eye=vec3(.12*sin(uTime*.19),.10*cos(uTime*.17),-uTime*.65);
 return max(d,2.15-length(p.xy));
}
float field(vec3 p){
 if(uBlend<.001)return shape(p,uFrom);
 if(uBlend>.999)return shape(p,uTo);
 return mix(shape(p,uFrom),shape(p,uTo),uBlend);
}
// Four tetrahedral samples instead of six central-difference field evaluations.
vec3 normalAt(vec3 p){vec2 e=vec2(1.,-1.)*.003;return normalize(e.xyy*field(p+e.xyy)+e.yyx*field(p+e.yyx)+e.yxy*field(p+e.yxy)+e.xxx*field(p+e.xxx));}
void main(){
 vec2 uv=(vUv-.5)*2.;uv.x*=uAspect;
 vec3 direction=normalize(vec3(uv,-1.5*uZoom));
 vec3 rd=normalize(mat3(uCamera)*direction);
 // Orbit controls tilt the view; translation advances through the living structure.
 vec3 ro=uFlight;
 float t=.02;vec3 p=ro;float glow=0.;bool hit=false;
 for(int i=0;i<100;i++){
  if(float(i)>52.+uDetail*47.)break;
  p=ro+rd*t;float d=field(p);
  glow+=.0025/(.035+abs(d));
  if(d<.004){hit=true;break;}
  t+=max(.003,d*.62);if(t>32.)break;
 }
 vec3 col=vec3(.004,.002,.014);
 float center=pow(max(0.,1.-length(uv)*.4),8.);
 col+=vec3(.04,.015,.08)*center;
 if(hit){
  vec3 n=normalAt(p);float a=atan(p.y,p.x);
  float depth=exp(-t*.065);
  float mode=mix(uFrom,uTo,uBlend);
  float sector=acos(cos(a*12.));
  vec2 ornament=vec2(sector+uPattern*.12,p.z*2.4+uTime*.08);
  float lace=sin(ornament.x*3.+sin(ornament.y*2.))*sin(ornament.y*3.+sin(ornament.x*2.));
  float trace=1.-smoothstep(.025,.025+max(.02,fwidth(lace)*1.5),abs(lace));
  if(mode>4.5&&mode<5.5){float threads=sin(p.x*65.+sin(p.z*3.+uPattern*.2)*5.);trace=1.-smoothstep(.08,.08+max(.04,fwidth(threads)),abs(threads));}
  if(mode>6.5)trace*=.25;
  float beads=pow(max(0.,cos(a*48.)),18.)*pow(.5+.5*cos(p.z*18.),16.);
  float pattern=mix(a*24.+p.z*7.+sin(a*6.)*3.,p.x*9.+sin(p.y*7.)*2.+p.z*8.,smoothstep(.1,.9,mode));
  float vein=pow(.5+.5*sin(pattern-uTime*.8),18.);
  float lattice=pow(.5+.5*cos(a*60.+p.z*11.),30.);
  float wave=pow(.5+.5*sin(p.z*1.8+uTime*3.8),10.);
  vec3 base=palette(.14*sin(p.z*.25)+cos(a*3.)*.07+uSeed*.001+uColor.r*.22);
  vec3 themed=base;
  if(mode>2.5&&mode<3.5)themed=mix(vec3(.03,.65,.08),vec3(.9,.8,.02),.5+.5*sin(p.z+a*7.));
  if(mode>3.5&&mode<4.5)themed=mix(vec3(.18,.005,.65),vec3(1.,.12,.005),.5+.5*cos(a*16.+p.z));
  if(mode>4.5&&mode<5.5)themed=mix(vec3(.9,.75,.15),vec3(.8,.22,.5),.5+.5*sin(p.x*6.+p.z*4.));
  if(mode>5.5&&mode<6.5){float checker=mod(floor(p.x*3.)+floor(p.y*3.)+floor(p.z*3.),2.);themed=mix(vec3(.035),palette(p.z*.2+uPattern*.05),checker);}
  if(mode>6.5)themed=mix(vec3(.04,.45,.28),vec3(.36,.05,.55),.5+.5*sin(p.y*4.+p.x*8.));
  base=mix(base,themed,smoothstep(.0,.2,abs(uBlend-.5)));
  vec3 light=normalize(vec3(-.3,.6,1.));
  float diffuse=.25+.75*abs(dot(n,light));
  float rim=pow(1.-abs(dot(n,-rd)),2.);
  float spec=pow(max(0.,dot(reflect(rd,n),light)),24.);
  vec3 tex=vec3(.5);if(uImageMix>.001)tex=texture2D(uImage,vec2(a/6.28318+.5,p.z*.09+uTime*.03)).rgb;
  base=mix(base,base*(.2+tex*1.8),uImageMix);
  col=base*(.035+diffuse*.12)+vec3(.5,.35,.65)*spec*.5;
  vec3 neon=mix(vec3(.65,1.,.04),vec3(.04,.8,1.),.5+.5*sin(p.z*.3));
  col+=neon*(rim*.22+vein*.06);
  col+=mix(vec3(1.,.52,.12),themed,step(2.5,mode))*trace*.48+vec3(.25,.06,.65)*(1.-trace)*.07;
  col+=vec3(.25,.9,1.)*beads*uHigh*3.2;
  col+=vec3(.8,.18,.65)*wave*uOnset*1.3;
  // A gold shock ring travels into depth on low-frequency attacks; bass itself shapes the aperture.
  float impact=exp(-pow((t-uKickAge*24.)*.65,2.))*exp(-uKickAge*2.);
  col+=mix(vec3(1.,.52,.08),vec3(.9,.12,.7),.5+.5*sin(a*6.+uPattern))*impact*uKick*3.6;
  if(mode>6.5){
   vec2 face=rot(.055*sin(uTime*.15+uPattern*.12))*p.xy/(1.+uBass*.12);
   float eye=length((vec2(abs(face.x)-.55,face.y-.35))/vec2(.29,.14));
   float iris=exp(-eye*eye*3.);float pupil=exp(-eye*eye*24.);
   float jewel=exp(-length((face-vec2(0.,1.05))*vec2(12.,7.)));
   col+=vec3(.12,1.,.55)*(iris-pupil)*1.3+vec3(.8,.4,1.)*jewel*(1.+uHigh*3.);
  }
  col*=depth;
  col=mix(col,vec3(.008,.003,.022),smoothstep(14.,29.,t));
  col+=palette(p.z*.018+.55)*glow*.025*(.2+uGlow);
 }
 col+=vec3(.08,.025,.12)*glow*.012;
 col*=.8+uEnergy*.45;
 col*=1.-.25*smoothstep(.3,1.5,length(vUv-.5));
 gl_FragColor=vec4(col,1.);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
}`;
