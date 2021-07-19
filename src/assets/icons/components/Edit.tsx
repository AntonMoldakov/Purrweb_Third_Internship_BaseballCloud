import * as React from 'react';

function SvgEdit(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="38px"
      height="38px"
      {...props}
      viewBox="0 0 38 38">
      <defs>
        <circle id="b" cx="15" cy="15" r="15" />
        <filter id="a" width="140%" height="140%" x="-20%" y="-20%" filterUnits="objectBoundingBox">
          <feOffset in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="2" />
          <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0.282352941 0 0 0 0 0.733333333 0 0 0 0 1 0 0 0 0.8 0" />
        </filter>
      </defs>
      <g fill="none">
        <g transform="translate(4 4)">
          <use fill="#000" filter="url(#a)" xlinkHref="#b" />
          <use fill="#48BBFF" xlinkHref="#b" />
        </g>
        <path
          fill="#FFF"
          fillRule="nonzero"
          d="M20.462 15.003l2.441 2.453-6.18 6.209-2.439-2.453 6.178-6.21zm4.293-.592l-1.088-1.094a1.077 1.077 0 0 0-1.526 0l-1.043 1.048 2.44 2.453 1.217-1.222a.84.84 0 0 0 0-1.185zM13.007 24.66c-.045.2.136.38.336.332l2.72-.663-2.44-2.453-.616 2.784z"
        />
      </g>
    </svg>
  );
}

export default SvgEdit;
