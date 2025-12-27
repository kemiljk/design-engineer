export default function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="text-2xl font-bold text-foreground md:text-3xl">
      {children}
    </h2>
  );
}
