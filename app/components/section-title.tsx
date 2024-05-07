export default function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="text-2xl font-black font-display tracking-tight text-gray-800 dark:text-gray-300 lg:text-4xl">
      {children}
    </h2>
  );
}
