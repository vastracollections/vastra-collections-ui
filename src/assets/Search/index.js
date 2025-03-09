import * as React from "react";
const SVGComponent = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.9268 17.04L20.4 20.4M11.4 7.19998C13.3882 7.19998 15 8.81175 15 10.8M19.28 11.44C19.28 15.7699 15.7699 19.28 11.44 19.28C7.11006 19.28 3.59998 15.7699 3.59998 11.44C3.59998 7.11006 7.11006 3.59998 11.44 3.59998C15.7699 3.59998 19.28 7.11006 19.28 11.44Z"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);
export default SVGComponent;
