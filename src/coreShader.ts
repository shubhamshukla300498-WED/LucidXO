export const vertex=`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`;
export const fragment=`
precision highp float;
varying vec2 vUv;
uniform float uTime,uBass,uMid,uHigh,uOnset,uEnergy,uGlow,uImageMix,uAspect,uDetail,uSeed,uZoom,uFrom,uTo,uBlend;
uniform vec3 uColor;
uniform sampler2D uImage;
uniform mat4 uCamera;
mat2 rot(float a){return mat2(cos(a),-sin(a),sin(a),cos(a));}
vec3 palette(float t){return .52+.48*cos(6.28318*(vec3(.02,.33,.63)+t));}
// Repeated organic vaults: the opening, ribs and small folds share one distance estimate.
float vault(vec3 p){
 float z=p.z;
 p.xy=rot(.14*sin(z*.33+uTime*.14)+.55*uMid*sin(z*.9))*p.xy;
 float a=atan(p.y,p.x),r=length(p.xy);
 float breathing=uBass*1.1;
 float aperture=2.35+breathing+.20*sin(z*.5+uTime*.18);
 float symmetry=6.+2.*mod(floor(uSeed),3.);
 float petals=(.24+.08*sin(uTime*.12))*cos(a*symmetry+.22*sin(z*.6))+.10*cos(a*symmetry*2.-z*.75);
 float wall=aperture+petals-r;
 float slice=sin(z*2.6-uSeed*.013);
 float ribs=length(vec2((r-aperture-petals)*.8,slice*.48))-(.10+.055*uBass);
 // Smaller nested folds break up the broad ribs without obscuring their silhouette.
 float folds=(.018+.035*uHigh)*sin(a*48.+z*5.+sin(a*12.)*2.)*sin(z*13.);
 return min(wall,ribs)+folds;
}
// Three independent surface constructions, sharing lighting and audio features.
float shape(vec3 p,float which){
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
  float shell=abs(octa)-(.055+uHigh*.055);
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
vec3 normalAt(vec3 p){vec2 e=vec2(.003,0);return normalize(vec3(field(p+e.xyy)-field(p-e.xyy),field(p+e.yxy)-field(p-e.yxy),field(p+e.yyx)-field(p-e.yyx)));}
void main(){
 vec2 uv=(vUv-.5)*2.;uv.x*=uAspect;
 vec3 direction=normalize(vec3(uv,-1.5*uZoom));
 vec3 rd=normalize(mat3(uCamera)*direction);
 // Orbit controls tilt the view; translation advances through the living structure.
 vec3 ro=vec3(.12*sin(uTime*.19),.10*cos(uTime*.17),-uTime*.65);
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
  float pattern=mix(a*24.+p.z*7.+sin(a*6.)*3.,p.x*9.+sin(p.y*7.)*2.+p.z*8.,smoothstep(.1,.9,mode));
  float vein=pow(.5+.5*sin(pattern-uTime*.8),18.);
  float lattice=pow(.5+.5*cos(a*60.+p.z*11.),30.);
  float wave=pow(.5+.5*sin(p.z*1.8+uTime*3.8),10.);
  vec3 base=palette(.14*sin(p.z*.25)+cos(a*3.)*.07+uSeed*.001+uColor.r*.22);
  vec3 light=normalize(vec3(-.3,.6,1.));
  float diffuse=.25+.75*abs(dot(n,light));
  float rim=pow(1.-abs(dot(n,-rd)),2.);
  float spec=pow(max(0.,dot(reflect(rd,n),light)),24.);
  vec3 tex=texture2D(uImage,vec2(a/6.28318+.5,p.z*.09+uTime*.03)).rgb;
  base=mix(base,base*(.2+tex*1.8),uImageMix);
  col=base*(.035+diffuse*.12)+vec3(.5,.35,.65)*spec*.5;
  vec3 neon=mix(vec3(.65,1.,.04),vec3(.04,.8,1.),.5+.5*sin(p.z*.3));
  col+=neon*(rim*.65+vein*(.08+uHigh*1.9)+lattice*uMid*.55);
  col+=base*wave*(uBass*1.3+uOnset*.9);
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
