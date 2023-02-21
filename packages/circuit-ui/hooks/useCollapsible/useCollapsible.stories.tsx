/**
 * Copyright 2021, SumUp Ltd.
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

import Body from '../../components/Body';
import Button from '../../components/Button';
import { spacing } from '../../styles/style-mixins';

import { CollapsibleOptions, useCollapsible } from './useCollapsible';

export default {
  title: 'Hooks/useCollapsible',
};

export const Example = (args: CollapsibleOptions) => {
  const { isOpen, getButtonProps, getContentProps } = useCollapsible(args);

  return (
    <section>
      <Button {...getButtonProps()}>
        {isOpen ? 'Close section' : 'Open section'}
      </Button>
      <Body {...getContentProps()} css={spacing({ top: 'kilo' })}>
        {
          'Lorem ipsum dolor amet swag pickled humblebrag retro farm-to-table, shoreditch typewriter deep v single-origin coffee green juice coloring book venmo chambray. Marfa authentic blue bottle mixtape tofu adaptogen. IPhone chia blog palo santo mlkshk tattooed jean shorts yr locavore ennui scenester. Wolf tousled pok pok sartorial scenester man bun salvia quinoa raclette sriracha roof party pour-over venmo hammock. Four dollar toast typewriter 3 wolf moon letterpress disrupt pabst. Neutra irony tousled iPhone banh mi wayfarers hoodie waistcoat.'
        }
      </Body>
    </section>
  );
};

Example.args = {
  initialOpen: false,
  duration: 300,
};
