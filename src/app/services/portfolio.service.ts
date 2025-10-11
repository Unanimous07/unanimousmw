import { Injectable } from '@angular/core';

export interface PortfolioFolder {
  name: string;
  path: string;
  thumbnail: string;
  description: string;
  itemCount: number;
}

export interface GalleryItem {
  name: string;
  path: string;
  isFolder: boolean;
  thumbnail?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  
  private portfolioStructure = {
    'Branding': {
      path: 'assets/Branding',
      description: 'Complete brand identity packages and corporate branding solutions',
      thumbnail: 'assets/Branding/IOT fixing/logo_black.png',
      subfolders: ['Biosus', 'DYD Mphangamo', 'IOT fixing', 'Parabolic', 'zathu']
    },
    'Flyers': {
      path: 'assets/Flyers',
      description: 'Event and promotional flyer designs',
      thumbnail: 'assets/Flyers/birthday.jpg',
      subfolders: []
    },
    'Posters': {
      path: 'assets/posters',
      description: 'Large format poster designs',
      thumbnail: 'assets/posters/poster music.jpg',
      subfolders: []
    },
    'Business Cards': {
      path: 'assets/business cards',
      description: 'Professional business card designs',
      thumbnail: 'assets/business cards/business card.jpg',
      subfolders: []
    },
    'T-Shirts': {
      path: 'assets/Tshirts',
      description: 'Custom t-shirt designs',
      thumbnail: 'assets/Tshirts/front.jpg',
      subfolders: []
    },
    'Caps': {
      path: 'assets/Caps',
      description: 'Custom cap designs',
      thumbnail: 'assets/Caps/cap.jpg',
      subfolders: []
    },
    'Banners': {
      path: 'assets/banners',
      description: 'Digital banners and billboards',
      thumbnail: 'assets/banners/banner2.jpg',
      subfolders: []
    },
    'Product Stickers': {
      path: 'assets/Product stickers',
      description: 'Product stickers and labels',
      thumbnail: 'assets/Product stickers/STICKER.png',
      subfolders: []
    },
    'Invitations': {
      path: 'assets/Invitations',
      description: 'Wedding and event invitations',
      thumbnail: 'assets/Invitations/Save the date 3.jpg',
      subfolders: []
    },
    'Business Profile': {
      path: 'assets/Business profile',
      description: 'Company profiles and brochures',
      thumbnail: 'assets/Business profile/busines 1.jpg',
      subfolders: []
    },
    'Social Media': {
      path: 'assets/social media cover',
      description: 'Social media graphics',
      thumbnail: 'assets/social media cover/5.jpg',
      subfolders: []
    },
    'Logos': {
      path: 'assets/Logos',
      description: 'Logo designs',
      thumbnail: 'assets/Logos/logo.png',
      subfolders: []
    }
  };

  private imageFiles = {
    'Branding/Biosus': ['business card.jpg', 'new poster.jpg', 'tshirt front black.jpg', 'tshirt front red.jpg'],
    'Branding/DYD Mphangamo': ['cap 1.jpg', 'cap new.jpg', 'FISHER.jpg', 'golf shirt.jpg'],
    'Branding/IOT fixing': ['logo_black.png', 'logo_green.png', 'logo_white.png', 'tshirt 2.jpg', 'cap black.jpg', 'cap white.jpg', 'BOTTLE.jpg', 'Lanyard.jpg'],
    'Branding/Parabolic': ['busines 1.jpg', 'Roll up banner.jpg', 'STICKER.png', 'MAIZE.png', 'SUNFLOWER.png', 'birthday.jpg', 'independence.jpg'],
    'Branding/zathu': ['business.jpg', 'sign.jpg', 'bottle (1).jpg', 'cap.jpg', 'bag.jpg', 'tshirt.jpg', 'Blank billboard.jpg'],
    'Flyers': ['birthday.jpg', 'easter.jpg', 'independence.jpg', 'flyer.jpg', 'flyer (1).jpg', 'flyer (2).jpg', 'flyer (3).jpg', 'flyer (4).jpg', 'mothers.jpg', 'invite.jpg'],
    'posters': ['poster music.jpg', '10.jpg', 'Entrance.jpg', 'jumping.jpg', 'khaye poster.jpg', 'new minds 2.jpg'],
    'business cards': ['business card.jpg', 'a4-paper-mockup.jpg'],
    'Tshirts': ['front.jpg', 'tshirt.jpg', 'tshirt 2.jpg', 'tshirt white.jpg', 'FISHER.jpg', 'IBRAVE MOCK.jpg', 'front whi.jpg', 'work 1.jpg'],
    'Caps': ['cap.jpg', 'cap 1.jpg', 'cap black.jpg', 'cap white.jpg', 'cap new.jpg'],
    'banners': ['banner2.jpg', '4.jpg', 'Billboard_Mockup_3.jpg', 'Roll up banner.jpg', '2 (1).jpg'],
    'Product stickers': ['STICKER.png', 'MAIZE.png', 'SUNFLOWER.png', '1.jpg'],
    'Invitations': ['Save the date 3.jpg', 'Save the date 2 (1).jpg', 'card 2.jpg', 'save the.png'],
    'Business profile': ['busines 1.jpg', '0004 Free Softcover Book Mockup.jpg', '0012 Free Softcover Book Mockup.jpg'],
    'social media cover': ['5.jpg'],
    'Logos': ['logo.png', 'logo2.jpg', 'logo_black.png', 'logo_green.png', 'logo_white.png', 'Kwathu.png', 'Yanga.png', 'mine.png', 'sprout.jpg']
  };

  getPortfolioFolders(): PortfolioFolder[] {
    return Object.entries(this.portfolioStructure).map(([name, data]) => ({
      name,
      path: data.path,
      thumbnail: '/' + data.thumbnail,
      description: data.description,
      itemCount: this.getItemCount(name)
    }));
  }

  getGalleryItems(category: string): GalleryItem[] {
    const structure = this.portfolioStructure[category as keyof typeof this.portfolioStructure];
    if (!structure) return [];

    const items: GalleryItem[] = [];

    structure.subfolders.forEach(subfolder => {
      const subfolderPath = `${category}/${subfolder}`;
      const files = this.imageFiles[subfolderPath as keyof typeof this.imageFiles] || [];
      items.push({
        name: subfolder,
        path: subfolderPath,
        isFolder: true,
        thumbnail: files.length > 0 ? `/${structure.path}/${subfolder}/${files[0]}` : undefined
      });
    });

    const matchingKey = Object.keys(this.imageFiles).find(key => 
      key.toLowerCase() === category.toLowerCase()
    );

    if (matchingKey) {
      const files = this.imageFiles[matchingKey as keyof typeof this.imageFiles] || [];
      files.forEach(file => {
        items.push({
          name: file.replace(/\.(jpg|png|jpeg)$/i, ''),
          path: `/${structure.path}/${file}`,
          isFolder: false
        });
      });
    }

    return items;
  }

  getSubfolderItems(category: string, subfolder: string): GalleryItem[] {
    const structure = this.portfolioStructure[category as keyof typeof this.portfolioStructure];
    if (!structure) return [];

    const subfolderPath = `${category}/${subfolder}`;
    const files = this.imageFiles[subfolderPath as keyof typeof this.imageFiles] || [];

    return files.map(file => ({
      name: file.replace(/\.(jpg|png|jpeg)$/i, ''),
      path: `/${structure.path}/${subfolder}/${file}`,
      isFolder: false
    }));
  }

  private getItemCount(category: string): number {
    const structure = this.portfolioStructure[category as keyof typeof this.portfolioStructure];
    if (!structure) return 0;

    let count = structure.subfolders.length;
    
    const mainFolderKey = Object.keys(this.imageFiles).find(key => 
      key.toLowerCase() === category.toLowerCase()
    );
    
    if (mainFolderKey) {
      count += (this.imageFiles[mainFolderKey as keyof typeof this.imageFiles] || []).length;
    }

    return count;
  }
}