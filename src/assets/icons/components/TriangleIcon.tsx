import * as React from 'react';

function SvgTriagle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5" {...props}>
      <path
        fill="#788B99"
        fillRule="evenodd"
        d="M8 .5c0-.273-.227-.5-.5-.5h-7C.227 0 0 .227 0 .5c0 .133.055.258.148.352l3.5 3.5A.497.497 0 0 0 4 4.5a.497.497 0 0 0 .352-.148l3.5-3.5A.497.497 0 0 0 8 .5z"
      />
    </svg>
  );
}

export default SvgTriagle;
