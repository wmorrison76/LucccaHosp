// ...imports and types unchanged...

export class ParticleSystem {
  // ...fields unchanged...
  tick(dt: number, mode: 'idle'|'listening'|'thinking'|'speaking'){
    this.time += dt;
    this.globalRot += dt * 0.15;

    const R = this.cfg.radius;

    // Idle breathing baseline (0.26..0.38) so it’s always alive
    const idle = 0.26 + 0.12 * (0.5 + 0.5 * Math.sin(this.time * 0.9));
    const energy = Math.max(this.cfg.energy, idle);

    const noiseScale = mode==='thinking' ? 0.9 : 0.6;
    const flow  = 0.4 + energy*0.9 + (mode==='speaking'?0.7:0);
    const swirl = (mode==='listening'?0.4:0.2) + (mode==='speaking'?0.6:0);

    for (const p of this.particles) {
      const nx = (p.x / R) * noiseScale + this.time*0.05;
      const ny = (p.y / R) * noiseScale - this.time*0.03;
      const f = (this.noise.sample(nx, ny) - 0.5) * 2;
      const t = Math.atan2(p.y, p.x) + f*swirl*0.12;
      const speed = (0.2 + Math.random()*0.05) * flow;
      p.vx += Math.cos(t)*speed;
      p.vy += Math.sin(t)*speed;

      p.vx *= 0.94; p.vy *= 0.94;
      const d = Math.hypot(p.x, p.y);
      if (d > R*0.98){
        const k = (d - R*0.98) * 0.12;
        p.vx -= (p.x/d)*k; p.vy -= (p.y/d)*k;
      }

      p.px = p.x; p.py = p.y;
      p.x += p.vx; p.y += p.vy;

      p.sparkle = Math.max(0, p.sparkle - dt*0.45);
    }
  }

  // draw(...) unchanged
}
