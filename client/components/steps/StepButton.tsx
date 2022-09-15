/**
 * STEP BUTTON COMPONENT
 */

import { ButtonHTMLAttributes, FormEvent } from "react";

export type StepButtonProps = {
  title: string;
  disabled?: boolean;
  onClick?: () => void | FormEvent<HTMLFormElement>;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined
};

export default function StepButton({
  title,
  disabled,
  onClick,
  className,
  type
}: StepButtonProps) {
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={className}>
      {title}
    </button>
  );
}
