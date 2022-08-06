import React from "react";
import {TiFlash} from "react-icons/ti"
type Props = {};

const Logo = (props: Props) => {
  return (
    <div className="flex items-center gap-1 group">
   {/* <svg
   className="group-hover:animate-spin"
    width={28}
    height={28}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M13.539 27.661v-7.586L0 14.12h7.586L13.54.582V8.17l13.54 5.952h-7.587l-5.953 13.54Z"
        fill="#4B7DF3"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path
          fill="#fff"
          transform="translate(0 .582)"
          d="M0 0h27.079v27.079H0z"
        />
      </clipPath>
    </defs>
  </svg> */}
  <TiFlash className="h-8 w-8 text-primary-500"/>
      <h1 className="text-2xl font-bold text-gray-900">TezMint</h1>
    </div>
  );
};

export default Logo;
