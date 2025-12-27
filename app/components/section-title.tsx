export default function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2
      className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl"
      style={{ lineHeight: 1.1, letterSpacing: "-0.025em" }}
    >
      {children}
    </h2>
  );
}
