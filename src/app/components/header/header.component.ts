import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="logo">
          <img src="black.png" alt="Unanimous Logo" class="logo-img">
        </div>
        <nav class="nav" [class.nav-open]="isMenuOpen">
          <a href="#home" class="nav-link">Home</a>
          <a href="#portfolio" class="nav-link">Portfolio</a>
          <a href="#services" class="nav-link">Services</a>
          <a href="#about" class="nav-link">About</a>
          <a href="#contact" class="nav-link">Contact</a>
        </nav>
        <button class="menu-toggle" (click)="toggleMenu()">
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
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 2rem;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }

      .nav-open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      .menu-toggle {
        display: flex;
      }
    }
  `]
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}