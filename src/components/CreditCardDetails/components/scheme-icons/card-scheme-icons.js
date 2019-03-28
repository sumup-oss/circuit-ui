import React from 'react';

import { flow, toPairs, reduce } from '../../../../util/fp';
import { ReactComponent as Amex } from './icons/amex.svg';
import { ReactComponent as Unknown } from './icons/unknown.svg';
import { ReactComponent as Diners } from './icons/diners.svg';
import { ReactComponent as Discover } from './icons/discover.svg';
import { ReactComponent as Ec } from './icons/ec.svg';
import { ReactComponent as Elo } from './icons/elo.svg';
import { ReactComponent as Elv } from './icons/elv.svg';
import { ReactComponent as Hiper } from './icons/hiper.svg';
import { ReactComponent as Hipercard } from './icons/hipercard.svg';
import { ReactComponent as Jcb } from './icons/jcb.svg';
import { ReactComponent as Maestro } from './icons/maestro.svg';
import { ReactComponent as Mastercard } from './icons/mastercard.svg';
import { ReactComponent as VisaElectron } from './icons/visa-electron.svg';
import { ReactComponent as Visa } from './icons/visa.svg';
import { ReactComponent as Vpay } from './icons/vpay.svg';
import { ReactComponent as Cash } from './icons/cash.svg';
import { ReactComponent as GooglePay } from './icons/google-pay.svg';
import { ReactComponent as ApplePay } from './icons/apple-pay.svg';
import { ReactComponent as BancoEstado } from './icons/banco-estado.svg';
import { ReactComponent as Dankort } from './icons/dankort.svg';
import { ReactComponent as Nfc } from './icons/nfc.svg';
import { ReactComponent as UnionPay } from './icons/union-pay.svg';
import { ReactComponent as RedCompra } from './icons/red-compra.svg';

export const iconComponents = {
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
  cash: Cash,
  googlePay: GooglePay,
  applePay: ApplePay,
  bancoEstado: BancoEstado,
  dankort: Dankort,
  nfc: Nfc,
  unionPay: UnionPay,
  redCompra: RedCompra,
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
