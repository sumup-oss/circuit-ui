import React from 'react';
import Badge from '../../../../src/components/Badge';

const Stable = () => (
  <Badge color={Badge.SUCCESS} style={{ display: 'inline-block' }}>
    Stable
  </Badge>
);

const Deprecated = () => (
  <Badge color={Badge.DANGER} style={{ display: 'inline-block' }}>
    Deprecated
  </Badge>
);

const InReview = () => (
  <Badge color={Badge.WARNING} style={{ display: 'inline-block' }}>
    In review
  </Badge>
);

export { Stable, InReview, Deprecated };
