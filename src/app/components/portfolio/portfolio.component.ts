import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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

        <div class="filter-tabs">
          <button 
            *ngFor="let category of categories" 
            class="filter-btn"
            [class.active]="activeCategory === category"
            (click)="filterPortfolio(category)">
            {{ category }}
          </button>
        </div>

        <div class="portfolio-grid">
          <div 
            *ngFor="let item of filteredPortfolio" 
            class="portfolio-item"
            [attr.data-category]="item.category">
            <div class="portfolio-image">
              <div class="placeholder-image" [style.background]="item.color">
                <span class="placeholder-text">{{ item.title }}</span>
              </div>
              <div class="portfolio-overlay">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
                <span class="category-tag">{{ item.category }}</span>
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

    .filter-tabs {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 0.8rem 1.5rem;
      border: 2px solid #e2e8f0;
      background: white;
      color: #64748b;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .filter-btn:hover,
    .filter-btn.active {
      background: #fd6a0a;
      color: white;
      border-color: #fd6a0a;
      transform: translateY(-2px);
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
    }

    .portfolio-item:hover {
      transform: translateY(-10px);
    }

    .portfolio-image {
      position: relative;
      height: 250px;
      overflow: hidden;
    }

    .placeholder-image {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-size: 1.2rem;
      font-weight: 600;
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
export class PortfolioComponent {
  categories = ['All', 'Branding', 'Print Design', 'Digital', 'Packaging'];
  activeCategory = 'All';

  portfolioItems = [
    {
      title: 'Modern Brand Identity',
      description: 'Complete branding package for tech startup',
      category: 'Branding',
      color: 'linear-gradient(135deg, #fbb51d 0%, #fd6a0a 100%)'
    },
    {
      title: 'Annual Report Design',
      description: 'Corporate annual report with infographics',
      category: 'Print Design',
      color: 'linear-gradient(135deg, #fbb51d 0%, #fd6a0a 100%)'
    },
    {
      title: 'E-commerce Website',
      description: 'Modern e-commerce platform design',
      category: 'Digital',
      color: 'linear-gradient(135deg, #fd6a0a 0%, #fbb51d 100%)'
    },
    {
      title: 'Product Packaging',
      description: 'Sustainable packaging design for organic products',
      category: 'Packaging',
      color: 'linear-gradient(135deg, #fbb51d 0%, #fd6a0a 100%)'
    },
    {
      title: 'Logo Collection',
      description: 'Various logo designs for different industries',
      category: 'Branding',
      color: 'linear-gradient(135deg, #fd6a0a 0%, #fbb51d 100%)'
    },
    {
      title: 'Magazine Layout',
      description: 'Editorial design for lifestyle magazine',
      category: 'Print Design',
      color: 'linear-gradient(135deg, #fbb51d 0%, #fd6a0a 100%)'
    }
  ];

  filteredPortfolio = this.portfolioItems;

  filterPortfolio(category: string) {
    this.activeCategory = category;
    if (category === 'All') {
      this.filteredPortfolio = this.portfolioItems;
    } else {
      this.filteredPortfolio = this.portfolioItems.filter(item => item.category === category);
    }
  }
}