export interface StoryFrontmatter {
  শিরোনাম: string;
  লেখক: string;
  বিষয়শ্রেণী: Category;
  ট্যাগ: string[];
  সংক্ষেপ: string;
  কপিরাইট_মুক্ত: boolean;
  প্রকাশকাল?: string;
  যোগ_করা_হয়েছে?: string;
  উৎস?: string;
  slug?: string;
  পঠন_সময়?: string;
  প্রচ্ছদ?: string;
  বৈশিষ্ট্যমণ্ডিত?: boolean;
  ভাষা?: string;
  এআই_নির্মিত?: boolean;
}

export interface Story {
  slug: string;
  filename: string;
  frontmatter: StoryFrontmatter;
  content: string;
  excerpt: string;
  readTime: number;
  readTimeText: string;
  wordCount: number;
}

export interface StoryMeta {
  slug: string;
  filename: string;
  title: string;
  author: string;
  authorSlug: string;
  category: Category;
  tags: string[];
  excerpt: string;
  readTimeText: string;
  readTimeMinutes: number;
  publicationYear?: string;
  dateAdded?: string;
  coverImage?: string;
  isFeatured: boolean;
  isAI: boolean;
  viewCount: number;
}

export type Category =
  | 'ছোটগল্প'
  | 'উপন্যাস-অধ্যায়'
  | 'রূপকথা'
  | 'লোককথা'
  | 'কিশোর-গল্প'
  | 'ভূতের-গল্প'
  | 'রহস্য'
  | 'প্রেমের-গল্প'
  | 'ঐতিহাসিক'
  | 'বৈজ্ঞানিক-কল্পকাহিনী'
  | 'হাস্যরস'
  | 'আধুনিক';

export const CATEGORIES: Category[] = [
  'ছোটগল্প',
  'উপন্যাস-অধ্যায়',
  'রূপকথা',
  'লোককথা',
  'কিশোর-গল্প',
  'ভূতের-গল্প',
  'রহস্য',
  'প্রেমের-গল্প',
  'ঐতিহাসিক',
  'বৈজ্ঞানিক-কল্পকাহিনী',
  'হাস্যরস',
  'আধুনিক',
];

export type SortOrder = 'recent' | 'alphabetical' | 'popular';
