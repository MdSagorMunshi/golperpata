export interface Author {
  slug: string;
  nameBengali: string;
  nameEnglish?: string;
  birthYear?: string;
  deathYear?: string;
  bioBengali: string;
  avatarUrl?: string;
  wikipediaUrl?: string;
  storyCount: number;
  notableWorks?: string[];
}
