import * as React from 'react';

function SvgBat(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" {...props}>
      <path
        fill="#FF5656"
        fillRule="nonzero"
        d="M9.148 12.114L.524 3.462a1.57 1.57 0 0 1 0-2.215L1.31.46a1.557 1.557 0 0 1 2.207 0L12.14 9.11c1.138 1.142 2.7 4.024 3.74 5.256.514.607 2.246 2.252 2.246 2.252a1.056 1.056 0 0 1 1.496 0 1.064 1.064 0 0 1 0 1.501l-1.496 1.502a1.056 1.056 0 0 1-1.497 0 1.064 1.064 0 0 1 0-1.502s-1.639-1.737-2.245-2.252c-1.227-1.044-4.1-2.612-5.237-3.754z"
      />
    </svg>
  );
}

export default SvgBat;
