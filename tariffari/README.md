# Tariffari — Studio Avv. Danilo Ansalone / Sfratto Sicuro

Tariffari client-facing con l'identità coordinata dello Studio (monogramma DA verde `#1E4A38`, Garamond, filetto).

## Prosecuzione dello sfratto dopo l'opposizione

Compensi per la **fase di merito** successiva al mutamento del rito (art. 667 c.p.c.), quando l'inquilino si oppone alla convalida.

| File | Ruolo |
|---|---|
| `Tariffario-Sfratto-Prosecuzione.pdf` | **Deliverable** — 1 pagina A4, da inviare al cliente. |
| `Tariffario-Sfratto-Prosecuzione.docx` | Versione **editabile** in Word (stesso layout). |
| `tariffario-sfratto-prosecuzione.typ` | Sorgente **Typst** che rigenera il PDF identico. |
| `monogramma-da-verde.png` | Asset del segno, richiesto per ricompilare il Typst. |

### Prezzi (IVA e CPA comprese)
- **Fase iniziale** (intimazione, notifica, convalida): € 1.300,00
- **Tariffa base** (senza istruttoria), *in aggiunta*: € 2.500,00
- **Tariffa completa** (base + supplemento di € 1.000,00 per l'istruttoria), *in aggiunta*: € 3.500,00

Pagamento della base in tre soluzioni: **€ 1.000,00** di acconto alla sottoscrizione, **€ 750,00** alla memoria integrativa, **€ 750,00** quando il Giudice trattiene la causa in decisione; con la completa, l'ulteriore **€ 1.000,00** quando il Giudice dispone i mezzi istruttori. Allineato all'art. 3 del [mandato di opposizione](../contratti/mandato-opposizione-sfratto/).

Solo primo grado. Compenso dovuto a prescindere dall'esito. Escluse: mediazione, CU, notifiche, CTU/CTP, spese vive, appello.

> ⚠️ L'**attività esecutiva per il rilascio** (preavviso di rilascio, ufficiale giudiziario) **non** va elencata tra le esclusioni a carico del cliente: è coperta *a titolo gratuito* dal mandato della fase iniziale (art. 1), salve le sole spese vive. Il tariffario lo dice in nota — non reintrodurla tra le voci escluse.

### Rigenerare il PDF
```bash
typst compile tariffario-sfratto-prosecuzione.typ Tariffario-Sfratto-Prosecuzione.pdf
```
Per rigenerare il `.docx`: script `build_docx.py` (python-docx) nello scratchpad di sessione.
