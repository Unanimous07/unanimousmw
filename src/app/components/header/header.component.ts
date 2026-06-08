import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="header">
      <div class="container">
        <div class="logo">
          <a [routerLink]="['/']" fragment="home" (click)="closeMenu()">
            <img src="/assets/our%20logo/black.png" alt="Unanimous Logo" class="logo-img" width="40" height="40" loading="eager" fetchpriority="high" decoding="async">
            <span class="logo-text">UnanimousMW</span>
          </a>
        </div>
        <nav class="nav" [class.nav-open]="isMenuOpen">
          <a [routerLink]="['/']" fragment="home" class="nav-link" (click)="closeMenu()">Home</a>
          <a [routerLink]="['/']" fragment="portfolio" class="nav-link" (click)="closeMenu()">Portfolio</a>
          <a [routerLink]="['/']" fragment="services" class="nav-link" (click)="closeMenu()">Services</a>
          <a [routerLink]="['/']" fragment="about" class="nav-link" (click)="closeMenu()">About</a>
          <a [routerLink]="['/']" fragment="contact" class="nav-link" (click)="closeMenu()">Contact</a>
        </nav>
        <button class="menu-toggle" (click)="toggleMenu()" [attr.aria-expanded]="isMenuOpen" aria-label="Toggle navigation menu" type="button">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      z-index: 1000;
      padding: 1rem 0;
      transition: all 0.3s ease;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo-img {
      height: 40px;
      width: auto;
      object-fit: contain;
      transform: rotate(20deg);
      transform-origin: center;
    }

    .logo a {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: #111;
    }

    .logo-text {
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .nav {
      display: flex;
      gap: 2rem;
    }

    .nav-link {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      transition: color 0.3s ease;
      position: relative;
    }

    .nav-link:hover {
      color: #fd6a0a;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: #fbb51d;
      transition: width 0.3s ease;
    }

    .nav-link:hover::after {
      width: 100%;
    }

    .menu-toggle {
      display: none;
      flex-direction: column;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
    }

    .menu-toggle span {
      width: 25px;
      height: 3px;
      background: #333;
      margin: 3px 0;
      transition: 0.3s;
    }

    @media (max-width: 768px) {
      .nav {
        position: fixed;
        top: calc(100% + 0.5rem);
        left: 1rem;
        right: 1rem;
        background: white;
        flex-direction: column;
        padding: 1rem 1.25rem 1.25rem;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        border-radius: 18px;
        border: 1px solid #ececec;
        max-height: calc(100vh - 6rem);
        overflow-y: auto;
        transform: translateY(-0.75rem) scale(0.98);
        transform-origin: top center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }

      .nav-open {
        transform: translateY(0) scale(1);
        opacity: 1;
        visibility: visible;
      }

      .menu-toggle {
        display: flex;
      }

      .logo-text {
        font-size: 0.85rem;
      }

      .container {
        padding: 0 1rem;
      }

      .menu-toggle {
        position: relative;
        z-index: 1001;
      }
    }
  `]
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}