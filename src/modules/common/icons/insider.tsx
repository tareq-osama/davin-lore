import React from "react";
import { IconProps } from "types/icon";

const Insider: React.FC<IconProps> = ({
  size = 20,
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"  
      width={size}
      height={size}
      viewBox="0 0 122.88 122.88"
      fill="none"
      {...attributes}
    >
      <path
        d="m117.14,32.71l-34.61,9.59c-.65.18-1.1.77-1.1,1.45v31.96L6.14,5.11c-.89-.83-2.34-.2-2.34,1.01v39.14c0,.38.16.74.43,1l74.88,71.49c.88.84,2.35.22,2.35-1v-40.94s36.48-10.11,36.48-10.11c.65-.18,1.1-.77,1.1-1.45v-30.1c0-.99-.94-1.71-1.9-1.45Z"
        fill={color}
      />
    </svg>
  );
};

export default Insider;
