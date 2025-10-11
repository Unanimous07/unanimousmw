import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="about">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2>About Unanimous</h2>
            <p class="lead">
              We are a creative studio passionate about bringing ideas to life through 
              exceptional design and innovative solutions.
            </p>
            <p>
              Founded on the principle that great design should be accessible to everyone, 
              Unanimous combines artistic vision with technical expertise to deliver 
              outstanding results for our clients.
            </p>
            <p>
              Our team specializes in graphic design, with additional capabilities in 
              web development, mobile applications, and database solutions. We believe 
              in the power of visual storytelling and its ability to transform businesses.
            </p>
            
            <div class="stats">
              <div class="stat-item">
                <h3>250</h3>
                <p>Projects Completed</p>
              </div>
              <div class="stat-item">
                <h3>150</h3>
                <p>Happy Clients</p>
              </div>
              <div class="stat-item">
                <h3>7+</h3>
                <p>Years Experience</p>
              </div>
            </div>
          </div>
          
          <div class="about-visual">
            <div class="team-grid">
              <div class="team-member">
                <div class="member-avatar">
                  <img src="/assets/CEO photo/Layer 6.png" alt="Creative Director" style="width:64px;height:64px;border-radius:50%;object-fit:cover;box-shadow:0 2px 8px rgba(0,0,0,0.12);" />
                </div>
                <h4>Creative Director</h4>
                <p>Leading design strategy and creative vision</p>
              </div>
              <div class="team-member">
                <div class="member-avatar">
                  <div class="avatar-placeholder">👩‍💻</div>
                </div>
                <h4>Technical Lead</h4>
                <p>Bringing designs to life with code</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="values-section">
          <h3>Our Values</h3>
          <div class="values-grid">
            <div class="value-item">
              <div class="value-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/></svg>
              </div>
              <h4>Precision</h4>
              <p>Every pixel matters. We pay attention to the smallest details to ensure perfection.</p>
            </div>
            <div class="value-item">
              <div class="value-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10Z"/></svg>
              </div>
              <h4>Innovation</h4>
              <p>We stay ahead of design trends and embrace new technologies to deliver cutting-edge solutions.</p>
            </div>
            <div class="value-item">
              <div class="value-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16,4C18.21,4 20,5.79 20,8C20,10.21 18.21,12 16,12C13.79,12 12,10.21 12,8C12,5.79 13.79,4 16,4M16,14C20.42,14 24,15.79 24,18V20H8V18C8,15.79 11.58,14 16,14M8,4C10.21,4 12,5.79 12,8C12,10.21 10.21,12 8,12C5.79,12 4,10.21 4,8C4,5.79 5.79,4 8,4M8,14C12.42,14 16,15.79 16,18V20H0V18C0,15.79 3.58,14 8,14Z"/></svg>
              </div>
              <h4>Collaboration</h4>
              <p>We work closely with our clients to understand their vision and bring it to life.</p>
            </div>
            <div class="value-item">
              <div class="value-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z"/></svg>
              </div>
              <h4>Efficiency</h4>
              <p>Fast turnaround times without compromising on quality or creativity.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about {
      padding: 6rem 0;
      background: #f8fafc;
      scroll-margin-top: 80px; /* Offset for fixed header */
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .about-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      margin-bottom: 4rem;
    }

    .about-text h2 {
      font-size: 3rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 1.5rem;
    }

    .lead {
      font-size: 1.3rem;
      font-weight: 500;
      color: #4a5568;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }

    .about-text p {
      font-size: 1.1rem;
      line-height: 1.7;
      color: #666;
      margin-bottom: 1.5rem;
    }

    .stats {
      display: flex;
      gap: 2rem;
      margin-top: 2rem;
    }

    .stat-item {
      text-align: center;
    }

    .stat-item h3 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #fd6a0a;
      margin-bottom: 0.5rem;
    }

    .stat-item p {
      font-size: 0.9rem;
      color: #666;
      margin: 0;
    }

    .about-visual {
      display: flex;
      justify-content: center;
    }

    .team-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    .team-member {
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: 20px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }

    .team-member:hover {
      transform: translateY(-5px);
    }

    .member-avatar {
      width: 80px;
      height: 80px;
      margin: 0 auto 1rem;
      border-radius: 50%;
      background: linear-gradient(135deg, #fbb51d 0%, #fd6a0a 100%);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .avatar-placeholder {
      font-size: 2rem;
    }

    .team-member h4 {
      font-size: 1.2rem;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 0.5rem;
    }

    .team-member p {
      font-size: 0.9rem;
      color: #666;
      margin: 0;
    }

    .values-section {
      text-align: center;
    }

    .values-section h3 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 3rem;
    }

    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .value-item {
      padding: 2rem;
      background: white;
      border-radius: 15px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }

    .value-item:hover {
      transform: translateY(-5px);
    }

    .value-icon {
      font-size: 1.2rem;
    }

    .value-icon svg {
      width: 48px;
      height: 48px;
      display: block;
      margin: 0 auto;
      margin-bottom: 1rem;
    }

    .value-item h4 {
      font-size: 1.3rem;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 1rem;
    }

    .value-item p {
      color: #666;
      line-height: 1.6;
      margin: 0;
    }

    @media (max-width: 768px) {
      .about {
        padding: 4rem 0 3rem;
      }

      .container {
        padding: 0 1.5rem;
      }

      .about-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        margin-bottom: 3rem;
      }

      .about-text h2 {
        font-size: 2rem;
      }

      .about-text p {
        font-size: 1rem;
      }

      .stats {
        justify-content: center;
        flex-wrap: wrap;
      }

      .stat-item {
        min-width: 120px;
      }

      .team-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .values-section {
        padding: 3rem 1.5rem;
      }

      .values-section h3 {
        font-size: 2rem;
      }

      .values-grid {
        gap: 2rem;
      }
    }

    @media (max-width: 480px) {
      .about {
        padding: 3rem 0 2rem;
      }

      .container {
        padding: 0 1rem;
      }

      .about-text h2 {
        font-size: 1.75rem;
      }

      .values-section {
        padding: 2rem 1rem;
      }

      .values-section h3 {
        font-size: 1.75rem;
      }

      .stat-item h3 {
        font-size: 2rem;
      }
    }
  `]
})
export class AboutComponent {}