"use client";

import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { cn } from "@/lib/utils";
import { Xmark } from "iconoir-react";
import { motion, AnimatePresence } from "motion/react";
import { ease, duration } from "@/lib/motion";

interface ModalContextValue {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

function useDisclosure(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onOpenChange = useCallback((open: boolean) => setIsOpen(open), []);

  return { isOpen, onOpen, onClose, onOpenChange };
}

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  backdrop?: "blur" | "opaque" | "transparent";
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

function Modal({
  isOpen,
  onOpenChange,
  children,
  backdrop = "opaque",
  size = "md",
}: ModalProps) {
  const onClose = useCallback(() => onOpenChange(false), [onOpenChange]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const backdropClasses = {
    blur: "bg-black/50 backdrop-blur-sm",
    opaque: "bg-black/50",
    transparent: "bg-transparent",
  };

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full mx-4",
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, onOpen: () => onOpenChange(true), onClose, onOpenChange }}
    >
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration.fast }}
              className={cn("fixed inset-0", backdropClasses[backdrop])}
              onClick={onClose}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 4 }}
              transition={{ duration: duration.normal, ease: ease.outQuint }}
              className={cn("relative z-50 w-full", sizeClasses[size])}
            >
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

const ModalContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const context = useContext(ModalContext);

  return (
    <div
      ref={ref}
      className={cn(
        "relative max-h-[90vh] overflow-auto border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black",
        className
      )}
      {...props}
    >
      <button
        onClick={context?.onClose}
        className="absolute right-4 top-4 p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
        aria-label="Close modal"
      >
        <Xmark className="h-4 w-4" />
      </button>
      {children}
    </div>
  );
});
ModalContent.displayName = "ModalContent";

const ModalHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pb-2 pr-12", className)} {...props} />
));
ModalHeader.displayName = "ModalHeader";

const ModalBody = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-2", className)} {...props} />
));
ModalBody.displayName = "ModalBody";

const ModalFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex justify-end gap-2 p-6 pt-2", className)}
    {...props}
  />
));
ModalFooter.displayName = "ModalFooter";

export {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
};
