import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, Inject, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="home" class="hero" #heroSection>
      <canvas #heroCanvas class="hero-canvas" aria-hidden="true"></canvas>
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="title-line">Creative</span>
            <span class="title-line highlight">Design</span>
            <span class="title-line">Solutions</span>
          </h1>
          <p class="hero-description">
            We craft exceptional visual experiences that tell your story. 
            From stunning graphic designs to comprehensive digital solutions, 
            we bring your vision to life with creativity and precision.
          </p>
          <div class="hero-buttons">
            <a href="#portfolio" class="btn btn-primary">View Our Work</a>
            <a href="#contact" class="btn btn-secondary">Get Started</a>
          </div>
        </div>
        <div class="hero-visual"></div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      background: linear-gradient(135deg, #fbb51d 0%, #fd6a0a 100%);
      position: relative;
      overflow: hidden;
    }

    .hero-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      width: 100%;
      position: relative;
      z-index: 1;
    }

    .hero-title {
      font-size: 4rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      color: white;
    }

    .title-line {
      display: block;
      opacity: 0;
      transform: translateY(50px);
      animation: slideUp 0.8s ease forwards;
    }

    .title-line:nth-child(2) {
      animation-delay: 0.2s;
    }

    .title-line:nth-child(3) {
      animation-delay: 0.4s;
    }

    .highlight {
      background: linear-gradient(45deg, #ffffff, #fbb51d);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-description {
      font-size: 1.2rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 2rem;
      opacity: 0;
      animation: fadeIn 0.8s ease 0.6s forwards;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
      opacity: 0;
      animation: fadeIn 0.8s ease 0.8s forwards;
    }

    .btn {
      padding: 1rem 2rem;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .btn-primary {
      background: white;
      color: #fd6a0a;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }

    .btn-secondary {
      background: transparent;
      color: white;
      border: 2px solid white;
    }

    .btn-secondary:hover {
      background: white;
      color: #fd6a0a;
      transform: translateY(-2px);
    }

    .hero-visual {
      position: relative;
      height: 500px;
    }

    .hero-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
      z-index: 0;
      pointer-events: none;
    }

    @keyframes slideUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      to {
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 2rem;
      }

      .hero-title {
        font-size: 2.5rem;
      }

      .hero-visual {
        height: 300px;
      }

      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('heroSection') heroRef!: ElementRef<HTMLElement>;

  private ctx: CanvasRenderingContext2D | null = null;
  private animationId: number | null = null;
  private particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; }> = [];
  private dpr = 1;
  private mouse = { x: 0, y: 0, active: false };
  private reduceMotion = false;
  private resizeObserver?: ResizeObserver;

  constructor(private zone: NgZone, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Respect user preference
    this.reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;

    // Setup size with DPR
    this.setupCanvasSize();

    // Create particles
    const particleCount = this.getParticleCount();
    this.particles = this.createParticles(particleCount);

  // Event listeners on the section so canvas can keep pointer-events: none
  const target = this.heroRef?.nativeElement || canvas;
  target.addEventListener('mousemove', this.onMouseMove, { passive: true });
  target.addEventListener('mouseleave', this.onMouseLeave, { passive: true });
  target.addEventListener('click', this.onClick);
  target.addEventListener('touchstart', this.onTouchStart, { passive: true });
  target.addEventListener('touchmove', this.onTouchMove, { passive: true });
  target.addEventListener('touchend', this.onTouchEnd, { passive: true });

    // Resize observer to track container size changes
    const container = canvas.parentElement as HTMLElement | null;
    if (container && 'ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(() => this.setupCanvasSize());
      this.resizeObserver.observe(container);
    } else {
      window.addEventListener('resize', this.setupCanvasSize, { passive: true });
    }

    if (this.reduceMotion) {
      // Draw a static scene
      this.drawFrame(true);
      return;
    }

    // Run animation outside Angular for performance
    this.zone.runOutsideAngular(() => this.animate());
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.animationId != null) cancelAnimationFrame(this.animationId);
    const target = this.heroRef?.nativeElement || this.canvasRef?.nativeElement;
    if (target) {
      target.removeEventListener('mousemove', this.onMouseMove);
      target.removeEventListener('mouseleave', this.onMouseLeave);
      target.removeEventListener('click', this.onClick);
      target.removeEventListener('touchstart', this.onTouchStart);
      target.removeEventListener('touchmove', this.onTouchMove);
      target.removeEventListener('touchend', this.onTouchEnd);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    } else {
      window.removeEventListener('resize', this.setupCanvasSize);
    }
  }

  private setupCanvasSize = () => {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const parent = canvas.parentElement as HTMLElement | null;
    const width = (parent?.clientWidth ?? 600);
    const height = (parent?.clientHeight ?? 400);
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * this.dpr);
    canvas.height = Math.floor(height * this.dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    this.ctx?.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  };

  private getParticleCount(): number {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return 80;
    const area = (canvas.clientWidth || 600) * (canvas.clientHeight || 400);
    // Increased presence across full section: ~1 per 5000 px^2, clamp [70, 200]
    return Math.max(70, Math.min(200, Math.floor(area / 5000)));
  }

  private createParticles(n: number) {
    const items: Array<{ x: number; y: number; vx: number; vy: number; size: number; }> = [];
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return items;
    const w = canvas.clientWidth || 600;
    const h = canvas.clientHeight || 400;
    for (let i = 0; i < n; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 0.7; // px/frame
      items.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1 + Math.random() * 2.5
      });
    }
    return items;
  }

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);
    this.drawFrame(false);
  };

  private drawFrame(staticOnly: boolean) {
    const ctx = this.ctx;
    const canvas = this.canvasRef?.nativeElement;
    if (!ctx || !canvas) return;

    const w = canvas.width / this.dpr;
    const h = canvas.height / this.dpr;

    // Background subtle gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, 'rgba(255,255,255,0.15)');
    grad.addColorStop(1, 'rgba(255,255,255,0.05)');
    ctx.fillStyle = grad;
    ctx.clearRect(0, 0, w, h);
    ctx.fillRect(0, 0, w, h);

    // Update & draw particles
  const mouseInfluenceRadius = 120;
  const connectDist2 = 160 * 160;
    const mX = this.mouse.x;
    const mY = this.mouse.y;
    const mouseActive = this.mouse.active;

    if (!staticOnly) {
      for (const p of this.particles) {
        // Move
        p.x += p.vx;
        p.y += p.vy;
        // Bounce on edges
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        // Mouse repel/attract
        if (mouseActive) {
          const dx = p.x - mX;
          const dy = p.y - mY;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < mouseInfluenceRadius * mouseInfluenceRadius && dist2 > 0.01) {
            const dist = Math.sqrt(dist2);
            const force = (mouseInfluenceRadius - dist) / mouseInfluenceRadius;
            p.vx += (dx / dist) * force * 0.4;
            p.vy += (dy / dist) * force * 0.4;
            // Clamp velocity
            p.vx = Math.max(-1.5, Math.min(1.5, p.vx));
            p.vy = Math.max(-1.5, Math.min(1.5, p.vy));
          }
        }
      }
    }

    // Draw connections first (thin lines)
    ctx.lineWidth = 1;
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < connectDist2) {
          const alpha = 1 - d2 / connectDist2;
          ctx.strokeStyle = `rgba(255,255,255,${0.25 * alpha})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    for (const p of this.particles) {
      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 8);
      glow.addColorStop(0, 'rgba(255,255,255,0.9)');
      glow.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private onMouseMove = (e: MouseEvent) => {
    const rect = (this.heroRef?.nativeElement || this.canvasRef.nativeElement).getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
    this.mouse.active = true;
  };

  private onMouseLeave = () => {
    this.mouse.active = false;
  };

  private onClick = () => {
    // Burst effect: randomize velocities
    for (const p of this.particles) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.0 + Math.random() * 2.0;
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed;
    }
  };

  private onTouchStart = (e: TouchEvent) => {
    const t = e.touches[0];
    const rect = (this.heroRef?.nativeElement || this.canvasRef.nativeElement).getBoundingClientRect();
    this.mouse.x = t.clientX - rect.left;
    this.mouse.y = t.clientY - rect.top;
    this.mouse.active = true;
  };

  private onTouchMove = (e: TouchEvent) => {
    const t = e.touches[0];
    const rect = (this.heroRef?.nativeElement || this.canvasRef.nativeElement).getBoundingClientRect();
    this.mouse.x = t.clientX - rect.left;
    this.mouse.y = t.clientY - rect.top;
  };

  private onTouchEnd = () => {
    this.mouse.active = false;
  };
}