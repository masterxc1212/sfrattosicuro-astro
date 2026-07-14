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
- **Tariffa completa** (con istruttoria — testi, CTU, interrogatori), *in aggiunta*: € 3.500,00

Solo primo grado. Compenso dovuto a prescindere dall'esito. Escluse: mediazione, CU, notifiche, CTU/CTP, spese vive, esecuzione, appello.

### Rigenerare il PDF
```bash
typst compile tariffario-sfratto-prosecuzione.typ Tariffario-Sfratto-Prosecuzione.pdf
```
Per rigenerare il `.docx`: script `build_docx.py` (python-docx) nello scratchpad di sessione.
