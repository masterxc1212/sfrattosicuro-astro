import site from './site.json';
import landingConfigsJson from './landing-configs.json';

export interface LandingStat {
  value: string;
  label: string;
}

export interface LandingTrustSignal {
  value: string;
  label: string;
}

export interface LandingProblem {
  title: string;
  body: string;
}

export interface LandingStep {
  eyebrow: string;
  title: string;
  body: string;
}

export interface LandingServiceItem {
  title: string;
  body: string;
  note?: string;
}

export interface LandingFaqItem {
  q: string;
  a: string;
}

export interface LandingUrgency {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface LandingTerritory {
  city?: string;
  region?: string;
  tribunal?: string;
}

export interface LandingConfig {
  slug: string;
  title: string;
  description: string;
  canonicalPath: string;
  noindex?: boolean;
  territory?: LandingTerritory;
  hero: {
    kicker: string;
    headline: string;
    subheadline: string;
    audienceLabel: string;
    ctaLabel: string;
    note: string;
    bullets: string[];
    stats: LandingStat[];
  };
  trustSignals: LandingTrustSignal[];
  qualifierQuestion: string;
  qualifierOptions: string[];
  proof: {
    ratingLabel: string;
    reviewCountLabel: string;
    documentsTitle: string;
    documentsBody: string;
  };
  problems: LandingProblem[];
  calculator: {
    title: string;
    intro: string;
    monthlyLossLabel: string;
    compareTitle: string;
    compareBody: string;
  };
  steps: LandingStep[];
  offer: {
    title: string;
    price: string;
    intro: string;
    included: LandingServiceItem[];
    bonuses: LandingServiceItem[];
    paymentNote: string;
    guarantees: string[];
  };
  urgency: LandingUrgency;
  formCta: {
    title: string;
    description: string;
    ctaLabel: string;
  };
  faq: LandingFaqItem[];
}

export const landingConfigs = landingConfigsJson as Record<string, LandingConfig>;

export function getLandingConfig(slug = 'nazionale'): LandingConfig {
  return landingConfigs[slug] ?? landingConfigs.nazionale;
}

export const landingOrg = site.organization;
