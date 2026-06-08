import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="services" class="services">
      <div class="container">
        <div class="section-header">
          <h2>Our Services</h2>
          <p>Strategic design and development that builds trust, converts users, and scales your brand</p>
        </div>

        <!-- Three Equal Disciplines -->
        <div class="disciplines-grid">
          <!-- Graphic Design -->
          <div class="discipline-card">
            <div class="discipline-header graphic-design">
              <h3>Graphic Design</h3>
              <p class="discipline-tagline">Build visual authority</p>
            </div>
            <div class="discipline-content">
              <div class="trust-statement">
                <p>Your brand makes a visual first impression in seconds. We create memorable, professional graphics that position you as credible and premium.</p>
              </div>
              <div class="deliverables">
                <h4>What You Get</h4>
                <ul>
                  <li>Brand Identity Systems (logos, color, typography)</li>
                  <li>Print & Digital Marketing Materials</li>
                  <li>Packaging & Product Design</li>
                  <li>Social Media Graphics</li>
                  <li>Custom Illustrations</li>
                </ul>
              </div>
              <div class="timeline">
                <span class="badge timeline">5–15 days typical</span>
              </div>
            </div>
          </div>

          <!-- UX/UI Design -->
          <div class="discipline-card">
            <div class="discipline-header ux-design">
              <h3>UX/UI Design</h3>
              <p class="discipline-tagline">Design for conversion</p>
            </div>
            <div class="discipline-content">
              <div class="trust-statement">
                <p>Great design isn't beautiful—it's intuitive. We design interfaces that guide users toward action while solving real problems in their journey.</p>
              </div>
              <div class="deliverables">
                <h4>What You Get</h4>
                <ul>
                  <li>User Research & Competitive Analysis</li>
                  <li>Wireframes & User Flows</li>
                  <li>Interface Design Systems</li>
                  <li>Mobile-First Responsive Layouts</li>
                  <li>Interaction Prototypes</li>
                </ul>
              </div>
              <div class="timeline">
                <span class="badge timeline">10–20 days typical</span>
              </div>
            </div>
          </div>

          <!-- Web Development -->
          <div class="discipline-card">
            <div class="discipline-header web-dev">
              <h3>Web Development</h3>
              <p class="discipline-tagline">Code that performs</p>
            </div>
            <div class="discipline-content">
              <div class="trust-statement">
                <p>A beautiful design means nothing without performance. We build fast, secure, SEO-friendly websites that turn visitors into customers.</p>
              </div>
              <div class="deliverables">
                <h4>What You Get</h4>
                <ul>
                  <li>Responsive Web Applications</li>
                  <li>E-commerce Integration</li>
                  <li>Database Architecture</li>
                  <li>SEO Optimization</li>
                  <li>Performance & Security</li>
                </ul>
              </div>
              <div class="timeline">
                <span class="badge timeline">15–45 days typical</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Integration Section -->
        <div class="integration-section">
          <h3>The Unanimous Advantage</h3>
          <p class="integration-intro">Most agencies choose one thing. We own all three—graphic design, UX/UI, and web development. That means:</p>
          <div class="advantages-grid">
            <div class="advantage-item">
              <div class="advantage-icon">✓</div>
              <h4>Seamless Handoff</h4>
              <p>Your design doesn't get lost in translation. Same team, same vision, same brand standards from concept to launch.</p>
            </div>
            <div class="advantage-item">
              <div class="advantage-icon">✓</div>
              <h4>Faster Timeline</h4>
              <p>No waiting for external designers or developers. We iterate together and ship 40% faster than traditional agency models.</p>
            </div>
            <div class="advantage-item">
              <div class="advantage-icon">✓</div>
              <h4>Brand + Experience + Performance</h4>
              <p>Visual consistency, user-centered design, and technical excellence all align. Your brand works as hard as your code.</p>
            </div>
            <div class="advantage-item">
              <div class="advantage-icon">✓</div>
              <h4>24-Hour Response Guarantee</h4>
              <p>Questions, revisions, or pivots? You get answers fast. No communication gaps, no delays.</p>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="cta-section">
          <h3>Ready to build something that converts?</h3>
          <p>Let's discuss your project—brand, design, and development all working together.</p>
          <div class="cta-buttons">
            <a href="https://wa.me/265998997400?text=Hi%20Unanimous%20Labs!%20I'd%20like%20to%20discuss%20a%20project." class="btn btn-primary" target="_blank">Start on WhatsApp</a>
            <a href="#contact" class="btn btn-secondary">Get a Proposal</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .services {
      padding: 6rem 0;
      background: white;
      scroll-margin-top: 80px;
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
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.6;
    }

    /* Three Equal Disciplines Grid */
    .disciplines-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-bottom: 5rem;
    }

    .discipline-card {
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .discipline-card:hover {
      border-color: #fd6a0a;
      box-shadow: 0 10px 30px rgba(253, 106, 10, 0.1);
    }

    .discipline-header {
      padding: 2rem;
      color: white;
      text-align: center;
    }

    .discipline-header.graphic-design {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .discipline-header.ux-design {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }

    .discipline-header.web-dev {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }

    .discipline-header h3 {
      font-size: 1.8rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .discipline-tagline {
      font-size: 0.95rem;
      opacity: 0.9;
      font-weight: 500;
    }

    .discipline-content {
      padding: 2rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .trust-statement {
      background: #f9fafb;
      padding: 1.5rem;
      border-radius: 10px;
      border-left: 4px solid #fd6a0a;
    }

    .trust-statement p {
      font-size: 1rem;
      line-height: 1.6;
      color: #374151;
    }

    .deliverables {
      flex: 1;
    }

    .deliverables h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 1rem;
    }

    .deliverables ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .deliverables li {
      padding: 0.5rem 0;
      padding-left: 1.5rem;
      position: relative;
      color: #555;
      font-size: 0.95rem;
      line-height: 1.5;
    }

    .deliverables li::before {
      content: "✓";
      position: absolute;
      left: 0;
      font-weight: 600;
      color: #fd6a0a;
      font-size: 1.1rem;
    }

    .timeline {
      margin-top: auto;
    }

    .badge {
      display: inline-block;
      padding: 0.6rem 1.2rem;
      border-radius: 50px;
      font-size: 0.85rem;
      font-weight: 600;
    }

    .badge.timeline {
      background: #fef3e2;
      color: #b45309;
    }

    /* Integration Section */
    .integration-section {
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      color: white;
      padding: 4rem;
      border-radius: 20px;
      margin-bottom: 4rem;
    }

    .integration-section h3 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      text-align: center;
    }

    .integration-intro {
      text-align: center;
      font-size: 1.1rem;
      opacity: 0.9;
      margin-bottom: 3rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .advantages-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    .advantage-item {
      background: rgba(255, 255, 255, 0.08);
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .advantage-icon {
      font-size: 2rem;
      font-weight: 700;
      color: #fd6a0a;
      margin-bottom: 0.8rem;
    }

    .advantage-item h4 {
      font-size: 1.3rem;
      margin-bottom: 0.8rem;
      font-weight: 600;
    }

    .advantage-item p {
      font-size: 0.95rem;
      opacity: 0.85;
      line-height: 1.6;
    }

    /* CTA Section */
    .cta-section {
      text-align: center;
      padding: 4rem;
      background: linear-gradient(135deg, #fd6a0a 0%, #fbb51d 100%);
      border-radius: 20px;
      color: white;
    }

    .cta-section h3 {
      font-size: 2.2rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .cta-section p {
      font-size: 1.1rem;
      margin-bottom: 2rem;
      opacity: 0.95;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      padding: 1rem 2.5rem;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      display: inline-block;
      border: none;
      cursor: pointer;
      font-size: 1rem;
    }

    .btn-primary {
      background: white;
      color: #fd6a0a;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
    }

    .btn-secondary {
      background: transparent;
      color: white;
      border: 2px solid white;
    }

    .btn-secondary:hover {
      background: white;
      color: #fd6a0a;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .services {
        padding: 4rem 0 3rem;
      }

      .container {
        padding: 0 1.5rem;
      }

      .section-header h2 {
        font-size: 2rem;
      }

      .section-header p {
        font-size: 1rem;
      }

      .disciplines-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        margin-bottom: 3rem;
      }

      .discipline-header h3 {
        font-size: 1.5rem;
      }

      .integration-section {
        padding: 3rem 2rem;
      }

      .integration-section h3 {
        font-size: 2rem;
      }

      .advantages-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .cta-section {
        padding: 3rem 2rem;
      }

      .cta-section h3 {
        font-size: 1.8rem;
      }

      .cta-buttons {
        flex-direction: column;
        gap: 0.8rem;
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

      .section-header p {
        font-size: 0.95rem;
      }

      .discipline-header h3 {
        font-size: 1.25rem;
      }

      .discipline-content {
        padding: 1.5rem;
      }

      .integration-section {
        padding: 2rem 1rem;
      }

      .cta-section {
        padding: 2rem 1rem;
      }

      .cta-section h3 {
        font-size: 1.4rem;
      }

      .btn {
        padding: 0.8rem 2rem;
        font-size: 0.9rem;
      }
    }
  `]
})
export class ServicesComponent {
  constructor(private router: Router) {}

  // Navigation to portfolio gallery (if needed for future integration)
  goToGallery(folder: string) {
    this.router.navigate([`/portfolio/${folder}`]);
  }
}