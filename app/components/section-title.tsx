export default function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2
      className="text-[1.75rem] font-bold text-foreground md:text-[2.25rem] lg:text-[3rem]"
      style={{ lineHeight: 0.95, letterSpacing: "-0.03em" }}
    >
      {children}
    </h2>
  );
}
