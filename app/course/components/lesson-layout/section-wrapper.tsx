interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  showDivider?: boolean;
}

export function SectionWrapper({
  id,
  children,
  showDivider = false,
}: SectionWrapperProps) {
  return (
    <section id={id} className="scroll-mt-8">
      {showDivider && (
        <hr className="my-8 border-t border-neutral-200 dark:border-neutral-800" />
      )}
      {children}
    </section>
  );
}
