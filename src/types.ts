/**
 * Global Types for Noz Design Luxury Interior Architecture
 */

export interface ProjectId {
  id: string;
  title: string;
  category: 'residential' | 'commercial';
  description: string;
  longDescription: string;
  image: string;
  additionalImages: string[];
  location: string;
  year: string;
  size: string;
}

export interface CuratedProduct {
  id: string;
  name: string;
  category: string;
  designer: string;
  price: string;
  image: string;
  story: string;
  specs: string[];
}

export interface ServiceStep {
  phase: string;
  title: string;
  description: string;
  duration: string;
  deliverables: string[];
}
