import { IIconsContainer } from "../interfaces";
import "../index.css";

const IconContainer = ({ className, children }: IIconsContainer) => {
  return <div className={`${className} w-20 h-20`}>{children}</div>;
};

export default IconContainer;
