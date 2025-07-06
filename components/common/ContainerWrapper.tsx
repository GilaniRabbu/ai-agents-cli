import { ReactNode } from "react";

interface ContainerWrapperProps {
  children: ReactNode;
  className?: string;
}

const ContainerWrapper = ({ children, className }: ContainerWrapperProps) => {
  return (
    <div className={`${className} px-5 container mx-auto`}>{children}</div>
  );
};

export default ContainerWrapper;
