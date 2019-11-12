import React from 'react';

import Row from 'uikit/Row';

import { indexCircle } from './Multicard.module.css';

const IndexDots = ({ index, items, setIndex }) => {
  if (items.length <= 1) return null;

  return (
    <Row style={{ justifyContent: 'center' }}>
      {items.map((item, i) => (
        <div
          className={`${indexCircle} ${i === index ? 'active' : ''}`}
          onClick={() => setIndex(i)}
          key={i}
        />
      ))}
    </Row>
  );
};

export default IndexDots;
