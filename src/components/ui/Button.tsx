import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";

// Define button variants with CVA
export const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-customTealDark text-white  hover:bg-customTealLight",
        secondary:
          "bg-transparent text-customTeal hover:bg-customTealLight hover:text-white border border-customTeal border-1",

        outline:
          " bg-transparent text-white border border-white hover:bg-gray-100/10 ",

        ghost: "bg-transparent text-customTeal",
        destructive: "bg-red-800 hover:bg-red-700 text-white",
      },
      size: {
        sm: "px-2 py-1 text-md",
        md: "px-4 py-2 text-lg",
        lg: "px-6 py-3 text-xl",
        icon: "h-9 w-9",
      },
      loading: {
        true: "opacity-50 pointer-events-none",
      },
      shape: {
        block: "rounded-none",
        curved: "rounded-md",
        rounded: "rounded-[1000px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      shape: "curved",
    },
  }
);

// Button props
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

// Button component
const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  loading,
  shape,
  ...props
}) => {
  return (
    <button
      className={clsx(buttonVariants({ variant, size, shape }), className)}
      {...props}
    >
      {loading ? "loading" : props.children}
    </button>
  );
};

export default Button;
