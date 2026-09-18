import { forwardRef } from "react";

const SectionTitle = forwardRef(
  (
    {
      label,
      title,
      description,
      action,
      children,
      className = "",
      align = "left",
      titleSize = "3xl",
    },
    ref
  ) => {
    const alignments = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    const titleSizes = {
      sm: "text-xl",
      md: "text-2xl",
      lg: "text-3xl",
      xl: "text-4xl",
    };

    return (
      <div
        ref={ref}
        className={`flex flex-col ${align === "center" && "items-center"} ${align === "right" && "items-end"} ${className}`}
      >
        {label && (
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">
            {label}
          </span>
        )}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 w-full">
          <div>
            {title && (
              <h2 className={`${titleSizes[titleSize]} font-bold text-gray-900 ${alignments[align]}`}>
                {title}
              </h2>
            )}
            {description && (
              <p className="text-gray-500 mt-2 max-w-xl ${alignments[align]}">
                {description}
              </p>
            )}
          </div>
          {action && (
            <div className="flex-shrink-0 mt-4 sm:mt-0">
              {action}
            </div>
          )}
          {children && <div>{children}</div>}
        </div>
      </div>
    );
  }
);

SectionTitle.displayName = "SectionTitle";

export default SectionTitle;