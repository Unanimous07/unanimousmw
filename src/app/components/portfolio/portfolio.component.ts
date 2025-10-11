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
          <h2>Our Creative Portfolio</h2>
          <p>Showcasing our finest graphic design work and creative solutions</p>
        </div>

        <div class="portfolio-grid">
          <div 
            *ngFor="let folder of portfolioFolders" 
            class="portfolio-item"
            (click)="viewPortfolio(folder.name)">
            <div class="portfolio-image">
              <img [src]="folder.thumbnail" [alt]="folder.name" class="portfolio-img" loading="lazy">
              <div class="portfolio-overlay">
                <h3>{{ folder.name }}</h3>
                <p>{{ folder.description }}</p>
                <span class="category-tag">{{ folder.itemCount }} items</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .portfolio {
      padding: 6rem 0;
      background: #f8fafc;
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

    .portfolio-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .portfolio-item {
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 5px 20px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
      background: white;
      cursor: pointer;
    }

    .portfolio-item:hover {
      transform: translateY(-10px);
    }

    .portfolio-image {
      position: relative;
      height: 250px;
      overflow: hidden;
    }

    .portfolio-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .portfolio-item:hover .portfolio-img {
      transform: scale(1.05);
    }

    .portfolio-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0,0,0,0.8));
      color: white;
      padding: 2rem;
      transform: translateY(100%);
      transition: transform 0.3s ease;
    }

    .portfolio-item:hover .portfolio-overlay {
      transform: translateY(0);
    }

    .portfolio-overlay h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .portfolio-overlay p {
      margin-bottom: 1rem;
      opacity: 0.9;
    }

    .category-tag {
      background: rgba(255,255,255,0.2);
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.8rem;
      backdrop-filter: blur(10px);
    }

    @media (max-width: 768px) {
      .portfolio-grid {
        grid-template-columns: 1fr;
      }
      
      .section-header h2 {
        font-size: 2rem;
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