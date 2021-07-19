import * as React from 'react';

function SvgHeight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="23" viewBox="0 0 12 23" {...props}>
      <g fill="#48BBFF" fillRule="nonzero">
        <ellipse cx="6" cy="1.643" rx="1.636" ry="1.643" />
        <path d="M11.992 12.151c-.548-5.964-3.48-7.154-3.48-7.154s-2.834-1.651-5.817.452C.76 7.156.314 9.76.008 12.276c-.154 1.279 1.909 1.264 2.062 0 .182-1.501.443-3.01 1.212-4.294l-.004 1.45-.014 6.965v5.527c0 .594.45 1.076 1.08 1.076.63 0 1.142-.482 1.142-1.076v-7.9h1.01v7.925c0 1.289 2.061 1.289 2.061 0v-5.552l.087-6.98.002-1.675C9.47 9.05 9.742 10.604 9.93 12.15c.155 1.264 2.217 1.279 2.063 0z" />
      </g>
    </svg>
  );
}

export default SvgHeight;
