import React, { Fragment } from 'react';
import { flow } from 'lodash/fp';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import { Price } from './Price';

// storiesOf('Prices', module)
//   .addDecorator(withTests('Price'))
//   .add(
//     'Price',
//     flow(withNotes(README), withInfo())(() => (
//       <Fragment>
//         {/* Adding some vertical spacing between the children */}
//         <style
//           scoped
//           dangerouslySetInnerHTML={{
//             __html: `
//         div {
//           margin-bottom: 12px;
//         }
//       `
//           }}
//         />
//         <Price key="1" currency="EUR" locale="de-DE" amount={9.99} />
//         <Price key="2" currency="EUR" locale="de-DE" amount={9} />
//         <Price
//           key="3"
//           currency="EUR"
//           locale="de-DE"
//           installments={9}
//           amount={9.99}
//         />
//         <Price
//           key="4"
//           currency="BRL"
//           locale="pt-BR"
//           installments={12}
//           amount={9.99}
//         />
//         <Price key="5" currency="USD" locale="en-US" amount={9.99} />
//         <Price key="6" currency="USD" locale="en-US" amount={49} />
//         <Price key="7" currency="USD" locale="en-US" amount={9999999} />
//         <Price key="8" currency="BRL" locale="pt-BR" amount={9.99} />
//         <Price
//           key="9"
//           currency="EUR"
//           locale="de-AT"
//           amount={9.99}
//           color="error"
//         />
//         <Price
//           key="10"
//           currency="EUR"
//           locale="de-AT"
//           amount={9.99}
//           color="warning"
//         />
//         <Price
//           key="11"
//           currency="EUR"
//           locale="de-AT"
//           amount={9.99}
//           color="highlight"
//         />
//       </Fragment>
//     ))
//   );
