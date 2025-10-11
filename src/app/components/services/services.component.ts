import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="services" class="services">
      <div class="container">
        <div class="section-header">
          <h2>Our Services</h2>
          <p>Comprehensive creative and technical solutions for your business</p>
        </div>

        <div class="services-grid">
          <!-- Primary Services (Graphic Design) -->
          <div class="service-category primary">
            <h3>Creative Design Services</h3>
            <div class="services-list">
              <div *ngFor="let service of designServices" class="service-item">
                <div class="service-icon" (click)="goToGallery(service.gallery)" style="cursor:pointer;">
                  <img [src]="service.img" [alt]="service.title" style="width:40px;height:40px;border-radius:8px;object-fit:cover;cursor:pointer;" (click)="goToGallery(service.gallery)" />
                </div>
                <div class="service-content">
                  <h4>{{ service.title }}</h4>
                  <p>{{ service.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Secondary Services (Programming) -->
          <div class="service-category secondary">
            <h3>Technical Development</h3>
            <div class="services-list">
              <div *ngFor="let service of techServices" class="service-item">
                <div class="service-icon">
                  <div class="icon-placeholder" [innerHTML]="getSafeHtml(service.icon)"></div>
                </div>
                <div class="service-content">
                  <h4>{{ service.title }}</h4>
                  <p>{{ service.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="cta-section">
          <h3>Ready to bring your vision to life?</h3>
          <p>Let's discuss how we can help elevate your brand with our creative expertise</p>
          <a href="#contact" class="btn btn-primary">Start Your Project</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .services {
      padding: 6rem 0;
      background: white;
      scroll-margin-top: 80px; /* Offset for fixed header */
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-header h2 {
      font-size: 3rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 1rem;
    }

    .section-header p {
      font-size: 1.2rem;
      color: #666;
      max-width: 600px;
      margin: 0 auto;
    }

    .services-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 3rem;
      margin-bottom: 4rem;
    }

    .service-category {
      padding: 2rem;
      border-radius: 20px;
      position: relative;
    }

    .service-category.primary {
      background: linear-gradient(135deg, #fbb51d 0%, #fd6a0a 100%);
      color: white;
    }

    .service-category.secondary {
      background: #f8fafc;
      border: 2px solid #e2e8f0;
    }

    .service-category h3 {
      font-size: 2rem;
      margin-bottom: 2rem;
      text-align: center;
    }

    .services-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .service-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem;
      border-radius: 10px;
      transition: transform 0.3s ease;
    }

    .primary .service-item {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
    }

    .secondary .service-item {
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }

    .service-item:hover {
      transform: translateX(10px);
    }

    .service-icon {
      width: 50px;
      height: 50px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .primary .service-icon {
      background: rgba(255, 255, 255, 0.2);
    }

    .secondary .service-icon {
      background: #fd6a0a;
      color: white;
    }

    .service-icon svg {
      width: 1.5rem;
      height: 1.5rem;
    }

    .service-content h4 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    .service-content p {
      opacity: 0.9;
      line-height: 1.5;
    }

    .cta-section {
      text-align: center;
      padding: 3rem;
      background: linear-gradient(135deg, #fd6a0a 0%, #fbb51d 100%);
      border-radius: 20px;
      color: white;
    }

    .cta-section h3 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .cta-section p {
      font-size: 1.1rem;
      margin-bottom: 2rem;
      opacity: 0.9;
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

    @media (max-width: 768px) {
      .services {
        padding: 4rem 0 3rem;
      }

      .container {
        padding: 0 1.5rem;
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

      .services-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .service-category h3 {
        font-size: 1.5rem;
      }

      .service-item {
        padding: 1rem;
      }

      .cta-section {
        padding: 2rem 1.5rem;
      }

      .cta-section h3 {
        font-size: 1.5rem;
      }

      .cta-section p {
        font-size: 1rem;
      }
    }

    @media (max-width: 480px) {
      .services {
        padding: 3rem 0 2rem;
      }

      .container {
        padding: 0 1rem;
      }

      .section-header h2 {
        font-size: 1.75rem;
      }

      .service-category h3 {
        font-size: 1.25rem;
      }

      .cta-section {
        padding: 1.5rem 1rem;
      }
    }
  `]
})
export class ServicesComponent {
  // ...existing code...

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  designServices = [
    {
      title: 'Brand Identity Design',
      description: 'Complete brand identity packages including logos, color schemes, and brand guidelines',
      img: '/assets/Logos/logo.png',
      gallery: 'Branding'
    },
    {
      title: 'Print Design',
      description: 'Brochures, flyers, business cards, and all your print marketing materials',
      img: '/assets/posters/poster music.jpg',
      gallery: 'posters'
    },
    {
      title: 'Digital Graphics',
      description: 'Social media graphics, web banners, and digital marketing materials',
      img: '/assets/Flyers/03.jpg',
      gallery: 'Flyers'
    },
    {
      title: 'Packaging Design',
      description: 'Product packaging that stands out on shelves and tells your brand story',
      img: '/assets/Product stickers/STICKER.png',
      gallery: 'Product stickers'
    },
    {
      title: 'Illustration',
      description: 'Custom illustrations for various applications and marketing needs',
      img: '/assets/Logos/logo_white.png',
      gallery: 'Logos'
    }
  ];
  constructor(private sanitizer: DomSanitizer, private router: Router) {}

  goToGallery(folder: string) {
    // Use Angular router to navigate to the correct gallery route
    // The route is /portfolio/:category
    this.router.navigate([`/portfolio/${folder}`]);
  }

  techServices = [
    {
      title: 'Website Development',
      description: 'Modern, responsive websites built with latest technologies',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/></svg>'
    },
    {
      title: 'Mobile Apps',
      description: 'Android applications tailored to your business needs',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z"/></svg>'
    },
    {
      title: 'Database Solutions',
      description: 'Efficient database architecture and management systems',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z"/></svg>'
    }
  ];
}