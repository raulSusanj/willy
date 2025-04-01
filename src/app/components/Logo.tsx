import { ReactNode } from "react";

interface LogoPropsI {
  color?: string;
}

export default function Logo({ color }: LogoPropsI): ReactNode {
  return <p className={`text-5xl ${color} font-black`}>Willy</p>;
}
