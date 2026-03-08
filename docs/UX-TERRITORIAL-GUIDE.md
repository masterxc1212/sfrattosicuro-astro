# UX Territorial Guide (Home + Sedi)

Quando crei nuove isole/componenti per pagine nazionali e territoriali, mantieni SEMPRE queste variabili personalizzabili:

## Variabili minime

- `sedeSlug` (`nazionale` o slug città)
- `nomeCitta` (es. `Milano`)
- `tribunale` (es. `Tribunale di Milano`)
- `regione`
- `areaServita` (se presente)
- `faqLocal` (fallback se mancante)

## Regole UX

1. **Fallback nazionale**
   - Se `sedeSlug = nazionale`, evita copy locale e usa claim nazionali.
2. **Copy localizzato**
   - Se pagina territoriale, personalizza heading/CTA con città e tribunale.
3. **CTA coerenti**
   - CTA primaria sempre verso `#contatti`.
   - CTA secondaria verso `/sedi/` o sezione procedura/FAQ.
4. **No placeholder in output**
   - Mai mostrare stringhe tipo `{city}` o `{slug}` in HTML o JSON-LD.
5. **Schema coerente**
   - Territoriali: `LegalService` + `WebPage` + `FAQPage` + `BreadcrumbList`.
   - Hub sedi: `CollectionPage` + `ItemList`.

## Isole già allineate

- `HeroInstitutionalIsland.astro`
- `SedeIdentityIsland.astro`
- `FaqSection.astro`
- `TerritorialCtaIsland.astro`

Usa queste come base prima di crearne di nuove.
