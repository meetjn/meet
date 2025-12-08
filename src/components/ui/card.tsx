import * as React from "react";
import { cn } from "@/lib/utils";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @notice Shared card container for the research article list.
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    const composedClassName = cn(
      "rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-white shadow-[0_30px_120px_rgba(0,0,0,0.55)]",
      className
    );
    return <div ref={ref} className={composedClassName} {...props} />;
  }
);
Card.displayName = "Card";

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @notice Styled header wrapper for shadcn card sections.
 */
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    const composedClassName = cn("mb-4 space-y-3", className);
    return <div ref={ref} className={composedClassName} {...props} />;
  }
);
CardHeader.displayName = "CardHeader";

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

/**
 * @notice Title typography wrapper aligned with shadcn defaults.
 */
const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    const composedClassName = cn(
      "text-xl font-semibold tracking-tight text-white",
      className
    );
    return <p ref={ref} className={composedClassName} {...props} />;
  }
);
CardTitle.displayName = "CardTitle";

export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

/**
 * @notice Description text region for header metadata.
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => {
  const composedClassName = cn("text-sm text-white/65", className);
  return <p ref={ref} className={composedClassName} {...props} />;
});
CardDescription.displayName = "CardDescription";

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @notice Body region of the card that hosts interactive content.
 */
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    const composedClassName = cn("space-y-4 text-sm text-white/80", className);
    return <div ref={ref} className={composedClassName} {...props} />;
  }
);
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
