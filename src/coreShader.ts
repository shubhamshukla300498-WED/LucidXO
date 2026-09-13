export const vertex=`varying vec3 vWorld;void main(){vWorld=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*viewMatrix*vec4(vWorld,1.);}`;
export const fragment=`
precision highp float;
varying vec3 vWorld;
uniform float uTime,uEnergy,uGlow,uImageMix;
uniform vec3 uColor;
uniform sampler2D uImage;
uniform mat4 projectionMatrix;
mat2 rot(float a){return mat2(cos(a),-sin(a),sin(a),cos(a));}
float field(vec3 p){
 p.xy=rot(uTime*.08)*p.xy;
 float a=atan(p.y,p.x);float r=length(p.xy);
 float R=.38+.045*cos(7.*a+uTime*.13)+uEnergy*.035;
 float z=.08*sin(a*3.+uTime*.2);
 float d=length(vec2(r-R,p.z-z))-.093;
 vec3 q=p;q.xz=rot(1.2)*q.xz;
 float ring=length(vec2(length(q.xy)-.265,q.z))-.034;
 d=min(d,ring);
 float ribs=length(vec2(r-(.38+.065*cos(a*14.)),p.z+.075))-.026;
 return min(d,ribs);
}
vec3 normalAt(vec3 p){vec2 e=vec2(.001,0.);return normalize(vec3(field(p+e.xyy)-field(p-e.xyy),field(p+e.yxy)-field(p-e.yxy),field(p+e.yyx)-field(p-e.yyx)));}
void main(){
 vec3 ro=cameraPosition,rd=normalize(vWorld-ro);float b=dot(ro,rd),c=dot(ro,ro)-.72*.72,h=b*b-c;
 if(h<0.)discard;float t=max(0.,-b-sqrt(h)),end=-b+sqrt(h);bool hit=false;vec3 p;
 for(int i=0;i<96;i++){p=ro+rd*t;float d=field(p);if(abs(d)<.0008){hit=true;break;}t+=max(.0003,abs(d)*.42);if(t>end)break;}
 if(!hit)discard;
 vec3 n=normalAt(p),l=normalize(vec3(-2.,3.,4.));float diffuse=max(0.,dot(n,l));float rim=pow(1.-max(0.,dot(n,-rd)),3.);
 vec3 reflectDir=reflect(rd,n);float spec=pow(max(0.,dot(reflectDir,l)),32.);
 float veins=pow(.5+.5*sin(atan(p.y,p.x)*42.+p.z*35.-uTime*.8),16.);
 vec3 tex=texture2D(uImage,p.xy*.9+.5).rgb;
 vec3 base=mix(uColor,tex,uImageMix*.75);
 vec3 color=base*(.11+diffuse*.65)+vec3(.82,.78,.65)*spec*.8+vec3(.38,.72,.65)*rim*.22;
 color+=base*veins*(.2+uGlow*1.1+uEnergy*.8);
 vec4 clip=projectionMatrix*viewMatrix*vec4(p,1.);gl_FragDepth=(clip.z/clip.w)*.5+.5;
 gl_FragColor=vec4(color,1.);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
}`;
