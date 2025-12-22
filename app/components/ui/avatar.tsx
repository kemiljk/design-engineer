import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Image from "next/image";

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-neutral-100 dark:bg-neutral-800",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      size: "md",
      radius: "full",
    },
  }
);

interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, radius, src, alt, fallback, style, ...props }, ref) => {
    const initials = fallback
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, radius }), className)}
        style={style}
        {...props}
      >
        {src ? (
          <Image
            src={src}
            alt={alt || fallback || "Avatar"}
            fill
            className="object-cover"
          />
        ) : (
          <span className="font-medium text-neutral-600 dark:text-neutral-300">
            {initials}
          </span>
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };
