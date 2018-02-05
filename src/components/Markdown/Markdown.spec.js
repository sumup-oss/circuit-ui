import React from 'react';

import Markdown from '.';
import Image from '../Image';
import Text from '../Text';

const markdown = `# Manu illa amorem committere exit membra minor

## Utraque aut longe ore cruentum est

Lorem markdownum vultusque eligit significent sinistro, et virgis, inter!
Rapuere Apollineam equas coloni urbis conata, *Theti*, colla simul latus magis
et magnis prorumpit flere? Dura quantum.

### Indignantia tamen

Mediis monstravit inmunis Troes non leonis **non** externis cuncta inperfecta
mihi [aristas colligit](http://etluteave.net/) sacros, diu. Se prius
praecordiaque velut totosque norant alipedi candida electae est vestis, posse.

> Adstat Procnes et, in tempora Maenalon moles in nocte relicta, membra nec
> sudore nymphas robur! Adduxit sua equus Cadmeida **egimus** calathis ostendit
> quicquid ad heros. Usus atque, et talisque sum; quin ramis sectamque amore
> texerat Troada. Dedit murmure de iuvenis peraravit, addunt nihil; est est
> ostendens fer cum illa **Galanthida**. Posset aliisque: enim tibi confinia
> terraeque gratus quaque, liquidumque quod: magnum mixta;
> [sicco](http://priusiuno.org/cur.aspx).

### Dumque et membris minas deprimeret Phrygiis sua

Mundus pugno, geniti sic muros Notum tu ad motis; nobis mihi tangi dextra?
**Signans Trinacris errat** attonitoque spicis magistra odioque, aera palus
altum, ense pectora socerumque! Et ipsum vix bis sibi, sitim, aras praemia *qua
quosque*, adde alma. Ait dixit suas gnatis ab facies altera nova **flentemque
teneo**: quoque profusis consequitur delusa et. Consistere adeunt.

### Develat nymphae

Conceperat depositae si manibus utiliter resonare vitat ima mortis ecce. Huic
leni agat pro! Fuit relinque.

1. Quodque nebulas turba orbem aut
2. Nymphae lapsasque
3. Regoque tenere

## Circumstant iam reponere obibat indestrictus sine

![A random cute puppy](http://www.placepuppy.net/800/500)

Parte quam aequore, nebulas demisere. Iurgia venit finxit nec manibus tamen
cultus coniunx adituque.`;

describe('Markdown', () => {
  it('should parse and render Markdown to HTML', () => {
    const actual = create(<Markdown>{markdown}</Markdown>);
    expect(actual).toMatchSnapshot();
  });
  it('should transform the Markdown before parsing it', () => {
    const actual = create(
      <Markdown transformer={md => md.replace(/#/g, '##')}>{markdown}</Markdown>
    );
    expect(actual).toMatchSnapshot();
  });
  it('should override HTML tags with React components', () => {
    const actual = create(
      <Markdown overrides={{ img: Image, p: Text }}>{markdown}</Markdown>
    );
    expect(actual).toMatchSnapshot();
  });
});
