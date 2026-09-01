export interface Memory {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  date?: string;
  image: string;
  tag?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'memories' | 'celebration' | 'candid' | 'moments';
  url: string;
  caption: string;
  aspectRatio?: 'tall' | 'wide' | 'square';
}

export interface ReasonCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  bgGradient?: string;
}

export interface UserWish {
  id: string;
  name: string;
  message: string;
  date: string;
  createdAt?: string;
  leafColor?: string;
}

export interface WeddingConfig {
  groomName: string;
  brideName: string;
  weddingDate: string; // ISO format: e.g. "2026-11-28T10:00:00"
  weddingLocation: string;
  yourName: string;
  heroHeadline: string;
  heroSubtitle: string;
  personalMessageTitle: string;
  personalMessage: string;
  signatureText: string;
  letterHeadline: string;
  letterGreeting: string;
  letterBody: string[];
  letterClosing: string;
  finalBlessing: string;
  memories: Memory[];
  galleryImages: GalleryItem[];
  reasonsToBeHappy: ReasonCard[];
  initialWishes: UserWish[];
  musicFile: string;
}
