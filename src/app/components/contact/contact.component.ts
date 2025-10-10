import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="contact">
      <div class="container">
        <div class="section-header">
          <h2>Let's Create Something Amazing</h2>
          <p>Ready to bring your vision to life? Get in touch with us today</p>
        </div>

        <div class="contact-content">
          <div class="contact-info">
            <h3>Get In Touch</h3>
            <div class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/></svg>
              </div>
              <div>
                <h4>Email</h4>
                <p>hello@unanimw.com</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/></svg>
              </div>
              <div>
                <h4>Phone</h4>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/></svg>
              </div>
              <div>
                <h4>Location</h4>
                <p>Creative District, Design City</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/></svg>
              </div>
              <div>
                <h4>Business Hours</h4>
                <p>Mon - Fri: 9AM - 6PM</p>
              </div>
            </div>
          </div>

          <div class="contact-form-container">
            <form class="contact-form" (ngSubmit)="onSubmit()" #contactForm="ngForm">
              <div class="form-group">
                <label for="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  [(ngModel)]="formData.name" 
                  required
                  class="form-control">
              </div>
              
              <div class="form-group">
                <label for="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  [(ngModel)]="formData.email" 
                  required
                  class="form-control">
              </div>
              
              <div class="form-group">
                <label for="service">Service Interested In</label>
                <select 
                  id="service" 
                  name="service" 
                  [(ngModel)]="formData.service" 
                  required
                  class="form-control">
                  <option value="">Select a service</option>
                  <option value="branding">Brand Identity Design</option>
                  <option value="print">Print Design</option>
                  <option value="digital">Digital Graphics</option>
                  <option value="packaging">Packaging Design</option>
                  <option value="web">Website Development</option>
                  <option value="mobile">Mobile App Development</option>
                  <option value="database">Database Solutions</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="budget">Project Budget</label>
                <select 
                  id="budget" 
                  name="budget" 
                  [(ngModel)]="formData.budget" 
                  class="form-control">
                  <option value="">Select budget range</option>
                  <option value="under-1k">Under $1,000</option>
                  <option value="1k-5k">$1,000 - $5,000</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-plus">$10,000+</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="message">Project Details</label>
                <textarea 
                  id="message" 
                  name="message" 
                  [(ngModel)]="formData.message" 
                  required
                  rows="5"
                  class="form-control"
                  placeholder="Tell us about your project..."></textarea>
              </div>
              
              <button type="submit" class="btn btn-primary" [disabled]="!contactForm.form.valid">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact {
      padding: 6rem 0;
      background: linear-gradient(135deg, #fd6a0a 0%, #fbb51d 100%);
      color: white;
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
      margin-bottom: 1rem;
    }

    .section-header p {
      font-size: 1.2rem;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
    }

    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: start;
    }

    .contact-info h3 {
      font-size: 2rem;
      margin-bottom: 2rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      backdrop-filter: blur(10px);
    }

    .contact-icon {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 10px;
    }

    .contact-icon svg {
      width: 1.5rem;
      height: 1.5rem;
    }

    .contact-item h4 {
      font-size: 1.1rem;
      margin-bottom: 0.25rem;
    }

    .contact-item p {
      margin: 0;
      opacity: 0.9;
    }

    .contact-form-container {
      background: rgba(255, 255, 255, 0.1);
      padding: 2rem;
      border-radius: 20px;
      backdrop-filter: blur(10px);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .form-control {
      width: 100%;
      padding: 0.8rem;
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }

    .form-control::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }

    .form-control:focus {
      outline: none;
      border-color: rgba(255, 255, 255, 0.5);
    }

    .form-control option {
      background: #333;
      color: white;
    }

    .btn {
      padding: 1rem 2rem;
      border: none;
      border-radius: 50px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 100%;
    }

    .btn-primary {
      background: white;
      color: #fd6a0a;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .section-header h2 {
        font-size: 2rem;
      }
    }
  `]
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    service: '',
    budget: '',
    message: ''
  };

  onSubmit() {
    console.log('Form submitted:', this.formData);
    // Here you would typically send the data to your backend
    alert('Thank you for your message! We\'ll get back to you soon.');
    
    // Reset form
    this.formData = {
      name: '',
      email: '',
      service: '',
      budget: '',
      message: ''
    };
  }
}