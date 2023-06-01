import React from "react"

export default function Buttons({ Sign, logo, image, className, btnNext }) {
  return (
    <button className={className} onClick={btnNext}>
      {image}&nbsp;&nbsp;&nbsp;{Sign}&nbsp;&nbsp;&nbsp;{logo}
    </button>
  );
}