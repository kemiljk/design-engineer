export default function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="heading-section">
      {children}
    </h2>
  );
}
