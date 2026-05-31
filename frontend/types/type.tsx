export type Language = 'en' | 'ar'

export interface LangguageContextType {
    lang: Language,
    changeLanguage: (language: Language) => void;

}

export interface LangField {
  en: string;
  ar: string;
}

export interface WhatAre {
  title: LangField;
  des: LangField;
}

export interface QualityCard {
  _id: string;
  title: LangField;
  des: LangField;
  icon: string;
}

export interface Qualities {
  cards: QualityCard[];
}

export interface FAQ {
  // _id?: string;
  question: LangField;
  answer: LangField;
}

export interface Product {
  _id: string;
  title: LangField & {
    _id?: string;
  };

  des: LangField & {
    _id?: string;
  };

  futureImage: string;
  imageGallery: string[];

  slug: string;
  category: string;

  whatAre: WhatAre;

  qualities: Qualities;

  faqs: FAQ[];

  createdAt: string;
  updatedAt: string;

  __v: number;
}

export interface ProductResponse {
  success: boolean;
  product: Product[];
}