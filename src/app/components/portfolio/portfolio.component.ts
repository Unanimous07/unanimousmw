import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PortfolioService, PortfolioFolder } from '../../services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="portfolio" class="portfolio">
      <div class="container">
        <div class="section-header">
          <span class="label">Portfolio</span>
          <h2>Featured Work</h2>
          <p>A curated selection of our most distinguished projects, showcasing creativity, precision, and visual excellence.</p>
        </div>

        <div class="portfolio-masonry">
          <div 
            *ngFor="let folder of portfolioFolders; let i = index" 
            class="portfolio-card"
            [class.large]="i % 5 === 0"
            (click)="viewPortfolio(folder.name)">
            <div class="card-inner">
              <div class="card-image">
                <img [src]="folder.thumbnail" [alt]="folder.name" loading="lazy">
                <div class="image-overlay"></div>
              </div>
              <div class="card-content">
                <h3 class="project-title">{{ folder.name }}</h3>
                <p class="project-description">{{ folder.description }}</p>
                <div class="view-project">
                  <span>View Collection</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .portfolio {
      padding: 8rem 0;
      background: linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%);
      scroll-margin-top: 80px;
      position: relative;
    }

    .portfolio::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, #e0e0e0, transparent);
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 3rem;
    }

    .section-header {
      text-align: center;
      margin-bottom: 6rem;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }

    .label {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #fd6a0a;
      margin-bottom: 1rem;
      padding: 0.5rem 1.5rem;
      border: 1px solid #fd6a0a;
      border-radius: 30px;
      background: rgba(253, 106, 10, 0.05);
    }

    .section-header h2 {
      font-size: 3.5rem;
      font-weight: 300;
      color: #1a1a1a;
      margin-bottom: 1.5rem;
      letter-spacing: -0.02em;
      line-height: 1.2;
    }

    .section-header p {
      font-size: 1.125rem;
      color: #666;
      line-height: 1.8;
      font-weight: 300;
    }

    .portfolio-masonry {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .portfolio-card {
      position: relative;
      cursor: pointer;
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .portfolio-card.large {
      grid-column: span 2;
    }

    .portfolio-card:hover {
      transform: translateY(-8px);
    }

    .card-inner {
      background: white;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .portfolio-card:hover .card-inner {
      box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    }

    .card-image {
      position: relative;
      width: 100%;
      padding-top: 66.67%; /* 3:2 aspect ratio */
      overflow: hidden;
      background: #f0f0f0;
    }

    .portfolio-card.large .card-image {
      padding-top: 50%; /* 2:1 aspect ratio for large cards */
    }

    .card-image img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .portfolio-card:hover .card-image img {
      transform: scale(1.08);
    }

    .image-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%);
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    .portfolio-card:hover .image-overlay {
      opacity: 1;
    }

    .card-content {
      padding: 2rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      background: white;
    }

    .category {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .category-dot {
      width: 6px;
      height: 6px;
      background: #fd6a0a;
      border-radius: 50%;
    }

    .category-text {
      font-size: 0.8rem;
      font-weight: 500;
      color: #999;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .project-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 0.75rem;
      line-height: 1.3;
    }

    .project-description {
      font-size: 0.95rem;
      color: #666;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      flex: 1;
    }

    .view-project {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      font-weight: 600;
      color: #fd6a0a;
      transition: gap 0.3s ease;
    }

    .portfolio-card:hover .view-project {
      gap: 0.75rem;
    }

    .view-project svg {
      transition: transform 0.3s ease;
    }

    .portfolio-card:hover .view-project svg {
      transform: translateX(4px);
    }

    @media (max-width: 1200px) {
      .portfolio-masonry {
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      }

      .portfolio-card.large {
        grid-column: span 1;
      }
    }

    @media (max-width: 768px) {
      .portfolio {
        padding: 5rem 0 3rem;
      }

      .container {
        padding: 0 1.5rem;
      }

      .section-header {
        margin-bottom: 3rem;
      }

      .section-header h2 {
        font-size: 2.5rem;
      }

      .section-header p {
        font-size: 1rem;
      }

      .portfolio-masonry {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .portfolio-card.large {
        grid-column: span 1;
      }

      .card-content {
        padding: 1.5rem;
      }

      .project-title {
        font-size: 1.25rem;
      }
    }

    @media (max-width: 480px) {
      .portfolio {
        padding: 4rem 0 2rem;
      }

      .container {
        padding: 0 1rem;
      }

      .section-header {
        margin-bottom: 2.5rem;
      }

      .section-header h2 {
        font-size: 2rem;
      }

      .label {
        font-size: 0.7rem;
        padding: 0.4rem 1.2rem;
      }

      .card-content {
        padding: 1.25rem;
      }
    }
  `]
})
export class PortfolioComponent implements OnInit {
  portfolioFolders: PortfolioFolder[] = [];
  
  constructor(private router: Router, private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioFolders = this.portfolioService.getPortfolioFolders();
  }

  viewPortfolio(folderName: string) {
    this.router.navigate(['/portfolio', folderName]);
  }
}