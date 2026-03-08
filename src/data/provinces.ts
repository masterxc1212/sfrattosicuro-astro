export type Province = {
  slug: string;
  name: string;
  region?: string;
};

export const provinces: Province[] = [
  { slug: "roma", name: "Roma", region: "Lazio" },
  { slug: "milano", name: "Milano", region: "Lombardia" },
  { slug: "napoli", name: "Napoli", region: "Campania" },
];