export type LocalFaqItem = { q: string; a: string };

export type SedeItem = {
  nome: string;
  slug: string;
  tribunale: string;
  areaServita: string;
  regione: string;
  faqLocal?: LocalFaqItem[];
  officeAddress?: {
    streetAddress?: string;
    addressLocality?: string;
    postalCode?: string;
    addressRegion?: string;
    addressCountry?: string;
  } | null;
};

export function getNationalHomeSeo() {
  return {
    canonicalPath: '/',
    title: 'Avvocato per sfratto per morosità | Sfratto Sicuro',
    description:
      'Avvocato per sfratto per morosità e finita locazione. Guida su come sfrattare un inquilino e assistenza legale fino al rilascio dell’immobile.'
  };
}

export function getTerritorialHomeSeo(sede: SedeItem) {
  return {
    canonicalPath: `/sedi/${sede.slug}/`,
    title: `Avvocato per sfratto a ${sede.nome} | Sfratto Sicuro`,
    description: `Avvocato per sfratto a ${sede.nome}. Assistenza legale per sfratto per morosità e finita locazione presso il ${sede.tribunale}.`
  };
}

export function getTerritorialIntroText(sede: SedeItem) {
  return `Se devi sfrattare un inquilino a ${sede.nome}, un avvocato per sfratto può assisterti nella procedura di sfratto per morosità o finita locazione presso il ${sede.tribunale}.`;
}

export function getTerritorialFaq(sede: SedeItem) {
  const fallbackFaq: LocalFaqItem[] = [
    {
      q: `Quanto tempo richiede uno sfratto a ${sede.nome}?`,
      a: `I tempi dipendono dal calendario del ${sede.tribunale} e dall’eventuale opposizione dell'inquilino.`
    },
    {
      q: `Quando si può avviare lo sfratto per morosità a ${sede.nome}?`,
      a: 'La procedura può essere avviata quando l’inquilino non paga i canoni nei termini previsti dal contratto.'
    },
    {
      q: `Serve un avvocato per sfrattare un inquilino a ${sede.nome}?`,
      a: 'Sì. L’assistenza legale è necessaria per impostare correttamente la procedura e seguire udienza di convalida ed eventuale fase esecutiva.'
    }
  ];

  return (sede.faqLocal && sede.faqLocal.length ? sede.faqLocal : fallbackFaq).slice(0, 3);
}
