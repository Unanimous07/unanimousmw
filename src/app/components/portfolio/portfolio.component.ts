import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
          <p>A curated selection of branding, UX/UI, and web-focused projects designed to improve clarity, engagement, and conversion.</p>
        </div>

        <div class="portfolio-filters" role="tablist" aria-label="Portfolio disciplines">
          <button
            *ngFor="let filter of filters"
            type="button"
            class="filter-chip"
            [class.active]="activeFilter === filter.value"
            (click)="setActiveFilter(filter.value)">
            {{ filter.label }}
          </button>
        </div>

        <div class="portfolio-masonry">
          <button 
            *ngFor="let folder of filteredPortfolioFolders; let i = index" 
            class="portfolio-card"
            [class.large]="i % 5 === 0"
            type="button"
            (click)="viewPortfolio(folder.routeSegment)"
            [attr.aria-label]="'Open portfolio category ' + folder.name">
            <div class="card-inner">
              <div class="card-image" [class.logo-card-image]="folder.thumbnailType === 'logo'">
                <img [src]="folder.thumbnail" [alt]="folder.name" loading="lazy" [class.logo-thumbnail]="folder.thumbnailType === 'logo'">
                <div class="image-overlay"></div>
              </div>
              <div class="card-content">
                <div class="project-meta">
                  <span class="discipline-tag">{{ folder.discipline === 'ux-ui' ? 'UX/UI Design' : folder.discipline === 'web' ? 'Web Development' : 'Branding' }}</span>
                  <span class="item-count">{{ folder.itemCount }} {{ folder.itemLabel || 'assets' }}</span>
                </div>
                <h3 class="project-title">{{ folder.name }}</h3>
                <p class="project-description">{{ folder.description }}</p>
                <div class="case-study-grid">
                  <div class="case-point">
                    <span class="case-label">Challenge</span>
                    <p>{{ folder.caseStudy.challenge }}</p>
                  </div>
                  <div class="case-point">
                    <span class="case-label">Approach</span>
                    <p>{{ folder.caseStudy.approach }}</p>
                  </div>
                  <div class="case-point">
                    <span class="case-label">Outcome</span>
                    <p>{{ folder.caseStudy.outcome }}</p>
                  </div>
                </div>
                <div class="view-project">
                  <span>{{ folder.externalUrl ? 'Visit Website' : 'View Collection' }}</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>

        <p *ngIf="filteredPortfolioFolders.length === 0" class="empty-state">
          More {{ activeFilter === 'web' ? 'web development' : activeFilter === 'ux-ui' ? 'UX/UI' : 'portfolio' }} case studies are being curated.
        </p>
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

    .portfolio-filters {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.75rem;
      margin: 0 auto 2.5rem;
      max-width: 900px;
    }

    .filter-chip {
      border: 1px solid #dadada;
      background: #fff;
      color: #424242;
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      border-radius: 999px;
      padding: 0.6rem 1rem;
      cursor: pointer;
      transition: all 0.25s ease;
    }

    .filter-chip:hover {
      border-color: #fd6a0a;
      color: #fd6a0a;
    }

    .filter-chip.active {
      background: #fd6a0a;
      border-color: #fd6a0a;
      color: #fff;
      box-shadow: 0 8px 18px rgba(253, 106, 10, 0.25);
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
      border: none;
      background: transparent;
      padding: 0;
      text-align: left;
      width: 100%;
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

    .card-image.logo-card-image {
      background: linear-gradient(140deg, #1f2937 0%, #111827 100%);
    }

    .card-image.logo-card-image .logo-thumbnail {
      top: 50%;
      left: 50%;
      width: 80%;
      height: 80%;
      object-fit: contain;
      transform: translate(-50%, -50%);
      padding: 1rem;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.16);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
    }

    .portfolio-card:hover .card-image img {
      transform: scale(1.08);
    }

    .portfolio-card:hover .card-image.logo-card-image .logo-thumbnail {
      transform: translate(-50%, -50%) scale(1.03);
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

    .project-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      margin-bottom: 0.8rem;
      flex-wrap: wrap;
    }

    .discipline-tag {
      display: inline-flex;
      align-items: center;
      padding: 0.35rem 0.65rem;
      border-radius: 999px;
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-weight: 700;
      color: #fd6a0a;
      background: rgba(253, 106, 10, 0.08);
      border: 1px solid rgba(253, 106, 10, 0.25);
    }

    .item-count {
      font-size: 0.78rem;
      color: #767676;
      font-weight: 600;
      letter-spacing: 0.02em;
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
      margin-bottom: 1.2rem;
    }

    .case-study-grid {
      display: grid;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
      flex: 1;
    }

    .case-point {
      border: 1px solid #efefef;
      border-radius: 10px;
      padding: 0.7rem 0.85rem;
      background: #fcfcfc;
    }

    .case-label {
      display: block;
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #9a9a9a;
      margin-bottom: 0.3rem;
    }

    .case-point p {
      margin: 0;
      font-size: 0.84rem;
      line-height: 1.45;
      color: #4a4a4a;
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

    .empty-state {
      text-align: center;
      color: #666;
      font-size: 1rem;
      padding: 1rem 0 0;
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

      .section-header {
        margin-bottom: 2.5rem;
      }

      .section-header p {
        font-size: 1rem;
      }

      .portfolio-filters {
        justify-content: flex-start;
        flex-wrap: nowrap;
        overflow-x: auto;
        padding-bottom: 0.25rem;
        -webkit-overflow-scrolling: touch;
      }

      .filter-chip {
        flex: 0 0 auto;
      }

      .portfolio-masonry {
        grid-template-columns: 1fr;
        gap: 1.35rem;
      }

      .portfolio-card.large {
        grid-column: span 1;
      }

      .card-content {
        padding: 1.25rem;
      }

      .project-title {
        font-size: 1.18rem;
      }

      .case-study-grid {
        gap: 0.55rem;
      }

      .case-point {
        padding: 0.65rem 0.75rem;
      }

      .case-point p {
        font-size: 0.8rem;
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
        padding: 1.1rem;
      }

      .portfolio-filters {
        gap: 0.55rem;
      }

      .filter-chip {
        padding: 0.5rem 0.85rem;
        font-size: 0.78rem;
      }

      .project-description {
        font-size: 0.9rem;
        line-height: 1.5;
      }

      .case-study-grid {
        display: none;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .portfolio-card,
      .card-inner,
      .card-image img,
      .view-project,
      .view-project svg,
      .filter-chip {
        transition: none;
      }

      .portfolio-card:hover,
      .portfolio-card:hover .card-inner,
      .portfolio-card:hover .card-image img,
      .portfolio-card:hover .view-project svg {
        transform: none;
      }
    }
  `]
})
export class PortfolioComponent implements OnInit {
  portfolioFolders: PortfolioFolder[] = [];
  activeFilter: 'all' | 'branding' | 'ux-ui' | 'web' = 'all';
  readonly filters: Array<{ label: string; value: 'all' | 'branding' | 'ux-ui' | 'web' }> = [
    { label: 'All Work', value: 'all' },
    { label: 'Branding', value: 'branding' },
    { label: 'UX/UI', value: 'ux-ui' },
    { label: 'Web Development', value: 'web' }
  ];
  private readonly destroyRef = inject(DestroyRef);
  
  constructor(private router: Router, private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService
      .getPortfolioFolders()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((folders) => {
        this.portfolioFolders = folders;
      });
  }

  get filteredPortfolioFolders(): PortfolioFolder[] {
    if (this.activeFilter === 'all') {
      return this.portfolioFolders;
    }

    return this.portfolioFolders.filter((folder) => folder.discipline === this.activeFilter);
  }

  setActiveFilter(filter: 'all' | 'branding' | 'ux-ui' | 'web') {
    this.activeFilter = filter;
  }

  viewPortfolio(folderName: string) {
    const folder = this.portfolioFolders.find((entry) => entry.routeSegment === folderName);
    if (folder?.externalUrl) {
      window.open(folder.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    this.router.navigate(['/portfolio', folderName]);
  }
}