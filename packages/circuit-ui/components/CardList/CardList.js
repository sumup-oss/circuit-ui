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

import styled from '@emotion/styled';

import { deprecate } from '../../util/logger';
import Card from '../Card';

const Wrapper = styled(Card)`
  padding: 0;
  border-radius: ${(p) => p.theme.borderRadius.bit};
  border: ${(p) => `${p.theme.borderWidth.kilo} solid ${p.theme.colors.n300}`};
`;

/**
 * Component that wraps a list of CardList.Item components
 */
const CardList = (props) => {
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test'
  ) {
    deprecate(
      'CardList',
      'This component has been deprecated and will be removed in version 5.0.0',
    );
  }

  return <Wrapper {...props} />;
};

CardList.defaultProps = Card.defaultProps;
CardList.displayName = 'CardList';

/**
 * @component
 */
export default CardList;
