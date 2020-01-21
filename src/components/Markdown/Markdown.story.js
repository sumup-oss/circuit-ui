/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';

import Markdown from './Markdown';
import Heading from '../Heading';
import Text from '../Text';
import Image from '../Image';

const content = `# Manu illa amorem committere exit membra minor

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

Parte quam aequore, nebulas demisere. Iurgia venit finxit nec manibus tamen
cultus coniunx adituque.`;

export default {
  title: 'Typography/Markdown',
  component: Markdown,
  parameters: {
    jest: ['Markdown']
  }
};

export const base = () => <Markdown>{content}</Markdown>;

export const withComponents = () => (
  <Markdown
    overrides={{
      h1: {
        component: Heading,
        props: {
          as: 'h1',
          size: 'zetta'
        }
      },
      h2: {
        component: Heading,
        props: {
          as: 'h2',
          size: 'peta'
        }
      },
      h3: {
        component: Heading,
        props: {
          as: 'h3',
          size: 'giga'
        }
      },
      p: Text,
      img: Image
    }}
  >
    {content}
  </Markdown>
);
