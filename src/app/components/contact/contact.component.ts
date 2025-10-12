import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, Inject, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PLATFORM_ID } from '@angular/core';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="contact" #contactSection>
      <canvas #contactCanvas class="contact-canvas" aria-hidden="true"></canvas>
      <div class="container">
        <div class="section-header">
          <h2>Let's Create Something Amazing</h2>
          <p>Ready to bring your vision to life? Get in touch with us today</p>
        </div>

        <div class="contact-content">
          <div class="contact-info">
            <h3>Get In Touch</h3>
            <div class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/></svg>
              </div>
              <div>
                <h4>Email</h4>
                <p>hello@unanimw.com</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/></svg>
              </div>
              <div>
                <h4>Phone</h4>
                <p>(+265) 998 997 400</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/></svg>
              </div>
              <div>
                <h4>Location</h4>
                <p>Blantyre, Malawi</p>
              </div>
            </div>

            <div class="social-links">
              <h4>Follow Us</h4>
              <div class="social-icons">
                <a href="https://facebook.com/unanimous" target="_blank" class="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>
                </a>
                <a href="https://instagram.com/unanimous" target="_blank" class="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/></svg>
                </a>
                <a href="https://twitter.com/unanimous" target="_blank" class="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.70,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"/></svg>
                </a>
                <a href="https://linkedin.com/company/unanimous" target="_blank" class="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div class="contact-form-wrapper">
          <form (ngSubmit)="onSubmit()" #contactForm="ngForm">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" class="form-control" [(ngModel)]="formData.name" name="name" required />
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" class="form-control" [(ngModel)]="formData.email" name="email" required />
            </div>
            <div class="form-group">
              <label>Service Interested In</label>
              <select class="form-control" [(ngModel)]="formData.service" name="service" required>
                <option value="">Select a service</option>
                <option value="branding">Brand Identity Design</option>
                <option value="print">Print Design</option>
                <option value="digital">Digital Graphics</option>
                <option value="packaging">Packaging Design</option>
                <option value="web">Website Development</option>
                <option value="mobile">Mobile App Development</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label>Project Budget</label>
              <select class="form-control" [(ngModel)]="formData.budget" name="budget">
                <option value="">Select budget range</option>
                <option value="under-1k">Under $1,000</option>
                <option value="1k-5k">$1,000 - $5,000</option>
                <option value="5k-10k">$5,000 - $10,000</option>
                <option value="10k-plus">$10,000+</option>
              </select>
            </div>
            <div class="form-group">
              <label>Project Details</label>
              <textarea class="form-control" [(ngModel)]="formData.message" name="message" rows="5" required placeholder="Tell us about your project..."></textarea>
            </div>
            
            <div *ngIf="submitMessage" class="submit-message" [class.success]="submitMessage.includes('✅')" [class.error]="submitMessage.includes('❌')">
              {{ submitMessage }}
            </div>
            
            <button class="btn btn-primary" type="submit" [disabled]="!contactForm.form.valid || isSubmitting">
              <span *ngIf="!isSubmitting">Send Message</span>
              <span *ngIf="isSubmitting">Sending...</span>
            </button>
          </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact {
      padding: 6rem 0;
      background: linear-gradient(135deg, #fd6a0a 0%, #fbb51d 100%);
      color: white;
      position: relative;
      overflow: hidden;
      min-height: 100vh;
      display: flex;
      align-items: center;
    }

    .contact-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      opacity: 0.5;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      position: relative;
      z-index: 1;
      width: 100%;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-header h2 {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .section-header p {
      font-size: 1.2rem;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
    }

    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: start;
    }

    .contact-info h3 {
      font-size: 2rem;
      margin-bottom: 2rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      backdrop-filter: blur(10px);
    }

    .contact-icon {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 10px;
    }

    .contact-icon svg {
      width: 1.5rem;
      height: 1.5rem;
    }

    .contact-item h4 {
      font-size: 1.1rem;
      margin-bottom: 0.25rem;
    }

    .contact-item p {
      margin: 0;
      opacity: 0.9;
    }

    .social-links {
      margin-top: 3rem;
    }

    .social-links h4 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }

    .social-icons {
      display: flex;
      gap: 1rem;
    }

    .social-icon {
      width: 45px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      transition: all 0.3s ease;
    }

    .social-icon:hover {
      background: white;
      transform: translateY(-3px);
    }

    .social-icon svg {
      width: 1.3rem;
      height: 1.3rem;
      fill: white;
    }

    .social-icon:hover svg {
      fill: #fd6a0a;
    }

    .contact-form-wrapper {
      background: rgba(255, 255, 255, 0.1);
      padding: 2rem;
      border-radius: 20px;
      backdrop-filter: blur(10px);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .form-control {
      width: 100%;
      padding: 0.8rem;
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }

    .form-control::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }

    .form-control:focus {
      outline: none;
      border-color: rgba(255, 255, 255, 0.5);
    }

    .form-control option {
      background: #333;
      color: white;
    }

    .btn {
      padding: 1rem 2rem;
      border: none;
      border-radius: 50px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 100%;
    }

    .btn-primary {
      background: white;
      color: #fd6a0a;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .submit-message {
      padding: 1rem;
      border-radius: 10px;
      margin-bottom: 1rem;
      text-align: center;
      font-weight: 500;
      animation: slideIn 0.3s ease;
    }

    .submit-message.success {
      background: rgba(34, 197, 94, 0.2);
      border: 2px solid rgba(34, 197, 94, 0.5);
      color: #fff;
    }

    .submit-message.error {
      background: rgba(239, 68, 68, 0.2);
      border: 2px solid rgba(239, 68, 68, 0.5);
      color: #fff;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .contact {
        padding: 4rem 0 3rem;
        min-height: auto;
      }

      .container {
        padding: 1.5rem;
      }

      .section-header {
        margin-bottom: 2.5rem;
      }

      .section-header h2 {
        font-size: 2rem;
      }

      .section-header p {
        font-size: 1rem;
      }

      .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .contact-info h3 {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
      }

      .contact-item {
        padding: 0.8rem;
      }

      .contact-icon {
        width: 45px;
        height: 45px;
      }

      .social-icon {
        width: 40px;
        height: 40px;
      }

      .contact-form-wrapper {
        padding: 1.5rem;
      }

      .form-control {
        font-size: 16px; /* Prevents zoom on iOS */
      }
    }

    @media (max-width: 480px) {
      .contact {
        padding: 3rem 0 2rem;
      }

      .container {
        padding: 1rem;
      }

      .section-header h2 {
        font-size: 1.75rem;
      }

      .contact-form-wrapper {
        padding: 1.25rem;
      }

      .form-group {
        margin-bottom: 1.25rem;
      }
    }
  `]
})

export class ContactComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contactCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('contactSection', { static: false }) contactRef!: ElementRef<HTMLElement>;

  private ctx: CanvasRenderingContext2D | null = null;
  private animationId: number | null = null;
  private particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; }> = [];
  private mouse = { x: 0, y: 0, active: false };
  private dpr = 1;
  private reduceMotion = false;
  private resizeObserver: ResizeObserver | null = null;

  formData = {
    name: '',
    email: '',
    service: '',
    budget: '',
    message: ''
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone
  ) {}

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
    const target = this.contactRef?.nativeElement || canvas;
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
    const target = this.contactRef?.nativeElement || this.canvasRef?.nativeElement;
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
    if (!canvas) return 100;
    const area = (canvas.clientWidth || 600) * (canvas.clientHeight || 400);
    // More particles for better visibility: ~1 per 4000 px^2
    return Math.max(100, Math.min(250, Math.floor(area / 4000)));
  }

  private createParticles(n: number) {
    const items: Array<{ x: number; y: number; vx: number; vy: number; size: number; }> = [];
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return items;
    const w = canvas.clientWidth || 600;
    const h = canvas.clientHeight || 400;
    for (let i = 0; i < n; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 0.7;
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

    // Clear the canvas completely
    ctx.clearRect(0, 0, w, h);

    // Update & draw particles
    const mouseInfluenceRadius = 120;
    const connectDist2 = 180 * 180; // Increased connection distance
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
      // Main particle glow
      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 12);
      glow.addColorStop(0, 'rgba(255,255,255,1)');
      glow.addColorStop(0.3, 'rgba(255,255,255,0.8)');
      glow.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Core particle dot
      ctx.fillStyle = 'rgba(255,255,255,1)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private onMouseMove = (e: MouseEvent) => {
    const rect = (this.contactRef?.nativeElement || this.canvasRef.nativeElement).getBoundingClientRect();
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
    const rect = (this.contactRef?.nativeElement || this.canvasRef.nativeElement).getBoundingClientRect();
    this.mouse.x = t.clientX - rect.left;
    this.mouse.y = t.clientY - rect.top;
    this.mouse.active = true;
  };

  private onTouchMove = (e: TouchEvent) => {
    const t = e.touches[0];
    const rect = (this.contactRef?.nativeElement || this.canvasRef.nativeElement).getBoundingClientRect();
    this.mouse.x = t.clientX - rect.left;
    this.mouse.y = t.clientY - rect.top;
  };

  private onTouchEnd = () => {
    this.mouse.active = false;
  };

  isSubmitting = false;
  submitMessage = '';

  async onSubmit() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    this.submitMessage = 'Sending...';

    try {
      // EmailJS configuration
      const serviceId = 'service_wp7299b';   // Your EmailJS Service ID
      const templateId = 'template_g6hsj5v'; // Your EmailJS Template ID
      const publicKey = 'Ali-m3dN70OtbQ5B-'; // Your EmailJS Public Key

      const templateParams = {
        to_email: 'hello@unanimw.com',
        from_name: this.formData.name,
        from_email: this.formData.email,
        service: this.formData.service,
        budget: this.formData.budget,
        message: this.formData.message,
        reply_to: this.formData.email
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      this.submitMessage = '✅ Thank you! Your message has been sent successfully.';
      
      // Reset form
      this.formData = {
        name: '',
        email: '',
        service: '',
        budget: '',
        message: ''
      };

      // Clear success message after 5 seconds
      setTimeout(() => {
        this.submitMessage = '';
      }, 5000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      this.submitMessage = '❌ Oops! Something went wrong. Please try again or email us directly at hello@unanimw.com';
      
      // Clear error message after 8 seconds
      setTimeout(() => {
        this.submitMessage = '';
      }, 8000);
    } finally {
      this.isSubmitting = false;
    }
  }
}