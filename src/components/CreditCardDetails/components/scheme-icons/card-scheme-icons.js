import React from 'react';

import { flow, toPairs, reduce } from '../../../../util/fp';

import Amex from './icons/amex.svg';
import Unknown from './icons/unknown.svg';
import Diners from './icons/diners.svg';
import Discover from './icons/discover.svg';
import Ec from './icons/ec.svg';
import Elo from './icons/elo.svg';
import Elv from './icons/elv.svg';
import Hiper from './icons/hiper.svg';
import Hipercard from './icons/hipercard.svg';
import Jcb from './icons/jcb.svg';
import Maestro from './icons/maestro.svg';
import Mastercard from './icons/mastercard.svg';
import VisaElectron from './icons/visa-electron.svg';
import Visa from './icons/visa.svg';
import Vpay from './icons/vpay.svg';

const iconComponents = {
  amex: Amex,
  diners: Diners,
  discover: Discover,
  ec: Ec,
  elo: Elo,
  elv: Elv,
  hiper: Hiper,
  hipercard: Hipercard,
  jcb: Jcb,
  maestro: Maestro,
  mastercard: Mastercard,
  visaElectron: VisaElectron,
  visa: Visa,
  vpay: Vpay,
  default: Unknown
};

const accessibleIconComponents = flow(
  toPairs,
  reduce(
    (acc, [name, IconComponent]) => ({
      ...acc,
      [name]: props => (
        <IconComponent aria-label={`icon ${name}`} role="img" {...props} />
      )
    }),
    {}
  )
)(iconComponents);

export default accessibleIconComponents;
