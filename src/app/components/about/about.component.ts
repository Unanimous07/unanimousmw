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
            <h2>About Unanimous MW</h2>
            <p class="lead">
              We are a Malawi-based creative and digital studio helping brands move from ideas to measurable results.
            </p>
            <p>
              We combine strategy, design craft, and technical execution to build experiences that look strong and perform in the real world.
            </p>
            <p>
              From brand systems and UX/UI interfaces to responsive websites, our process is built around audience needs, business goals, and long-term consistency.
            </p>
            
            <div class="stats">
              <div class="stat-item">
                <h3>250+</h3>
                <p>Projects Completed</p>
              </div>
              <div class="stat-item">
                <h3>150+</h3>
                <p>Happy Clients</p>
              </div>
              <div class="stat-item">
                <h3>7+</h3>
                <p>Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="team-section">
        <div class="container">
          <div class="team-header">
            <h2>The Team Behind The Work</h2>
            <p>Cross-functional specialists shaping brand systems, UX flows, and launch-ready digital experiences.</p>
            <div class="credibility-strip">
              <span class="credibility-item">7 Specialists</span>
              <span class="credibility-item">Design + UX + Web</span>
              <span class="credibility-item">Client-First Delivery</span>
            </div>
          </div>

          <div class="team-grid">
            <div class="team-member" *ngFor="let member of teamMembers">
              <div class="member-card">
                <div class="member-image-wrapper">
                  <img [src]="member.image" [alt]="member.name" class="member-image" loading="lazy" />
                </div>
                <div class="member-info">
                  <h4>{{ member.name }}</h4>
                  <p class="member-role">{{ member.role }}</p>
                  <p class="member-summary">{{ member.summary }}</p>
                  <div class="ownership-row">
                    <span class="ownership-label">Owns</span>
                    <span class="ownership-value">{{ member.ownership }}</span>
                  </div>
                  <div class="skill-tags">
                    <span class="skill-tag" *ngFor="let skill of member.specialties">{{ skill }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
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
      grid-template-columns: 1fr;
      gap: 0;
      align-items: center;
      margin-bottom: 0;
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
      display: none;
    }

    .team-section {
      padding: 5rem 0;
      background: linear-gradient(to right, #ffffff 0%, #f8fafc 100%);
      border-top: 1px solid #e8ecf1;
      border-bottom: 1px solid #e8ecf1;
    }

    .team-header {
      text-align: center;
      margin-bottom: 4rem;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }

    .team-header h2 {
      font-size: 2.8rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 1rem;
      line-height: 1.2;
    }

    .team-header p {
      font-size: 1.1rem;
      color: #5f6368;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }

    .credibility-strip {
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      gap: 0.45rem;
      justify-content: center;
    }

    .credibility-item {
      display: inline-flex;
      align-items: center;
      padding: 0.25rem 0.65rem;
      border-radius: 999px;
      font-size: 0.7rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      font-weight: 700;
      color: #7a3000;
      background: #fff1e4;
      border: 1px solid #ffd3b2;
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2.5rem;
      padding: 0 2rem;
    }

    .team-member {
      text-align: center;
    }

    .member-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .team-member:hover .member-card {
      transform: translateY(-12px);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    }

    .member-image-wrapper {
      position: relative;
      width: 100%;
      padding-top: 100%;
      overflow: hidden;
      background: linear-gradient(135deg, #fbb51d 0%, #fd6a0a 100%);
    }

    .member-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.35s ease;
    }

    .team-member:hover .member-image {
      transform: scale(1.05);
    }

    .member-info {
      padding: 1.8rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      text-align: center;
    }

    .team-member h4 {
      font-size: 1.2rem;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0 0 0.4rem;
    }

    .member-role {
      font-size: 0.95rem;
      color: #fd6a0a;
      margin: 0 0 0.7rem;
      font-weight: 600;
      letter-spacing: 0.03em;
    }

    .member-summary {
      margin: 0 0 1rem;
      font-size: 0.9rem;
      line-height: 1.5;
      color: #5f6368;
      flex: 1;
    }

    .ownership-row {
      display: flex;
      gap: 0.35rem;
      align-items: center;
      margin-bottom: 0.8rem;
      justify-content: center;
    }

    .ownership-label {
      font-size: 0.68rem;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: #8e939b;
      font-weight: 700;
    }

    .ownership-value {
      font-size: 0.82rem;
      font-weight: 700;
      color: #1f2937;
      background: #f5f7fa;
      border: 1px solid #e3e7ee;
      border-radius: 999px;
      padding: 0.25rem 0.65rem;
    }

    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      justify-content: center;
    }

    .skill-tag {
      display: inline-flex;
      align-items: center;
      padding: 0.2rem 0.55rem;
      border-radius: 999px;
      font-size: 0.74rem;
      font-weight: 600;
      letter-spacing: 0.2px;
      color: #8a3c00;
      background: #fff3e8;
      border: 1px solid #ffd4b4;
    }

    .showcase-head {
      display: none;
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
        padding: 3rem 0 0;
      }

      .container {
        padding: 0 1.5rem;
      }

      .about-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        margin-bottom: 2rem;
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

      .team-section {
        padding: 3.5rem 0;
      }

      .team-header h2 {
        font-size: 2rem;
      }

      .team-header p {
        font-size: 1rem;
      }

      .team-header {
        margin-bottom: 2.5rem;
      }

      .team-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
        padding: 0 1.5rem;
      }

      .member-info {
        padding: 1.5rem;
      }

      .team-member h4 {
        font-size: 1.1rem;
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
        padding: 2rem 0 0;
      }

      .container {
        padding: 0 1rem;
      }

      .about-text h2 {
        font-size: 1.75rem;
      }

      .team-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        padding: 0 1rem;
      }

      .team-header h2 {
        font-size: 1.75rem;
      }

      .team-section {
        padding: 3rem 0;
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
export class AboutComponent {
  readonly teamMembers = [
    {
      name: 'Laureen Mbewe',
      role: 'Brand & Aesthetic Advisor',
      image: '/assets/team/Laureen Mbewe.jpeg',
      summary: 'Coordinates project communication and delivery logistics so teams and clients stay aligned from kickoff to handover.',
      ownership: 'Client Coordination',
      specialties: ['Client Communication', 'Project Coordination', 'Operations Support']
    },
    {
      name: 'Lekani Juwa',
      role: 'Social Media Strategist & Community Lead',
      image: '/assets/team/Lekani Juwa.jpg',
      summary: 'Builds community engagement and social presence through strategic content planning and authentic brand storytelling.',
      ownership: 'Social Strategy & Community',
      specialties: ['Social Media Strategy', 'Community Management', 'Content Planning']
    },
    {
      name: 'Kelvin Mulera',
      role: 'Creative Director',
      image: '/assets/team/Kelvin Mulera.JPG',
      summary: 'Guides strategy, concept direction, and final creative quality across client engagements.',
      ownership: 'Creative Direction',
      specialties: ['Branding', 'Art Direction', 'Visual Strategy']
    },
    {
      name: 'Alexander Chirwa',
      role: 'Graphic Review',
      image: '/assets/team/Alexander Chirwa.jpg',
      summary: 'Leads design quality checks and keeps outputs production-ready for print and digital.',
      ownership: 'Design Quality Assurance',
      specialties: ['Graphic Design', 'Layout Systems', 'Print Quality']
    },
    {
      name: 'Prince Nsoma',
      role: 'Motion Designer & Video Specialist',
      image: '/assets/team/Prince Msoma.jpg',
      summary: 'Builds motion-led storytelling assets for campaigns, product launches, and social channels.',
      ownership: 'Motion & Video Production',
      specialties: ['Motion Design', 'Social Video', 'Visual Effects']
    },
    {
      name: 'William Juene',
      role: 'Content and Graphic Designer',
      image: '/assets/team/William Chimkhwamba.jpg',
      summary: 'Transforms briefs into clear messaging and visual systems users can scan and trust quickly.',
      ownership: 'Content Design Systems',
      specialties: ['UI Content', 'Campaign Graphics', 'User Messaging']
    },
    {
      name: 'Edward Fectory',
      role: 'Brand Integrity & Junior Designer',
      image: '/assets/team/Edward Fectory.jpg',
      summary: 'Supports UX/UI and asset preparation while maintaining consistency across brand touchpoints.',
      ownership: 'Brand Integrity Support',
      specialties: ['UX/UI Support', 'Web Asset Prep', 'Brand Consistency']
    }
  ];
}