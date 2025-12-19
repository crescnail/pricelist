export enum ServiceCategory {
  CREATION = 'CREATION', // Section 1
  CLASSIC = 'CLASSIC',   // Section 2
  REMOVAL = 'REMOVAL',   // Section 3
  OTHER = 'OTHER'
}

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  category: ServiceCategory;
  description?: string;
  isAddOn?: boolean; // If true, it's a per-finger calculation usually
  isBaseOption?: boolean; // If true, it's a radio selection
}

export interface SectionData {
  title: string;
  category: ServiceCategory;
  intro?: string[]; // Text displayed immediately below title
  items: ServiceItem[];
  description?: string[]; // Paragraphs displayed at bottom
  notice?: string[]; // Bullet points displayed at bottom
  addOns?: ServiceItem[];
}