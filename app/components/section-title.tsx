export default function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-5xl">
      {children}
    </h2>
  );
}
