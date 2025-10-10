import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="home" class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="title-line">Creative</span>
            <span class="title-line highlight">Design</span>
            <span class="title-line">Solutions</span>
          </h1>
          <p class="hero-description">
            We craft exceptional visual experiences that tell your story. 
            From stunning graphic designs to comprehensive digital solutions, 
            we bring your vision to life with creativity and precision.
          </p>
          <div class="hero-buttons">
            <a href="#portfolio" class="btn btn-primary">View Our Work</a>
            <a href="#contact" class="btn btn-secondary">Get Started</a>
          </div>
        </div>
        <div class="hero-visual">
          <div class="floating-elements">
            <div class="element element-1"></div>
            <div class="element element-2"></div>
            <div class="element element-3"></div>
            <div class="element element-4"></div>
          </div>
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
    }

    .hero-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      width: 100%;
    }

    .hero-title {
      font-size: 4rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      color: white;
    }

    .title-line {
      display: block;
      opacity: 0;
      transform: translateY(50px);
      animation: slideUp 0.8s ease forwards;
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
      margin-bottom: 2rem;
      opacity: 0;
      animation: fadeIn 0.8s ease 0.6s forwards;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
      opacity: 0;
      animation: fadeIn 0.8s ease 0.8s forwards;
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

    .hero-visual {
      position: relative;
      height: 500px;
    }

    .floating-elements {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .element {
      position: absolute;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
    }

    .element-1 {
      width: 200px;
      height: 120px;
      top: 20%;
      left: 10%;
      animation: float 6s ease-in-out infinite;
    }

    .element-2 {
      width: 150px;
      height: 150px;
      top: 50%;
      right: 20%;
      border-radius: 50%;
      animation: float 8s ease-in-out infinite reverse;
    }

    .element-3 {
      width: 100px;
      height: 180px;
      bottom: 20%;
      left: 30%;
      animation: float 7s ease-in-out infinite;
    }

    .element-4 {
      width: 120px;
      height: 80px;
      top: 10%;
      right: 10%;
      animation: float 5s ease-in-out infinite reverse;
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

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
    }

    @media (max-width: 768px) {
      .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 2rem;
      }

      .hero-title {
        font-size: 2.5rem;
      }

      .hero-visual {
        height: 300px;
      }

      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class HeroComponent {}