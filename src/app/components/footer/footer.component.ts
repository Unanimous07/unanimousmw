import { Component, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
  <!-- Animation removed as requested -->
      <div class="footer-content">
        <p>&copy; 2025 Unanimous. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      position: relative;
      background: #222;
      color: #fff;
      padding: 2rem 0 0 0;
      text-align: center;
      overflow: hidden;
    }
    .footer-canvas {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100px;
      pointer-events: none;
      z-index: 0;
      display: block;
    }
    .footer-content {
      position: relative;
      z-index: 1;
      padding-bottom: 1rem;
    }
  `]
})
export class FooterComponent implements AfterViewInit {
  // Animation removed as requested
  ngAfterViewInit(): void {}
}
