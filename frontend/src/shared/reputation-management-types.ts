export interface Review { id: string; source: 'google'|'tripadvisor'|'yelp'|'other'; rating: number; comment?: string; date?: string; }
