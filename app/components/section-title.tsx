export default function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-300">
      {children}
    </h2>
  );
}
