import React from 'react';
import { storiesOf } from '@storybook/react';
import { Headline, Text, Paragraph } from '..';

storiesOf('Typography', module)
  .add('Headline', () => {
    const HEADLINE_TYPES = ['h1', 'h2', 'h3', 'h4', 'h5'];
    return (
      <div>
        {HEADLINE_TYPES.map(type => (
          <Headline type={type} key={type}>{`Heading ${type}`}</Headline>
        ))}
      </div>
    );
  })
  .add('Paragraph', () => (
    <div>
      <Paragraph>
        Bespoke bicycle rights health goth la croix. Sriracha aliquip
        consectetur trust fund plaid bushwick kickstarter farm-to-table magna
        tempor ugh ethical heirloom fam pabst. Nisi four loko unicorn, crucifix
        officia palo santo taxidermy mustache shoreditch viral hoodie ramps
        mumblecore bicycle rights dolore. Hell of put a bird on it gochujang
        bicycle rights readymade. Tousled microdosing mumblecore aliqua.
        Flexitarian cillum waistcoat iceland taiyaki prism. Gochujang
        williamsburg hot chicken sustainable. Unicorn salvia franzen
        farm-to-table id thundercats ut ethical man bun stumptown. Dreamcatcher
        bicycle rights activated charcoal tbh, velit kinfolk freegan hot
        chicken. Elit ugh raw denim cronut listicle umami blog.
      </Paragraph>
      <Paragraph>
        Adaptogen paleo coloring book mlkshk aesthetic tote bag. Synth semiotics
        dolore minim asymmetrical chambray banjo kitsch. Typewriter migas sint
        selvage paleo. Prism knausgaard truffaut lyft occupy vexillologist
        humblebrag flannel gochujang. Heirloom pinterest consectetur 90s, marfa
        pork belly flannel tempor lomo gluten-free. Lo-fi laboris fugiat, retro
        sed vexillologist master cleanse squid gastropub jianbing viral la croix
        coloring book in. Selfies voluptate echo park biodiesel. Chicharrones
        cold-pressed intelligentsia tempor sint bitters unicorn shabby chic
        PBR&B anim before they sold out. Etsy narwhal echo park synth sriracha
        90s distillery aesthetic. Squid cliche roof party consequat four loko
        id. Minim umami yuccie deserunt snackwave id echo park whatever
        vexillologist mollit flexitarian literally ullamco organic. Lo-fi
        schlitz shabby chic truffaut.
      </Paragraph>
    </div>
  ))
  .add('Text', () => {
    const SIZES = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl', 'xxxxxl'];
    return (
      <div>
        {SIZES.map(size => (
          <Text key={size} size={size}>
            {size}
          </Text>
        ))}
      </div>
    );
  });
