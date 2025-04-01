import { ReactElement } from "react";

interface ButtonPropsI extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  themeType?: "primary" | "secondary" | "link";
}

const baseStyle: string = "min-w-[165px] px-4 py-2 rounded-md group cursor-pointer";
const primaryStyle: string = "bg-blue-400 hover:bg-blue-600 text-white";
const secondaryStyle: string = "border-1 border-blue-600 hover:bg-blue-200 text-blue-600";
const linkStyle: string = "hover:bg-blue-200 text-blue-600";

export default function Button({ label, themeType = "primary", ...props }: ButtonPropsI): ReactElement {
  // Function to choose button style
  const determinateThemeType = (): string => {
    switch (themeType) {
      case "link":
        return linkStyle;
      case "secondary":
        return secondaryStyle;
      default:
        return primaryStyle;
    }
  };

  return (
    <button {...props} className={`${baseStyle} ${determinateThemeType()}`}>
      {label}
    </button>
  );
}
