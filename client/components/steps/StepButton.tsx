/**
 * STEP BUTTON COMPONENT
 */

export type StepButtonProps = {
  title: string;
  disabled?: boolean;
  onClick?: any;
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
  if (title === "Prev") {
    className = 'p-2 mb-2 text-[.9rem] hover:bg-neutral-400 active:bg-neutral-400 bg-neutral-700 w-full focus:ring ring-neutral-100 outline-none'
  } else {
    className = 'p-2 mb-2 text-[.9rem] hover:bg-[#673c8a] active:bg-[#673c8a] bg-[#512f6c] w-full focus:ring ring-[#673c8a] outline-none'
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={className}>
      {title}
    </button>
  );
}
