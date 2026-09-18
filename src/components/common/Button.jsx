import { forwardRef } from "react";

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      className = "",
      disabled = false,
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-lg shadow-blue-600/30",
      secondary:
        "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500",
      outline:
        "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-500",
      ghost:
        "text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500",
      danger:
        "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-lg shadow-red-600/30",
      success:
        "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-lg shadow-green-600/30",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm gap-1.5",
      md: "px-5 py-2.5 text-base gap-2",
      lg: "px-7 py-3.5 text-lg gap-2.5",
      xl: "px-10 py-4 text-xl gap-3",
    };

    const width = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && leftIcon}
        <span>{children}</span>
        {!loading && rightIcon && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;