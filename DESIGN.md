# DESIGN.md — Sfratto Sicuro landing system

Documenta il sistema già in produzione (identity-preservation: le scelte esistenti non si ridiscutono nelle varianti).

## Colors
- **Navy** `#1B2951` (`--blue-navy`) — colore identitario, hero drench (gradiente 135° `#1B2951 → #2a4073 → #1B2951`), testi titoli su chiaro.
- **Verde security** `#2F9E57` (`--green-security`) — CTA primarie, check, conferme.
- **WhatsApp** `#25D366` — solo per azioni WhatsApp.
- **Grigio perla** `#F4F5F7` (`bg-gray-pearl`) — sezioni alternate.
- Neutri caldi, mai #000/#fff puri nei testi lunghi (`text-dark-gray` ecc.).
- Strategia: **Committed sul navy** (hero e bande scure), verde come accento operativo.

## Typography
- Display: **Fraunces** (titoli landing v3).
- Body/UI: **Plus Jakarta Sans**; fallback Inter sulle pagine v2/statiche.
- Scala fluida, titoli `clamp()`, body ≥ .95rem su mobile. Line-height maggiorata su testo chiaro su navy.

## Components (landing)
- `hero-form-card`: card bianca radius ~1rem, label sopra input, submit verde pieno, min-height input 46px mobile.
- `landing-v3-sticky-cta`: barra fissa bottom mobile (<900px), rating 4.9 + bottoni Chiama (navy) e WhatsApp (#25D366), safe-area iOS.
- `btn-primary`: verde pieno, radius .5–.6rem, uppercase, font-weight 700.
- Sezioni `py-12/16`, container `max-w-5xl/6xl`, card shadow morbide `rgba(27,41,81,.06–.16)`.
- FAQ: `<details>` con summary bold e chevron verde.

## Rules
- Vietati: border-left colorati come accento, gradient text, glassmorphism, card grid fotocopiate, em dash nella copy (KDP/brand rule: usare virgole o due punti).
- Icone FontAwesome 6 (fas/fab) già caricate; niente nuove librerie.
- Immagini: webp, lazy sotto la piega, `content-visibility` disattivato su v3 (fix flicker iOS).
- Performance budget: TTFB < 500ms, load < 1.5s su 4G; niente script bloccanti nuovi.
