import fs from 'node:fs';

const p = 'src/data/sedi.json';
const data = JSON.parse(fs.readFileSync(p, 'utf8'));

for (const s of data) {
  if (!Array.isArray(s.faqLocal) || s.faqLocal.length < 2) {
    s.faqLocal = [
      {
        q: `Quanto tempo richiede uno sfratto a ${s.nome}?`,
        a: `I tempi dipendono dal calendario del ${s.tribunale} e dall'eventuale opposizione dell'inquilino.`
      },
      {
        q: `Quando si può avviare lo sfratto per morosità a ${s.nome}?`,
        a: 'La procedura può essere avviata quando l’inquilino non paga i canoni nei termini previsti dal contratto.'
      },
      {
        q: `Serve un avvocato per sfrattare un inquilino a ${s.nome}?`,
        a: 'Sì, è necessaria assistenza legale per ricorso, udienza e fase esecutiva.'
      }
    ];
  }
}

fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
console.log('updated', data.length);
