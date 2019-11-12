import React from 'react';

import { styleComponent } from 'components/Utils';

import styles from './Core.module.css';

/**
 * Headings: Standard
 */
export const H1 = styleComponent('h1', styles.heading1);
export const H2 = styleComponent('h2', styles.heading2);
export const H3 = styleComponent('h3', styles.heading3);
export const H4 = styleComponent('h4', styles.heading4);

export const FileRepoH3 = ({ children, style = {}, ...props }) => (
  <H3
    style={{
      fontSize: '16px',
      ...style,
    }}
    {...props}
  >
    {children}
  </H3>
);

export const TableHeader = styleComponent('th', styles.tableHeader);
