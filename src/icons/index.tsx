import { IIcon } from "../interfaces";

export const TodosIcon: React.FC<IIcon> = ({ className = "", ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    id="Icons"
    viewBox="0 0 32 32"
    className={`${className} w-full h-full`}
    {...rest}
  >
    <style>
      {
        ".st0{fill:none;stroke:#000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}"
      }
    </style>
    <path
      d="M11 13H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2zM11 29H5c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2zM17 5h12M17 9h7M17 21h12M17 25h7"
      className="st0"
    />
    <path d="m6 7 2 2 3-3" className="st0" />
  </svg>
);
