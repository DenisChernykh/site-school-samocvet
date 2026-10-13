export interface Heading {
  title: string;
  description?: string;
  mobileDescription?: string;
}

export interface Feature extends Heading {
  image: string;
  paragraphs?: string[];
  link?: { label: string; href: string };
}

export interface Hero extends Heading {
  image: string;
  mobileImage?: string;
  action: { label: string; href: string };
}

export interface Fact {
  label: string;
  value: string;
}

export interface Program {
  slug: string;
  name: string;
  cardImage: string;
  cardSummary: string;
  cardAudience: string;
  homeSummary: string;
  mobileHomeSummary: string;
  heading: Heading;
  image: string;
  facts: Fact[];
  actionLabel: string;
  details: { title: string; items: Heading[] };
  story: Feature;
  start: Heading;
}

export interface SchoolEvent {
  slug: string;
  title: string;
  description: string;
  image: string;
  dateLabel: string;
  status: 'archived';
  facts: Fact[];
  story: Heading;
  activities: string[];
}

export interface SiteContent {
  site: {
    name: string;
    description: string;
    contactName: string;
    phone: string;
    phoneHref: string;
    email: string;
    vkUrl: string;
    contactVkUrl: string;
    address: string;
    addressDetail: string;
    mapsUrl: string;
  };
  home: {
    hero: Hero;
    intro: Feature;
    values: Array<Heading & { image: string; mobileDescription: string }>;
    programsTitle: string;
    storiesTitle: string;
    stories: Feature[];
    events: Heading;
    quote: { text: string; author: string };
  };
  about: {
    intro: Feature;
    principles: {
      title: string;
      panels: Array<{ title: string; items: Heading[] }>;
    };
    statement: string;
    family: Feature;
  };
  programsHeading: Heading;
  programs: Program[];
  individualIntro: Feature;
  schoolDay: { title: string; items: Heading[]; note: string };
  admission: {
    hero: Hero;
    steps: { title: string; description: string; items: Heading[] };
    faqs: Heading[];
  };
  events: {
    heading: Heading;
    empty: Feature;
    archiveHeading: string;
    items: SchoolEvent[];
  };
  team: { heading: Heading; members: Array<Feature & { role: string }> };
  life: {
    heading: Heading;
    stories: Array<
      Feature & { category: 'walks' | 'creativity'; eyebrow: string }
    >;
  };
  legal: {
    heading: Heading;
    name: string;
    facts: Fact[];
    documents: string[];
    programs: string[];
    sourceUrl: string;
  };
}

export interface Inquiry {
  name: string;
  contact: string;
  message: string;
  consent: boolean;
  source: 'admission' | 'contacts';
}

export type InquiryField = 'name' | 'contact' | 'message' | 'consent';
