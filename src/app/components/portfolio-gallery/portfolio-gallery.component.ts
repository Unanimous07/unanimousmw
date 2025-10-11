import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioService, GalleryItem } from '../../services/portfolio.service';

@Component({
  selector: 'app-portfolio-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gallery-container">
      <div class="gallery-header">
        <button class="back-btn" (click)="goBack()">← Back to Portfolio</button>
        <h1>{{ categoryTitle }}</h1>
        <div class="breadcrumbs">
          <span *ngFor="let crumb of breadcrumbs; let i = index">
            {{ crumb }}
            <span *ngIf="i < breadcrumbs.length - 1"> / </span>
          </span>
        </div>
      </div>

      <div class="gallery-grid">
        <div 
          *ngFor="let item of galleryItems" 
          class="gallery-item"
          [class.folder-item]="item.isFolder"
          (click)="openItem(item)">
          <img [src]="item.isFolder ? item.thumbnail : item.path" [alt]="item.name" class="gallery-img" loading="lazy">
          <div class="gallery-overlay">
            <h3>{{ item.name }}</h3>
            <span *ngIf="item.isFolder" class="folder-badge">📁 Folder</span>
          </div>
        </div>
      </div>

      <div *ngIf="selectedItem" class="lightbox" (click)="closeLightbox()">
        <div class="lightbox-content" (click)="$event.stopPropagation()">
          <button class="close-btn" (click)="closeLightbox()">×</button>
          <img [src]="selectedItem.path" [alt]="selectedItem.name" class="lightbox-img">
          <div class="lightbox-info">
            <h2>{{ selectedItem.name }}</h2>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .gallery-container {
      min-height: 100vh;
      padding: 6rem 2rem 2rem;
      background: #f8fafc;
    }

    .gallery-header {
      max-width: 1200px;
      margin: 0 auto 3rem;
      text-align: center;
    }

    .back-btn {
      background: #fd6a0a;
      color: white;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 25px;
      cursor: pointer;
      margin-bottom: 2rem;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .back-btn:hover {
      background: #fbb51d;
      transform: translateY(-2px);
    }

    .gallery-header h1 {
      font-size: 3rem;
      color: #1a1a1a;
      margin-bottom: 1rem;
    }

    .breadcrumbs {
      font-size: 1rem;
      color: #666;
      margin-top: 0.5rem;
    }

    .gallery-grid {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .gallery-item {
      position: relative;
      border-radius: 15px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.3s ease;
      box-shadow: 0 5px 20px rgba(0,0,0,0.1);
      background: white;
    }

    .folder-item {
      border: 3px solid #fbb51d;
    }

    .gallery-item:hover {
      transform: translateY(-5px);
    }

    .gallery-img {
      width: 100%;
      height: 250px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .gallery-item:hover .gallery-img {
      transform: scale(1.05);
    }

    .gallery-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0,0,0,0.8));
      color: white;
      padding: 1.5rem;
      transform: translateY(100%);
      transition: transform 0.3s ease;
    }

    .gallery-item:hover .gallery-overlay {
      transform: translateY(0);
    }

    .gallery-overlay h3 {
      font-size: 1.2rem;
      margin: 0;
    }

    .folder-badge {
      display: inline-block;
      margin-top: 0.5rem;
      font-size: 0.9rem;
      opacity: 0.9;
    }

    .lightbox {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      padding: 2rem;
    }

    .lightbox-content {
      max-width: 90vw;
      max-height: 90vh;
      background: white;
      border-radius: 15px;
      overflow: hidden;
      position: relative;
    }

    .close-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(0,0,0,0.5);
      color: white;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      font-size: 1.5rem;
      cursor: pointer;
      z-index: 2001;
    }

    .lightbox-img {
      width: 100%;
      max-height: 70vh;
      object-fit: contain;
    }

    .lightbox-info {
      padding: 2rem;
    }

    .lightbox-info h2 {
      color: #1a1a1a;
      margin: 0;
    }

    @media (max-width: 768px) {
      .gallery-header h1 {
        font-size: 2rem;
      }
      
      .gallery-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PortfolioGalleryComponent implements OnInit {
  category: string = '';
  subfolder: string = '';
  categoryTitle: string = '';
  galleryItems: GalleryItem[] = [];
  selectedItem: GalleryItem | null = null;
  breadcrumbs: string[] = [];

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.subfolder = params['subfolder'] || '';
      this.loadGalleryData();
    });
  }

  loadGalleryData() {
    this.breadcrumbs = [this.category];
    
    if (this.subfolder) {
      this.breadcrumbs.push(this.subfolder);
      this.categoryTitle = this.subfolder;
      this.galleryItems = this.portfolioService.getSubfolderItems(this.category, this.subfolder);
    } else {
      this.categoryTitle = this.category;
      this.galleryItems = this.portfolioService.getGalleryItems(this.category);
    }
  }

  openItem(item: GalleryItem) {
    if (item.isFolder) {
      this.router.navigate(['/portfolio', this.category, item.name]);
    } else {
      this.selectedItem = item;
    }
  }

  closeLightbox() {
    this.selectedItem = null;
  }

  goBack() {
    if (this.subfolder) {
      this.router.navigate(['/portfolio', this.category]);
    } else {
      this.router.navigate(['/']);
    }
  }
}