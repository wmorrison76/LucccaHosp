export class ValueNoise2D {
  private perm: number[];
  constructor(seed = 1337) {
    const p: number[] = [];
    let x = seed >>> 0;
    const lcg = () => (x = (1664525 * x + 1013904223) >>> 0);
    for (let i=0;i<256;i++) p.push(lcg() & 255);
    this.perm = p.concat(p);
  }
  private fade(t:number){ return t*t*(3-2*t); }
  private lerp(a:number,b:number,t:number){ return a+(b-a)*t; }
  private hash(ix:number,iy:number){ return this.perm[(ix + this.perm[iy & 255]) & 255] / 255; }
  sample(x:number,y:number){
    const ix=Math.floor(x), iy=Math.floor(y);
    const fx=x-ix, fy=y-iy;
    const v00=this.hash(ix,iy);
    const v10=this.hash(ix+1,iy);
    const v01=this.hash(ix,iy+1);
    const v11=this.hash(ix+1,iy+1);
    const sx=this.fade(fx), sy=this.fade(fy);
    const ix0=this.lerp(v00,v10,sx);
    const ix1=this.lerp(v01,v11,sx);
    return this.lerp(ix0,ix1,sy);
  }
}
