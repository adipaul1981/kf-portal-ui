import * as React from 'react';

const TitleH2 = ({children, style}) =>
  <h2 style={{...style,
    color: "rgb(43, 56, 143)",
    fontWeight: "500",
    fontFamily: '"Montserrat", "sans-serif"',
    fontSize: "22px",
    lineHeight: "1.27",
    letterSpacing: "0.3px",
    margin: "13px 0px 29px",
    padding: "0px 0px 10px",
    textDecoration: "none",
    borderBottom: "1px solid rgb(212, 214, 221)"
  }}
  >
    {children}
  </h2>;

export default TitleH2;