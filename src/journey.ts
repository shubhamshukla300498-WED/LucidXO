export const worlds=['Living Vault','Gyroid Reef','Crystal Lattice','Emerald Spirals','Solar Mandala','Silk Weave','Mirror Sanctum','Alien Seraph'] as const;
export type World=typeof worlds[number];
export class Journey {
  from=3;to=3;blend=1;age=0;beats=0;private lastOnset=0;
  update(dt:number,selected:number,automatic:boolean,energy:number,onset:number,playing:boolean){
    if(!playing)return;
    if(selected!==this.to&&this.blend===1){this.from=this.to;this.to=selected;this.blend=0;this.age=0;this.beats=0;}
    if(this.blend<1){this.blend=Math.min(1,this.blend+dt/2);this.lastOnset=onset;return;}
    if(automatic&&energy>.005){this.age+=dt;if(onset>.6&&this.lastOnset<=.6)this.beats++;}
    this.lastOnset=onset;
  }
  get ready(){return this.blend===1&&((this.age>=6&&this.beats>=4)||this.age>=10);}
  get mix(){return this.blend*this.blend*(3-2*this.blend);}
}
