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
          <p class="hero-kicker">Creative Studio in Malawi</p>
          <h1 class="hero-title">
            <span class="title-typewriter">
              <span #typewriter class="title-line" aria-live="polite"></span>
              <span class="cursor" aria-hidden="true">|</span>
            </span>
          </h1>
          <p class="hero-description">
            We help ambitious brands stand out and convert with strategic visuals,
            user-focused interfaces, and modern websites built for real business growth.
          </p>
          <div class="hero-proof">
            <span class="proof-item">Fast Turnaround</span>
            <span class="proof-item">Strategy-Led Design</span>
            <span class="proof-item">Conversion-Focused Builds</span>
          </div>
          <div class="hero-pillars">
            <span class="pillar">Brand Identity</span>
            <span class="pillar">UX Research & UI Systems</span>
            <span class="pillar">Responsive Websites</span>
          </div>
          <div class="hero-buttons">
            <a href="https://wa.me/265998997400?text=Hi%20Unanimous%20MW%2C%20I%20want%20help%20with%20branding%2C%20UX%2FUI%2C%20or%20web%20development." target="_blank" rel="noopener noreferrer" class="btn btn-primary">Chat on WhatsApp</a>
            <a href="#contact" (click)="scrollTo($event, '#contact')" class="btn btn-secondary">Request Proposal</a>
            <a href="#portfolio" class="btn btn-ghost">See Case Studies</a>
          </div>
          <p class="hero-microcopy">Most client inquiries get a response within 24 hours.</p>
        </div>
        <div class="hero-visual" #heroVisual>
          <div class="hero-depth-layer" aria-hidden="true"></div>
        </div>
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
      padding-top: 80px; /* Account for fixed header */
    }

    .hero-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      width: 100%;
      position: relative;
      z-index: 3;
    }

    .hero-title {
      font-size: 4rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      color: white;
    }

    .hero-kicker {
      display: inline-block;
      margin-bottom: 1rem;
      padding: 0.35rem 0.8rem;
      border-radius: 999px;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      color: #7a3000;
      background: rgba(255, 247, 237, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.5);
      opacity: 0;
      animation: fadeIn 0.8s ease 0.1s forwards;
    }

    .title-line {
      display: block;
      opacity: 0;
      transform: translateY(50px);
      animation: slideUp 0.8s ease forwards;
    }

    .title-typewriter {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      vertical-align: bottom;
    }

    .cursor {
      display: inline-block;
      margin-left: 6px;
      opacity: 0.95;
      animation: blink 700ms steps(2, start) infinite;
      color: rgba(255,255,255,0.95);
      font-weight: 800;
      vertical-align: baseline;
      transform: translateY(0.06em);
    }

    /* Ensure the typed letters and cursor stay on the same line */
    .title-typewriter .title-line {
      display: inline-block;
      opacity: 1; /* visibility handled by typewriter JS */
      transform: none !important;
      animation: none !important;
      vertical-align: baseline;
    }

    .cursor.caret-paused {
      animation: none !important;
      opacity: 0.28 !important;
      transition: opacity 300ms ease;
    }

    @keyframes blink {
      to { opacity: 0; }
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
      margin-bottom: 1.25rem;
      opacity: 0;
      animation: fadeIn 0.8s ease 0.6s forwards;
    }

    .hero-pillars {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      margin-bottom: 1.5rem;
      opacity: 0;
      animation: fadeIn 0.8s ease 0.7s forwards;
    }

    .hero-proof {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 0.9rem;
      opacity: 0;
      animation: fadeIn 0.8s ease 0.68s forwards;
    }

    .proof-item {
      display: inline-flex;
      align-items: center;
      padding: 0.3rem 0.65rem;
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #7a3000;
      background: rgba(255, 255, 255, 0.82);
    }

    .pillar {
      display: inline-flex;
      align-items: center;
      padding: 0.35rem 0.8rem;
      border-radius: 999px;
      font-size: 0.8rem;
      font-weight: 600;
      color: #fff;
      background: rgba(26, 26, 26, 0.18);
      border: 1px solid rgba(255, 255, 255, 0.28);
      backdrop-filter: blur(6px);
    }

    .hero-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      opacity: 0;
      animation: fadeIn 0.8s ease 0.85s forwards;
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

    .btn-ghost {
      background: rgba(255, 255, 255, 0.15);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.4);
    }

    .btn-ghost:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }

    .hero-microcopy {
      margin: 1rem 0 0;
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.9);
      opacity: 0;
      animation: fadeIn 0.8s ease 0.95s forwards;
    }

    .hero-visual {
      position: relative;
      height: 500px;
    }

    .hero-depth-layer {
      position: absolute;
      inset: 0;
      background-image: url('/assets/hero-depth.png');
      background-position: center;
      background-size: cover;
      opacity: 0.12;
      transform-origin: center;
      pointer-events: none;
      filter: blur(6px) saturate(0.9) contrast(0.98);
      transition: transform 280ms cubic-bezier(.2,.9,.25,1), opacity 280ms ease;
      z-index: 1;
    }

    .hero-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
      z-index: 2;
      pointer-events: auto;
      mix-blend-mode: normal;
      opacity: 0.48;
      will-change: transform, opacity;
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
      .hero {
        padding-top: 128px;
        min-height: auto;
        padding-bottom: 3rem;
      }

      .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 1.5rem;
        padding: 1.25rem;
        padding-top: 2rem;
      }

      .hero-title {
        font-size: 2.85rem;
        line-height: 1.08;
        margin-top: 1rem;
      }

      .hero-description {
        font-size: 0.98rem;
      }

      .hero-pillars {
        justify-content: center;
        gap: 0.45rem;
      }

      .hero-proof {
        justify-content: center;
      }

      .pillar,
      .proof-item {
        font-size: 0.7rem;
      }

      .hero-visual {
        height: 150px;
      }

      .hero-buttons {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      .btn {
        width: 100%;
        max-width: 320px;
      }
    }

    @media (max-width: 480px) {
      .hero {
        padding-top: 116px;
      }

      .hero-content {
        padding: 1rem;
        padding-top: 1.5rem;
        gap: 1.25rem;
      }

      .hero-title {
        font-size: 2.25rem;
        margin-top: 0.75rem;
      }

      .hero-description {
        font-size: 0.95rem;
      }

      .hero-microcopy {
        margin-top: 0.85rem;
      }

      .hero-pillars,
      .hero-proof {
        justify-content: flex-start;
        gap: 0.4rem;
      }

      .hero-buttons {
        width: 100%;
        gap: 0.75rem;
      }

      .btn {
        max-width: none;
        padding: 0.9rem 1.25rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .hero-kicker,
      .title-line,
      .hero-description,
      .hero-proof,
      .hero-pillars,
      .hero-buttons,
      .hero-microcopy {
        opacity: 1;
        animation: none;
        transform: none;
      }

      .btn,
      .btn-primary:hover,
      .btn-secondary:hover,
      .btn-ghost:hover {
        transition: none;
        transform: none;
      }

      .hero-canvas {
        opacity: 0.22;
      }
    }
  `]
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('heroSection') heroRef!: ElementRef<HTMLElement>;
  @ViewChild('typewriter') typewriterRef?: ElementRef<HTMLElement>;
  @ViewChild('heroVisual') heroVisualRef?: ElementRef<HTMLElement>;

  private ctx: CanvasRenderingContext2D | null = null;
  private animationId: number | null = null;
  private particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; }> = [];
  private dpr = 1;
  private mouse = { x: 0, y: 0, active: false };
  private reduceMotion = false;
  private resizeObserver?: ResizeObserver;
  private typingTimers: number[] = [];
  private typePhrases: string[] = ['Graphic Design', 'UX/UI Design', 'Web Development'];
  private typeIndex = 0;
  private typingActive = false;
  private lastScrollProgress = 0;
  // Parallax tuning (smaller values = subtler motion)
  private parallaxConfig = {
    canvasX: 8,
    canvasY: 6,
    visualX: 3,
    visualYMult: 0.45,
    rotateDeg: 0.6
  };

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

    // Parallax: respond to scroll for subtle background motion
    window.addEventListener('scroll', this.onScroll, { passive: true });

    if (this.reduceMotion) {
      // Draw a static scene
      this.drawFrame(true);
      // Show the first phrase statically for reduced motion
      if (this.typewriterRef && this.typewriterRef.nativeElement) {
        this.typewriterRef.nativeElement.textContent = this.typePhrases[0];
      }
      return;
    }

    // Run animation outside Angular for performance
    this.zone.runOutsideAngular(() => this.animate());
    // Start the typewriter loop
    this.startTypewriter();
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.animationId != null) cancelAnimationFrame(this.animationId);
    this.stopTypewriter();
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
    window.removeEventListener('scroll', this.onScroll);
  }

  private setupCanvasSize = () => {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const parent = canvas.parentElement as HTMLElement | null;
    const width = (parent?.clientWidth ?? 600);
    const height = (parent?.clientHeight ?? 400);
    this.dpr = Math.min(window.devicePixelRatio || 1, this.isCompactViewport() ? 1.5 : 2);
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
    if (this.isCompactViewport()) {
      return Math.max(40, Math.min(80, Math.floor(area / 6000)));
    }

    // Balanced presence across desktop screens: ~1 per 5000 px^2, clamp [70, 200]
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

    // Clear canvas for next frame
    ctx.clearRect(0, 0, w, h);

    // Update & draw particles
    const compactViewport = this.isCompactViewport();
    const mouseInfluenceRadius = compactViewport ? 72 : 120;
    const connectDist2 = (compactViewport ? 130 : 180) * (compactViewport ? 130 : 180);
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
    ctx.lineWidth = 1.5;
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < connectDist2) {
          const alpha = 1 - d2 / connectDist2;
          ctx.strokeStyle = `rgba(255,255,255,${0.4 * alpha})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // Draw particles with enhanced visibility
    for (const p of this.particles) {
      // Soft outer halo (large, very subtle)
      const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 28);
      halo.addColorStop(0, 'rgba(255,255,255,0.10)');
      halo.addColorStop(0.5, 'rgba(255,255,255,0.03)');
      halo.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 7, 0, Math.PI * 2);
      ctx.fill();
      
      // Main particle glow (medium, bright)
      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 18);
      glow.addColorStop(0, 'rgba(255,255,255,0.60)');
      glow.addColorStop(0.35, 'rgba(255,255,255,0.40)');
      glow.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2);
      ctx.fill();
      
      // Core particle dot (bright white center)
      ctx.fillStyle = 'rgba(255,255,255,0.70)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private isCompactViewport(): boolean {
    return typeof window !== 'undefined' && window.innerWidth <= 768;
  }

  private onMouseMove = (e: MouseEvent) => {
    const rect = (this.heroRef?.nativeElement || this.canvasRef.nativeElement).getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
    this.mouse.active = true;
    this.updateParallaxTransforms();
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
    this.updateParallaxTransforms();
  };

  private onTouchEnd = () => {
    this.mouse.active = false;
  };

  private onScroll = () => {
    this.updateParallaxTransforms();
  };

  private updateParallaxTransforms() {
    if (!isPlatformBrowser(this.platformId) || this.reduceMotion) return;
    const section = this.heroRef?.nativeElement;
    const canvas = this.canvasRef?.nativeElement;
    const visual = this.heroVisualRef?.nativeElement;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    // progress: 0 when top of section at viewport bottom, 1 when section top at viewport top
    const progress = Math.min(1, Math.max(0, 1 - (rect.top / vh)));
    // Slight vertical parallax shift up to 18px
    const yShift = (progress - 0.5) * -36; // range roughly -18..18

    // Mouse influence for subtle tilt/shift
    const w = rect.width || (canvas?.clientWidth ?? 0);
    const h = rect.height || (canvas?.clientHeight ?? 0);
    const mx = (this.mouse.x / (w || 1) - 0.5) || 0;
    const my = (this.mouse.y / (h || 1) - 0.5) || 0;

    if (canvas) {
      const tX = mx * this.parallaxConfig.canvasX; // horizontal parallax
      const tY = yShift + my * this.parallaxConfig.canvasY; // combine scroll + mouse
      canvas.style.transform = `translate3d(${tX}px, ${tY}px, 0) scale(1.02)`;
    }
    if (visual) {
      const vX = mx * this.parallaxConfig.visualX;
      const vY = yShift * this.parallaxConfig.visualYMult + my * (this.parallaxConfig.visualYMult * 14);
      visual.style.transform = `translate3d(${vX}px, ${vY}px, 0) rotate(${mx * this.parallaxConfig.rotateDeg}deg)`;
    }

    this.lastScrollProgress = progress;
  }

  private startTypewriter() {
    if (!this.typewriterRef || this.typingActive) return;
    this.typingActive = true;
    const el = this.typewriterRef.nativeElement;
    const cursorEl = el.querySelector('.cursor') as HTMLElement | null;
    const phrases = this.typePhrases;
    let idx = this.typeIndex || 0;
    let forward = true;
    let pos = 0;

    const tick = () => {
      // ensure cursor is active unless we're intentionally paused
      if (cursorEl && cursorEl.classList.contains('caret-paused')) {
        cursorEl.classList.remove('caret-paused');
      }
      const txt = phrases[idx];
      if (forward) {
        pos++;
        el.textContent = txt.slice(0, pos);
        if (pos >= txt.length) {
          // pause at end: fade caret during pause
          if (cursorEl) cursorEl.classList.add('caret-paused');
          this.typingTimers.push(window.setTimeout(() => {
            if (cursorEl) cursorEl.classList.remove('caret-paused');
            forward = false;
            tick();
          }, 1200));
          return;
        }
      } else {
        pos--;
        el.textContent = txt.slice(0, Math.max(0, pos));
        if (pos <= 0) {
          // ensure cursor returns to normal when cycle restarts
          if (cursorEl) cursorEl.classList.remove('caret-paused');
          forward = true;
          idx = (idx + 1) % phrases.length;
        }
      }
      const delay = forward ? 80 + Math.random() * 40 : 28 + Math.random() * 20;
      this.typingTimers.push(window.setTimeout(tick, delay));
    };

    tick();
  }

  private stopTypewriter() {
    this.typingActive = false;
    for (const id of this.typingTimers) {
      clearTimeout(id);
    }
    this.typingTimers = [];
  }

  scrollTo(evt: Event, selector: string) {
    evt.preventDefault();
    if (typeof document === 'undefined') return;
    const el = document.querySelector(selector) as HTMLElement | null;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}