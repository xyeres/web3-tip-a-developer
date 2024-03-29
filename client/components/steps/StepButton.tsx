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
    className = 'p-2 mb-2 text-[.9rem] text-white hover:bg-neutral-400 active:bg-neutral-400 bg-neutral-500 w-full focus:ring ring-neutral-300 outline-none'
  } else {
    className = 'p-2 mb-2 text-[.9rem] text-white hover:bg-purple-500 active:bg-purple-500 bg-purple-700 w-full focus:ring ring-purple-300 outline-none'
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={className}>
      {title}
    </button>
  );
}
